import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

import Layout from "../Modules/Assets/Layout";
import Home from "../Modules/Pages/Home";
import Account from "../Modules/Pages/Account";
import Login from "../Modules/Pages/Login";
import Register from "../Modules/Pages/Register";

const PODRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/account/" element={<Account />} />
        <Route path="/account/inloggen" element={<Login />} />
        <Route path="/account/aanmelden" element={<Register />} />
        <Route path="/overzicht" />
      </Route>
    </Routes>
  );
};

export default PODRoutes;
