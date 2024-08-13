import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveText from './InteractiveText';
import { logout } from '../auth'; // Import logout function
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from auth.js
      navigate('/'); // Redirect to landing page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-background text-text p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-primary text-2xl font-bold">
          <InteractiveText originalText="Passwords Made Easy" className="inline-block" />
        </Link>
        <ul className="flex space-x-4 items-center">
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
          <li>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
