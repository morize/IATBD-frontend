import { FC } from "react";
import { Outlet, BrowserRouterProps } from "react-router-dom";
import styled from "styled-components";

import Navigation from "../Assets/Navigation";

const RootLayout = styled.section`
  display: flex;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const StContent = styled.section`
  width: 100%;
  overflow-y: auto;
  background-image: url("./img/bg_pattern.png");

  @media (max-width: 900px) {
    min-height: 100vh;
  }
`;

const Layout: FC<BrowserRouterProps> = () => (
  <RootLayout>
    <Navigation />

    <StContent>
      <Outlet />
    </StContent>
  </RootLayout>
);

export default Layout;
