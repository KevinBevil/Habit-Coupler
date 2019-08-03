import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import CreateNewButton from "../CreateNewBtn";
import Jumbotron from "../Jumbotron";
import API from "../../utils/API";

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
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleCreateNew = this.handleCreateNew.bind(this);
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "",
      password: "",
      userId: "",
      habits: [],
      user: {}
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.saveUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => this.loadUser())
        .catch(err => console.log(err));
    }
  };

  loadUser = () => {
    API.getUser(this.state.email)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data[0],
          habits: res.data[0].habits
        });
      })
      .catch(err => console.log(err));
  };

  handleCreateNew() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        db.ref("users").push({});
        // userId = data.user.uid;
        if (this.state.username && this.state.email) {
          API.saveUser({
            username: this.state.username,
            email: this.state.email,
            habits: []
          })
            .then(res => this.loadUser())
            .catch(err => console.log(err));
        }
        alert("Account created.  Please login now.");
        this.setState({ userId: auth.currentUser.uid });
      })
      .catch(function(err) {
        alert(err.message);
      });
  }

  handleLoginClick() {
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ isLoggedIn: true });
        this.loadUser();
      })
      .catch(error => {
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
    auth
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
    this.setState({
      isLoggedIn: false,
      email: "",
      password: "",
      userId: "",
      habits: [],
      user: {}
    });
  }

  componentDidMount() {
    this.loadUser();
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {!isLoggedIn ? (
          <div>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="username"
              required
            />
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="email"
              required
            />
            <input
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange}
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
            <div>
              <h1>Hello {this.state.user.username}</h1>
            </div>
          </div>
        )}

        <Greeting isLoggedIn={isLoggedIn} />
      </div>
    );
  }
}

export default LoginControl;
