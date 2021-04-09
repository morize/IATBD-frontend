import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../Routes/PrivateRoute";
import Layout from "../Assets/Layout";
import Home from "../Pages/Home";
import Account from "../Pages/Account";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const PODRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="account/inloggen" element={<Login />} />
        <Route path="account/aanmelden" element={<Register />} />

        <PrivateRoute path="account" element={<Account />} />
        <PrivateRoute path="overzicht/huisdieren" element={<Account />} />
        <PrivateRoute path="overzicht/opassers" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default PODRoutes;
