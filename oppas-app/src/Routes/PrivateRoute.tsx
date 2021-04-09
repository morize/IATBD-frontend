import { Redirect } from "react-router";
import { Route } from "react-router-dom";

import { useCheckAuth } from "../Hooks/Auth";

const PrivateRoute = ({ ...rest }) => {
  return <Route />;
};

export default PrivateRoute;
