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
  confirmDeletePassword,
  setShowForm, // Accept the setShowForm function as a prop
}) => {
  return (
    <form onSubmit={handleAddPassword} className="w-full max-w-lg space-y-4 relative">
      <button
        type="button"
        onClick={() => setShowForm(false)} // Use the setShowForm function to close the form
        className="absolute top-2 left-2 py-1 px-3 border border-red-500 text-red-500 rounded-full hover:bg-red-100"
      >
        Close
      </button>
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
      <div className="flex justify-between">
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {editMode ? 'Update Password' : 'Add Password'}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={confirmDeletePassword}
            className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Password
          </button>
        )}
      </div>
    </form>
  );
};

export default PasswordForm;
