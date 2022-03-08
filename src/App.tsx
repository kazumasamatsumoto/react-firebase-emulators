import React from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp, getApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getStorage,
  connectStorageEmulator,
  ref,
  uploadString,
} from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import axios from 'axios';

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const functions = getFunctions(getApp());

function App() {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, "localhost", 5001);

  async function upload() {
    const storageRef = ref(storage, 'some-child');
    const message = 'This is my message.';
    uploadString(storageRef, message).then((snapshot) => {
      console.log('Uploaded a raw string!');
    });
  }

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

  async function dataSet() {
    await setDoc(doc(db, 'cities', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
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
        <button onClick={() => login()}>エミュレーターAuthテスト</button>
        <button onClick={() => dataSet()}>エミュレーターFirestoreテスト</button>
        <button onClick={() => upload()}>エミュレーターStorageテスト</button>
      </header>
    </div>
  );
}

export default App;
