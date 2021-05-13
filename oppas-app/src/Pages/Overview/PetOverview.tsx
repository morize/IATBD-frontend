import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import SelectButton from "../../Components/Button/SelectButton/SelectButton";
import PetOverviewCard from "../../Components/Card/PetCard/PetOverviewCard";

import { StH1, StH2, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StOverview = styled(StSection)`
  display: flex;
  flex-direction: column;
  background: url(${dogPattern});
  border-radius: 8px;
  padding: 2rem 0;
  min-height: 34rem;
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
  const navigate=useNavigate();
  // get array of map
  return (
    <>
      <StSection>
        <StH1>Overzicht</StH1>
        <StH2>Beschikbare huisdieren</StH2>
        <StOverview>
          <StOverviewHeader>
            <SelectButton options={[{value: "yes", label:"filter"}]} placeholder="Huisdier Soort"/>
            <SelectButton options={[{value: "yes", label:"filter"}]} placeholder="Uurtarief"/>
          
          </StOverviewHeader>
          <StOverviewGrid>
            <PetOverviewCard onClick={()=>{navigate("qweqweqwe/profiel")}} />
            <PetOverviewCard onClick={()=>{navigate("qweqweqwe/profiel")}} />
            <PetOverviewCard onClick={()=>{navigate("qweqweqwe/profiel")}} />
          </StOverviewGrid>
        </StOverview>
      </StSection>
    </>
  );
};

export default PetOverview;
