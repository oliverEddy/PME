import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="bg-background-800 p-6 rounded-md shadow-md w-full max-w-md text-center">
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
      )}
      <p className="text-xl mb-2"><strong>Display Name:</strong> {user.displayName || 'N/A'}</p>
      <p className="text-xl mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="text-xl mb-2"><strong>Account Created:</strong> {new Date(user.metadata.creationTime).toLocaleDateString()}</p>
      <p className="text-xl mb-2"><strong>Last Sign-In:</strong> {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</p>
    </div>
  );
};

export default UserProfile;
