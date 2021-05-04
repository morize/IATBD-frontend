import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import { StH1 } from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";

const SubNavigationContainer = styled.section`
  position: sticky;
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  top: 0;
  width: 20vw;

  & h1 {
    font-size: 2.2vw;
    text-align: center;
    margin: 0;
  }

  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6vh 0 0 0;
    padding: 0;
    user-select: none;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 8vh;
      width: 10vw;
      margin-bottom: 6vh;
      font-size: 0.9vw;
      color: ${Variants.default};
      border-radius: 0.5vw;

      &.subnavigation-active {
        background: #59a83d;
        color: #ffff;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        text-decoration: none;
      }
    }
  }
`;

const StSubNavigationTitle = styled(StH1)`
  text-transform: capitalize;
`;

const getSubNavigationOptions = (path: string) => {
  switch (path) {
    case "account":
      return {
        default: "Algemeen",
        options: ["Algemeen", "Media", "Opasser", "Huisdieren"],
      };

    case "overzicht":
      return { default: "Overzicht", options: ["Huisdieren", "Opassers"] };
  }
  return { default: "Default", options: ["Option"] };
};

const SubNavigation = () => {
  const { pathname } = useLocation();

  const mainPath = pathname.split("/")[1] ? pathname.split("/")[1] : "home";
  const subNavigationObject = getSubNavigationOptions(mainPath);

  return (
    <SubNavigationContainer>
      <StSubNavigationTitle>{mainPath}</StSubNavigationTitle>
      <ul>
        {subNavigationObject.options.map((option: string, index) => (
          <NavLink
            activeClassName={"subnavigation-active"}
            to={`${mainPath}/${option.toLowerCase()}`}
            className={
              index === 0 && !pathname.split("/")[2]
                ? "subnavigation-active"
                : ""
            }
          >
            {option}
          </NavLink>
        ))}
      </ul>
    </SubNavigationContainer>
  );
};

export default SubNavigation;
