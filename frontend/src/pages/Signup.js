import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
class Signup extends Component {

    handleSubmit = e => {
        e.preventDefault(); //Disable refresh/relaod
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword
        };
        console.log(data);
        //Implement axios
        this.props.history.push('/');//Force push
    }

    render() {
        return (
            <div style={{width: "30%", padding: "30px 0px"}}>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign up</h3>
                    <div controlId="formPlaintextEmail"  className="text-left">
                        <label style={{padding:"0px 15px"}}>
                            First Name
                        </label>

                            <input type="firstName" placeholder="First Name" onChange={e => this.firstName = e.target.value} />

                    </div>
                    <div controlId="formGroupLastName" className="text-left">
                        <label style={{padding:"0px 15px"}}>
                            Last Name
                        </label>

                            <input type="lastName" placeholder="Last Name" onChange={e => this.lastName = e.target.value} />

                    </div>
                    <div controlId="formGroupEmail" className="text-left">
                        <label style={{padding:"0px 15px"}}>
                            Email
                        </label>

                            <input type="email" placeholder="Email" onChange={e => this.email = e.target.value} />

                    </div>
                    <div controlId="formGroupPassword" className="text-left">
                        <label style={{padding:"0px 15px"}}>
                            Password
                        </label>

                            <input type="password" placeholder="Password" onChange={e => this.password = e.target.value} />

                    </div>
                    <div controlId="formGroupConfirmPassword" className="text-left">
                        <label style={{padding:"0px 15px"}}>
                            Confirm Password
                        </label>

                            <input type="confirmPassword" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value} />

                    </div>
                    <input variant="primary" type="submit">Sign up</input>
                </form>
            </div>
        );
    }
}
export default Signup;