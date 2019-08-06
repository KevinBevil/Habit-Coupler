import React from "react";

function Habit2(props) {
  return (
    <div onClick={props.onClick} className="button_cont" align="center">
      <a className="example_a" rel="nofollow noopener">
        Add Coupled Habits
      </a>
    </div>
  );
}

export default Habit2;
