// src/App.js

import React, { useEffect } from 'react';
import { firestore } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  useEffect(() => {
    const addTestData = async () => {
      try {
        const docRef = await addDoc(collection(firestore, 'testCollection'), {
          testField: 'testValue'
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    addTestData();
  }, []);

  return (
    <div className="App">
      <h1>Firebase Connection Test</h1>
    </div>
  );
}

export default App;
