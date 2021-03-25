//import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
//import { Link } from './react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import User from './pages/User';
import Signup from './pages/Signup';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      seen: false,
      login: false,
      user: {}
    }
  }

  togglePopup = () => {
    this.setState({
      seen: !this.state.seen
    });
  }

  getUserAPI = async(e) => {
    console.log("Get User API At APP: ")
    console.log(e);
    const result = await axios.get(`http://localhost:1337/users/getUserByUserName?userName=${e}`);
    console.log(result.data.user[0]);
    return result.data.user[0];
  }

  toggleLogin = async (e) => {
    const user = await this.getUserAPI(e);
    this.setState({
      login: !this.state.login,
      user: user
    })
  }

  resetState = () => {
    this.toggleLogin();
    this.togglePopup();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar toggleLogin={this.toggleLogin.bind(this)} user={this.state.user}/>
          <Switch>
            <Route exact path="/">
            <Home loginState={this.state.login} user={this.state.user}/>  
            </Route>
            <Route exact path="/signup" component={Signup} />
            <Route path="/user/:id" >
              <User user={this.state.user}></User>
            </Route>
            <Route path="/createpost">
              <CreatePost user={this.state.user}/>
            </Route>
            <Route path="/post/:id" component={Post}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
