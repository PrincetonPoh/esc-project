import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../styles/Signup.css';

class Signup extends Component {

    handleSubmit = e => {
        e.preventDefault(); //Disable refresh/relaod
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            hp: this.hp,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword
        };
        console.log(data);
        axios.post("http://localhost:1337/users/createUser", {
            "user_id": Math.floor(Math.random() * 1000),
            "phoneNumber": data.hp,
            "userName": data.username,
            "emailAddress": data.email,
            "password": data.password
        }).then((response) => alert("Sign-up successful.")).catch(error => alert("Error."))
        this.props.history.push('/');//Force push
    }

    render() {
        return (
            <div> 
                <h1>Sign up</h1>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <div id="formPlaintextEmail" class="form-item">
                        <label >
                            First Name
                        </label>
                        <input type="firstName" class="signup-form-input" onChange={e => this.firstName = e.target.value} />
                    </div>
                    <div id="formGroupLastName" class="form-item">
                        <label >
                            Last Name
                        </label>
                        <input type="lastName" class="signup-form-input" onChange={e => this.lastName = e.target.value} />
                    </div>
                    <div id="formGroupUserName" class="form-item">
                        <label>
                            Username
                        </label>
                        <input class="signup-form-input" onChange={e => this.username = e.target.value}/>
                    </div>
                    <div id="formGroupHP" class="form-item">
                        <label>
                            Mobile Number
                        </label>
                        <input type="tel" class="signup-form-input" onChange={e => this.hp = e.target.value}/>
                    </div>
                    <div id="formGroupEmail" class="form-item">
                        <label >
                            Email
                        </label>
                        <input type="email" class="signup-form-input" onChange={e => this.email = e.target.value} />
                    </div>
                    <div id="formGroupPassword" class="form-item">
                        <label >
                            Password
                        </label>
                        <input type="password" class="signup-form-input" onChange={e => this.password = e.target.value} />
                    </div>
                    <div id="formGroupConfirmPassword" class="form-item">
                        <label >
                            Confirm Password
                        </label>
                        <input type="password" class="signup-form-input" onChange={e => this.confirmPassword = e.target.value} />
                    </div>
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
