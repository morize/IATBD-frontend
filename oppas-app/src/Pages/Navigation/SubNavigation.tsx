import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import { StH1 } from "../../Utils/HTMLComponents";

const SubNavigationContainer = styled.section`
  position: sticky;
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  top: 40px;
  width: 25%;
  text-align: center;

  & ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    & a {
      display: block;
      text-decoration: none;
      color: #545454;
    }
  }
`;

const StSubNavigationTitle = styled(StH1)`
  text-transform: capitalize;
`;

const getSubNavigationOptions = (path: string) => {
  switch (path) {
    case "home":
      return ["Introductie", "Werking", "Contact"];

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
          <NavLink to={`${mainPath}/${option.toLowerCase()}`}>{option}</NavLink>
        ))}
      </ul>
    </SubNavigationContainer>
  );
};

export default SubNavigation;
