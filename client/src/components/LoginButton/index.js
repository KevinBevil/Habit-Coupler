import React from "react";

function LoginButton(props) {
  return (
    <div onClick={props.onClick} className="button_cont" align="center">
      <a className="example_b" rel="nofollow noopener">
        Login
      </a>
    </div>
  );
}

export default LoginButton;
