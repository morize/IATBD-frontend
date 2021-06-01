import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { submitNewPassword } from "../../Api/AuthCalls";
import { StH1, StSection, StP } from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";


const StResetPasswordContainer = styled(StSection)`
  & p {
    margin-bottom: 24px;
  }

  & div {
    margin-bottom: 30px;
  }

  & button {
    margin-top: 24px;
  }
`;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { token, email } = useParams();
 
  const onResetPasswordSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    submitNewPassword(email, newPassword, confirmNewPassword, token).then(() =>
      navigate("../../../inloggen", { state: { didPasswordReset: true } })
    );
  };

  return (
    <StResetPasswordContainer>
      <StH1>Reset wachtwoord</StH1>
      <StP variant={"primary"}>Stel een nieuwe wachtwoord voor uw account</StP>

      <BaseInput
        label={"Nieuw wachtwoord:"}
        value={newPassword}
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <BaseInput
        label={"Nieuw wachtwoord opnieuw:"}
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <BaseButton label={"Reset wachtwoord"} onClick={onResetPasswordSubmit} />
    </StResetPasswordContainer>
  );
};

export default ResetPassword;
