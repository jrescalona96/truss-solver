import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TrussSolver from "./components/trussSolver/index";
import Results from "./components/results/index";
import "./styles/_global.scss";
import "./App.css";

const App = () => {
  const baseRoute = "/truss-solver/";
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={`${baseRoute}`}
          component={(props) => <TrussSolver {...props} />}
        />
        <Route
          path={`${baseRoute}results`}
          render={(props) => <Results {...props} />}
        />
        <Redirect from={`/*`} to={`${baseRoute}`} />
      </Switch>
    </div>
  );
};

export default App;
