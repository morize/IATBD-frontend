import { Route, Routes, Outlet } from "react-router-dom";

import PrivateRoute from "../Routes/PrivateRoute";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import AccountGegevens from "../Pages/Account/AccountDetail";
import AccountMedia from "../Pages/Account/AccountMedia";
import AccountSitter from "../Pages/Account/AccountSitter";
import AccountPet from "../Pages/Account/AccountPet";
import AccountProfile from "../Pages/Account/AccountProfile";
import PetCreate from "../Pages/Pet/PetCreate";
import PetProfile from "../Pages/Pet/PetProfile";
import PetOverview from "../Pages/Overview/PetOverview";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import Contact from "../Pages/Contact";
import Admin from "../Pages/Admin/Admin";

const PODRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/*" element={<Home />} />

      <Route path="home" element={<Home />} />
      <Route path="inloggen" element={<Login />} />
      <Route path="aanmelden" element={<Register />} />
      <Route path="wachtwoord-vergeten" element={<ForgotPassword />} />
      <Route
        path="wachtwoord-vergeten/:token/:email"
        element={<ResetPassword />}
      />

      <Route path="account" element={<Outlet />}>
        <PrivateRoute element={<AccountGegevens />} />
        <PrivateRoute path="algemeen" element={<AccountGegevens />} />
        <PrivateRoute path="media" element={<AccountMedia />} />
        <PrivateRoute path="opasser" element={<AccountSitter />} />
        <PrivateRoute path="opasser/aanvraag/:id" element={<PetProfile />} />

        <PrivateRoute path="huisdieren" element={<AccountPet />} />
        <PrivateRoute
          path="huisdieren/nieuw-huisdier"
          element={<PetCreate />}
        />
        <PrivateRoute
          path="huisdieren/oppaser/profiel/:id"
          element={<AccountProfile />}
        />
        <PrivateRoute path="huisdieren/profiel/:id" element={<PetProfile />} />
      </Route>

      <PrivateRoute path="overzicht" element={<Outlet />}>
        <PrivateRoute element={<PetOverview />} />
        <PrivateRoute path="profiel/:id" element={<PetProfile />} />
      </PrivateRoute>

      <Route path="contact" element={<Contact />} />

      <PrivateRoute path="admin" element={<Admin />}>
        <PrivateRoute element={<PetOverview />} />
        <PrivateRoute path="gebruikers" element={<PetOverview />} />
        <PrivateRoute path="aanvragen" element={<PetOverview />} />
      </PrivateRoute>
    </Route>
  </Routes>
);

export default PODRoutes;
