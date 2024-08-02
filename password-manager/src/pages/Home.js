import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
        <p className="text-xl">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text p-6">
      <div className="flex items-center justify-center" style={{ height: '40vh' }}>
        <h1 className="text-4xl font-bold text-center">
          Welcome to <span className="text-primary">Passwords Made Easy</span>, {user.displayName}
        </h1>
      </div>
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => navigate('/passwords')}
          className="py-3 px-8 bg-primary text-white rounded-md text-lg hover:bg-primary-dark"
        >
          Manage Passwords
        </button>
      </div>
    </div>
  );
};

export default Home;
