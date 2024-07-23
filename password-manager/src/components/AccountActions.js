import React from 'react';

const AccountActions = ({ handleChangePassword, handleLogout }) => {
  return (
    <div className="mt-4 space-y-2">
      <button
        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
      <button
        className="w-full py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
};

export default AccountActions;
