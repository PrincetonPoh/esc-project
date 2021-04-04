import React, { useState } from 'react';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'
import { Link, useHistory } from 'react-router-dom';
import calendar_icon from '../media/calendar_icon.png';
import location_icon from '../media/location_icon.png';


// function EventsCards(event) {//Need covert to class for instance property

//     const redirectString = '/post/' +e  vent.id
//     const redirect = false;

//     const handleRedirect = () => {
//         redirect = !redirect;
//     }

//     return (
//         <div class="customCard" onClick={handleRedirect()}>{
//             redirect ? <Redirect to=""
//         }
//             <h2 class="customCardTitle">{event.title}</h2>
//             <p class="customCardDescription">{event.description}</p>
//             <div>{<Modal
//                 show={popup}
//                 customClass="custom_modal_class"
//             >{EventPopup(event.id)}</Modal>}</div>
//         </div>
//     )
// }

// export default EventsCards;

class EventCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            postDetails: "/post/" + this.props.event.post_id
        }
        this.childCard = this.childCard.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    timeConverter(time) {
        var a = new Date(time * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var time = date + '-' + month + '-' + year;
        return time
    }

    childCard(postTitle, description, postalCode, dateOfCreation) {
        return (
            <div class="customCardContainer">
                <h2 class="customCardTitle">{postTitle}</h2>
                {/* <h3 class="customCardDescription">{description}</h3> */} {/* removing this cuz I think its too lengthy and defeats the purpose of logging in if can see details */}
                
                <div> 
                    <img src={location_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Location:</span> {postalCode}</p>
                </div>
                <div>
                    <img src={calendar_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Date:</span> {this.timeConverter(dateOfCreation)}</p>
                </div>
                
                <div>
                    {/* {<Modal
                    show={this.state.popup}
                    customClass="custom_modal_class"
                >
                    <EventPopup eventId={this.props.event.id} />
                </Modal>
                } */}
                </div>
            </div>
        );
    }

    checkLoggedIn() {
        if (!this.props.isLogin) {
            alert("Please login to see the details");
        }
    }

    render() {
        return (
            <div class="customCard" onClick={this.checkLoggedIn}>
                {this.props.isLogin ? (
                    <Link to={this.state.postDetails}>
                        {this.childCard(this.props.event.postTitle, this.props.event.description, this.props.event.postalCode, this.props.event.dateOfCreation)}
                    </Link>) :
                    (<div>
                        {this.childCard(this.props.event.postTitle, this.props.event.description, this.props.event.postalCode, this.props.event.dateOfCreation)}
                    </div>)}
            </div >
        )
    }
}
export default EventCards