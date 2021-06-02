import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { getUserMedia } from "../../Api/UserCalls";
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
import Showcase from "../../Components/Showcase/Showcase";

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

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: accountData, isValidating: isAccountDataLoaded } = useSWR(
    `api/user/${userId}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const { data: mediaData, isValidating: isMediaLoaded } = useSWR(
    `api/users-media/${userId}`,
    getUserMedia,
    { revalidateOnFocus: false }
  );

  const onLogoutClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => navigate("../../home"));
  };

  return !isAccountDataLoaded && !isMediaLoaded ? (
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
          <StP>
            {accountData?.status === "blocked" ? "Geblokkeerd" : "Actief"}
          </StP>
        </StAccountDetails>
      </StSection>

      <StSection>
        <StH3>Profiel Showcase</StH3>
        {mediaData ? (
          <Showcase
            image1={mediaData.image_1}
            image2={mediaData.image_2}
            video={mediaData.video_link}
          />
        ) : (
          <StP variant="secondary">U heeft nog geen media in uw profiel</StP>
        )}
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
