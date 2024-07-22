import { firestore } from './firebase'; // Import firestore from firebase.js
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { encryptPassword, decryptPassword } from './services/encryptionService'; // Import encryption functions

// Function to add a password document to Firestore
export const addPassword = async (passwordData) => {
  try {
    const { password, ...otherData } = passwordData;
    const encryptedPassword = encryptPassword(password); // Encrypt the password
    console.log('Encrypted Password:', encryptedPassword); // Log encrypted password

    const docRef = await addDoc(collection(firestore, 'passwords'), {
      ...otherData,
      password: encryptedPassword, // Store the encrypted password
    });

    console.log('Document written with ID:', docRef.id);
    return docRef.id; // Return the document ID for reference if needed
  } catch (error) {
    console.error('Error adding document:', error);
    throw new Error('Failed to add password document');
  }
};

// Function to get passwords for a specific user from Firestore
export const getPasswordsByUser = async (uid) => {
  try {
    const q = query(collection(firestore, 'passwords'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const passwords = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const decryptedPassword = decryptPassword(data.password); // Decrypt the password
      passwords.push({ id: doc.id, ...data, password: decryptedPassword });
      console.log('Decrypted Password:', decryptedPassword); // Log decrypted password
    });
    return passwords;
  } catch (error) {
    console.error('Error fetching passwords:', error);
    throw new Error('Failed to fetch passwords');
  }
};

// Function to delete a password document from Firestore
export const deletePassword = async (passwordId) => {
  try {
    await deleteDoc(doc(firestore, 'passwords', passwordId));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document:', error);
    throw new Error('Failed to delete password document');
  }
};

// Function to update a password document in Firestore
export const updatePassword = async (passwordId, updatedPasswordData) => {
  try {
    const { password, ...otherData } = updatedPasswordData;
    const updatedData = { ...otherData };

    if (password) {
      const encryptedPassword = encryptPassword(password); // Encrypt the new password
      updatedData.password = encryptedPassword;
    }

    const passwordRef = doc(firestore, 'passwords', passwordId);
    await updateDoc(passwordRef, updatedData);

    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document:', error);
    throw new Error('Failed to update password document');
  }
};
