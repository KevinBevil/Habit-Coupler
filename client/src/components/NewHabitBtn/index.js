import React from "react";

function NewHabitBtn(props) {
  return (
    <div onClick={props.onClick} className="button_cont" align="center">
      <a className="example_c" rel="nofollow noopener">
        Add New Habit
      </a>
    </div>
  );
}

export default NewHabitBtn;
