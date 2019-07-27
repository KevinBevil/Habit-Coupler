import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as firebase from 'firebase';

var firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
   appId: "1:523402458186:web:859c24e987d60d43"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);



ReactDOM.render(<App />, document.getElementById("root"));
