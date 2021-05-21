import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { sendEmailVerificationLink, logout } from "../../Api/AuthCalls";
import { getUserDetails } from "../../Api/UserCalls";
import BaseButton from "../../Components/Button/BaseButton";
import {
  StH2,
  StH3,
  StSection,
  StP,
  StLabel,
} from "../../Utils/HTMLComponents";

const StAccountDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin: 32px 0;

  & p {
    margin-top: -22px;
    margin-left: auto;
  }
`;

const StSectionVerify = styled(StSection)`
  margin-bottom: 32px;
  text-align: center;
`;

const AccountGegevens = () => {
  const navigate = useNavigate();

  const { data: accountData } = useSWR(
    `api/user/${
      JSON.parse(localStorage.getItem("userDetails")!)["uuid"]
    }`,
    getUserDetails
  );

  const onLogoutClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => {
      navigate("../../home");
    });
  };

  return (
    <>
      <StH2>Algemeen</StH2>

      <StSection>
        <StH3>Account Gegevens</StH3>
        <StAccountDetails>
          <StLabel>Gebruikersnaam:</StLabel>
          <StP>{accountData?.name ? accountData.name : "-"}</StP>

          <StLabel>Email:</StLabel>
          <StP>{accountData?.email ? accountData.email : "-"}</StP>

          <StLabel>Email Status:</StLabel>
          <StP>
            {accountData?.email_verified_at
              ? "Geverifieerd"
              : "Niet geverifieerd"}
          </StP>

          <StLabel>Account Status:</StLabel>
          <StP>{accountData?.blocked === 1 ? "Geblokkeerd" : "Standaard"}</StP>
        </StAccountDetails>

        {!accountData?.email_verified_at && (
          <StSectionVerify>
            <StP variant="info" bold={true}>
              {
                "Verifieer uw account om verder gebruik te maken van Passen op je Dier.\nU ontvangt zo een verificatielink op uw geregistreerde email."
              }
            </StP>
            <BaseButton
              label="Emailverificatie opnieuw sturen"
              variant="primary"
              onClick={() => sendEmailVerificationLink()}
            />
          </StSectionVerify>
        )}

        <BaseButton
          label="Uitloggen"
          variant="secondary"
          onClick={onLogoutClicked}
        />
      </StSection>
    </>
  );
};

export default AccountGegevens;
