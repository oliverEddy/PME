import argon2 from 'argon2';
import { firestore } from './firebase'; // Import firestore from firebase.js
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Function to add a password document to Firestore
export const addPassword = async (passwordData) => {
  try {
    const { password, ...otherData } = passwordData;
    const hashedPassword = await argon2.hash(password); // Hash the password

    const docRef = await addDoc(collection(firestore, 'passwords'), {
      ...otherData,
      hashedPassword, // Store the hashed password
    });

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
    const data = doc.data();
    passwords.push({ id: doc.id, ...data });
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

// Function to update a password document in Firestore
export const updatePassword = async (passwordId, updatedPasswordData) => {
  try {
    const { password, ...otherData } = updatedPasswordData;
    const updatedData = { ...otherData };

    if (password) {
      const hashedPassword = await argon2.hash(password); // Hash the updated password
      updatedData.hashedPassword = hashedPassword; // Update hashed password in data
    }

    const passwordRef = doc(firestore, 'passwords', passwordId);
    await updateDoc(passwordRef, updatedData);

    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw new Error('Failed to update password document');
  }
};
