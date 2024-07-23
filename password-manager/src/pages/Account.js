import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import UserProfile from '../components/UserProfile';
import AccountActions from '../components/AccountActions';
import { useNavigate } from 'react-router-dom';

const Account = () => {
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
      <AccountActions handleChangePassword={handleChangePassword} handleLogout={handleLogout} />
    </div>
  );
};

export default Account;
