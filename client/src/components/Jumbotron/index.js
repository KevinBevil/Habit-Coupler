import React from "react";

function Jumbotron({ children }) {
  console.log(children)
  return (
    <div
      style={{ height: 200, clear: "both", paddingTop: 70, textAlign: "center" }}
      className="jumbotron"
      id="jumbo-lib"
    >
      {children}
    </div>
  );
}


export default Jumbotron;
