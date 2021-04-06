import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import ReCAPTCHA from 'react-google-recaptcha'; // npm install --save react-google-recaptcha 

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            username: '',
            hp: '',
            email: '',
            password: '',
            confirmPassword: '',
            signupSuccess: false,
            
            firstNameWarning: null,
            lastNameWarning: null,
            usernameWarning: null,
            hpWarning: null,
            emailWarning: null,
            passwordWarning: null,
            confirmPasswordWarning: null,
            formWarning: null,

            captchaSuccess: false,
            captchaWarning: null
        };
    }

    handleChange = (event) => {
        const target = event.target; 
        const value = target.value; 
        const name = target.name; 
        this.setState({
            [name]: value
        });
        // this[name] = value;
        console.log("firstName: "+this.state.firstName+"\nlastName: "+this.state.lastName+"\nfirstNameWarning: "+this.state.firstNameWarning+"\nlastNameWarning: "+this.state.lastNameWarning);
        if (value == '') {
          this.setState({
            [name+"Warning"]: <p class="inputWarning"> This field is required! </p>
          });
        } else {
          this.setState({
            [name+"Warning"]: null,
            formWarning: null
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

    handleSubmit = (e) => {
        e.preventDefault(); //Disable refresh/reload 
        var firstNameValid = this.checkValidity("firstName");
        var lastNameValid = this.checkValidity("lastName");
        var usernameValid = this.checkValidity("username");
        var hpValid = this.checkValidity("hp");
        var emailValid = this.checkValidity("email");
        var passwordValid = this.checkValidity("password");
        var confirmPasswordValid = this.checkValidity("confirmPassword");
        if (firstNameValid && lastNameValid && usernameValid && hpValid && emailValid && passwordValid && confirmPasswordValid) { // check all fields valid
            if (this.state.password == this.state.confirmPassword) { // all fields filled, check if passwords match
                this.setState({ 
                    confirmPasswordWarning: null
                });
                if (this.state.captchaSuccess == true) { // all is good, post to backend
                    const data = {
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        username: this.state.username,
                        hp: this.state.hp,
                        email: this.state.email,
                        password: this.state.password,
                    };
                    console.log(data);
                    axios.post("http://localhost:1337/auth/createUser", {
                        "user_id": Math.floor(Math.random() * 1000),
                        "phoneNumber": data.hp,
                        "userName": data.username,
                        "emailAddress": data.email,
                        "password": data.password
                    }).then((response) => alert("Sign-up successful.")).catch(error => alert("Error."))
                    // this.props.history.push('/');//Force push
                } else { // captcha not successful
                    this.setState({
                        captchaWarning: <p class="formWarning form-item"> Please pass the ReCAPTCHA to sign in! </p>
                    });
                }
            } else { // all fields filled, passwords do not match
                this.setState({
                    confirmPasswordWarning: <p class="inputWarning"> The passwords you entered do not match! </p>
                });
            }
        } else { // at least one field empty 
            this.setState({
                formWarning: <p class="formWarning form-item"> Please fill in the required fields to sign in! </p>
            });
        }   
    }

    onRecaptcha = (value) => {
        console.log("Captcha value: ", value); 
        if (value == null) {
            this.setState({
                captchaSuccess: false,
                captchaWarning: <p class="formWarning form-item"> Please pass the ReCAPTCHA to sign in! </p>
            });
        } else {
            this.setState({
                captchaSuccess: true,
                captchaWarning: null
            });
        }
        console.log("captchaSuccess: ", this.state.captchaSuccess); 
    } 

    render() {
        return (
            <div>
                {this.state.signupSuccess ? <Redirect to="/"/>: null} 
                <h1>Sign up</h1>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <div id="formPlaintextEmail" class="form-item">
                        <label>
                            First Name
                        </label>
                        <input type="firstName" name="firstName" class="signup-form-input" onChange={this.handleChange} />
                        {this.state.firstNameWarning}
                    </div>
                    <div id="formGroupLastName" class="form-item">
                        <label>
                            Last Name
                        </label>
                        <input type="lastName" name="lastName" class="signup-form-input" onChange={this.handleChange} />
                        {this.state.lastNameWarning}
                    </div>
                    <div id="formGroupUserName" class="form-item">
                        <label>
                            Username
                        </label>
                        <input type="username" name="username" class="signup-form-input" onChange={this.handleChange}/>
                        {this.state.usernameWarning}
                    </div>
                    <div id="formGroupHP" class="form-item">
                        <label>
                            Mobile Number
                        </label>
                        <input type="tel" name="hp" class="signup-form-input" onChange={this.handleChange}/>
                        {this.state.hpWarning}
                    </div>
                    <div id="formGroupEmail" class="form-item">
                        <label>
                            Email
                        </label>
                        <input type="email" name="email" class="signup-form-input" onChange={this.handleChange}/>
                        {this.state.emailWarning}
                    </div>
                    <div id="formGroupPassword" class="form-item">
                        <label>
                            Password
                        </label>
                        <input type="password" name="password" class="signup-form-input" onChange={this.handleChange}/>
                        {this.state.passwordWarning}
                    </div>
                    <div id="formGroupConfirmPassword" class="form-item">
                        <label>
                            Confirm Password
                        </label>
                        <input type="password" name="confirmPassword" class="signup-form-input" onChange={this.handleChange}/>
                        {this.state.confirmPasswordWarning}
                    </div>
                    
                    <div>
                    {this.state.formWarning}
                    <ReCAPTCHA id="captcha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" secretkey="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe" onChange={this.onRecaptcha} onExpired={this.onRecaptcha} badge="inline"/>
                    {this.state.captchaWarning}
                    </div>
                    <input id="signup-form-button" type="submit" value="Create Account"/>
                </form>
            </div>
        );
    }
}
export default Signup;
