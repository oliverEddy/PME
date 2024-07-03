// src/components/Home.js
import React from 'react';
import { logout } from '../auth'; // Import logout function
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
    <div>
    
      <div>
        <h2>Welcome to the Home Page</h2>
        <p>You are now logged in.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
