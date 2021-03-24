import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import EventCards from '../components/EventCards';
import axios from 'axios';

function Home() {

    const [events, setEvents] = useState([]);
    const [sortResult, setSortResult] = useState(0);
    const [sort, setSort] = useState("newestPosts");
    const [location, setLocation] = useState('anywhere');
    const [eventIsChecked, setEventIsChecked] = useState(false);
    const [eventCardPopup, setEventCardPopup] = useState(false);

    const togglePopup = () => {
        setEventCardPopup(!eventCardPopup);
        callApi();
    }

    const callApi = () => { //Template
        console.log("Getting posts.")
        axios.get('http://localhost:1337/posts/searchAllPosts')
        .then((response) => {
            setEvents(response);
        })
        .catch(error => alert("Error in getting posts."))
    }

    /*
    const searchPostByOwnerId = (ownerId) => {
        axios.get("http://localhost:1337/posts/searchPostsBasedOnId/?owner_id=" + ownerId)
        .then(response => {
            // response contains the post's details with the following data fields in order:
            // post_id, owner_id, postTitle, dateOfCreation, postalCode, description
        })
        .catch(error => alert("Error in searching posts by owner ID."))
    }

    const getAttendList = (postId) => {
        axios.get("http://localhost:1337/posts/displayAttendUserListsOfThePost/?post_id=" + postId)
        .then(response => {
            // response contains a list of users, each having the data fields:
            // [{username: "user1", phoneNumber: number}, {username: "user2", phoneNumber: number}]
        })
        .catch(error => alert("Error in getting attendance list for this post."))
    }

    const createAttendList  = () => {
        // i think backend might need post id here?
        axios.post("http://localhost:1337/posts/createUserListsOfThePost", {
            // post a list of users, each having the data fields:
            // [{username: "user1", phoneNumber: number}, {username: "user2", phoneNumber: number}]
        })
        .then(response => {
            // this should probably be a 'put' request? since I'm guessing there will be an 'attend' button, then a press will
            // push the current user to the attendance list, but anyway
        })
        .catch(error => alert("Error in posting attendance list."))
    }

    const updateUser = (userId) => {
        axios.put("http://localhost:1337/users/updateUser", {
            // "user_id": userId,
            // "phoneNumber": data.hp,
            // "userName": data.username,
            // "emailAddress": data.email,
            // "password": data.password
        })
        .then(response => {
            alert("Successfully updated profile.")
        })
        .catch(error => alert("Unable to update profile."))
    }

    const deleteUser = (userId) => {
        axios.delete("http://localhost:1337/users/deleteUser/?user_id=" + userId)
        .then(response => alert("Successfully deleted user profile."))
        .catch(error => alert("Unable to delete profile."))
    }

    const deletePost = (postId) => {
        axios.delete("localhost:1337/posts/deletePost/?post_id=" + postId)
        .then(response => alert("Post deleted."))
        .catch(error => alert("Post could not be deleted."))
    }
    */

    // useEffect(() => { //
    //     setSortResult(Object.keys(events).length);
    // }, [events])

    for (let i = 0; i < 100; i++) {
        events.push({
            id: i,
            title: "Event " + i,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        })
    }

    const cardify = (events) => {
        return events.map((event) => {
            return EventCards(event, eventCardPopup, togglePopup);
        });
    };

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

    const locationDropDown = () => {//Fetch from db the list and populate
        return <form>
            <select value={location} onChange={(e) => { setLocation(e.target.value) }}>
                <option value="anywhere">Anywhere</option>
                <option value="clementi">Clementi ()</option>
                <option value="tampinese">Tampinese ()</option>
                <option value="bishan">Bishan ()</option>
                <option value="woodlands">Woodlands ()</option>
            </select>
        </form>
    };

    const eventsCheckBox = () => {
        return <form>
            <label>Events</label>
            <input type="checkbox" checked={eventIsChecked} onChange={(e)=>{setEventIsChecked(e.target.checked)}}/>
        </form>
    }

    return (
        <div>
            <div>
                <h1> Posts from People Nearby </h1>
                <div id="sortResults">{sortResult} Results</div>
                <div id="sortBy">Sort by: {sortDropDown()} </div>
                <div id="sortByLocation">Location: {locationDropDown()}</div>
                <div id="filters">Filter By: {eventsCheckBox()} </div>
                <div id="cardsContainer">{cardify(events)}</div>
            </div>
        </div>
    );

}
export default Home;
