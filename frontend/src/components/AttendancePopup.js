import React, { Component } from 'react';
import '../styles/Popup.css';
import cross_icon from '../media/cross_icon.png';
import axios from 'axios';

class AttendancePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  handleClick = () => {
    this.props.toggle();
  };

  showAttendance = () => {
    let list = this.props.attendees.map((attendees) => {
        return <li>{attendees.userName}</li>
    });
    console.log(list);
    if (list.length == 0) {
        return <li id="none">No attendees yet!</li>
    }
    else {
        return list;
    }
  }

  render() {
    return (
      <div id="popup-container">
        <div id="popup-background" onClick={this.handleClick}> </div>
        <div id="popup" class="dropshadow">
          <img id="popup-cross-icon" src={cross_icon} onClick={this.handleClick} class="navbar-icons dropshadow" />
          <h2> Attendance List: </h2>
          <br />
          {this.showAttendance()}
        </div>
      </div>
    )
  }
}

export default AttendancePopup;
