import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="nav-header">
        <NavLink exact to="/">Pokemon</NavLink>
        <NavLink exact to="/my-pokemon">My Pokemon</NavLink>
      </div>
    );
  }
}

export default Header;