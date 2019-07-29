import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import CreateNewButton from "../CreateNewBtn";
import Firebase from "firebase";

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleCreateNew() {
    
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let loginButton;



    return (
      <div>
        {!this.state.isLoggedIn ? (
          <div>
            <input id="username-input" value="username" />
            <input id="password-input" value="password" />
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
