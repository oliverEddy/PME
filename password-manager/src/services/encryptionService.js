import CryptoJS from 'crypto-js';

// Get the secret key from environment variables
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

console.log('Secret Key:', SECRET_KEY); // Log the secret key to verify

// Function to encrypt the password
export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// Function to decrypt the password
export const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
