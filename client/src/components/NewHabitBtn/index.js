import React from "react";

function NewHabitBtn(props) {
   return (
     <button onClick={props.onClick}>
       Add New Habit
     </button>
   );
 }

 export default NewHabitBtn;