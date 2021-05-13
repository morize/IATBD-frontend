import styled from "styled-components";
import { useParams } from "react-router-dom";

import { StH2, StLabel, StP, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StProfileParent = styled(StSection)`
  display: grid;
  padding: 40px 32px;
  background: url(${dogPattern});
  border-radius: 8px;
`;

const PetOverview = () => {

    // get array of map
  return (
    <>
      <StH2>Beschikbare huisdieren</StH2>
      <StSection><StProfileParent/></StSection>
    </>
  );
};

export default PetOverview;
