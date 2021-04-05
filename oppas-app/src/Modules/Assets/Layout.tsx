import { FC } from "react";
import { Outlet, BrowserRouterProps } from "react-router-dom";
import styled from "styled-components";

import Nav from "../Assets/Nav";

const RootLayout = styled.section`
  display: flex;
  height: 100vh;
`;

const StContent = styled.section``;

const Layout: FC<BrowserRouterProps> = () => (
  <RootLayout>
    <Nav />

    <StContent>
      <Outlet />
    </StContent>
  </RootLayout>
);

export default Layout;
