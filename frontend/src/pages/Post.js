import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';
import Comment from '../components/Comment';

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
        <div>
            <h1>Welcome to event {event.postTitle}</h1>
            <div>
                <h3>Tag 1</h3>
                <h3>Tag 2</h3>
            </div>
            <div>
                <h3>Event Description</h3>
                <p>{event.description}</p>
            </div>
            <div>
                <h3>Posted By</h3>
                {owner != null ? (<p>{owner.userName}</p>) : null}                
            </div>
            <div>
                <h1>Comment Section</h1>
                <Comment id={id}></Comment>
            </div>
        </div>
    )
}
export default Post;
