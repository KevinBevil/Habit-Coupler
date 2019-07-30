import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import CreateNewButton from "../CreateNewBtn";
import $ from 'jquery';

import * as firebase from "firebase";

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
const db = firebase.database();
const auth = firebase.auth();

class LoginControl extends React.Component {

  state = {
    userName: "",
    password: "",
    userId: ""
  }
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleCreateNew = this.handleCreateNew.bind(this);
    this.state = {
      isLoggedIn: false
    };
  }

  handleCreateNew() {
    let userName = $("#username-input").val();
    auth
      .createUserWithEmailAndPassword("farfegnugen4@test6.com", "password")
      .then(function(data) {
        db.ref("users").push({});
      })
      .catch(function(err) {
        alert(err.message);
      });
    this.setState({ isLoggedIn: true });
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    console.log(this.state.userId);

    return (
      <div>
        {!isLoggedIn ? (
          <div>
            <input id="username-input" name="email" placeholder="email/username" />
            <input id="password-input" type="password" name="password" placeholder="password" />
            <LoginButton onClick={this.handleLoginClick} />
            <CreateNewButton onClick={this.handleCreateNew} />

          </div>
        ) : (
          <div>
            <LogoutButton onClick={this.handleLogoutClick} />
          </div>
        )}

        <Greeting isLoggedIn={isLoggedIn} />
      </div>
    );
  }
}

export default LoginControl;
