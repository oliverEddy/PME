import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { addPassword, getPasswordsByUser, deletePassword, updatePassword } from '../passwordService';

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editPasswordId, setEditPasswordId] = useState('');

  useEffect(() => {
    const fetchPasswords = async () => {
      if (auth.currentUser) {
        const fetchedPasswords = await getPasswordsByUser(auth.currentUser.uid);
        setPasswords(fetchedPasswords);
      }
    };

    fetchPasswords();
  }, []);

  const handleAddPassword = async (e) => {
    e.preventDefault();
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
  };

  const handleDeletePassword = async (passwordId) => {
    try {
      await deletePassword(passwordId);
      const updatedPasswords = passwords.filter(pw => pw.id !== passwordId);
      setPasswords(updatedPasswords);
    } catch (error) {
      console.error('Error deleting password:', error);
    }
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

  return (
    <div>
      <h2>Passwords</h2>
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{editMode ? 'Update Password' : 'Add Password'}</button>
      </form>
      <ul>
        {passwords.map((pw) => (
          <li key={pw.id}>
            <strong>{pw.title}</strong> - {pw.url} - {pw.email} - {pw.username} - {pw.password}
            <button onClick={() => handleEditPassword(pw)}>Edit</button>
            <button onClick={() => handleDeletePassword(pw.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Passwords;
