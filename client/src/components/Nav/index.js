import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import CreateNewButton from "../CreateNewBtn";
import $ from "jquery";

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
  };
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
    auth
      .createUserWithEmailAndPassword(
        $("#username-input").val(),
        $("#password-input").val()
      )
      .then(function(data) {
        db.ref("users").push({});
        // userId = data.user.uid;
        alert("Account created.  Please login now.");
      })
      .catch(function(err) {
        alert(err.message);
      });
    this.setState({ userId: auth.currentUser.uid });
  }

  handleLoginClick() {
    auth
      .signInWithEmailAndPassword(
        $("#username-input").val(),
        $("#password-input").val()
      )
      .then(() => {
        this.setState({ isLoggedIn: true });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {!isLoggedIn ? (
          <div>
            <input
              id="username-input"
              value={this.state.email}
              name="email"
              placeholder="email/username"
              required
            />
            <input
              id="password-input"
              value={this.state.password}
              type="password"
              name="password"
              placeholder="password"
              required
            />
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
