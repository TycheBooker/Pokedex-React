import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Pokemon</Link>
        <Link to="/my-pokemon">My Pokemon</Link>
      </div>
    );
  }
}

export default Header;