import React, { useEffect } from 'react';
import { signInWithGoogle } from '../auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import InteractiveText from '../components/InteractiveText';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      if (auth.currentUser) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">Welcome to</h1>
      <h1 className="text-5xl font-bold mb-6">
        <InteractiveText originalText="Passwords Made Easy" className="inline-block w-[20ch]" />
      </h1>
      
      {/* Welcome Message */}
      <p className="text-xl text-center mb-8">
        Sign in to get started.
      </p>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="py-3 px-6 bg-accent text-white rounded-md hover:bg-accent-dark"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LandingPage;
