import React from 'react';

const PasswordItem = ({ pw, handleEditPassword, confirmDeletePassword }) => {
  return (
    <li className="p-4 bg-background-800 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <strong className="text-xl">{pw.title}</strong>
          <p>{pw.url}</p>
          <p>{pw.email}</p>
          <p>{pw.username}</p>
          <p>{pw.password}</p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleEditPassword(pw)}
            className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDeletePassword(pw.id)}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default PasswordItem;
