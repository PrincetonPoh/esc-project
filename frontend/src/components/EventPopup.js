import React, { useState } from 'react';
import axios from 'axios';

function EventPopup(eventId) {//Need change to class for instance property

    let event = {};

    const getEventDetails = (id) => {
        axios.get("http://localhost:1337/posts/displayPostsDetails/?post_id=" + id)
            .then((response) => {
                event = response;
                //event.push(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h1>Testing</h1>
            <h2>Event Details</h2>
            <p>Title: {event.postTitle}</p>
            <p>Event Date: {event.dateOfCreation}</p>
            <p>Location: {event.postalCode}</p>
            <p>Description: {event.description}</p>
        </div>

    )
}

export default EventPopup;
