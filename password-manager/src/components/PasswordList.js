import React from 'react';
import PasswordItem from './PasswordItem';

const PasswordList = ({ passwords, handleEditPassword, confirmDeletePassword }) => {
  return (
    <ul className="grid grid-cols-1 gap-4">
      {passwords.map((pw) => (
        <PasswordItem
          key={pw.id}
          pw={pw}
          handleEditPassword={handleEditPassword}
          confirmDeletePassword={confirmDeletePassword}
        />
      ))}
    </ul>
  );
};

export default PasswordList;
