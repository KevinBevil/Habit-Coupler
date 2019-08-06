import React from "react";

function LogoutButton(props) {
  return (
    <div onClick={props.onClick} className="button_cont" align="center">
      <a className="example_b" rel="nofollow noopener">
        Logout
      </a>
    </div>
  );
}

export default LogoutButton;
