import { Route, Navigate } from "react-router-dom";

import { useLoginStatus } from "../Hooks/Auth";

interface IPrivateRoute {
  element: JSX.Element;
  admin?: boolean;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  element,
  admin,
  path,
  children,
}) => {
  if (!useLoginStatus()) {
    return <Navigate to="../../account/inloggen" />;
  }

  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
};
export default PrivateRoute;
