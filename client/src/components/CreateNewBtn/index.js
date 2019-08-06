import React from "react";

function CreateNewButton(props) {
  return (
    <div onClick={props.onClick} className="button_cont" align="center">
      <a className="example_b" rel="nofollow noopener">
        Create New Account
      </a>
    </div>
  );
}

export default CreateNewButton;
