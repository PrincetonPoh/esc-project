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

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      seen: false,
      login: false
    }
  }

  togglePopup = () => {
    this.setState({
      seen: !this.state.seen
    });
  }

  toggleLogin = () => {
    this.setState({
      login: !this.state.login
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
          <Navbar/>
          {/* <Navbar_custom seen={this.state.seen} login={this.state.login} toggleLogin={this.toggleLogin} togglePopup={this.togglePopup} resetState={this.resetState} {...this.props}/> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/user" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
