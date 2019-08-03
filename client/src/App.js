import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyHabits from "./pages/MyHabits";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import MainWrapper from "./components/MainWrapper";
import Welcome from "./pages/Welcome";



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route component={NoMatch} />
        </Switch>
        <MainWrapper />
      </div>
    </Router>
  );
}

export default App;
