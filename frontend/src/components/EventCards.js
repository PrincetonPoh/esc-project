import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import '../styles/modal.css'
import EventPopup from './EventPopup';
import Modal from './modal'
import { Link, useHistory } from 'react-router-dom';
import calendar_icon from '../media/calendar_icon.png';
import location_icon from '../media/location_icon.png';
import trash_icon from '../media/trash_icon.png';
import attendance_icon from '../media/attendance_icon.png';
import attendance from '../media/attendance.png';
import DeletePopup from '../components/DeletePopup';
import AttendancePopup from '../components/AttendancePopup';

class EventCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delPopUp: false,
            postDetails: "/post/" + this.props.event.post_id,
            post_id: this.props.event.post_id,
            attendees: [],
            attendancePopUp: false
        }
        this.childCard = this.childCard.bind(this);
        this.checkLoggedIn = this.checkLoggedIn.bind(this);
    }

    getAttendeeNo = () => {
        axios.get(`http://localhost:1337/posts/displayAttendUserListsOfThePost?post_id=${this.state.post_id}`)
        .then(response => {this.setState({attendees: response.data.users})})
        .catch(error => console.log("Cannot fetch attendance"));
    }

    componentDidMount = () => {
        this.getAttendeeNo();
    }


    timeConverter(time) {
        var a = new Date(time * 1000);
        var year = a.getFullYear();
        var month = a.getMonth();
        var date = a.getDate();
        var time = date + '-' + month + '-' + year;
        return time
    }

    toggleDelPopUp = () => {
        this.setState({
            delPopUp: !this.state.delPopUp
        });
    }

    toggleAttendancePopUp = () => {
        this.setState({
            attendancePopUp: !this.state.attendancePopUp
        });
    }

    childCard(postTitle, postalCode, dateOfPostEvent, attendeeNo) {
        return (
            <div class="customCardContainer">
                <h2 class="customCardTitle">{postTitle}</h2>
                <div> 
                    <img src={location_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Location:</span> {postalCode}</p>
                </div>
                <div>
                    <img src={calendar_icon} class="customCardIcon"/>
                    <p class="customCardDetails"> <span>Date:</span> {dateOfPostEvent}</p>
                </div>
                <div>
                    <img src={attendance} class="customCardIcon"/>
                    <p class="customCardDetails" id="attendanceNo"> <span>No. of attendees</span> {attendeeNo}</p>
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
            <div class="customCard" id={this.state.post_id} onClick={this.checkLoggedIn}>
                {this.props.enableDelete ? <img src={trash_icon} class="customCardDeleteIcon customCardTopRightIcon" onClick={this.toggleDelPopUp}/> : null}
                {this.props.enableDelete ? <img src={attendance_icon} class="customCardTopRightIcon" id="checkAttendance" onClick={this.toggleAttendancePopUp}/> : null}
                {this.props.isLogin ? (
                    <Link to={this.state.postDetails}>
                        {this.childCard(this.props.event.postTitle, this.props.event.postalCode, this.props.event.dateOfPostEvent, this.state.attendees.length)}
                    </Link>) :
                    (<div>
                        {this.childCard(this.props.event.postTitle, this.props.event.postalCode, this.props.event.dateOfPostEvent, this.state.attendees.length)}
                    </div>)}
                {this.state.delPopUp ?  <DeletePopup toggle={this.toggleDelPopUp} event={this.props.event} config={this.props.config}/>  : null } 
                {this.state.attendancePopUp ? <AttendancePopup toggle={this.toggleAttendancePopUp} attendees={this.state.attendees}/> : null }
            </div >
        )
    }
}
export default EventCards
