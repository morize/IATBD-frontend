import { useState } from "react";
import styled from "styled-components";

import { StH1, StArticle, StP } from "../Assets/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";
import { sendResetPasswordEmail } from "../Hooks/Api";

const StForgotPasswordContainer = styled(StArticle)`
  & p {
    margin-bottom: 24px;
  }

  & button {
    margin-top: 24px;
  }
`;

const ForgotPassword = () => {
  const [emailToRecover, setEmailToRecover] = useState("mauricemr@outlook.com");
  const [emailStatus, setEmailStatus] = useState("default");

  const onResetPasswordClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Logic to fire post request
    sendResetPasswordEmail(emailToRecover)
      .then(() => {
        setEmailStatus("sent");
      })
      .catch(() => setEmailStatus("error"));
  };

  return (
    <StForgotPasswordContainer>
      <StH1>Wachtwoord vergeten</StH1>
      <StP variant={"primary"}>
        {
          "Bent u uw wachtwoord vergeten?\n\nAls u nog de geregistreerde email van uw account weet kunnen we een wachtwoordherstel email sturen."
        }
      </StP>

      <BaseInput
        label={"Email:"}
        placeholder={"Vul een geregistreerde email in"}
        value={emailToRecover}
        onChange={(e) => setEmailToRecover(e.target.value)}
      />

      {emailStatus === "sent" && (
        <StP variant={"secondary"}>
          {"Wachtwoordherstel email is verstuurd! Neem een kijk op uw mail."}
        </StP>
      )}

      {emailStatus === "notfound" && (
        <StP variant={"danger"}>{"De ingegeven email is niet gevonden."}</StP>
      )}

      {emailStatus === "error" && (
        <StP variant={"danger"}>
          {"Er is iets misgegaan, probeer later opnieuw."}
        </StP>
      )}

      <BaseButton
        label={"Stuur wachtwoordherstel email"}
        onClick={onResetPasswordClicked}
      />
    </StForgotPasswordContainer>
  );
};

export default ForgotPassword;
