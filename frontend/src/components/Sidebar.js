import React, { Component } from 'react'; 
import '../styles/Sidebar.css'; 

class Sidebar extends Component {
  handleClick = () => {
    this.props.toggle(); 
  };

  render() {
    return ( 
      <div>
        <div id="sidebarpopup-background" onClick={this.handleClick}> </div>
        <div id="sidebar"> 
          <div id="sidebar-content" class="dropshadow"> 
            <a href="https://scratchbac.com/" class="sidebar-items"> Scratchbac </a> 
            <hr/> 
            <a href="/" class="sidebar-items"> Browse Posts </a>
            <hr/> 
            <a href="https://scratchbac.com/our-blog/" class="sidebar-items"> Latest News </a> 
            <hr/> 
            <a href="https://scratchbac.com/about-us/" class="sidebar-items"> About Scratchbac </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar; 

