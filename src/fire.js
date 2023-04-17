import React, { Component } from 'react';
import firebase from 'firebase';

// Old config
export const firebaseConfig = {
  apiKey: "AIzaSyB6aLPVwLlNYGjfLSuUqzDXVYBzo353T-I",
    authDomain: "fyp-19-35.firebaseapp.com",
    databaseURL: "https://fyp-19-35.firebaseio.com",
    projectId: "fyp-19-35",
    storageBucket: "fyp-19-35.appspot.com",
    messagingSenderId: "1044374382128",
    appId: "1:1044374382128:web:f1658af17fab8337476ff5"
};

// Latest Config
// export const firebaseConfig = {
//   apiKey: "AIzaSyBsdyRfH4i6XLO80tE-8jxJ_KrEYf7-fiI",
//     authDomain: "greystone-lcm.firebaseapp.com",
//     databaseURL: "https://greystone-lcm-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "greystone-lcm",
//     storageBucket: "greystone-lcm.appspot.com",
//     messagingSenderId: "844395844530",
//     // appId: "1:1044374382128:web:f1658af17fab8337476ff5"
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