import React, { useState } from 'react';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'
import { Link, useHistory } from 'react-router-dom';


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

    childCard(postTitle, description, postalCode) {
        return (
            <div>
                <h2 class="customCardTitle">{postTitle}</h2>
                <h3 class="customCardDescription">{description}</h3>
                <h3 class="customCardDescription">{postalCode}</h3>
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
        if(!this.props.isLogin){
            alert("Please login to see the details");
        }
    }

    render() {
        return (
            <div class="customCard" onClick={this.checkLoggedIn}>
                {this.props.isLogin ? (
                    <Link to={this.state.postDetails}>
                        {this.childCard(this.props.event.postTitle, this.props.event.description, this.props.event.postalCode)}
                    </Link>) :
                    (<div>
                        {this.childCard(this.props.event.postTitle, this.props.event.description, this.props.event.postalCode)}
                    </div>)}
            </div >
        )
    }
}
export default EventCards