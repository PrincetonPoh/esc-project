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
            <a href="#" class="sidebar-items"> Home  </a> 
            <hr/> 
            <a href="#" class="sidebar-items"> Browse Posts </a>
            <hr/> 
            <a href="#" class="sidebar-items"> Latest News </a> 
            <hr/> 
            <a href="#" class="sidebar-items"> About Scratchbac </a>
            <hr/>
            <a href="#" class="sidebar-items"> Sponsors </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar; 

