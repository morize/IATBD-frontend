import { useEffect, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import BaseButton from "../Components/Button/BaseButton";
import BaseInput from "../Components/Input/BaseInput";
import Checkbox from "../Components/Checkbox/Checkbox";
import {
  StH1,
  StH2,
  StH3,
  StArticle,
  StSection,
  StP,
  StLabel,
  StForm,
} from "../Assets/HTMLComponents";
import {
  sendEmailVerificationLink,
  getUserDetails,
  logout,
} from "../Hooks/Api";

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

const StSectionVerify = styled(StSection)`
  margin-bottom: 30px;
  text-align: center;
`;

const StOptionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px 84px;
  margin-bottom: 32px;

  & label {
    flex-direction: column;
    border-radius: 14px;
    &:hover {
      background: rgba(72, 72, 72, 0.1);
    }
  }
`;

const Account = () => {
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    verified: string;
    telephoneNumber: string;
    isAdmin: string;
    isBlocked: string;
  }>({
    name: "-",
    email: "-",
    verified: "-",
    telephoneNumber: "-",
    isAdmin: "-",
    isBlocked: "-",
  });

  const navigate = useNavigate();

  const onVerificationClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendEmailVerificationLink();
  };

  const onLogoutClicked = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout().then(() => {
      navigate("../../home");
    });
  };

  useEffect(() => {
    if (userDetails.name === "-") {
      getUserDetails().then((response) => {
        setUserDetails({
          name: response.name,
          email: response.email,
          verified: response.email_verified_at
            ? "Geverifieerd"
            : "Niet geverifieerd",
          telephoneNumber: "06466709788",
          isBlocked: response.blocked === 1 ? "Geblokkeerd" : "Actief",
          isAdmin: response.blocked === 1 ? "Ja" : "Nee",
        });
      });
    }
  }, [setUserDetails, userDetails]);

  return (
    <StArticle>
      <StH1>Account</StH1>
      <StSection>
        <StH2>Algemene Gegevens</StH2>
        <StAccountDetails>
          <StLabel>Gebruikersnaam:</StLabel>
          <StP>{userDetails.name}</StP>

          <StLabel>Email:</StLabel>
          <StP>{userDetails.email}</StP>

          <StLabel>Email Status:</StLabel>
          <StP>{userDetails.verified}</StP>

          <StLabel>Account Status:</StLabel>
          <StP>{userDetails.isBlocked}</StP>

          {userDetails.isAdmin === "Ja" && (
            <>
              <StLabel>Admin:</StLabel>
              <StP>{userDetails.isAdmin}</StP>
            </>
          )}
        </StAccountDetails>

        {userDetails.verified === "Niet geverifieerd" && (
          <StSectionVerify>
            <StP variant="info" bold={true}>
              {
                "Verifieer uw account om verder gebruik te maken van Passen op je Dier.\nU ontvangt zo een verificatielink op uw geregistreerde email."
              }
            </StP>
            <BaseButton
              label="Emailverificatie opnieuw sturen"
              variant="secondary"
              onClick={onVerificationClicked}
            />
          </StSectionVerify>
        )}

        <BaseButton
          label="Uitloggen"
          variant="secondary"
          onClick={onLogoutClicked}
        />
      </StSection>

      <StSection>
        <StH2>Profiel Media</StH2>

        <StForm>
          <BaseInput type="file" label="Huisfoto 1:" icon={<PublishIcon />} />
          <BaseInput type="file" label="Huisfoto 2:" icon={<PublishIcon />} />
          <BaseInput
            label="Youtube video:"
            placeholder="eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            icon={<VideoLibraryIcon />}
          />

          <BaseButton label="Media opslaan" />
        </StForm>
      </StSection>

      <StSection>
        <StH2>Opasser Status</StH2>

        <StForm>
          <StH3>Dierensoorten voor oppas</StH3>

          <StOptionsContainer>
            <Checkbox label="Katten" />
            <Checkbox label="Honden" />
            <Checkbox label="Cavia's" />
            <Checkbox label="Vissen" />
          </StOptionsContainer>

          <BaseButton label="Dierensoorten opslaan" />
        </StForm>
      </StSection>
    </StArticle>
  );
};

export default Account;
