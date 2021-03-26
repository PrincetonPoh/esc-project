import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';
import Comment from '../components/Comment';
import '../styles/Post.css';

function Post(props) {

    let {id} = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState([]);

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

    // return (
    //     <div>
    //     <h1>Welcome to event {id}</h1>
    //     <Comment id={id}></Comment>
    //     </div>
    // )
    return (
        <div id="event-container">
            <h1 class="event-header">Welcome to event {event.postTitle}</h1>
            <div id="event-tags-container">
                <div><p>Tag 1</p></div>
                <div><p>Tag 2</p></div>
            </div>
            <div id="event-description-container">
                <h3>Event Description</h3>
                <p>{event.description} test</p>
            </div>
            <div id="event-owner-container">
                <h3>Posted By</h3>
                {owner != null ? (<p>{owner.userName}</p>) : <p>Unknown</p>}
                <p>Unknown</p>
            </div>
            <div id="event-comments-container">
                <h3>Comments</h3>
                <Comment id={id}></Comment>
            </div>
        </div>
    )
}
export default Post;
