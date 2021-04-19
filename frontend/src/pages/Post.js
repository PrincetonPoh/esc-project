import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentBox from '../components/CommentBox'
import '../styles/Post.css';
import calendar_icon from '../media/calendar_icon.png';
import location_icon from '../media/location_icon.png';
import dropdown_icon from '../media/dropdown_icon.jpg';
import placeholderProfilePic from '../media/logo_round.png'

function Post(props) {

    let { id } = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState([]);
    const [tags, setTags] = useState([]);
    const [pic, setPic] = useState(null);
    const [isUser, setIsUser] = useState(true);
    const [attending, setAttending] = useState(false);
    const [listOfAttendes, setListOfAttendes] = useState([]);
    const [showAttendees, setShowAttendees] = useState(false);
    const [expandImage, setExpandImage] = useState(false);

    function timeConverter(time) {
        var a = new Date(time * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var time = date + '-' + month + '-' + year;
        return time
    };

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/displayPostsDetails?post_id=${id}`);
            console.log(result.data.posts);
            setEvent(result.data.posts[0]);
            setIsLoading(false);
        }
        fetchEvent();
    }, []);

    useEffect(() => {
        const fetchOwner = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/users/getUserById?user_id=${event.owner_id}`);
            setOwner(result.data.user[0]);
            console.log(owner);
            setIsLoading(false);
        }
        fetchOwner();
    }, [event]);

    useEffect(() => {
        const fetchAttendes = async () => {
            setIsLoading(true);
            const status = await axios.get(`http://localhost:1337/posts/displayAttendUserListsOfThePost?post_id=${id}`, props.config);
            console.log("List of users attending: ");
            console.log(status.data.users);
            setListOfAttendes(status.data.users);
            setIsLoading(false);
        }
        fetchAttendes();
    }, [event, attending])

    useEffect(() => {
        const checkAtttending = () => {
            if (isUser){
                console.log("Is user");
                setAttending(false);
            } else if(attending) {
                console.log("Already attending");
            }else{//Check if the user is inside the list
                let bool = false;
                listOfAttendes.map((attendes) => {
                    if (attendes.userName == props.user.userName){
                        console.log("Hit")
                        bool = true;
                    }
                })
                setAttending(bool);
            }
        }
        checkAtttending();
    }, [listOfAttendes, ])

    useEffect(() => {
        const checkIsUser = () => {
            setIsLoading(true);
            if (owner.userName != props.user.userName) {
                console.log("Is not user")
                setIsUser(false);
            } else{
                setIsUser(true);
            }
            setIsLoading(false);
        }
        try{
            checkIsUser();
        } catch(e){
            console.log(e);
        }
        
    }, [owner])

    useEffect(() => {
        const fetchTags = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/getPostTags?post_id=${id}`);
            const tagString = result.data.tags[0].tags;
            // console.log(tagString);
            const tagArray = tagString.split(",");
            //console.log(tagArray);
            if (event.location) {
                tagArray.push(event.location.toLowerCase());
            }
            setTags(tagArray);
            setIsLoading(false);
        }
        fetchTags();
    }, [event,]);

    useEffect(() => {
        const fetchPic = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/getPostPhoto?post_id=${id}`);
            if (result.data.photo.length != 0) {
                let base64Flag = 'data:image/jpeg;base64,';
                let imageStr = arrayBufferToBase64(result.data.photo[0].data.data);
                setPic(base64Flag + imageStr);
            } else (
                console.log("This event does not have an image")
            )
            setIsLoading(false);
        }
        fetchPic();
    }, [event,]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    const generateFilters = (tags) => {
        return tags.map((tag) => {
            return <div><p>{tag}</p></div>;
        });
    };

    const attendPost = async () => {
        const result = await axios.post(`http://localhost:1337/posts/createUserListsOfThePost?post_id=${id}&userName=${props.user.userName}&phoneNumber=${props.user.phoneNumber}`, props.config);
        const attending = await axios.post(`http://localhost:1337/users/createPostListsOfTheUser`, {
            "user_id": props.user.user_id,
            "post_id": id
        }, props.config);
        console.log("Look here: " + attending.data);
        console.log(result.data);
        setAttending(true);

    }

    const unAttendPost = async () => {
        const result = await axios.delete(`http://localhost:1337/posts/deleteUserListsOfThePost?post_id=${id}&userName=${props.user.userName}`, props.config);
        const attending = await axios.delete(`http://localhost:1337/users/deletePostListsOfTheUser?user_id=${props.user.user_id}&post_id=${id}`, props.config)
        console.log(result.data);
        setAttending(false);
    }

    const checkAttendingButton = () => {
        console.log()
        if (attending) {
            return <button onClick={unAttendPost} id="attending-button">Unattend Event</button>
        } else {
            return <button onClick={attendPost} id="attending-button">Attend Event</button>
        }
    }

    const lists = () => {
        let list = listOfAttendes.map((attendes) => {
            return <li>{attendes.userName}</li>
        })
        console.log(list);
        if (list.length == 0) {
            return <li>No attendees yet!</li>
        } 
        return list;
    }

    const toggleAttendeesList = () => {
        setShowAttendees(!showAttendees);
    }

    const expandedImageContainerStyle = {
        width: "90vw",
        height: "90vh",
        position: "absolute",
        top: "60px",
        right: "0px",
        float: "right",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    }

    return (
        <div id="event-container">
            <h1 class="event-header"> {event.postTitle != null ? event.postTitle : "Title could not be displayed"}</h1>
            <div id="event-tags-container">
                {generateFilters(tags)}
            </div>
            <div id="event-description-container">
                <h3>Description</h3>
                {event.description != null ? <p>{event.description}</p> : <p>No Description Added</p>}
            </div>
            <div id="event-loctimedate-container">
                <h3>Details</h3>
                <div>
                    <img src={location_icon} class="detailsIcon" alt="uploaded image" />
                    <p> {event.postalCode != null ? event.postalCode : "Unknown Location"}</p>
                </div>
                <div>
                    <img src={calendar_icon} class="detailsIcon" />
                    <p> {event.dateOfCreation != null ? timeConverter(event.dateOfCreation) : "Unknown Date"}</p> {/* this field should be date of event instead of dateOfCreation right? */}
                </div>
                {/* {event.postalCode != null ? (<p>{event.postalCode}</p>) : <p>Unknown Location</p>} */}
            </div>
            <div id="event-owner-container">
                <h3>Posted By</h3>
                <img src={placeholderProfilePic} class="event-owner-profile-pic" />
                <p id="event-owner">{owner != null ? owner.userName : "Unknown User"}</p>
            </div>
            <div id="event-attending-container">
                <h3>Attendees</h3>
                <div id="toggle-attendees" onClick={toggleAttendeesList}> 
                    <img src={dropdown_icon} class="dropdown-icon" style={showAttendees ? null : {transform: "rotate(-90deg)"}}/>
                    <span>{showAttendees ? "Hide Attendees" : "Show Attendees"}</span>
                    {showAttendees ? <ul>{lists()}</ul> : null}
                </div>
                
                {isUser ? null : checkAttendingButton()} 
            </div>
            <div id="event-comments-container">
                <h3>Comments</h3>
                <CommentBox post_id={id} user={props.user.userName} />
            </div>
            {pic != null ?
                <div id="event-image-container" style={expandImage ? expandedImageContainerStyle : null }>
                    <img id="event-image" src={pic} onClick={()=>setExpandImage(!expandImage)}/>
                    {expandImage ? null : <p id="upload-image-filename"> Click to View in Fullscreen </p>}
                </div>
                : null}
        </div>
    )
}
export default Post;
