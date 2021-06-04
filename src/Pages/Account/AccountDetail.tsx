import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import {
  StH2,
  StH3,
  StSection,
  StP,
  StLabel,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import { sendEmailVerificationLink, logout } from "../../Api/AuthCalls";
import { getUserDetails } from "../../Api/UserCalls";
import BaseButton from "../../Components/Button/BaseButton";

const StAccountDetails = styled.section`
  & div {
    display: flex;

    & p {
      margin-left: auto;
    }
  }
`;

const StSectionVerify = styled(StSection)`
  & p {
    margin-bottom: 4%;
  }
  
  margin-bottom: 4%;
  text-align: center;
`;

const AccountGegevens = () => {
  const navigate = useNavigate();

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: accountData, isValidating: isAccountDataLoaded } = useSWR(
    `api/user/${userId}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const onLogoutClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => navigate("../../home"));
  };

  return !isAccountDataLoaded ? (
    <>
      <StH2>Algemeen</StH2>

      <StSection>
        <StH3>Account Gegevens</StH3>
        <StAccountDetails>
          <div>
            <StLabel>Gebruikersnaam:</StLabel>
            <StP>{accountData?.name ? accountData.name : "-"}</StP>
          </div>
          <div>
            <StLabel>Email:</StLabel>
            <StP>{accountData?.email ? accountData.email : "-"}</StP>
          </div>
          <div>
            <StLabel>Email Status:</StLabel>
            <StP>
              {accountData?.email_verified_at
                ? "Geverifieerd"
                : "Niet geverifieerd"}
            </StP>
          </div>
          <div>
            <StLabel>Account Status:</StLabel>
            <StP>
              {accountData?.status === "blocked" ? "Geblokkeerd" : "Actief"}
            </StP>
          </div>
        </StAccountDetails>
      </StSection>

      <StSection>
        <StH3>Acties</StH3>
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
  ) : (
    <LoadingComponent />
  );
};

export default AccountGegevens;
