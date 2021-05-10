import styled from "styled-components";
import { useParams } from "react-router-dom";

import { StH2, StH3, StSection } from "../../Utils/HTMLComponents";

const StProfileSection = styled(StSection)`
  & figure {
    display: flex;
    margin: 0;
    padding: 0;
    background: red;
    justify-content: center;
    align-items: center;

    & img {
      width: 30%;
      min-height: 100%;
    }
  }
`;

const PetProfile = () => {
  const { id } = useParams();

  return (
    <>
      <StH2>{id}</StH2>
      <StProfileSection>
        <figure>
          <img src={"https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg"} />
        </figure>
      </StProfileSection>
    </>
  );
};

export default PetProfile;
