import { ReactNode } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

import dogPattern from "../../../Utils/Images/dog_pattern.jpg";

const PetCardContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 160px;
  margin-bottom: 32px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  & figure {
    display: flex;
    width: 35%;
    height: 100%;
    margin: 0;
    background: none;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 8px 0 0 10px;
      object-fit: cover;
    }
  }
`;

const PetCardContent = styled.div`
  width: 65%;
  height: 100%;
`;

const PetCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;

  font-size: 120%;
  border-radius: 0 8px 0 0;
  background: #bc9d61;
  color: #ffff;
`;

const PetCardDescription = styled(PetCardHeader)`
  height: 60%;
  border-radius: 0 0 8px 0;
  font-size: 100%;
  background: #e9ce88;
  color: #744226;
`;

export interface IPetCardItem {
  routeTo: string;
}

export const PetCardItem = ({ routeTo }: IPetCardItem) => {
  return (
    <PetCardContainer to={routeTo}>
      <figure>
        <img
          src="https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg"
          alt="Een huisdier"
        />
      </figure>

      <PetCardContent>
        <PetCardHeader>Baco </PetCardHeader>
        <PetCardDescription>wat the fuc</PetCardDescription>
      </PetCardContent>
    </PetCardContainer>
  );
};

export const StPetItemsContainer = styled.section`
  display: grid;
  justify-content: center;
  padding: 40px 32px;
  background-image: url(${dogPattern});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & p {
    align-self: center;
    margin: 0;
    padding: 16px;
    border-radius: 8px;
    background: #e9ce88;
    color: #744226;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const StAddPetButton = styled.button`
    margin: 12px 0 0 0;
    height: 60px;
    border: none;
    border-radius:8px;
    font-size: 16px;
    font-weight:600;
    background: #A77326;
    color: #ffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;`;

export interface IPetCard {
  children?: ReactNode;
  variant: "sitter" | "owner";
}

const PetCard = ({ children, variant }: IPetCard) => {
  const navigate = useNavigate();

  const onAddPetClick = () => navigate("nieuw-huisdier");

  const emptyList = !children && (
    <p>
      {variant === "sitter"
        ? "U heeft geen oppasaanvragen"
        : "U heeft geen aangemelde huisdieren"}
    </p>
  );

  const addButton = variant === "owner" && (
    <StAddPetButton onClick={onAddPetClick}>Stel huisdier voor oppas</StAddPetButton>
  );
  
  return (
    <StPetItemsContainer>
      {children}
      {emptyList}
      {addButton}
    </StPetItemsContainer>
  );
};

export default PetCard;
