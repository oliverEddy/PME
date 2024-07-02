// src/auth.js
import { auth, googleProvider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

// Function to handle user registration
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

// Function to handle user login with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// Function to handle user login with Google
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
