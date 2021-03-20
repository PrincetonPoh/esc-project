import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
            <Container style={{width: "30%", padding: "30px 0px"}}>
                <Form onSubmit={this.handleSubmit}>
                    <h3>Sign up</h3>
                    <Form.Group controlId="formPlaintextEmail"  className="text-left">
                        <Form.Label style={{padding:"0px 15px"}}>
                            First Name
                        </Form.Label>
                        <Col>
                            <Form.Control type="firstName" placeholder="First Name" onChange={e => this.firstName = e.target.value} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formGroupLastName" className="text-left">
                        <Form.Label style={{padding:"0px 15px"}}>
                            Last Name
                        </Form.Label>
                        <Col>
                            <Form.Control type="lastName" placeholder="Last Name" onChange={e => this.lastName = e.target.value} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail" className="text-left">
                        <Form.Label style={{padding:"0px 15px"}}>
                            Email
                        </Form.Label>
                        <Col>
                            <Form.Control type="email" placeholder="Email" onChange={e => this.email = e.target.value} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword" className="text-left">
                        <Form.Label style={{padding:"0px 15px"}}>
                            Password
                        </Form.Label>
                        <Col>
                            <Form.Control type="password" placeholder="Password" onChange={e => this.password = e.target.value} />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formGroupConfirmPassword" className="text-left">
                        <Form.Label style={{padding:"0px 15px"}}>
                            Confirm Password
                        </Form.Label>
                        <Col>
                            <Form.Control type="confirmPassword" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign up</Button>
                </Form>
            </Container>
        );
    }
}
export default Signup;