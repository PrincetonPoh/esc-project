import React, {useState} from 'react';
import axios from 'axios';
import '../styles/CreatePost.css';
import info_hover from '../media/info_hover.png';
import plus_icon_circle from '../media/plus_icon_circle.png';

function CreatePost() {

    const [title, setTitle] = useState("")
    const [loc, setLoc] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [image, setImage] = useState(null)

    const handleSubmit = (e) => {
        console.log(title, loc, desc, date, image);
        axios.post("http://localhost:1337/posts/createPost", 
        {
            "post_id": Math.floor(Math.random() * 100),
            "owner_id": Math.random(),
            "postTitle": title,
            "dateOfCreation": date,
            "postalCode": loc,
            "description": desc
        }).then((response) => alert("Successfully posted.")).catch((error) => alert("Error."));
        
        e.preventDefault();
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
            <form id="create-post-form" onSubmit={handleSubmit}>
                <div id="form-container"> 
                    <div id="form-posttitle" class="form-item">
                        <label>Post Title</label>
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Summarize your event/offer in as few words as possible. </span>
                        </div>
                        <input id="input-posttitle" name="title" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                    </div>

                    <div id="form-location" class="form-item">
                        <label>Location</label>
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Where will your offer/event be available or held at? Select a region to help people nearby find your post! </span>
                        </div>
                        <input id="input-location" name="location" type="text" value={loc} onChange={e => setLoc(e.target.value)}></input>
                        
                        <select  id="input-region" name="region">
                            <option>
                                //API call for the options
                            </option>
                        </select>
                        
                    </div>

                    <div id="form-description" class="form-item">
                        <label>Description</label>
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Give more details on what your offer/event is about. Who can join in? What will participants be doing? </span>
                        </div>
                        <textarea id="input-description" name="description" type="text" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
                    </div>

                    <div id="form-posttype" class="form-item">
                        <label>Post Type</label>
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Specify this to help others find your post more easily. </span>
                        </div>
                        <label class="form-radio-label"> {/*TODO: api call for radio fields*/}
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Offer" /*checked={this.state.posttype === "Offer"} onChange={this.handleChange}*//> 
                            Offer
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Event" /*checked={this.state.posttype === "Event"} onChange={this.handleChange}*//> 
                            Event
                        </label>
                    </div>

                    <div id="form-datetime" class="form-item">
                        <label>Date and Time</label>
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Will you offer/event be recurring (eg. every Wednesday etc) or one-off (a specific date and time)? </span>
                        </div>
                        <label class="form-radio-label"> {/*TODO: api call for radio fields*/}
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="Recurrent/Ongoing" /*checked={this.state.datetimetype === "Recurrent/Ongoing"} onChange={this.handleChange}*//> 
                            Recurrent/Ongoing
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="One-Off" /*checked={this.state.datetimetype === "One-Off"} onChange={this.handleChange}*//> 
                            One-Off
                        </label>
                        <textarea id="input-datetimedetails" name="datetimedetails" type="text" value = {date} onChange={e => setDate(e.target.value)}></textarea>
                    </div>

                    <div id="form-image" class="form-item">
                        <label> Upload Image 
                            <div class="info"> 
                                <img src={info_hover} class="info-icon"/>
                                <span class="info-text"> Add an image which represents your offer/event and make your post more interesting! </span>
                            </div>
                            {/* <UploadBox /> */}
                            <div id="upload-box"> 
                                {image==null ?
                                    <img id="upload-image" src={plus_icon_circle} style={uploadDefaultStyle}/> 
                                    : 
                                    <img id="upload-image" src={URL.createObjectURL(image)} style={uploadedStyle}/>
                                }
                            </div>
                            <p id="upload-image-filename"> {image==null ? null : image.name} </p>
                            <input type="file" onChange={e => setImage(e.target.files[0])}/>
                        </label> 
                    </div>
                </div>

                <input id="create-post-form-button" type="submit" value="Create Post" />
                
            </form>
            
        </div>
    )
}
export default CreatePost;
