import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navigation from "../Assets/Navigation";
import bgLayout from "../Assets/img/bg_pattern.png";

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
  height: 100vh;
  padding: 60px 0;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(${bgLayout});
`;

const Layout = () => (
  <RootLayout>
    <Navigation />

    <StContent>
      <Outlet />
    </StContent>
  </RootLayout>
);

export default Layout;
