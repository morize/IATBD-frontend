import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "../App";

const MRBRoutes = () => (
  <Switch>
    <Route path="/">
      <App />
    </Route>
  </Switch>
);

export default MRBRoutes;
