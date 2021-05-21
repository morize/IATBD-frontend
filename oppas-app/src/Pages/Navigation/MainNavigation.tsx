import { ReactNode, useCallback, useEffect, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import PetsIcon from "@material-ui/icons/Pets";
import GroupIcon from "@material-ui/icons/Group";

import Variants from "../../Utils/Variants";
import bgNavigation from "../../Utils/Images/bg_navigation.jpg";
import dogIcon from "../../Utils/Images/logo_pojd.png";

import { logout } from "../../Hooks/Api";

const StNavigationAnchor = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

const StNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16vw;
  height: 100vh;
  background: url(${bgNavigation});
  background-position: center;
  background-size: cover;
  color: #ffff;
  box-sizing: border-box;
  box-shadow: inset 0 0 0 2000px rgba(39, 30, 8, 0.6);

  @media screen and (max-width: 800px) {
    position: sticky;
    top: 0;
    width: 100vw;
    height: 160px;
  }
`;

const StLogoFigure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2vh 0;
  user-select: none;

  & img {
    width: 4.5vw;
  }

  & figcaption {
    margin-top: -0.5vh;
    text-align: center;
    font-size: 1vw;
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

const StNavigationItems = styled.ul`
  width: 100%;
  margin: 2vh 0;
  padding: 0;

  text-align: center;
  font-size: 0.8vw;
  list-style: none;

  & li {
    height: 11vh;
    margin-bottom: 4vh;
    background: rgba(132, 79, 0, 0.9);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    & ${StNavigationAnchor} {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      white-space: pre-wrap;

      &.main__navigation__active {
        background: rgba(77, 46, 0, 0.7);
      }
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

      & ${StNavigationAnchor} {
        width: 100%;
      }
    }
  }
`;

const StNavigationBottom = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 16%;
  font-size: 0.7vw;
  white-space: pre-wrap;

  & a {
    margin-top: 0.2vh;
    text-decoration: underline;
    color: #95f9ff;
    cursor: pointer;
  }

  & button {
    height: 4vh;
    width: 50%;
    margin-top: 0.2vw;
    padding: 0;
    border: 0;
    border-radius: 0.4vw;
    background: ${Variants.secondary};
    font-size: 0.6vw;
    font-weight: 600;
    color: #ffff;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

interface INavigationItem {
  name: string;
  portrait: string;
  routeTo: string;
  icon: ReactNode;
}

const NavigationItem = (props: INavigationItem) => (
  <li>
    <StNavigationAnchor
      to={props.routeTo}
      activeClassName={"main__navigation__active"}
    >
      {props.portrait === "desktop" ? props.name : props.icon}
    </StNavigationAnchor>
  </li>
);

const Navigation = () => {
  const navigate = useNavigate();

  const [currentDevice, setCurrentDevice] = useState("");
  const localUserDetails = JSON.parse(localStorage.getItem("userDetails")!);

  const checkIfDifferentViewport = useCallback(() => {
    let detectedViewport = window.innerWidth <= 800 ? "mobile" : "desktop";

    detectedViewport !== currentDevice && setCurrentDevice(detectedViewport);
  }, [currentDevice]);

  const onLogoutClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => {
      navigate("../../home");
    });
  };

  useEffect(() => {
    checkIfDifferentViewport();
    window.onresize = checkIfDifferentViewport;
  }, [checkIfDifferentViewport]);

  return (
    <StNavigation>
      <StLogoFigure>
        <img src={dogIcon} alt="site logo" />
        <figcaption>{"Passen op\nje dier"}</figcaption>
      </StLogoFigure>

      <StNavigationItems>
        <NavigationItem
          name="Home"
          routeTo="home"
          portrait={currentDevice}
          icon={<HomeIcon />}
        />

        <NavigationItem
          name="Account"
          routeTo="account"
          portrait={currentDevice}
          icon={<PersonIcon />}
        />

        <NavigationItem
          name={"Overzicht"}
          routeTo="overzicht"
          portrait={currentDevice}
          icon={<PetsIcon />}
        />

        <NavigationItem
          name={"Contact"}
          routeTo="contact"
          portrait={currentDevice}
          icon={<GroupIcon />}
        />
      </StNavigationItems>

      {!localUserDetails ? (
        <StNavigationBottom>
          Nog geen account?
          <StNavigationAnchor to="aanmelden">
            Klik hier om aan te melden!
          </StNavigationAnchor>
        </StNavigationBottom>
      ) : (
        <StNavigationBottom>
          Welkom {localUserDetails.username}
          <button onClick={onLogoutClicked}>Uitloggen</button>
        </StNavigationBottom>
      )}
    </StNavigation>
  );
};

export default Navigation;
