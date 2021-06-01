import styled from "styled-components";

import { StLabel, StP } from "../../../Utils/HTMLComponents";

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

export const StProfileDetailsSitter = styled(StProfileDetails)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  padding: 0 10%;
  background: #dfc28b;
  box-sizing: border-box;

  & div {
    margin-right: 2%;

    &:last-child {
      width: 100%;
      margin: 4% 0 0 0;
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
  margin-top: 4%;
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
`;

interface IProfilePet {
  name: string;
  kind: string;
  breed: string;
}

export const PetInfo = ({ name, kind, breed }: IProfilePet) => (
  <StProfileContent>
    <StProfileDetails>
      <StLabel>Naam huisdier:</StLabel>
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

export const SitterInfo = ({
  dstart,
  dend,
  payment,
  remarks,
}: IProfileSitter) => (
  <StProfileContentSitter>
    <StProfileDetailsSitter>
      <div>
        <StLabel>Datum start:</StLabel>
        <StP>{dstart}</StP>
      </div>

      <div>
        <StLabel>Datum eind:</StLabel>
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
