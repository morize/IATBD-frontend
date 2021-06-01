import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import { StH2 } from "../../Utils/HTMLComponents";

const StSubnavigationBody = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 120px;
  padding: 0 6%;
  background: #814e12;
  color: #fff;
  box-sizing: border-box;
  z-index: 3;
  
  & h2 {
    margin: 0;
    font-weight: 500;
    color: #fff;
  }
`;

const StNavigationOptions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 600px;
  margin-left: auto;

  & a {
    width: 45%;
    padding: 3% 0;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background: #bc8127;
    border-radius: 8px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  & .aSubnavigation-active {
    background: #9b6310;
  }
`;

const ASubNavigation = () => {
  const { pathname } = useLocation();

  return (
    <StSubnavigationBody>
      <StH2>Admin pagina</StH2>
      <StNavigationOptions>
        <NavLink
          to="admin/gebruikers"
          activeClassName="aSubnavigation-active"
          className={pathname.split("/")[2] ? "" : "aSubnavigation-active"}
        >
          Gebruikers
        </NavLink>
        <NavLink to="admin/aanvragen" activeClassName="aSubnavigation-active">
          Oppas aanvragen
        </NavLink>
      </StNavigationOptions>
    </StSubnavigationBody>
  );
};

export default ASubNavigation;
