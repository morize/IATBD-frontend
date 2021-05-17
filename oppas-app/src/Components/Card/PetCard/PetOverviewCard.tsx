import styled from "styled-components";

const StPetCard = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 14rem;
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

const StFeeIndicator = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 4rem;
  right: -2rem;
  width: 5rem;
  height: 5rem;

  text-align: center;
  background: #a75d5d;
  color: #ffff;
  font-size: 0.8rem;
  border-radius: 50%;
  white-space: pre-wrap;
`;

const StKindIndicator = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 6rem;
  width: 7rem;
  height: 3rem;
  text-align: center;
  background: rgba(171, 128, 88, 0.9);
  color: #ffff;
  font-size: 0.8rem;
  border-radius: 0 8px 8px 0;
  white-space: pre-wrap;
`;

interface IPetOverviewCard {
  petName: string;
  petKind: string;
  petImg?: string;
  sitterHourlyPrize: number;
  onClick: () => void;
}

const PetOverviewCard = ({
  petName,
  petKind,
  petImg = "https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg",
  sitterHourlyPrize,
  onClick,
}: IPetOverviewCard) => (
  <StPetCard onClick={onClick}>
    <img
      alt="Afbeelding van een huisdier."
      srcSet={petImg}
    />
    <figcaption>{petName}</figcaption>
    <StFeeIndicator>{`${sitterHourlyPrize}€\np/uur`}</StFeeIndicator>
    <StKindIndicator>{petKind}</StKindIndicator>
  </StPetCard>
);

export default PetOverviewCard;
