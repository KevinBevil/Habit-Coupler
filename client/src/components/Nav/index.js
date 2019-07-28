import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import Greeting from "../Greeting";
import Firebase from "firebase";


class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>

        <Greeting isLoggedIn={isLoggedIn} />
        {button}

        {
          (!this.state.isLoggedIn)
            ?  <div><input id="username-input" value="username"></input><input id="password-input" value="password"></input></div>
            :  <div></div>
        }

      </div>
    );
  }
}



export default LoginControl;