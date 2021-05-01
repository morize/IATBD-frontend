import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import { StH1 } from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";

const SubNavigationContainer = styled.section`
  position: sticky;
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  top: 4vh;
  width: 20vw;

  & h1 {
    font-size: 2vw;
    text-align: center;
  }

  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1vh 0 0 0;
    padding: 0;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 8vh;
      width: 10vw;
      margin-bottom: 6vh;
      font-size: 0.9vw;
      color: ${Variants.default};
      border-radius: 10px;
      box-sizing: border-box;
    }
  }
`;

const StSubNavigationTitle = styled(StH1)`
  text-transform: capitalize;
`;

const getSubNavigationOptions = (path: string) => {
  switch (path) {
    case "account":
      return ["Algemeen", "Media", "Opasser", "Huisdieren"];

    case "overzicht":
      return ["Huisdieren", "Opassers"];

    case "default":
      return [];
  }
  return [];
};

const SubNavigation = () => {
  const { pathname } = useLocation();

  const mainPath = pathname.split("/")[1] ? pathname.split("/")[1] : "home";

  return (
    <SubNavigationContainer>
      <StSubNavigationTitle>{mainPath}</StSubNavigationTitle>
      <ul>
        {getSubNavigationOptions(mainPath).map((option: string) => (
          <NavLink
            activeStyle={{
              background: "#59A83D",
              color: "#ffff",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              textDecoration: "none",
            }}
            to={`${mainPath}/${option.toLowerCase()}`}
          >
            {option}
          </NavLink>
        ))}
      </ul>
    </SubNavigationContainer>
  );
};

export default SubNavigation;
