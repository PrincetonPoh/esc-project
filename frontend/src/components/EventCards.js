import React, { useState } from 'react';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'


function EventsCards(event, popup, togglePopup) {

    return (
        <div class="customCard" onClick={togglePopup}>
            <h2 class="customCardTitle">{event.title}</h2>
            <p class="customCardDescription">{event.description}</p>
            <div>{<Modal
                show={popup}
                customClass="custom_modal_class"
            >{EventPopup(event.id)}</Modal>}</div>
        </div>
    )
}

export default EventsCards;