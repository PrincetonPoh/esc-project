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
        axios.get('https://api.github.com/users/mapbox')
        .then((response) => {
            console.log(response);
        })
    }


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