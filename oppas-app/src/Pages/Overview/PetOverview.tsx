import styled from "styled-components";
import { useParams } from "react-router-dom";

import PetOverviewCard from "../../Components/Card/PetCard/PetOverviewCard";
import BaseButton from "../../Components/Button/BaseButton";
import { StH1, StH2, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StOverview = styled(StSection)`
  display: flex;
  flex-direction: column;
  background: url(${dogPattern});
  border-radius: 8px;
  padding: 2rem 0;
`;

const StOverviewHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.8rem 4rem;

  & button {
    width: 12rem;
    margin-right: 0.8rem;
    
    &:last-child {
      margin: 0;
    }
  }
`;
const StOverviewGrid = styled(StSection)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 14rem);
  grid-gap: 4rem;
`;

const PetOverview = () => {
  // get array of map
  return (
    <>
      <StSection>
        <StH1>Overzicht</StH1>
        <StH2>Beschikbare huisdieren</StH2>
        <StOverview>
          <StOverviewHeader>
            <BaseButton label="Filter" />
            <BaseButton label="Filter" />
            <BaseButton label="Filter" />
          </StOverviewHeader>
          <StOverviewGrid>
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
            <PetOverviewCard />
          </StOverviewGrid>
        </StOverview>
      </StSection>
    </>
  );
};

export default PetOverview;
