import { firestore } from './firebase'; // Import firestore from firebase.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Function to add a password document to Firestore
export const addPassword = async (passwordData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'passwords'), passwordData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Return the document ID for reference if needed
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Failed to add password document');
  }
};

// Function to get passwords for a specific user from Firestore
export const getPasswordsByUser = async (uid) => {
  const q = query(collection(firestore, 'passwords'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const passwords = [];
  querySnapshot.forEach((doc) => {
    passwords.push({ id: doc.id, ...doc.data() });
  });
  return passwords;
};
