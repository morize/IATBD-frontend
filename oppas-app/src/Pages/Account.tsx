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
  return (
    <StArticle>
      <StH1>Account</StH1>
      <StSection>
        <StH2>Algemene Gegevens:</StH2>
        <StAccountDetails>
          <StLabel>Gebruikersnaam:</StLabel>
          <StP>Mauriccio Rodrigo</StP>

          <StLabel>Email:</StLabel>
          <StP>mauricemr@outlook.com</StP>

          <StLabel>Telefoonnummer:</StLabel>
          <StP>18923812845</StP>

          <StLabel>Opasser Status:</StLabel>
          <StP>Actief</StP>
        </StAccountDetails>

        <BaseButton label="Uitloggen" variant="danger" />
      </StSection>
    </StArticle>
  );
};

export default Account;
