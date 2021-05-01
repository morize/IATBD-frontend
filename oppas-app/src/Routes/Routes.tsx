import { Route, Routes, Outlet } from "react-router-dom";

import PrivateRoute from "../Routes/PrivateRoute";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import AccountGegevens from "../Pages/Account/AccountDetail";
import AccountMedia from "../Pages/Account/AccountMedia";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";

const PODRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="account" element={<Outlet />}>
          <Route path="inloggen" element={<Login />} />
          <Route path="aanmelden" element={<Register />} />
          <Route path="wachtwoord-vergeten" element={<ForgotPassword />} />
          <Route
            path="wachtwoord-vergeten/:token/:email"
            element={<ResetPassword />}
          />

          <PrivateRoute path="/" element={<AccountGegevens />} />
          <PrivateRoute path="/algemeen" element={<AccountGegevens />} />
          <PrivateRoute path="media" element={<AccountMedia />} />
        </Route>

        <PrivateRoute path="overzicht/huisdieren" element={<Home />} />
        <PrivateRoute path="overzicht/opassers" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default PODRoutes;
