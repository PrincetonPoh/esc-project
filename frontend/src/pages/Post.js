import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';
import Comment from '../components/Comment';

function Post() {

    let {id} = useParams();

    const [event, setEvent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async() => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/displayPostsDetails?post_id=${id}`)
            setEvent(result.data);
            setIsLoading(false);
        }
        fetchEvent();
    }, [])

    console.log(id);

    return (
        <div>
        <h1>Welcome to event {id}</h1>
        <Comment id={id}></Comment>
        </div>
    )
}
export default Post;
