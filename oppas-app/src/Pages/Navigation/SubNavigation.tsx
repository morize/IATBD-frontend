import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import Variants from "../../Utils/Variants";

const SubNavigationContainer = styled.section`
  position: sticky;
  top: 0;
  width: 16vw;
  margin: 0 32px;

  & h1 {
    margin: 0;
    font-size: 2.4rem;
    color: ${Variants.default};
    text-align: center;
    text-transform: capitalize;
  }

  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 42px 0 0 0;
    padding: 0;
    user-select: none;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: 180px;
      margin-bottom: 60px;
      border-radius: 8px;
      color: ${Variants.default};

      &.subnavigation-active {
        background: #59a83d;
        color: #ffff;
        text-decoration: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

const getSubNavigationOptions = (path: string) => {
  switch (path) {
    case "account":
      return {
        default: "Algemeen",
        options: ["Algemeen", "Media", "Opasser", "Huisdieren"],
      };
  }
  return { default: "Default", options: ["Option"] };
};

const SubNavigation = () => {
  const { pathname } = useLocation();

  const subNavigationObject = getSubNavigationOptions(pathname.split("/")[1]);

  return (
    <SubNavigationContainer>
      <h1>{pathname.split("/")[1]}</h1>
      <ul>
        {subNavigationObject.options.map((option: string, index, key) => (
          <NavLink
            activeClassName="subnavigation-active"
            to={`${pathname.split("/")[1]}/${option.toLowerCase()}`}
            className={
              index === 0 && !pathname.split("/")[2]
                ? "subnavigation-active"
                : ""
            }
            key={key[index]}
          >
            {option}
          </NavLink>
        ))}
      </ul>
    </SubNavigationContainer>
  );
};

export default SubNavigation;
