import { useState, useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import BaseButton from "../../Components/Button/BaseButton";
import { StH2, StSection, StP, StLabel } from "../../Utils/HTMLComponents";
import {
  sendEmailVerificationLink,
  getUserDetails,
  logout,
} from "../../Hooks/Api";

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

const AccountGegevens = () => {
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

  const onVerificationClicked = (e: MouseEvent<HTMLButtonElement>) => {
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
  );
};

export default AccountGegevens;
