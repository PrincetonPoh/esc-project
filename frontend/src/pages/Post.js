import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';
import CommentBox from '../components/CommentBox'
import '../styles/Post.css';

function Post(props) {

    let {id} = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState([]);
    const [tags, setTags] = useState([]);

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
            console.log(result.data);
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
            //console.log(tagString);
            const tagArray = tagString.split(",");
            console.log(tagArray);
            setTags(tagArray);
            setIsLoading(false);
        }
        fetchTags();
    }, [event, ]);

    // return (
    //     <div>
    //     <h1>Welcome to event {id}</h1>
    //     <Comment id={id}></Comment>
    //     </div>
    // )
    return (
        <div id="event-container">
            <h1 class="event-header">  {event.postTitle}</h1>
            <div id="event-tags-container">
                {tags[0] != null ? (<div><p>{tags[0]}</p></div>) : null}
                {tags[1] != null ? (<div><p>{tags[1]}</p></div>) : null}
            </div>
            <div id="event-description-container">
                <h3>Event Description</h3>
                {event.description!=null ? <p>{event.description}</p> : <p>No Description Added</p> }
            </div>
            <div id="event-owner-container">
                <h3>Posted By</h3>
                {owner != null ? (<p>{owner.userName}</p>) : <p>Unknown</p>}
                {/* <p>Unknown</p> */}
            </div>
            <div id="event-comments-container">
                <h3>Comments</h3>
                <CommentBox post_id={id}/>
            </div>
        </div>
    )
}
export default Post;
