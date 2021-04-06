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
      user: {},
      config: {}
    }
  }

  componentDidMount(){
    this.checkAccessToken();
  }

  togglePopup = () => {
    this.setState({
      seen: !this.state.seen
    });
  }

  getUserAPI = async(e) => {
    console.log("Get User API At APP: ")
    console.log(e);
    localStorage.setItem("accessToken", e.accessToken);
    localStorage.setItem("user", e.userName)
    this.setState({config: {headers: {'Authorization': `Bearer ` + e.accessToken}}})
    const result = await axios.get(`http://localhost:1337/users/getUserByUserName?userName=${e.userName}`, this.state.config);
    console.log(result.data.user[0]);
    return result.data.user[0];
  }

  checkAccessToken = async() => {
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("user")
    if (accessToken){
      try{
        let tempToken = {headers: {'Authorization': `Bearer ` + accessToken}};
        this.setState({config: {headers: {'Authorization': `Bearer ` + accessToken}}})
        const result = await axios.get(`http://localhost:1337/users/getUserByUserName?userName=${userName}`, tempToken)
        if(result.data.message == "Auth failed"){
          throw new Error("Auth failed");
        }
        this.setState({user: result.data.user[0], login: true})
        console.log(result);
        console.log("Session ongoing");
      }catch(err){
        console.log(err);
        this.setState({config: {}})
        alert("You been logged out");
      }
    }else{
      console.log("User not logged in");
    }
  }

  toggleLogin = async (e) => {
    const user = await this.getUserAPI(e);
    this.setState({
      login: true,
      user: user
    })
  }

  toggleLogout = (e) => {
    this.setState({
      login: false,
      user: {}
    })
    localStorage.clear();
  }

  resetState = () => {
    this.toggleLogin();
    this.togglePopup();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar toggleLogin={this.toggleLogin.bind(this)} user={this.state.user} login={this.state.login} toggleLogout={this.toggleLogout.bind(this)}/>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route path="/user/:id" >
              <User user={this.state.user} config={this.state.config}></User>
            </Route>
            <Route path="/createpost">
              <CreatePost user={this.state.user} config={this.state.config}/>
            </Route>
            <Route path="/post/:id" component={Post}/>
            <Route eaxct path="/">
            <Home loginState={this.state.login} user={this.state.user}/>  
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
