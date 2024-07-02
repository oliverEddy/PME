// src/components/Auth.js
import React, { useState } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, logout } from '../auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerWithEmailAndPassword(email, password);
    if (auth.currentUser) {
      navigate('/home');
    }
  };

  const handleLogin = async () => {
    await loginWithEmailAndPassword(email, password);
    if (auth.currentUser) {
      navigate('/home');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Auth;
