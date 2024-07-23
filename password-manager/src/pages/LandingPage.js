// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, signInWithGoogle } from '../auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import InteractiveText from '../components/InteractiveText';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      <h1 className="text-4xl font-bold mb-8">
        <InteractiveText originalText="Welcome to Passwords Made Easy" />
      </h1>
      <div className="w-full max-w-md space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleRegister}
          className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-secondary text-white rounded-md hover:bg-secondary-dark"
        >
          Login
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 bg-accent text-white rounded-md hover:bg-accent-dark"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
