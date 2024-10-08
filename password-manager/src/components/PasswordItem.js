import React, { useState } from 'react';

const PasswordItem = ({ pw, handleEditPassword }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <li className="grid grid-cols-4 gap-4 p-4 bg-background-800 rounded-md shadow-md">
      <div className="flex justify-center items-center">
        <strong className="text-xl text-text">{pw.title}</strong>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <p onClick={() => copyToClipboard(pw.email)} className="cursor-pointer text-text hover:underline">
          {pw.email}
        </p>
        <span onClick={() => copyToClipboard(pw.email)} className="cursor-pointer">📋</span>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <p onClick={() => copyToClipboard(pw.password)} className="cursor-pointer text-text hover:underline">
          {isPasswordVisible ? pw.password : '********'}
        </p>
        <button onClick={togglePasswordVisibility} className="text-sm text-primary">
          {isPasswordVisible ? 'Hide' : 'Show'}
        </button>
        <span onClick={() => copyToClipboard(pw.password)} className="cursor-pointer">📋</span>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handleEditPassword(pw)}
          className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
        >
          Edit
        </button>
      </div>
    </li>
  );
};

export default PasswordItem;
