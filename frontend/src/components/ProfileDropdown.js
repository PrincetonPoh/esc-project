import React, { Component } from 'react'; 
import '../styles/ProfileDropdown.css';
import {Link} from 'react-router-dom';

class ProfileDropdown extends Component {
  handleClick = () => {
    this.props.toggle(); 
  };

  handleLogout = () => {
    this.props.signout();
  };

  render() {
    const userName = localStorage.getItem("user");
    return ( 
      <div>
        <div id="profile-dropdown-background" onMouseEnter={this.handleClick}> </div>
        <div id="profile-dropdown"> 
          <p id="profile-dropdown-header" class="profile-dropdown-items"> Logged in as </p>
          <p id="profile-dropdown-username" class="profile-dropdown-items"> { userName!=null ? userName : "<Username>" }</p>
          <hr/>
          <div id="profile-dropdown-content"> 
            <Link to={`/user/${this.props.user.user_id}`} class="profile-dropdown-items"> Overview </Link> 
            <a href="#" class="profile-dropdown-items"> Settings </a>
            <a href="/" id="profile-dropdown-logout" onClick={this.handleLogout} class="profile-dropdown-items">Logout </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileDropdown; 

