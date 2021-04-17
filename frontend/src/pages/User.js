import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import {useParams} from 'react-router-dom'; 
import {BrowserRouter as Router, Link} from 'react-router-dom';
import EventCards from '../components/EventCards';
import '../styles/Home.css';

function User(props){

    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState([]);
    const [sortResult, setSortResult] = useState(0);
    const [sort, setSort] = useState("newestPosts");

    useEffect(() => {
        const fetchEvents = async() => {
            setIsLoading(true);
            console.log(id);
            const result = await axios.get(`http://localhost:1337/posts/searchUsersPosts?user_id=${id}`, props.config)
            console.log(result.data.posts);
            setSortResult(result.data.posts.length);
            setEvents(result.data.posts);
            setIsLoading(false);
        }
        fetchEvents();
    }, [])

    const cardify = (events) => {
        return events.map((event) => {
            return <EventCards event={event} isLogin={true} enableDelete={true} config={props.config}/>;
        })
    }

    const sortDropDown = () => {
        return <form>
            <select value={sort} onChange={(e) => { setSort(e.target.value) }}>
                <option value="newestPosts">Newest Posts</option>
                <option value="oldestPosts">Oldest Posts</option>
                <option value="eventDate">Event Date</option>
                <option value="distance">Distance</option>
                <option value="cost">Cost</option>
            </select>
        </form>
    };

    return (
        <div  id="user-posts-container">
            <h1> Your Posts </h1>
            <div class="sort-container">
                <div id="sortResults">{sortResult} Results</div>
                <span>Sort by: </span>
                <div id="sortBy">{sortDropDown()} </div>
            </div>
            {isLoading ? (<p class="loading-message">Events Loading...</p>) 
            : (sortResult==0) ? 
                <div class="empty-container"> 
                    <h2> Nothing to see here :O </h2> 
                    <p> Offers and Events you have posted will show up on this page. </p>
                    <p><Link to="/createpost">Click here to create a post!</Link></p>
                </div> 
            : (<div class="cards-container">{cardify(events)}</div>)}
            {/* {isLoading ? (<p class="loading-message">Events loading... </p>) :(<div class="cards-container">{cardify(events)}</div>)} */}
        </div>
    );
}

export default User;