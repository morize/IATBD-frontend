import styled from "styled-components";
import {
  StH1,
  StH2,
  StArticle,
  StSection,
  StP,
  StLabel,
} from "../Utils/HTMLComponents";

import BaseButton from "../Components/Button/BaseButton";
import { sendEmailVerificationLink } from "../Hooks/Api";

const StAccountDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin: 32px 0;

  & label {
    margin-right: auto;
  }

  & p {
    margin-top: -22px;
    margin-left: auto;
  }
`;

const Account = () => {
  const localUserDetails = JSON.parse(localStorage.getItem("userDetails")!);

  const onVerificationClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendEmailVerificationLink("mauricemr@outlook.com", "Hilol123.");
  };

  return (
    <StArticle>
      <StH1>Account</StH1>
      <StSection>
        <StH2>Algemene Gegevens:</StH2>
        <StAccountDetails>
          <StLabel>Gebruikersnaam:</StLabel>
          <StP>{localUserDetails.username}</StP>

          <StLabel>Email:</StLabel>
          <StP>{localUserDetails.email}</StP>

          <StLabel>Telefoonnummer:</StLabel>
          <StP>18923812845</StP>

          <StLabel>Opasser Status:</StLabel>
          <StP>Actief</StP>
        </StAccountDetails>

        <BaseButton
          label="Stuur email verificatie link"
          variant="secondary"
          onClick={onVerificationClicked}
        />
        <br></br>
        <BaseButton label="Uitloggen" variant="danger" />
      </StSection>
    </StArticle>
  );
};

export default Account;
