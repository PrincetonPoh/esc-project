import React, { Component } from 'react';
import '../styles/Popup.css';
import cross_icon from '../media/cross_icon.png';
import axios from 'axios';

class DeletePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  handleClick = () => {
    this.props.toggle();
  };

  handleDelete = async (e) => {
    console.log("deleting post_id = "+this.props.event.post_id);
    try {
      const result = await axios.delete(`http://localhost:1337/posts/deletePost?post_id=${this.props.event.post_id}`, this.props.config);
      console.log(result);
      if (result.data.success == true) {
        this.props.toggle();
        window.location.reload();
        this.setState({ errorMessage: "" });
        alert("Post deleted successfully!");
      } else {
        this.setState({ errorMessage: "An error occurred, please try again later." });
      }
    } catch (err) {
      this.setState({ errorMessage: "An error occurred, please try again later." });
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
          {this.state.errorMessage=="" ? null : <p class="formWarning">{this.state.errorMessage}</p>}
          <input id="popup-button" value="Delete" class="dropshadow" onClick={this.handleDelete} />
        </div>
      </div>
    )
  }
}

export default DeletePopup;