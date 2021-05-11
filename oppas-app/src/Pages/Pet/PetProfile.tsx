import styled from "styled-components";
import { useParams } from "react-router-dom";

import { StH2, StLabel, StP, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../..//Utils/Images/dog_pattern.jpg";

const StProfileParent = styled(StSection)`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 40px 32px;
  background: url(${dogPattern});
  border-radius: 8px;

  & figure {
    position: relative;
    width: 50%;
    min-height: 250px;
    margin: 0;
    padding: 0;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    & img {
      width: 100%;
      object-fit: cover;
      height: 78%;
      border-radius: 8px 8px 0 0;
    }

    & figcaption {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 22%;
      background: #be8b4e;
      color: #ffff;
      font-size: 16px;
      border-radius: 0 0 8px 8px;
    }
  }
`;

const StProfileContent = styled.div`
  position: relative;
  display: flex;
  width: 45%;
  background: #dfc28b;
  border-radius: 8px;
`;

const StProfileContentSitter = styled(StProfileContent)`
  width: 100%;
  min-height: 240px;
  margin-top: 8%;
`;

const StProfileBottomTitle = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 22%;
  border-radius: 0 0 8px 8px;
  background: #be8b4e;
  color: #ffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const StProfileDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 78%;
  color: #87571f;
  text-align: center;

  & label {
    display: block;
    color: #87571f;
    font-weight: 600;
    margin-bottom: 4px;
  }

  & p {
    margin: 0 0 8px 0;

    &:last-child {
      margin: 0;
    }
  }
`;

const StProfileDetailsSitter = styled(StProfileDetails)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  padding: 0 16%;

  & div {
    margin-right: 2%;

    &:last-child {
      width: 100%;
      margin: 4% 0 0 0;
    }
  }
`;

interface IProfilePet {
  name: string;
  kind: string;
  breed: string;
}

const PetInfo = ({ name, kind, breed }: IProfilePet) => {
  return (
    <StProfileContent>
      <StProfileDetails>
        <StLabel>Naam:</StLabel>
        <StP>{name}</StP>
        <StLabel>Soort:</StLabel>
        <StP>{kind}</StP>
        <StLabel>Ras:</StLabel>
        <StP>{breed}</StP>
      </StProfileDetails>

      <StProfileBottomTitle>Huisdier informatie</StProfileBottomTitle>
    </StProfileContent>
  );
};

interface IProfileSitter {
  dstart: string;
  dend: string;
  payment: string;
  remarks: string;
}

const SitterInfo = ({ dstart, dend, payment, remarks }: IProfileSitter) => {
  return (
    <StProfileContentSitter>
      <StProfileDetailsSitter>
        <div>
          <StLabel>Datum Start:</StLabel>
          <StP>{dstart}</StP>
        </div>

        <div>
          <StLabel>Datum Eind:</StLabel>
          <StP>{dend}</StP>
        </div>

        <div>
          <StLabel>Uurtarief:</StLabel>
          <StP>{payment}</StP>
        </div>

        <div>
          <StLabel>Opmerkingen:</StLabel>
          <StP>{remarks}</StP>
        </div>
      </StProfileDetailsSitter>

      <StProfileBottomTitle>Oppas informatie</StProfileBottomTitle>
    </StProfileContentSitter>
  );
};



const PetProfile = () => {
  // Fetch with id
  const { id } = useParams();

  return (
    <>
      <StH2>{`Profiel voor ${id}`}</StH2>
      <StProfileParent>
        <figure>
          <img src={"https://pbs.twimg.com/media/CyTv5WOWEAASezv.jpg"} />
          <figcaption>Baco</figcaption>
        </figure>

        <PetInfo name="brother" kind="dog" breed="boxer" />
        <SitterInfo
          dstart="19/09/2020"
          dend="19/09/2020"
          payment="3 euro"
          remarks="baco is a cute doggie. a bit too ugly though.qwdqwdqwdqwdqwdqwdqwdqwdqwd"
        />
      </StProfileParent>
    </>
  );
};

export default PetProfile;
