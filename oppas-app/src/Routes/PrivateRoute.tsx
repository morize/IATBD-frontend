import { Route, Navigate } from "react-router-dom";

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
  let token = localStorage.getItem("activeToken");

  if (!token) {
    return <Navigate to="../../account/inloggen" />;
  }

  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
