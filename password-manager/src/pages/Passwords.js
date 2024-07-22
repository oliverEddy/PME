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
    <div>
      <h2>Passwords</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddPassword}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </button>
        <GeneratePassword setPassword={setPassword} /> {/* Pass setPassword function to GeneratePassword */}
        <button type="submit">{editMode ? 'Update Password' : 'Add Password'}</button>
      </form>
      <ul>
        {passwords.map((pw) => (
          <li key={pw.id}>
            <strong>{pw.title}</strong> - {pw.url} - {pw.email} - {pw.username} - {pw.password}
            <button onClick={() => handleEditPassword(pw)}>Edit</button>
            <button onClick={() => confirmDeletePassword(pw.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this password?</p>
          <button onClick={handleDeletePassword}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Passwords;
