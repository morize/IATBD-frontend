import { Route, Routes } from "react-router-dom";

import Layout from "../Modules/Assets/Layout";
import Home from "../Modules/Pages/Home";
import Login from "../Modules/Pages/Login";

const PODRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />

      <Route path="/account/inloggen" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/overzicht" element={<Login />} />
    </Route>
  </Routes>
);

export default PODRoutes;
