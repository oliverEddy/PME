// src/pages/Passwords.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addPassword, getPasswordsByUser, deletePassword, updatePassword } from '../passwordService';
import GeneratePassword from '../components/GeneratePassword'; // Import the password generator component

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editPasswordId, setEditPasswordId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [passwordToDelete, setPasswordToDelete] = useState(null); // State to manage password to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to manage delete confirmation dialog

  useEffect(() => {
    const fetchPasswords = async () => {
      setLoading(true);
      setError(null);
      try {
        if (auth.currentUser) {
          const fetchedPasswords = await getPasswordsByUser(auth.currentUser.uid);
          setPasswords(fetchedPasswords);
        }
      } catch (error) {
        console.error('Error fetching passwords:', error);
        setError('Failed to fetch passwords. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPasswords();
  }, []);

  const handleAddPassword = async (e) => {
    e.preventDefault();
    if (!title || !password) {
      setError('Title and Password are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (editMode) {
        // Update existing password
        await updatePassword(editPasswordId, { title, url, email, username, password });
        setEditMode(false);
        setEditPasswordId('');
      } else {
        // Add new password
        const passwordData = {
          title,
          url,
          email,
          username,
          password,
          uid: auth.currentUser.uid,
        };
        await addPassword(passwordData);
      }
      setTitle('');
      setUrl('');
      setEmail('');
      setUsername('');
      setPassword('');
      const fetchedPasswords = await getPasswordsByUser(auth.currentUser.uid);
      setPasswords(fetchedPasswords);
    } catch (error) {
      console.error('Error adding/editing password:', error);
      setError('Failed to add/edit password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePassword = async () => {
    setLoading(true);
    setError(null);
    try {
      await deletePassword(passwordToDelete);
      const updatedPasswords = passwords.filter(pw => pw.id !== passwordToDelete);
      setPasswords(updatedPasswords);
      setShowDeleteConfirmation(false); // Hide confirmation dialog
    } catch (error) {
      console.error('Error deleting password:', error);
      setError('Failed to delete password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeletePassword = (passwordId) => {
    setPasswordToDelete(passwordId);
    setShowDeleteConfirmation(true);
  };

  const handleEditPassword = (pw) => {
    setTitle(pw.title);
    setUrl(pw.url || '');
    setEmail(pw.email || '');
    setUsername(pw.username || '');
    setPassword(pw.password);
    setEditMode(true);
    setEditPasswordId(pw.id);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state to show or hide the password
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-text p-6">
      <h2 className="text-4xl font-bold mb-6">Passwords</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleAddPassword} className="w-full max-w-lg space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <GeneratePassword setPassword={setPassword} /> {/* Pass setPassword function to GeneratePassword */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          {editMode ? 'Update Password' : 'Add Password'}
        </button>
      </form>
      <div className="w-full max-w-4xl mt-8">
        <ul className="grid grid-cols-1 gap-4">
          {passwords.map((pw) => (
            <li key={pw.id} className="p-4 bg-background-800 rounded-md shadow-md">
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
          ))}
        </ul>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background-800 p-6 rounded-md">
            <p className="mb-4">Are you sure you want to delete this password?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeletePassword}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="py-2 px-4 bg-secondary text-white rounded-md hover:bg-secondary-dark"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passwords;
