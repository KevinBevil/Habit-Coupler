import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyHabits from "./pages/MyHabits";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Welcome from "./pages/Welcome"


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/myhabits" component={MyHabits} />
          <Route exact path="/myhabits/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
