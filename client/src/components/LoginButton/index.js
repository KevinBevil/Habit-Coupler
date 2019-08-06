import React from "react";

function LoginButton(props) {
  return (
    <div onClick={props.onClick}  id="login-button" className="button_cont" align="center">
      <a className="example_e" rel="nofollow noopener">
        Login
      </a>
    </div>
  );
}

export default LoginButton;
