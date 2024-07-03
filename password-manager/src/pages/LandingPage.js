// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle } from '../auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRegister = async () => {
    await registerWithEmailAndPassword(email, password);
    // navigate to home if user is authenticated
    if (auth.currentUser) {
      navigate('/home');
    }
  };

  const handleLogin = async () => {
    await loginWithEmailAndPassword(email, password);
    // navigate to home if user is authenticated
    if (auth.currentUser) {
      navigate('/home');
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    // navigate to home if user is authenticated
    if (auth.currentUser) {
      navigate('/home');
    }
  };

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
