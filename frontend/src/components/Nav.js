import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from "react-router-dom";

class Navbar_custom extends Component {

    toUser = () => {
        this.props.toggleLogin();
    }

    render() {
        return (
            <Navbar style={{ backgroundColor: "#7BA3D7" }} className="container-fluid">
                <Navbar.Brand className="dropshadow">{/*Add images*/}
                    Scratchbac
                    </Navbar.Brand>
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
                {this.props.login ? (<>
                    <Button style={{ marginRight: "7px", border: "white solid 3px", filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))" }}>User Details</Button>
                    <Button onClick={this.props.resetState} >Logout</Button></>) :
                    (<><Button variant="outline-light" href="signup" style={{ marginRight: "7px", border: "white solid 3px", filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))" }}>Signup</Button>
                        <Button className="ml-xs" style={{ filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))" }} onClick={this.props.togglePopup}>Signin</Button>
                        <Modal show={this.props.seen} onHide={this.props.togglePopup}>
                            <Modal.Header closeButton>
                                <Modal.Title>Login Box</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Login Authentication</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary"  onClick={this.toUser}>
                                    Login
                                </Button>
                            </Modal.Footer>
                        </Modal></>)}
            </Navbar>
        );
    }
}
export default Navbar_custom;