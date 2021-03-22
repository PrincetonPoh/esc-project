import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import EventCards from '../components/EventCards';
import axios from 'axios';

function Home() {

    const [events, setEvents] = useState([]);
    const [sortResult, setSortResult] = useState(0);
    const [sort, setSort] = useState("newestPosts");
    const [location, setLocation] = useState('anywhere');
    const [tag, setTag] = useState({ offer: false, events: false, ongoing: false, oneoff: false, value: [] });

    const locations = ["Clementi", "Tampines", "Bishan", "Woodlands"];
    const tags = ["Offer", "Events", "Ongoing", "OneOff"];

    // const callApi = () => { //Template
    //     axios.get('https://api.github.com/users/mapbox')
    //     .then((response) => {
    //         console.log(response);
    //     })
    // }

    const addEvents = () => {for (let i = 0; i < 8; i++) {
        events.push({
            id: i,
            title: "Event " + i,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            location: locations[i % 4],
            tag: tags[i % 4]
        })
    }}

    useEffect(() => {
        function handleEventsChange() {
            const newEvent = events.filter(event => {
                if (location != "anywhere"){
                return event.location.toLowerCase() === location
                } else {
                    return true;
                }
            })
            return newEvent;
        }
        return setEvents(handleEventsChange());
    }, [location]);

    // useEffect(() => {
    //     console.log(tag);
    //     setEvents(events.filter(events => tag.value.map((ids) => {
    //         console.log(events.tag.toLowerCase() == ids);
    //         return events.tag.toLowerCase() == ids;
    //     })));
    // }, [tag]);    

    const cardify = (events) => {
        return events.map((event) => {
            return <EventCards event={event} />;
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
                <option value="clementi">Clementi</option>
                <option value="tampines">Tampines</option>
                <option value="bishan">Bishan</option>
                <option value="woodlands">Woodlands</option>
            </select>
        </form>
    };

    const offersCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.offer ? { color: "white", backgroundColor: "#7BA3D7" } : { color: "#7BA3D7", backgroundColor: "white" }}>
                Offers
                <input type="checkbox" class="filter-checkbox" checked={tag.offer} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "offer"], offer: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "offer"), offer: e.target.checked }) }} />
            </label>
        </form>
    }
    const eventsCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.events ? { color: "white", backgroundColor: "#7BA3D7" } : { color: "#7BA3D7", backgroundColor: "white" }}>
                Events
                <input type="checkbox" class="filter-checkbox" checked={tag.events} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "events"], events: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "events"), events: e.target.checked }) }} />
            </label>
        </form>
    }
    const recurrentCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.ongoing ? { color: "white", backgroundColor: "#7BA3D7" } : { color: "#7BA3D7", backgroundColor: "white" }}>
                Recurrent/Ongoing
                <input type="checkbox" class="filter-checkbox" checked={tag.ongoing} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "ongoing"], ongoing: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "ongoing"), ongoing: e.target.checked }) }} />
            </label>
        </form>
    }
    const oneoffCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.oneoff ? { color: "white", backgroundColor: "#7BA3D7" } : { color: "#7BA3D7", backgroundColor: "white" }}>
                One-Off
                <input type="checkbox" class="filter-checkbox" checked={tag.oneoff} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "oneoff"], oneoff: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "oneoff"), oneoff: e.target.checked }) }} />
            </label>
        </form>
    }
    return (
        <div id="home-container">
            <h1> Posts from People Nearby </h1>
            <div id="sort-container">
                <div id="sortResults">{sortResult} Results</div>
                <div id="sortBy">Sort by: {sortDropDown()} </div>
                <div id="sortByLocation">Location: {locationDropDown()}</div>
            </div>
            <div id="filters">Filter By: {offersCheckBox()} {eventsCheckBox()} {recurrentCheckBox()} {oneoffCheckBox()} </div>
            <button onClick={addEvents}>Hello</button>
            <div id="cardsContainer">{cardify(events)}</div>
        </div>
    );

}
export default Home;