import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TrussSolver from "./components/trussSolver/index";
import Results from "./components/results/index";
import "./styles/_global.scss";
import "./App.css";

const App = () => {
  const baseRoute = "";
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={`${baseRoute}/solver/`}
          component={(props) => <TrussSolver {...props} />}
        />
        <Route
          path={`${baseRoute}/solver/results`}
          render={(props) => <Results {...props} />}
        />
        <Redirect from={`${baseRoute}*`} to={`${baseRoute}/solver/`} />
      </Switch>
    </div>
  );
};

export default App;
