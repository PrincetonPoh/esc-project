import React, { Component } from 'react';
import '../styles/Popup.css';
import cross_icon from '../media/cross_icon.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SigninPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creds: '',
      password: '',
      credsWarning: null,
      passwordWarning: null,
      formWarning: null,
      token: '',
      errorMessage: ''
      // captchaSuccess: false,
      // captchaWarning: null
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
    // console.log("creds: "+this.state.creds+"\npassword: "+this.state.password+"\ncredsWarning: "+this.state.credsWarning);
    if (value == '') {
      this.setState({
        [name + "Warning"]: <p class="inputWarning"> This field is required! </p>
      });
    } else {
      this.setState({
        [name + "Warning"]: null,
        formWarning: null
      });
    }
  }

  checkValidity = (name) => { // can check for other illegal input here too
    if (this.state[name] == '') {
      this.setState({
        [name + "Warning"]: <p class="inputWarning"> This field is required! </p>
      });
      return false;
    } else {
      return true;
    }
  }

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

  checkAuth = (username, password) => {
    let body = { username: username, password: password };
    const result = axios.post('http://localhost:1337/auth/login', body)
    console.log(result.data);
  }

  handleSignin = async (e) => {
    e.preventDefault();
    var credsValid = this.checkValidity("creds");
    var passwordValid = this.checkValidity("password");
    if (credsValid && passwordValid) { // first check validity of fields
      var checkEmailVeri = await axios.get(`http://localhost:1337/auth/checkVerifiedUser?userName=${this.state.creds}`);
      console.log(checkEmailVeri)
      console.log(checkEmailVeri.data.message)
      if (checkEmailVeri.data.message.length > 0 && checkEmailVeri.data.message[0].verificationStatus == "true") {
        var signin_auth_success = await this.postLogin(); // add auth here maybe 
        if (signin_auth_success) {
          this.props.signin(this.state.token);
        } else {
          const { history: { push } } = this.props;
          // alert(this.state.errorMessage);
          push('/');
        }
      }else{
        alert("Please verify your email first before logging in");
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
      <div id="popup-container">
        <div id="popup-background" onClick={this.handleClick}> </div>
        <div id="popup" class="dropshadow">
          <img id="popup-cross-icon" src={cross_icon} onClick={this.handleClick} class="navbar-icons dropshadow" />
          <h2> Sign in to Scratchbac </h2>
          <form id="signin-form" name="signin-form" onSubmit={this.handleSignin}>
            <label class="popup-contents"> Username </label>
            <input type="username" id="signin-creds" name="creds" onChange={this.handleChange} class="text-fields dropshadow" />

            {this.state.credsWarning}

            <label class="popup-contents"> Password </label>
            <a href="#" id="forgot-password"> Forgot Password? </a>
            <input type="password" id="signin-password" name="password" onChange={this.handleChange} class="text-fields dropshadow" />
            {this.state.passwordWarning}

            {this.state.formWarning}
            <input id="popup-button" value="Sign in" class="dropshadow" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SigninPopup);
