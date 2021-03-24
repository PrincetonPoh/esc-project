import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import {useParams} from 'react-router-dom'; 
import EventCards from '../components/EventCards';

// class User extends Component {//get all post from user





//     render(){
//         return (
//             <h1>User Page</h1>
//         );
//     }
// }
// export default User;

function User(){

    let {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchEvents = async() => {
            setIsLoading(true);
            const result = await axios.get(`http://localhost:1337/posts/searchPostsBasedOn/?type="owner_id"&value=${id}`)
            setEvents(result.data.posts);
            setIsLoading(false);
        }
        fetchEvents();
    }, [])

    const cardify = (events) => {
        return events.map((event) => {
            return <EventCards event={event} isLogin={true}/>;
        })
    }

    return (
        <div>
            <h1>User Details</h1>
            <div>
                {isLoading ? (<div><p>Events loadings</p></div>) :(<div>{cardify(events)}</div>)}
            </div>
        </div>
    );
}

export default User;