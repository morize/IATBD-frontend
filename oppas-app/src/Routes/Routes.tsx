import { Route, Switch } from "react-router-dom";

import Home from "../Modules/Pages/Home";
import Login from "../Modules/Pages/Login";

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>

    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Routes;
