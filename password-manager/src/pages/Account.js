import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import UserProfile from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';

const Account = () => {
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

  const handleChangePassword = () => {
    // Implement change password functionality
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text p-6">
        <p className="text-xl">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text p-6">
      <h2 className="text-4xl font-bold mb-6">Account Page</h2>
      <UserProfile user={user} />
      <div className="mt-4 space-y-2">
        <button
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Account;
