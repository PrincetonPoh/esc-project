import React, { useState } from 'react';
import axios from 'axios';

function EventPopup(eventId) {

    const event = [];

    const getEventDetails = (id) => {
        axios.get('api get id' + { id })
            .then((response) => {
                console.log(response);
                //event.push(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>Testing</h1>
            <h2>Event Details</h2>
            <p>All the event details should be here</p>
        </div>

    )
}

export default EventPopup;