// src/pages/LandingPage.js
import React, { useState } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle } from '../auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    if (auth.currentUser) {
      navigate('/home');
    }
  };

  // Assuming you want to redirect to /home if user is already authenticated
  if (auth.currentUser) {
    navigate('/home');
    return null; // Redirecting, so no need to render anything
  }

  return (
    <div>
      <h2>Landing Page</h2>
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
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default LandingPage;
