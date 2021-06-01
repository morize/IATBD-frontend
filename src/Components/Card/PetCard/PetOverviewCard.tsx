import styled from "styled-components";

const StPetOverviewCard = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 220px;
  margin: 0;
  cursor: pointer;

  & img {
    height: 76%;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  }

  & figcaption {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24%;
    margin: 0;
    background: #be8b4e;
    color: #ffff;
    border-radius: 0 0 8px 8px;
  }
`;

const StPayIndicator = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20%;
  right: -16%;
  width: 34%;
  height: 34%;
  border-radius: 50%;
  background: #a75d5d;
  text-align: center;
  font-size: 0.8rem;
  color: #ffff;
  white-space: pre-wrap;
`;

const StKindIndicator = styled(StPayIndicator)`
  top: 40%;
  left: 0;
  width: 50%;
  height: 20%;
  border-radius: 0 8px 8px 0;
  background: rgba(171, 128, 88, 1);
`;

interface IPetOverviewCard {
  petName: string;
  petKind: string;
  petImgUrl: string;
  sitterHourlyPrize: number;
  onClick: () => void;
}

const PetOverviewCard = (props: IPetOverviewCard) => (
  <StPetOverviewCard onClick={props.onClick}>
    <img alt="Afbeelding van een huisdier." srcSet={props.petImgUrl} />
    <figcaption>{props.petName}</figcaption>
    <StPayIndicator>{`${props.sitterHourlyPrize}€\np/uur`}</StPayIndicator>
    <StKindIndicator>{props.petKind}</StKindIndicator>
  </StPetOverviewCard>
);

export default PetOverviewCard;
