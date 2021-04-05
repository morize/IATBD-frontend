import { Route, Routes } from "react-router-dom";

import Layout from "../Modules/Assets/Layout";
import Home from "../Modules/Pages/Home";
import Login from "../Modules/Pages/Login";

const PODRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
);

export default PODRoutes;
