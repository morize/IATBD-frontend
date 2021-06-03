import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import { StArticle, StSubArticle } from "../Utils/HTMLComponents";
import Navigation from "./Navigation/MainNavigation";
import SubNavigation from "./Navigation/SubNavigation";
import ASubNavigation from "./Navigation/ASubNavigation";
import bgLayout from "../Utils/Images/bg_pattern.png";

const RootLayout = styled.section`
  display: flex;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StContent = styled.section<{ isAdmin: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: ${(props) => (props.isAdmin ? "column" : "row")};
  padding: ${(props) => (props.isAdmin ? "0" : "6vh 0")};
  background: url(${bgLayout});
  box-sizing: border-box;
  overflow-y: auto;
`;

const checkIfAuthenticationPage = (url: string) => url === "account";

const Layout = () => {
  const { pathname } = useLocation();

  const inAuthenticationPage = checkIfAuthenticationPage(
    pathname.split("/")[1] && pathname.split("/")[1]
  );

  return (
    <RootLayout>
      <Navigation />

      <StContent isAdmin={pathname.split("/")[1] === "admin"}>
        {pathname?.split("/")[1] === "admin" && <ASubNavigation />}
        {inAuthenticationPage && <SubNavigation />}
        {inAuthenticationPage ? (
          <StSubArticle>
            <Outlet />
          </StSubArticle>
        ) : (
          <StArticle admin={pathname?.split("/")[1] === "admin"}>
            <Outlet />
          </StArticle>
        )}
      </StContent>
    </RootLayout>
  );
};

export default Layout;
