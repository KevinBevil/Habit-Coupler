import React from "react";

function CreateNewButton(props) {
   return (
     <button onClick={props.onClick}>
       Create New Account
     </button>
   );
 }

 export default CreateNewButton;