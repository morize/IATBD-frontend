import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { laravelApiUrl } from "../../Api/Api";
import { getSpecificPet } from "../../Api/PetCalls";
import { StH2, StLabel, StP, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

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
    height: 18rem;
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

const PetInfo = ({ name, kind, breed }: IProfilePet) => (
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

interface IProfileSitter {
  dstart: string;
  dend: string;
  payment: string;
  remarks: string;
}

const SitterInfo = ({ dstart, dend, payment, remarks }: IProfileSitter) => (
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

const PetProfile = () => {
  const { id } = useParams();

  const { data: petProfileData } = useSWR(
    `api/pets/${id}`,
    getSpecificPet
  );
  
  return (
    <>
      <StH2>{`Profiel van huisdier: ${
        petProfileData ? petProfileData.pet_name : ""
      }`}</StH2>
      <StProfileParent>
        <figure>
          <img
            alt="Afbeelding van een huisdier"
            src={`${laravelApiUrl}/api/pets/${id}/image`}
          />
          <figcaption>
            {petProfileData ? petProfileData.pet_name : "-"}
          </figcaption>
        </figure>

        <PetInfo
          name={petProfileData ? petProfileData.pet_name : "-"}
          kind={petProfileData ? petProfileData.pet_kind : "-"}
          breed={petProfileData ? petProfileData.pet_breed : "-"}
        />
        <SitterInfo
          dstart={petProfileData ? petProfileData.sit_date_start : "-"}
          dend={petProfileData ? petProfileData.sit_date_end : "-"}
          payment={petProfileData ? `${petProfileData.sit_hourly_prize.toString()} €` : "-"}
          remarks={petProfileData ? petProfileData.sit_remarks : "-"}
        />
      </StProfileParent>
    </>
  );
};

export default PetProfile;
