import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addPassword, getPasswordsByUser, deletePassword, updatePassword } from '../passwordService';
import PasswordForm from '../components/PasswordForm';
import PasswordList from '../components/PasswordList';
import DeleteConfirmation from '../components/DeleteConfirmation';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'url':
        setUrl(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

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
      <PasswordForm
        title={title}
        url={url}
        email={email}
        username={username}
        password={password}
        showPassword={showPassword}
        editMode={editMode}
        handleInputChange={handleInputChange}
        handleAddPassword={handleAddPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        setPassword={setPassword}
      />
      <div className="w-full max-w-4xl mt-8">
        <PasswordList
          passwords={passwords}
          handleEditPassword={handleEditPassword}
          confirmDeletePassword={confirmDeletePassword}
        />
      </div>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          handleDeletePassword={handleDeletePassword}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default Passwords;
