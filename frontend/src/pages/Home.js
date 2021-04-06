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
    const [location, setLocation] = useState('anywhere');
    const [tag, setTag] = useState({ offer: true, events: true, ongoing: true, oneoff: true, value: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [searchText, setSearchText] = useState("");
    const locations = ["Clementi", "Tampines", "Bishan", "Woodlands"];
    const tags = ["Offer", "Events", "Ongoing", "OneOff"];   


    const getFilteredPosts = (filteredPosts) => {
        let tempPosts = [];
        console.log("Filtered Posts being here");
        for (let i=0; i<filteredPosts.length; i++){
            tempPosts.push(filteredPosts[i].item);
        }
        return tempPosts;
    }

    useEffect(() => {
        const fetchSearchData = async() => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/searchPostsBasedOn?value=${searchText}`)
            console.log("Filtered result \n");
            console.log(result.data.posts);
            setSortResult(result.data.posts.length);
            let filteredPosts = getFilteredPosts(result.data.posts);
            setEvents(filteredPosts);   
            setIsLoading(false);
        }
        const fetchData = async() => {
            setIsLoading(true);
            const result = await axios.get('http://localhost:1337/posts/searchAllPosts');
            console.log(result.data.posts);
            setSortResult(result.data.posts.length);
            setEvents(result.data.posts);
            setIsLoading(false);
        };
        let searchText = queryString.parse(history.location.search).search;
        if(searchText != null){
            console.log(searchText);
            setSearchText(searchText);
            fetchSearchData();
        }else{
            fetchData();
        }
    }, [history, isLogin, ])

    // useEffect(() => {
    //     const fetchData = async() => {
    //         setIsLoading(true);
    //         const result = await axios.get('http://localhost:1337/posts/searchAllPosts');
    //         console.log(result.data.posts);
    //         setSortResult(result.data.posts.length);
    //         setEvents(result.data.posts);
    //         setIsLoading(false);
    //     };
    //     fetchData();
    // }, [isLogin, ])
    

    useEffect(() => {
        const getLogin = () => {
            if(props.loginState){
                setIsLogin(true);
                setUser(props.user);
            }
        }
        getLogin();
    }, [props.loginState])


    useEffect(() => {//Got to update this useEffect with respect to the backend Ids
        function handleEventsChange() {
            const newEvent = events.filter(event => {
                if (location != "anywhere") {
                    return true;
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
            return <EventCards event={event} isLogin={isLogin}/>;
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
                <input type="checkbox" class="filter-checkbox" checked={tag.events} onChange={(e) => { e.target.checked ? setTag({ ...tag, value: [...tag.value, "events"], events: e.target.checked }) : setTag({ ...tag, value: tag.value.filter(item => item !== "events"), events: e.target.checked }) }} />
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
            {isLoading ? (<p>Events Loading...</p>) : (<div class="cards-container">{cardify(events)}</div>)}
        </div>
    );
}
export default Home;