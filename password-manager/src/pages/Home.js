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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-primary">Passwords Made Easy</span>
        </h1>
        <p className="text-xl mb-6">You are now logged in.</p>
        <button
          onClick={handleLogout}
          className="py-3 px-6 bg-secondary text-white rounded-md hover:bg-secondary-dark"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
