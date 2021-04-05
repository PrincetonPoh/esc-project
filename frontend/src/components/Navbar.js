import React from 'react';
import ReactDOM from 'react-dom';
import menu_icon from '../media/menu_icon.png';
import logo_rect from '../media/logo_rect.png';
import '../styles/Navbar.css';
import SigninPopup from './SigninPopup';
import Sidebar from './Sidebar';
import sample_pfp from '../media/sample_pfp.png';
import plus_icon from '../media/plus_icon.png';
import ProfileDropdown from './ProfileDropdown';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class Navbar extends React.Component {

  signup() {
    alert("go to sign up page"); // may use router or href instead of onClick

  }
  createPost() {
    alert("go to create post page"); // may use router or href instead of onClick
  }

  state = {
    seen: false,
    sidebar: false,
    signedin: false,
    profile_dropdown: false
  };

  toggleSignedin = () => {
    this.setState({
      signedin: !this.state.signedin
    });
  }

  setSignedin = (e) => {
    console.log(e);
    this.setState({
      signedin: true, // changes nevbar buttons to signed in ones
      seen: false // hides signinPopup
    });
    alert("signed in!")
    this.props.toggleLogin(e);
  }
  setSignedout = () => {
    this.setState({
      signedin: false, // changes nevbar buttons to signed in ones
      profile_dropdown: false
    });
    alert("signed out!")
    this.props.toggleLogin();
  }

  toggleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar
    });
  }

  togglePopup = () => {
    this.setState({
      seen: !this.state.seen
    });
  }

  toggleProfileDropdown = () => {
    this.setState({
      profile_dropdown: !this.state.profile_dropdown
    });
  }
  
  render() {
    return (
      <div className="Navbar">
        <div class="navbar"> 
          <img id="nav-menu-icon" src={menu_icon} onClick={this.toggleSidebar} class="navbar-icons"/>
          <Link to="/"><img id="nav-logo" src={logo_rect} class="navbar-icons dropshadow"/></Link>
          <Link to="/"><p id="nav-brand" class="navbar-icons dropshadow">Scratchbac</p></Link>
          
          <div> 
            {this.state.signedin ? 
            <div> 
              <img id="profile-button" src={sample_pfp} onClick={this.toggleProfileDropdown} class="navbar-buttons dropshadow"/>
              <button id="create-post-button" class="navbar-buttons dropshadow"> <img id="create-post-plus-icon" src={plus_icon}/><Link to="/createpost"> Create a Post</Link></button>
            </div>
            :
            <div>
              
              <button id="signup-button" class="navbar-buttons dropshadow"><Link to="/signup"> Sign up</Link></button>
              
              <button id="signin-button" onClick={this.togglePopup} class="navbar-buttons dropshadow"> Sign in</button>
            </div>
            }
          </div>

          <form> 
            <input type="text" id="nav-searchbar" name="search" placeholder="Search Scratchbac" class="dropshadow"/>
          </form>

          <div> {this.state.seen ?  <SigninPopup toggle={this.togglePopup} signin={this.setSignedin} />  : null } </div>
          <div> {this.state.profile_dropdown ? <ProfileDropdown toggle={this.toggleProfileDropdown} signout={this.setSignedout} user={this.props.user} />  : null } </div>
        </div> 
        <div> {this.state.sidebar ?  <Sidebar toggle={this.toggleSidebar} />  : null } </div>
      </div>
    );
  }
}


export default Navbar;
