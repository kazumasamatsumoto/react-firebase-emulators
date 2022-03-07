import React from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const auth = getAuth();

// const firebaseFirestore = getFirestore(firebaseApp);

function App() {
  connectAuthEmulator(auth, 'http://localhost:9099');
  async function login() {
    createUserWithEmailAndPassword(
      auth,
      'k.matsumoto+01@opening-line.co.jp',
      'password'
    )
      .then((userCredential) => {
        console.log(userCredential, 'success');
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => login()}>エミュレーターテスト</button>
      </header>
    </div>
  );
}

export default App;
