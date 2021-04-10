import React, { useState } from 'react';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'
import { Link, useHistory } from 'react-router-dom';
import calendar_icon from '../media/calendar_icon.png';
import location_icon from '../media/location_icon.png';
import trash_icon from '../media/trash_icon.png';
import DeletePopup from '../components/DeletePopup';

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

    togglePopup = () => {
        this.setState({
            popup: !this.state.popup
        });
    }

    childCard(postTitle, postalCode, dateOfCreation) {
        return (
            <div class="customCardContainer">
                <h2 class="customCardTitle">{postTitle}</h2>
                <div> 
                    <img src={location_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Location:</span> {postalCode}</p>
                </div>
                <div>
                    <img src={calendar_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Date:</span> {this.timeConverter(dateOfCreation)}</p>
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
                {this.props.enableDelete ? <img src={trash_icon} class="customCardDeleteIcon" idToDelete={this.props.event.post_id} onClick={this.togglePopup}/> : null}
                {this.props.isLogin ? (
                    <Link to={this.state.postDetails}>
                        {this.childCard(this.props.event.postTitle, this.props.event.postalCode, this.props.event.dateOfCreation)}
                    </Link>) :
                    (<div>
                        {this.childCard(this.props.event.postTitle, this.props.event.postalCode, this.props.event.dateOfCreation)}
                    </div>)}
                {this.state.popup ?  <DeletePopup toggle={this.togglePopup} />  : null } 
            </div >
        )
    }
}
export default EventCards