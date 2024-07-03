// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/passwords">Passwords</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
