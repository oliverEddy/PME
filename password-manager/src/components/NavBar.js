// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveText from './InteractiveText';

const NavBar = () => {
  return (
    <nav className="bg-background text-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-primary text-2xl font-bold">
          <InteractiveText originalText="Passwords Made Easy" className="inline-block" />
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link to="/passwords" className="hover:text-accent">
              Passwords
            </Link>
          </li>
          <li>
            <Link to="/account" className="hover:text-accent">
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
