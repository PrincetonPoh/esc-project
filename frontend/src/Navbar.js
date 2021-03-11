import React from 'react';
import ReactDOM from 'react-dom';
import menu_icon from './menu_icon.png';
import logo_rect from './logo_rect.png';
import './Navbar1.css';
import SigninPopup from './SigninPopup';
import Sidebar from './Sidebar';
import sample_pfp from './sample_pfp.png';
import plus_icon from './plus_icon.png';
import ProfileDropdown from './ProfileDropdown';

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

  setSignedin = () => {
    this.setState({
      signedin: true, // changes nevbar buttons to signed in ones
      seen: false // hides signinPopup
    });
    alert("signed in!")
  }
  setSignedout = () => {
    this.setState({
      signedin: false, // changes nevbar buttons to signed in ones
      profile_dropdown: false
    });
    alert("signed out!")
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
          <img id="nav-logo" src={logo_rect} class="navbar-icons"/> 
          <p id="nav-brand" class="navbar-icons dropshadow">Scratchbac</p>
          
          <div> 
            {this.state.signedin ? 
            <div> 
              <img id="profile-button" src={sample_pfp} onClick={this.toggleProfileDropdown} class="navbar-buttons dropshadow"/>
              <button id="create-post-button" onClick={this.createPost} class="navbar-buttons dropshadow"> <img id="create-post-plus-icon" src={plus_icon}/> Create a Post </button>
            </div>
            :
            <div> 
              <button id="signup-button" onClick={this.signup} class="navbar-buttons dropshadow"> Sign up</button>
              <button id="signin-button" onClick={this.togglePopup} class="navbar-buttons dropshadow"> Sign in</button>
            </div>
            }
          </div>

          <form> 
            <input type="text" id="nav-searchbar" name="search" placeholder="Search Scratchbac" class="dropshadow"/>
          </form>

          <div> {this.state.seen ?  <SigninPopup toggle={this.togglePopup} signin={this.setSignedin} />  : null } </div>
          <div> {this.state.profile_dropdown ? <ProfileDropdown toggle={this.toggleProfileDropdown} signout={this.setSignedout} />  : null } </div>
        </div> 
        <div> {this.state.sidebar ?  <Sidebar toggle={this.toggleSidebar} />  : null } </div>
      </div>
    );
  }
}


export default Navbar;
