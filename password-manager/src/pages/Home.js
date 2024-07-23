import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const Home = () => {
  const [user, setUser] = useState(null);

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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-primary">Passwords Made Easy</span>, {user.displayName}
        </h1>
      </div>
    </div>
  );
};

export default Home;
