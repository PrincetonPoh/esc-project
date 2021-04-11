import React, { Component } from 'react';
import '../styles/Popup.css';
import cross_icon from '../media/cross_icon.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class DeletePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      errorMessage: ''
    };
  }

  handleClick = () => {
    this.props.toggle();
  };

  postLogin = async () => {
    try {
      const result = await axios.get(`http://localhost:1337/auth/login?userName=${this.state.creds}&password=${this.state.password}`)
      this.setState({ token: result.data });
      return true;
    } catch (err) {
      console.log(err);
      //this.setState({ errorMessage: err.response.data.message });
      this.setState({ formWarning: <p class="formWarning">{err.response.data.message}!</p> });
      return false;
    }
  }

  handleDelete = async (e) => {
    console.log("deleting post_id = "+this.props.event.post_id);
    try {
      const result = await axios.delete(`http://localhost:1337/posts/deletePost?post_id=${this.props.event.post_id}`, this.props.config);
      console.log(result);
      this.props.toggle();
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      <div id="popup-container">
        <div id="popup-background" onClick={this.handleClick}> </div>
        <div id="popup" class="dropshadow">
          <img id="popup-cross-icon" src={cross_icon} onClick={this.handleClick} class="navbar-icons dropshadow" />
          <h2> Delete this post? </h2>
          <p> This action cannot be undone. </p>
          <input id="popup-button" value="Delete" class="dropshadow" onClick={this.handleDelete} />
        </div>
      </div>
    )
  }
}

export default DeletePopup;