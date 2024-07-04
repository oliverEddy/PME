import { firestore } from './firebase'; // Import firestore from firebase.js
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';

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

// Function to delete a password document from Firestore
export const deletePassword = async (passwordId) => {
  try {
    await deleteDoc(doc(firestore, 'passwords', passwordId));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw new Error('Failed to delete password document');
  }
};
