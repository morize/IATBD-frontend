import { useState } from "react";
import styled from "styled-components";

import { sendResetPasswordEmail } from "../../Api/AuthCalls";
import { StH2, StSection, StP } from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";

const StForgotPasswordContainer = styled(StSection)`
  & p {
    margin-bottom: 24px;
  }

  & button {
    margin-top: 24px;
  }
`;

const ForgotPassword = () => {
  const [emailToRecover, setEmailToRecover] = useState("");
  const [emailStatus, setEmailStatus] = useState("default");

  const onResetPasswordClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sendResetPasswordEmail(emailToRecover)
      .then(() => setEmailStatus("sent"))
      .catch(() => setEmailStatus("error"));
  };

  return (
    <StForgotPasswordContainer>
      <StH2>Wachtwoord vergeten</StH2>
      <StP variant="default">
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

      {emailStatus === "error" && (
        <StP variant={"danger"}>
          {"Er is iets misgegaan, probeer opnieuw met een andere email."}
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
