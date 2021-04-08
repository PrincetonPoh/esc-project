import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';
import CommentBox from '../components/CommentBox'
import '../styles/Post.css';
import calendar_icon from '../media/calendar_icon.png';
import location_icon from '../media/location_icon.png';
import placeholderProfilePic from '../media/logo_round.png'

function Post(props) {

    let {id} = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState([]);
    const [tags, setTags] = useState([]);
    const [pic, setPic] = useState(null);

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
            //console.log(result.data);
            setOwner(result.data.user[0]);
            setIsLoading(false);
        }
        fetchOwner();
    }, [event, ]);

    useEffect(() => {
        const fetchTags = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/getPostTags?post_id=${id}`);
            const tagString = result.data.tags[0].tags;
            // console.log(tagString);
            const tagArray = tagString.split(",");
            //console.log(tagArray);
            setTags(tagArray);
            setIsLoading(false);
        }
        fetchTags();
    }, [event, ]);

    useEffect(() => {
        const fetchPic = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/getPostPhoto?post_id=${id}`);
            // console.log(result.data.photo);
            if (result.data.photo.length!=0) {
                const imageArray = result.data.photo[0].data;
                console.log(imageArray);
                const blob = new Blob([imageArray]);
                console.log(blob);
                const srcBlob = URL.createObjectURL(blob);
                console.log(srcBlob);
                setPic(srcBlob);
            } else (
                console.log("This event does not have an image")
            )
            setIsLoading(false);
        }
        fetchPic();
    }, [event, ]);

    return (
        <div id="event-container">
            <h1 class="event-header"> {event.postTitle != null ? event.postTitle : "Title could not be displayed"}</h1>
            <div id="event-tags-container">
                {tags[0] != null ? (<div><p>{tags[0]}</p></div>) : null}
                {tags[1] != null ? (<div><p>{tags[1]}</p></div>) : null}
            </div>
            {pic!=null ? 
                <div id="event-image-container">
                    <img id="event-image" src={pic}/> 
                </div>
            : null }
            <div id="event-description-container">
                <h3>Description</h3>
                {event.description!=null ? <p>{event.description}</p> : <p>No Description Added</p> }
            </div>
            <div id="event-loctimedate-container">
                <h3>Details</h3>
                <div> 
                    <img src={location_icon} class="detailsIcon" alt="uploaded image"/>
                    <p> {event.postalCode != null ? event.postalCode : "Unknown Location"}</p>
                </div>
                <div>
                    <img src={calendar_icon} class="detailsIcon"/>
                    <p> {event.dateOfCreation != null ? event.dateOfCreation+" < not sure how to convert this oops" : "Unknown Date"}</p> {/* not sure why this filed is called dateOfCreation */}
                </div>
                {/* {event.postalCode != null ? (<p>{event.postalCode}</p>) : <p>Unknown Location</p>} */}
            </div>
            <div id="event-owner-container">
                <h3>Posted By</h3>
                <img src={placeholderProfilePic} class="event-owner-profile-pic"/> 
                <p id="event-owner">{owner != null ? owner.userName : "Unknown User"}</p>
            </div>
            <div id="event-comments-container">
                <h3>Comments</h3>
                <CommentBox post_id={id}/>
            </div>
        </div>
    )
}
export default Post;
