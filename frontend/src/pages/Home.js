import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.css';
import EventCards from '../components/EventCards';
import axios from 'axios';
import queryString from 'query-string';

function Home(props) {

    // const headerConfig = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    // axios.post('Link',body,headerConfig);

    let history = useHistory();
    const [events, setEvents] = useState([]);
    const [sortResult, setSortResult] = useState(0);
    const [sort, setSort] = useState("newestPosts");
    const [locations, setLocations] = useState([{location: "ALL"}]);
    const [locationSelected, setLocationSelected] = useState("ALL");
    const [tag, setTag] = useState({ offer: true, events: true, ongoing: true, oneoff: true, value: ["offer", "event", "ongoing", "oneoff"] });
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getFilteredPosts = (filteredPosts) => {
            let tempPosts = [];
            console.log("Filtered Posts being here");
            for (let i = 0; i < filteredPosts.length; i++) {
                tempPosts.push(filteredPosts[i].item);
            }
            return tempPosts;
        }
        const fetchSearchData = async (searchText) => {
            const result = await axios.get(`http://localhost:1337/posts/searchPostsText?value=${searchText}`)
            setSortResult(result.data.posts.length);
            let filteredPosts = getFilteredPosts(result.data.posts);
            // setEvents(filteredPosts);
            return filteredPosts;
        }
        const fetchData = async () => {
            const result = await axios.get('http://localhost:1337/posts/searchAllPosts');
            setSortResult(result.data.posts.length);
            // setEvents(result.data.posts);
            return result.data.posts;
        };
        const asyncFilterTag = async (arr) => {
            await Promise.all(arr.map(async (event) => {
                const value = await axios.get(`http://localhost:1337/posts/getPostTags?post_id=${event.post_id}`,);
                let strings = await value.data.tags[0].tags.split(",");
                event.tag = await strings;
            }))
            return await asyncFilterLocation(arr);
        }
        const asyncFilterLocation = async (arr) => {
            await Promise.all(arr.map(async (event) => {
                const value = await axios.get(`http://localhost:1337/locations/getPostLocation?post_id=${event.post_id}`,);
                console.log("Filter the locations")
                console.log(value);
                let strings = await value.data[0].locationArea;
                event.locationArea = await strings;
            }))
            return arr;
        }
        const handleFilter = async () => {
            setIsLoading(true);
            let searchResult = queryString.parse(history.location.search).search;
            let tempEvents = []
            if (searchResult != null && searchResult.replace(/\s+/g, '') != "") {
                tempEvents = await fetchSearchData(searchResult);
            } else {
                tempEvents = await fetchData();
            }
            const mutatedEvents = await asyncFilterTag(tempEvents);
            const result = mutatedEvents.filter(event => {
                let bool = false;
                tag.value.map((id) => {
                    for (let i = 0; i < event.tag.length; i++) {
                        if (event.tag[i].includes(id)) {
                            if(event.locationArea === locationSelected || locationSelected === "ALL"){
                                bool = true;
                            }
                        }
                    }
                })
                return bool;
            })
            setEvents(result);
            setIsLoading(false);
        }
        handleFilter();
    }, [history, isLogin, tag, locationSelected])

    useEffect(() => {
        const fetchLocation = async () => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/locations/getAllLocations`)
            const final = locations.concat(result.data.result);
            setLocations(final);
            setIsLoading(false);
        }
        fetchLocation();
    }, [ ])

    useEffect(() => {
        const getLogin = () => {
            if (props.loginState) {
                setIsLogin(true);
                setUser(props.user);
            }
        }
        getLogin();
    }, [props.loginState])

    const cardify = (events) => {
        return events.map((event) => {
            return <EventCards event={event} isLogin={isLogin} />;
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

    const loadLocation = (locations) => {
        return locations.map((item) => {
            return <option value={item.location}>{item.location}</option>
        })
    }

    const locationDropDown = () => {//Fetch from db the list and populate
        return <form>
            <select onChange={(e) => { setLocationSelected(e.target.value) }}>
                {loadLocation(locations)}
            </select>
        </form>
    };

    const checkedFilterStyle = {
        color: "white",
        backgroundColor: "#7BA3D7"
    }
    const uncheckedFilterStyle = {
        color: "#7BA3D7",
        backgroundColor: "white"
    }

    const offersCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.offer ? checkedFilterStyle : uncheckedFilterStyle}>
                Offers
                <input type="checkbox" class="filter-checkbox" checked={tag.offer} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "offer"], offer: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "offer"), offer: e.target.checked }) }} />
            </label>
        </form>
    }
    const eventsCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.events ? checkedFilterStyle : uncheckedFilterStyle}>
                Events
                <input type="checkbox" class="filter-checkbox" checked={tag.events} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "event"], events: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "event"), events: e.target.checked }) }} />
            </label>
        </form>
    }
    const recurrentCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.ongoing ? checkedFilterStyle : uncheckedFilterStyle}>
                Recurrent/Ongoing
                <input type="checkbox" class="filter-checkbox" checked={tag.ongoing} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "ongoing"], ongoing: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "ongoing"), ongoing: e.target.checked }) }} />
            </label>
        </form>
    }
    const oneoffCheckBox = () => {
        return <form>
            <label class="filter-checkbox-label" style={tag.oneoff ? checkedFilterStyle : uncheckedFilterStyle}>
                One-Off
                <input type="checkbox" class="filter-checkbox" checked={tag.oneoff} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "oneoff"], oneoff: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "oneoff"), oneoff: e.target.checked }) }} />
            </label>
        </form>
    }
    return (
        <div id="home-container">
            <h1> Posts from People Nearby </h1>
            <div class="sort-container">
                <div id="sortResults">{sortResult} Results</div>
                <div id="sortBy">Sort by: {sortDropDown()} </div>
                <div id="sortByLocation">Location: {locationDropDown()}</div>
            </div>
            <div id="filters">Filter By: {offersCheckBox()} {eventsCheckBox()} {recurrentCheckBox()} {oneoffCheckBox()} </div>
            {isLoading ? (<p class="loading-message">Events Loading...</p>) : (<div class="cards-container">{cardify(events)}</div>)}
        </div>
    );
}
export default Home;