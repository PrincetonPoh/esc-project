import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';

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
            formWarning: null
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

    handleSubmit = (e) => {
        e.preventDefault(); //Disable refresh/relaod 
        var firstNameValid = this.checkValidity("firstName");
        var lastNameValid = this.checkValidity("lastName");
        var usernameValid = this.checkValidity("username");
        var hpValid = this.checkValidity("hp");
        var emailValid = this.checkValidity("email");
        var passwordValid = this.checkValidity("password");
        var confirmPasswordValid = this.checkValidity("confirmPassword");
        if (firstNameValid && lastNameValid && usernameValid && hpValid && emailValid && passwordValid && confirmPasswordValid) {
            if (this.state.password != this.state.confirmPassword) { // all fields filled, check if passwords match
                this.setState({
                    confirmPasswordWarning: <p class="inputWarning"> The passwords you entered do not match! </p>
                });
            } else { // all fields filled, passwords match
                this.setState({ 
                    confirmPasswordWarning: null
                });
                const data = {
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    username: this.state.username,
                    hp: this.state.hp,
                    email: this.state.email,
                    password: this.state.password,
                    // confirm_password: this.state.confirmPassword // already checked if passwords match before triggering this
                };
                console.log(data);
                axios.post("http://localhost:1337/auth/createUser", {
                    "user_id": Math.floor(Math.random() * 1000),
                    "phoneNumber": data.hp,
                    "userName": data.username,
                    "emailAddress": data.email,
                    "password": data.password
                }).then((response) =>{
                    this.setState({signupSuccess: true});
                    alert("Successfully Signup!")
                 }).catch(error => alert("Error."))
                // this.props.history.push('/');//Force push
            }
        } else { // at least one field empty 
            this.setState({
                formWarning: <p class="formWarning form-item"> Please fill in the required fields to sign in! </p>
              });
        }
        
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
                    
                    {this.state.formWarning}
                    <input id="signup-form-button" type="submit" value="Create Account"/>
                </form>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div style={{width: "30%", padding: "30px 0px"}}>
    //             <form onSubmit={this.handleSubmit}>
    //                 <h3>Sign up</h3>
    //                 <div controlId="formPlaintextEmail"  className="text-left">
    //                     <label style={{padding:"0px 15px"}}>
    //                         First Name
    //                     </label>

    //                         <input type="firstName" placeholder="First Name" onChange={e => this.firstName = e.target.value} />

    //                 </div>
    //                 <div controlId="formGroupLastName" className="text-left">
    //                     <label style={{padding:"0px 15px"}}>
    //                         Last Name
    //                     </label>

    //                         <input type="lastName" placeholder="Last Name" onChange={e => this.lastName = e.target.value} />

    //                 </div>
    //                 <div controlId="formGroupEmail" className="text-left">
    //                     <label style={{padding:"0px 15px"}}>
    //                         Email
    //                     </label>

    //                         <input type="email" placeholder="Email" onChange={e => this.email = e.target.value} />

    //                 </div>
    //                 <div controlId="formGroupPassword" className="text-left">
    //                     <label style={{padding:"0px 15px"}}>
    //                         Password
    //                     </label>

    //                         <input type="password" placeholder="Password" onChange={e => this.password = e.target.value} />

    //                 </div>
    //                 <div controlId="formGroupConfirmPassword" className="text-left">
    //                     <label style={{padding:"0px 15px"}}>
    //                         Confirm Password
    //                     </label>

    //                         <input type="confirmPassword" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value} />

    //                 </div>
    //                 <input variant="primary" type="submit">Sign up</input>
    //             </form>
    //         </div>
    //     );
    // }
}
export default Signup;
