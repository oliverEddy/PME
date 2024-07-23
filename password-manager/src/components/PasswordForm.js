import React from 'react';
import GeneratePassword from './GeneratePassword';

const PasswordForm = ({
  title,
  url,
  email,
  username,
  password,
  showPassword,
  editMode,
  handleInputChange,
  handleAddPassword,
  togglePasswordVisibility,
  setPassword,
}) => {
  return (
    <form onSubmit={handleAddPassword} className="w-full max-w-lg space-y-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        placeholder="Title"
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        name="url"
        value={url}
        onChange={handleInputChange}
        placeholder="URL"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleInputChange}
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder="Password"
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="text-primary"
      >
        {showPassword ? 'Hide Password' : 'Show Password'}
      </button>
      <GeneratePassword setPassword={setPassword} />
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        {editMode ? 'Update Password' : 'Add Password'}
      </button>
    </form>
  );
};

export default PasswordForm;
