import React from 'react';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'
import {Link} from 'react-router-dom';


// function EventsCards(event, popup, togglePopup) {//Need covert to class for instance property

//     return (
//         <div class="customCard" onClick={togglePopup}>
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
            postDetails: "/post/" + this.props.event.id
        }

        //Bind for this
        this.handlePopup = this.handlePopup.bind(this);
    }

    handlePopup() {
        this.setState(state => ({
            popup: !this.state.popup
        }));
    }

    render() {
        return (
            <div class="customCard" onClick={this.handlePopup} ><Link to={this.state.postDetails}>
                <h2 class="customCardTitle">{this.props.event.title}</h2>
                {/* <p class="customCardDescription">{this.props.event.description}</p> */}
                <h3 class="customCardDescription">{this.props.event.location}</h3>
                <div>
                    {/* {<Modal
                        show={this.state.popup}
                        customClass="custom_modal_class"
                    >
                        <EventPopup eventId={this.props.event.id} />
                    </Modal>
                    } */}
                </div>
            </Link>
            </div >
        )
    }
}
export default EventCards