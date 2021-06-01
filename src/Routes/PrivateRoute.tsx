import { Route, Navigate } from "react-router-dom";

interface IPrivateRoute {
  element: JSX.Element;
  path?: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ element, path, children }) => {
  const token = localStorage.getItem("activeToken");

  if (!token) {
    return <Navigate to="../../inloggen" />;
  }

  if (path === "admin") {
    let userDetails = localStorage.getItem("userDetails");
    let isAdmin = userDetails && JSON.parse(userDetails).role === "admin";

    return !isAdmin ? (
      <Navigate to="../../home" />
    ) : (
      <Route path={path} element={element}>
        {children}
      </Route>
    );
  }

  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
