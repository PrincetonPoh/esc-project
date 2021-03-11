import React, { Component } from 'react'; 
import './ProfileDropdown.css'; 

class ProfileDropdown extends Component {
  handleClick = () => {
    this.props.toggle(); 
  };

  handleLogout = () => {
    this.props.signout(); 
  };

  render() {
    return ( 
      <div>
        <div id="profile-dropdown-background" onMouseEnter={this.handleClick}> </div>
        <div id="profile-dropdown" > 
          <p id="profile-dropdown-header" class="profile-dropdown-items"> Logged in as </p>
          <p id="profile-dropdown-username" class="profile-dropdown-items"> Insert Username Here </p>
          <hr/>
          <div id="profile-dropdown-content"> 
            <a href="#" class="profile-dropdown-items"> My Profile  </a> 
            <a href="#" class="profile-dropdown-items"> My Posts </a>
            <a href="#" class="profile-dropdown-items"> Settings </a> 
            <a href="#" onClick={this.handleLogout} class="profile-dropdown-items"> Logout </a>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileDropdown; 

