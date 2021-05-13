import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import { StArticle, StSubArticle } from "../Utils/HTMLComponents";
import Navigation from "./Navigation/MainNavigation";
import SubNavigation from "./Navigation/SubNavigation";
import bgLayout from "../Utils/Images/bg_pattern.png";

const RootLayout = styled.section`
  display: flex;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const StContent = styled.section<{ inAuthenticationPage: boolean }>`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(${bgLayout});
  padding: ${(props) => (props.inAuthenticationPage ? "6vh 0" : "10vh 0")};
`;

const checkIfAuthenticationPage = (url: string) => {
  if (
    url === "inloggen" ||
    url === "aanmelden" ||
    url === "wachtwoord-vergeten" ||
    url === "home" ||
    url === "contact" ||
    url === "overzicht" 
  ) {
    return true;
  }
  return false;
};

const Layout = () => {
  const { pathname } = useLocation();

  const inAuthenticationPage = checkIfAuthenticationPage(
    pathname.split("/")[2] ? pathname.split("/")[2] : pathname.split("/")[1]
  );

  return (
    <RootLayout>
      <Navigation />

      <StContent inAuthenticationPage={inAuthenticationPage}>
        {!inAuthenticationPage && <SubNavigation />}

        {!inAuthenticationPage ? (
          <StSubArticle>
            <Outlet />
          </StSubArticle>
        ) : (
          <StArticle>
            <Outlet />
          </StArticle>
        )}
      </StContent>
    </RootLayout>
  );
};

export default Layout;
