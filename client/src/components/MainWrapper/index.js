import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import CreateNewButton from "../CreateNewBtn";
import NewHabitBtn from "../NewHabitBtn";
import Habit2 from "../Habit2";
import { List, ListItem, resItem } from "../List";
import DeleteBtn from "../DeleteBtn";
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
    this.handleCoupledHabits = this.handleCoupledHabits.bind(this);
    this.handleNewHabit = this.handleNewHabit.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      firstBox: false,
      isLoggedIn: false,
      data: {
        habit1: "",
        habit2: ""
      },
      newHabit: "",
      username: "",
      email: "",
      password: "",
      firebaseId: "",
      allhabits: [],
      user: {}
    };
  }

  handleChoice = choice => {
    if (!this.state.firstBox) {
      this.setState({
        firstBox: true,
        data: {
          habit1: choice,
          habit2: this.state.data.habit2
        }
      });
    } else if (this.state.firstBox) {
      this.setState({
        firstBox: false,
        data: {
          habit1: this.state.data.habit1,
          habit2: choice
        }
      });
    } else {
      return;
    }
  };
  handleDelete = event => {
    event.preventDefault();
    API.deletePair(this.state.user._id)
      .then(res => {
        this.loadUser();
        alert("Paired habits deleted!");
      })
      .catch(err => console.log(err));
  };

  handleCoupledHabits = event => {
    event.preventDefault();
    if (this.state.data.habit1 && this.state.data.habit2) {
      API.updateHabits(this.state.user._id, this.state.data)
        .then(res => {
          this.loadUser();

          alert("You've stored new paired habits!");
          this.setState({
            data: {
              habit1: "",
              habit2: ""
            }
          });
        })
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loadUser = () => {
    API.getUser(this.state.email)
      .then(res => {
        this.setState({
          user: res.data[0]
        });
      })
      .catch(err => console.log(err));
  };

  loadHabits = () => {
    API.getHabits()
      .then(res => {
        this.setState({
          allhabits: res.data
        });
      })
      .catch(err => console.log(err));
  };

  handleCreateNew() {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        db.ref("users").push({});
        // firebaseId = data.user.uid;
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
        this.setState({ firebaseId: auth.currentUser.uid });
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
        this.loadHabits();
        this.setState({ firebaseId: auth.currentUser.uid });
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

  handleNewHabit() {
    API.saveHabit({
      habitname: this.state.newHabit
    })
      .then(res => {
        this.loadHabits();
        this.setState({ newHabit: "" });
      })
      .catch(err => console.log(err));
  }

  handleLogoutClick() {
    auth
      .signOut()
      .then(function() {
        alert("You were successfully signed out.  (Don't make a habit of it?)");
      })
      .catch(function(error) {
        // An error happened.
      });
    this.setState({
      isLoggedIn: false,
      email: "",
      password: "",
      firebaseId: "",
      username: "",
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
            <div className="row">
              <div className="col-4" />
              <input
                className="container col-4 login-fields"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="username"
                required
              />
              <div className="col-4" />
            </div>

            <div className="row">
              <div className="col-4" />
              <input
                className="container col-4 login-fields"
                type="text"
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email"
                required
              />
              <div className="col-4" />
            </div>

            <div className="row">
              <div className="col-4" />
              <input
                className="container col-4 login-fields"
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
              <div className="col-4" />
            </div>
          </div>
        ) : (
          <div>
            <div className="row">
              <LogoutButton id="logout" onClick={this.handleLogoutClick} />
              <div className="col-2" />

              <h2>Hello {this.state.user.username},</h2>
            </div>
            <div className="row">
              <div className="col-2" />
              <Greeting isLoggedIn={isLoggedIn} id="greeting" />
            </div>

            {this.state.user.habits.length ? (
              <div>
                <div className="container">
                  <div className="all-pairs">
                    <div />
                    <h4>You've paired: </h4>
                    {this.state.user.habits.map(element => (
                      <div>
                        <h6>
                          <div className="container pairs-section">
                            <b>{element.habit1}</b> with <b>{element.habit2}</b>
                            <DeleteBtn />
                          </div>
                        </h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5>Your Habits will go here:</h5>
              </div>
            )}
            <div className="row">
              <div className="col-2" />
              <Habit2 onClick={this.handleCoupledHabits} />
            </div>
            <div className="row">
              <div className="col-2" />
              <input
                className="container col-2 login-fields"
                type="text"
                readOnly
                value={this.state.data.habit1}
                onChange={this.handleInputChange}
                name="habit1"
                placeholder="Habit 1"
                required
              />
            </div>
            <div className="col-2" />
            <div className="row">
              <div className="col-2" />
              <input
                className="container col-2 login-fields"
                type="text"
                readOnly
                value={this.state.data.habit2}
                onChange={this.handleInputChange}
                name="habit2"
                placeholder="Habit 2"
                required
              />
            </div>
            <div className="col-6" />
            <div className="container">
              <div className="row">
                <div className="col-1" />
                <h4>
                  All Habits{" "}
                  <h6>*click a habit to add to possible pair fields</h6>
                </h4>
              </div>
            </div>
            {this.state.allhabits.length ? (
              <div>
                <div className="container full-list">
                  {this.state.allhabits.map(element => (
                    <div className="row library">
                      <h6
                        onClick={() => this.handleChoice(element.habitname)}
                        id={element.habitname
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .replace(" ", "-")
                          .toLowerCase()}
                      >
                        <a> {element.habitname}</a>
                      </h6>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={this.state.newHabit}
                    onChange={this.handleInputChange}
                    name="newHabit"
                    placeholder="Add New Habit"
                  />
                  <NewHabitBtn onClick={this.handleNewHabit} />
                </div>
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default LoginControl;
