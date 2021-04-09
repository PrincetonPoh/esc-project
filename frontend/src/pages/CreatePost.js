import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';
import info_hover from '../media/info_hover.png';
import plus_icon_circle from '../media/plus_icon_circle.png';
import { useHistory, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // npm install --save react-google-recaptcha 

/*Uses the one map api to get the planning area to detemine the nearest event occuring */

function CreatePost(props) {

    let history = useHistory();

    const [title, setTitle] = useState("")
    const [loc, setLoc] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [image, setImage] = useState(null);
    const [postType, setPostType] = useState("offer");
    const [dateType, setDateType] = useState("ongoing");
    const [locations, setLocations] = useState([]);
    const [locationSelected, setLocationSelected] = useState("ANG MO KIO");
    const [isLoading, setIsLoading] = useState(true);
    const [redirectSubmit, setRedirectSubmit] = useState(false);
    const dateRegex = new RegExp('([0-3][0-9]\.[0-1][0-9]\.[0-9][0-9][0-9][0-9])');
    const [captchaSuccess, setCaptchaSuccess] = useState(false)

    // const [warnings, setWarnings] = useState([null,null,null,null,null,null,null]) 


    useEffect(() => {
        const fetchLocation = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://scratchtest.ddns.net:1337/locations/getAllLocations`)
            setLocations(result.data.result);
            setIsLoading(false);
        }
        fetchLocation();
    }, [ ])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, loc, desc, date, image);
        if (props.loginState == false) {
            alert("Please sign in to post!"); 
        } else if (title == "" || loc == "" || desc == "" || date == "") { // checks if any of the compulsory fields are empty 
            alert("Please fill in the required fields!");
        } else if (captchaSuccess != true) {
            alert("Please pass the ReCAPTCHA to create post!");
        } else { // all compulsory fields are filled in, try post to backend
            let newDate = "";
            try {
                newDate = convertDate(date);
                axios.post("http://scratchtest.ddns.net:1337/posts/createPost",
                    {
                        "owner_id": props.user.user_id,
                        "postTitle": title,
                        "dateOfCreation": newDate,
                        "postalCode": loc,
                        "description": desc,
                        "location": locationSelected
                    }, props.config).then(async (response) => {
                        console.log(response.data);
                        let body = {
                            post_id: response.data.success_post.post_id,
                            tags: postType + ',' + dateType
                        }
                        let body2 = {
                            post_id: response.data.success_post.post_id,
                            locationArea: locationSelected
                        }
                        var formData = new FormData();
                        formData.append("pic",image);
                        console.log(formData);
                        try {
                            const result = await axios.post("http://scratchtest.ddns.net:1337/posts/addPostTags", body, props.config);
                            const result2 = await axios.post("http://scratchtest.ddns.net:1337/locations/createPostLocation", body2, props.config);
                            const emailNoti
                            if (image!=null) {
                                const result3 = await axios.post(`http://scratchtest.ddns.net:1337/posts/postPhoto?post_id=${response.data.success_post.post_id}`, formData, props.config);
                                console.log(result3);
                            } else {
                                console.log("There is no image to be posted")
                            }
                            alert("Successful Posted Event")
                            history.push(`/user/${props.user.user_id}`)
                        } catch (err) {
                            console.log(err);
                            alert("Unable to post the event");
                        }
                    }, (error) => {
                        console.log(error);
                        alert("Unable to post the event");
                    })
            } catch (e) {
                alert(e);
            }
        }
    }

    const convertDate = (date) => {
        if (!dateRegex.test(date)) {
            throw new Error("Invalid Date Format");
        }
        const result = (new Date(date).getTime() / 1000).toFixed(0);
        return result;
    }

    const getTokenFromOneMap = async () => {
        const token = await axios.post("https://developers.onemap.sg/privateapi/auth/post/getToken", {
            email: "yikkhuen_kong@mymail.sutd.edu.sg",
            password: "P@ssw0rd123SUTD"
        })
        return token.access_token;
    }

    // const getLocationString = async (locationNo) => {
    //     const result = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${locationNo}&returnGeom=Y&getAddrDetails=Y&pageNum=1`)
    //     const lat = await result.data.results[0].LATITUDE
    //     const lon = await result.data.results[0].LONGITUDE
    //     const token = await getTokenFromOneMap();
    //     setOneMapToken(token);
    //     const result2 = await axios.get(`https://developers.onemap.sg/privateapi/popapi/getPlanningarea?token=${token}&lat=${lat}&lng=${lon}`)//Get the planning area(require auth)
    //     return result2.data[0].pln_area_n
    // }

    const loadOptions = (locations) => {
        return locations.map((item) => {
            return <option>{item.location}</option>
        })
    }

    const onRecaptcha = (value) => {
        console.log("Captcha value: ", value);
        if (value == null) {
            setCaptchaSuccess(false);
        } else {
            setCaptchaSuccess(true);
        }
        console.log("captchaSuccess: ", this.state.captchaSuccess);
    }

    const uploadDefaultStyle = {
        display: "block",
        margin: "auto",
        padding: "30px 0",
        height: "90px",
        filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))"
    }

    const uploadedStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }

    return (
        <div>
            <h1>Create a post</h1>
            <form id="create-post-form">
                <div id="form-container">
                    <div id="form-posttitle" class="form-item">
                        <label class="mandatory-fields">Post Title</label>
                        <div class="info">
                            <img src={info_hover} class="info-icon" />
                            <span class="info-text"> Summarize your event/offer in as few words as possible. </span>
                        </div>
                        {/* {warnings[0] ? <span class="inputWarning"> This field is required!</span> : null} */}
                        {/* {warnings[0]} */}
                        <input id="input-posttitle" name="title" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                    </div>

                    <div id="form-location" class="form-item">
                        <label class="mandatory-fields">Location</label>
                        <div class="info">
                            <img src={info_hover} class="info-icon" />
                            <span class="info-text"> Where will your offer/event be available or held at? Select a region to help people nearby find your post! </span>
                        </div>
                        {/* {warnings[1] ? <span class="inputWarning"> This field is required!</span> : null} */}
                        <input id="input-location" name="location" type="text" value={loc} onChange={e => setLoc(e.target.value)}></input>
                        <select id="input-region" name="region" onChange={(e) => setLocationSelected(e.target.value)}>
                            {isLoading ? (<option>
                                ...  loading
                            </option>) : loadOptions(locations)}
                        </select>
                    </div>

                    <div id="form-description" class="form-item">
                        <label class="mandatory-fields">Description</label>
                        <div class="info">
                            <img src={info_hover} class="info-icon" />
                            <span class="info-text"> Give more details on what your offer/event is about. Who can join in? What will participants be doing? </span>
                        </div>
                        <textarea id="input-description" name="description" type="text" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                    </div>

                    <div id="form-posttype" class="form-item">
                        <label class="mandatory-fields">Post Type</label>
                        <div class="info">
                            <img src={info_hover} class="info-icon" />
                            <span class="info-text"> Specify this to help others find your post more easily. </span>
                        </div>
                        <label class="form-radio-label"> {/*TODO: api call for radio fields*/}
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Offer" checked={postType === 'offer'} onClick={() => setPostType('offer')} />
                            Offer
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Event" checked={postType === "event"} onChange={() => setPostType('event')} />
                            Event
                        </label>
                    </div>

                    <div id="form-datetime" class="form-item">
                        <label class="mandatory-fields">Date and Time</label>
                        <div class="info">
                            <img src={info_hover} class="info-icon" />
                            <span class="info-text"> Will you offer/event be recurring (eg. every Wednesday etc) or one-off (a specific date and time)? </span>
                        </div>
                        <label class="form-radio-label"> {/*TODO: api call for radio fields*/}
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="Recurrent/Ongoing" checked={dateType === "ongoing"} onChange={() => setDateType('ongoing')} />
                            Recurrent/Ongoing
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="One-Off" checked={dateType === "oneoff"} onChange={() => setDateType('oneoff')} />
                            One-Off
                        </label>
                        <textarea id="input-datetimedetails" name="datetimedetails" type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Date format: DD.MM.YYYY"></textarea>
                    </div>

                    <div id="form-image" class="form-item">
                        <label> Upload Image
                            <div class="info">
                                <img src={info_hover} class="info-icon" />
                                <span class="info-text"> Add an image which represents your offer/event and make your post more interesting! </span>
                            </div>
                            <div id="upload-box">
                                {image == null ?
                                    <img id="upload-image" src={plus_icon_circle} style={uploadDefaultStyle} />
                                    :
                                    <img id="upload-image" src={URL.createObjectURL(image)} style={uploadedStyle} />
                                }
                            </div>
                            <p id="upload-image-filename"> {image == null ? null : image.name} </p>
                            <input type="file" onChange={e => setImage(e.target.files[0])} />
                        </label>
                    </div>
                </div>
                <ReCAPTCHA id="captcha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" secretkey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe" onChange={onRecaptcha} onExpired={onRecaptcha} badge="inline" />
                <input id="create-post-form-button" value="Create Post" onClick={handleSubmit} />
            </form>

        </div>
    )
}
export default CreatePost;
