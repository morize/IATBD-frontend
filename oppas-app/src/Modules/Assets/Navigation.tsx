import styled from "styled-components";
import { NavLink } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PetsIcon from "@material-ui/icons/Pets";
import GroupIcon from "@material-ui/icons/Group";
import { useEffect, useState } from "react";

const StNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const StNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: url("img/bg_navigation.jpg");
  background-position: center;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(21, 16, 9, 0.75);
  color: white;

  @media screen and (max-width: 800px) {
    position: sticky;
    top: 0;
    width: 100vw;
    height: 160px;
  }
`;

const StLogoFigure = styled.figure`
  display: flex;
  position: relative;
  width: 80%;
  margin: 2vh 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2vh;
  border-bottom: 0.3vh solid rgba(255, 255, 255, 1);

  & img {
    width: 5vw;
  }

  & figcaption {
    margin-top: -0.5vh;
    text-align: center;
    font-size: 1.25vw;
    font-weight: 600;
    white-space: pre-wrap;
  }

  @media (max-width: 800px) {
    width: 100%;
    height: 55%;
    margin: 0;
    padding: 0;
    border-bottom: none;
    flex-direction: row;

    & img {
      width: 16vw;
    }

    & figcaption {
      margin-left: 16px;
      font-size: 18px;
    }
  }
`;

const StUl = styled.ul`
  width: 100%;
  margin: 2vh 0;
  padding: 0;
  list-style: none;
  font-size: 1vw;
  text-align: center;

  & li {
    height: 10vh;
    margin-bottom: 4vh;
    background: rgba(132, 79, 0, 0.7);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    & ${StNavLink} {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      box-sizing: border-box;
      white-space: pre-wrap;
    }
  }

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    margin: 0;
    height: 45%;
    background: #844f00;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    & li {
      display: inline-flex;
      width: 50px;
      height: 50px;
      margin: 0 6px;
      border-radius: 50%;
      background-color: #a86f18;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

      & ${StNavLink} {
        width: 100%;
      }
    }
  }
`;

const StBottom = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 15%;
  margin-top: auto;
  text-align: center;
  font-size: 0.8vw;
  white-space: pre-wrap;

  & ${StNavLink} {
    margin-top: 0.4vh;
    text-decoration: underline;
    color: #95f9ff;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Navigation = () => {
  const [respState, setRespState] = useState("");

  const checkIfDifferentViewport = () => {
    let detectedViewport = window.innerWidth <= 800 ? "mobile" : "desktop";

    detectedViewport !== respState && setRespState(detectedViewport);
  };

  const activeButtonStyle =
    respState === "desktop"
      ? {
          borderTop: "0.3vh solid rgba(255,255,255,0.8)",
          borderBottom: "0.3vh solid rgba(255,255,255,0.8)",
        }
      : { background: "#593412", borderRadius: "50%" };

  useEffect(() => {
    checkIfDifferentViewport();
    window.onresize = checkIfDifferentViewport;
  }, []);

  return (
    <StNavigation>
      <StLogoFigure>
        <img src="img/logo_pojd.png" alt="site logo"></img>
        <figcaption>{"Passen op\nje dier"}</figcaption>
      </StLogoFigure>

      <StUl>
        <li>
          <StNavLink to="home" activeStyle={activeButtonStyle}>
            {respState === "desktop" ? "Home" : <HomeIcon />}
          </StNavLink>
        </li>

        <li>
          <StNavLink to="account/inloggen" activeStyle={activeButtonStyle}>
            {respState === "desktop" ? "Account" : <PersonIcon />}
          </StNavLink>
        </li>

        <li>
          <StNavLink to="overzicht/huisdieren" activeStyle={activeButtonStyle}>
            {respState === "desktop" ? "Overzicht\nHuisdieren" : <PetsIcon />}
          </StNavLink>
        </li>

        <li>
          <StNavLink to="overzicht/opassers" activeStyle={activeButtonStyle}>
            {respState === "desktop" ? "Overzicht\nOpassers" : <GroupIcon />}
          </StNavLink>
        </li>
      </StUl>

      <StBottom>
        Nog geen account?
        <StNavLink to="account/aanmelden">
          Klik hier om aan te melden!
        </StNavLink>
      </StBottom>
    </StNavigation>
  );
};

export default Navigation;
