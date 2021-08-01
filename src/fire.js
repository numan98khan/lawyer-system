import React, { Component } from 'react';
import firebase from 'firebase';

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyB6aLPVwLlNYGjfLSuUqzDXVYBzo353T-I",
    authDomain: "fyp-19-35.firebaseapp.com",
    databaseURL: "https://fyp-19-35.firebaseio.com",
    projectId: "fyp-19-35",
    storageBucket: "fyp-19-35.appspot.com",
    messagingSenderId: "1044374382128",
    appId: "1:1044374382128:web:f1658af17fab8337476ff5"
};

// My config
// const firebaseConfig = {
//   apiKey: "AIzaSyCd57Llj23w5PQw5GE5NTXN2ECyULenCek",
//     authDomain: "fyp-bahria.firebaseapp.com",
//     databaseURL: "https://fyp-bahria.firebaseio.com",
//     projectId: "fyp-bahria",
//     storageBucket: "fyp-bahria.appspot.com",
//     messagingSenderId: "367132040812",
//     appId: "1:367132040812:web:80420f7ed38538dd77c249",
//     measurementId: "G-R1E6DYXQ2S"
// // Initialize Firebase
// };
export default class fire{
  static auth;
  static getFire()
  {
    if(!firebase.apps.length)
    {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase;
  }
  
}