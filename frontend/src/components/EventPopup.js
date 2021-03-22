import React, { useState } from 'react';
import axios from 'axios';

// function EventPopup(eventId) {//Need change to class for instance property

//     const event = [];

//     const getEventDetails = (id) => {
//         axios.get('api get id' + { id })
//             .then((response) => {
//                 console.log(response);
//                 //event.push(response.data)
//             }).catch(error => {
//                 console.log(error);
//             })
//     }

//     return (
//         <div>
//             <h1>Testing</h1>
//             <h2>Event Details</h2>
//             <p>All the event details should be here</p>
//             <p>{eventId}</p>
//         </div>

//     )
// }

// export default EventPopup;

class EventPopup extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <div>
                <h1>Testing</h1>
                <h2>Event Details</h2>
                <p>All the event details should be here</p>
                <p>{this.props.eventId}</p>
            </div>
        )
    }
}
export default EventPopup