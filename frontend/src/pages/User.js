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
    const [attending, setAttending] = useState([]);
    const [attendingNo, setAttendingNo] = useState(0);
    const [attendSort, setAttendSort] = useState("newestPosts");

    useEffect(() => {
        const fetchEvents = async() => {
            setIsLoading(true);
            console.log(id);
            const result = await axios.get(`http://localhost:1337/posts/searchUsersPosts?user_id=${id}`, props.config);
            console.log(result.data.posts);
            setSortResult(result.data.posts.length);
            setEvents(result.data.posts);
            setIsLoading(false);
        }
        fetchEvents();
    }, [])

    useEffect(() => {
        const fetchAttending = async() => {
            setIsLoading(true);
            const attending = await axios.get(`http://localhost:1337/users/DisplayAttendPostListsOfTheUser?user_id=${id}`, props.config);
            setAttending(attending.data.users);
            setAttendingNo(attending.data.users.length);
            setIsLoading(false);
        }
        fetchAttending();
    }, [])

    const cardify = (events, enableDelete) => {
        return events.map((event) => {
            return <EventCards event={event} isLogin={true} enableDelete={enableDelete} config={props.config}/>;
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

    const sortAttendDropDown = () => {
        return <form>
            <select value={attendSort} onChange={(e) => { setAttendSort(e.target.value) }}>
                <option value="newestPosts">Newest Posts</option>
                <option value="oldestPosts">Oldest Posts</option>
                <option value="eventDate">Event Date</option>
                <option value="distance">Distance</option>
                <option value="cost">Cost</option>
            </select>
        </form>
    };

    return (
        <div id="user-posts-container">
            <div class="row justify-content-between">
                <div class="col" id="myEvents">
                    <h1 id="user-posts-header"> Your Posts </h1>
                    <div class="sort-container">
                        <div id="sortResults">{sortResult} Results</div>
                        <span>Sort by: </span>
                        <div id="sortBy">{sortDropDown()} </div>
                    </div>
                    {isLoading ? (<p class="loading-message">Events Loading...</p>) 
                    : (sortResult==0) ? 
                        <div class="empty-container"> 
                            <h2> Nothing to see here :O </h2> 
                            <p> Offers and Events you have posted will show up on this section. </p>
                            <p><Link to="/createpost">Click here to create a post!</Link></p>
                        </div> 
                    : (<div class="cards-container">{cardify(events, true)}</div>)}
                    {/* {isLoading ? (<p class="loading-message">Events loading... </p>) :(<div class="cards-container">{cardify(events)}</div>)} */}
                </div>
                <div class="col" id="subbedEvents">
                    <h1> Your subscribed events </h1>
                    <div class="sort-container">
                        <div id="attendingResults">{attendingNo} Results</div>
                        <span>Sort by: </span>
                        <div id="attendSortBy">{sortAttendDropDown()} </div>
                    </div>
                    {isLoading ? (<p class="loading-message">Events Loading...</p>) 
                    : (attendingNo==0) ? 
                        <div class="empty-container"> 
                            <h2> Nothing to see here :O </h2> 
                            <p> Offers and Events you have indicated your attendance for will show up on this section. </p>
                            <p><Link to="/">Click here to join one!</Link></p>
                        </div> 
                    : (<div class="cards-container">{cardify(attending, false)}</div>)}
                </div>
            </div>
        </div>
    );
}

export default User;
