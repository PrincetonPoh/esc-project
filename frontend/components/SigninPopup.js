import React, { Component } from 'react'; 
import '../styles/Popup.css'; 
import cross_icon from '../media/cross_icon.png';

class SigninPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      creds: '',
      password: '',
      credsWarning: null,
      passwordWarning: null,
      formWarning: null
    };
  }

  handleClick = () => {
    this.props.toggle(); 
  };

  handleChange = (event) => {
    const target = event.target; 
    const value = target.value; 
    const name = target.name; 
    this.setState({
        [name]: value
    });
    console.log("creds: "+this.state.creds+"\npassword: "+this.state.password+"\ncredsWarning: "+this.state.credsWarning);
    if (value == '') {
      this.setState({
        [name+"Warning"]: <p class="inputWarning"> This field is required! </p>
      });
    } else {
      this.setState({
        [name+"Warning"]: null
      });
    }
  }

  checkValidity = (name) => { // can check for other illegal input here too
    if (this.state[name]=='') {
      this.setState({
        [name+"Warning"]: <p class="inputWarning"> This field is required! </p>
      });
      return false;
    } else {
      return true;
    }
  }

  handleSignin = (e) => {
    var credsValid = this.checkValidity("creds");
    var passwordValid = this.checkValidity("password");
    if (credsValid && passwordValid) {
      var signin_auth_success = true; // add auth here maybe 
      if (signin_auth_success) {
        this.props.signin();
      } else { 
        alert("auth failed!"); 
      }   
    } else {
      this.setState({
        formWarning: <p class="formWarning"> Please fill in the required fields to sign in! </p>
      });
    }
    e.preventDefault();
  };

  render() {
    
    return ( 
      <div>
        <div id="signinpopup-background" onClick={this.handleClick}> </div>
        <div id="signin-popup" class="dropshadow">
          <img id="popup-cross-icon" src={cross_icon} onClick={this.handleClick} class="navbar-icons dropshadow"/>
          <h2> Sign in to Scratchbac </h2>

          <form id="signin-form" name="signin-form" onSubmit={this.handleSignin}> 
            <label class="popup-contents"> Username / Email / Mobile Number </label>
            <input type="text" id="signin-creds" name="creds" onChange={this.handleChange} class="text-fields dropshadow"/>
            {this.state.credsWarning}
            
            <label class="popup-contents"> Password </label>
            <a href="#" id="forgot-password"> Forgot Password? </a> 
            <input type="text" id="signin-password" name="password" onChange={this.handleChange} class="text-fields dropshadow"/>
            {this.state.passwordWarning}

            {this.state.formWarning}
            <input id="signin-popup-button" type="submit" value="Sign in"  class="dropshadow"/>
          </form>
 
        </div>
      </div>
    )
  }
}

export default SigninPopup; 