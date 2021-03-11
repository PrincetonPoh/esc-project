import React, { Component } from 'react'; 
import './Popup.css'; 
import cross_icon from './cross_icon.png';

class SigninPopup extends Component {
  warning = {
    creds: false,
    password: false
  };

  handleClick = () => {
    this.props.toggle(); 
  };

  handleSignin = () => {
    var signin_creds = document.forms["signin-form"]["signin-creds"].value;
    var signin_password = document.forms["signin-form"]["signin-password"].value;
    var valid_entries = true; 
    if (signin_creds=="") {
      this.warning.creds = true;
      alert("Please fill in the required fields to sign in.");
      valid_entries = false; 
    }
    else if (signin_password=="") {
      this.warning.password = true;
      alert("Please fill in the required fields to sign in.");
      valid_entries = false; 
    }
    if (valid_entries) {
      var signin_auth_success = true; // add auth here maybe 
      if (signin_auth_success) {
        this.props.signin();
      } else { 
        alert("auth failed!"); 
      }   
    };
  };

  // handleSubmit(event) {
  //   alert("submited: "+this.state.value);
  //   event.preventDefault();
  // }

  render() {
    return ( 
      <div>
        <div id="signinpopup-background" onClick={this.handleClick}> </div>
        <div id="signin-popup" class="dropshadow">
          <img id="popup-cross-icon" src={cross_icon} onClick={this.handleClick} class="navbar-icons dropshadow"/>
          <p> Sign in to Scratchbac </p>
          <form id="signin-form" name="signin-form"> 
            <p class="popup-contents"> Username / Email / Mobile Number </p>
            <input type="text" id="signin-creds" name="creds" placeholder="Username" class="text-fields dropshadow"/>
            <div id="signin-creds-warning" class="warning"> {this.warning.creds ? <p> no empty pls </p> : null}  </div>
            <p class="popup-contents"> Password <a href="#" id="forgot-password"> Forgot Password? </a></p>
            <input type="text" id="signin-password" name="password" placeholder="Password" class="text-fields dropshadow"/>
            {/* <input type="submit" value="Sign in" /> */}
          </form>
          {/* <form onSubmit={this.handleSubmit}> 
            <label> 
              Username / Email / Mobile Number
              <input type="text" value={this.state.value}/> 
            </label>
            <input type="submit" value="Sign in" />
          </form> */}
          <button id="signin-popup-button" onClick={this.handleSignin} class="navbar-buttons dropshadow"> Sign in </button>
        </div>
      </div>
    )
  }
}

export default SigninPopup; 