import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";

import { StH1 } from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";

const SubNavigationContainer = styled.section`
  position: sticky;
  top: 0;
  width: 20vw;
  padding: 32px;
  background: none;
  box-sizing: border-box;

  & h1 {
    text-align: center;
    text-transform: capitalize;

    @media (max-width: 600px) {
      display: none;
    }
  }

  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 64px 0 0 0;
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

  @media (max-width: 600px) {
    width: 100vw;
    height: 110px;
    margin: 0;
    padding: 4% 8%;
    z-index: 3;
    background: #986D3A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: clamp(0.8rem, 1.4vh, 1rem);

    & ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 0;

      & a {
        height: 40px;
        width: 100px;
        margin-bottom: 0;
        color: #fff;
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
      <StH1>{pathname.split("/")[1]}</StH1>
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
