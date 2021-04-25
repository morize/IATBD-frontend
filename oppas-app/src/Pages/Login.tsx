import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { StH1, StArticle, StLabel, StP } from "../Assets/HTMLComponents";
import Variants from "../Assets/Variants";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";
import Checkbox from "../Components/Checkbox/Checkbox";

import { login } from "../Hooks/Api";

const StPasswordResetInfo = styled(StP)`
  margin-bottom: 32px;
`;

const StForm = styled.form`
  position: relative;

  & div {
    user-select: none;
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const StPasswordForgotAnchor = styled.a`
  position: absolute;
  right: 0;

  & label {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: ${Variants.info};
    text-decoration: underline;
  }
`;

const StErrorMessage = styled.p`
  color: ${Variants.danger};
  margin: -20px 0 30px 0;
`;

const StRegister = styled.section`
  margin-top: 120px;
  font-size: 18px;
  text-align: center;
  color: ${Variants.primary};
  white-space: pre-wrap;

  & a {
    display: block;
    margin-top: 10px;
    font-weight: 600;
    color: ${Variants.primary};
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface LocationState {
  state: { didPasswordReset?: string } | null;
}

const Login = () => {
  const [formEmail, setFormEmail] = useState("mauricemr@outlook.com");
  const [formPassword, setFormPassword] = useState("Hilol123.");
  const [formError, setFormError] = useState(false);
  const [rememberMeCheck, setRememberMeCheck] = useState(false);

  const { state }: LocationState = useLocation();
  const navigate = useNavigate();

  // Redux storechange logic
  // Not needed because its not persistent when the page refreshes
  // But i'll leave it here just in case its somehow better than localstorage.
  // ------------ LOGIC ---------------
  // const dispatch = useDispatch();
  // const dispatchUserDetails = (
  //   username: string,
  //   isBlocked: number,
  //   isAdmin: number
  // ) => {
  //   dispatch(
  //     setUserDetails({
  //       userDetails: {
  //         username: username,
  //         isAdmin: isAdmin,
  //         isBlocked: isBlocked,
  //       },
  //     })
  //   );
  // };

  const submitLoginData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    login(formEmail, formPassword, rememberMeCheck)
      .then(() => {
        navigate("../../account");
      })
      .catch(() => {
        setFormError(true);
      });
  };

  const onPasswordResetClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("../wachtwoord-vergeten");
  };

  const onRegisterClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("../aanmelden");
  };

  return (
    <StArticle>
      <StH1>Inloggen</StH1>

      {state && (
        <StPasswordResetInfo variant={"success"}>
          U heeft uw wachtwoord opnieuw ingesteld.
        </StPasswordResetInfo>
      )}

      <StForm>
        <BaseInput
          label="Email:"
          placeholder="Voer uw email in"
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <StPasswordForgotAnchor onClick={onPasswordResetClicked}>
          <StLabel>Wachtwoord vergeten?</StLabel>
        </StPasswordForgotAnchor>

        <BaseInput
          label="Wachtwoord:"
          type="password"
          placeholder="Voer uw wachtwoord in"
          onChange={(e) => setFormPassword(e.target.value)}
        />

        {formError && (
          <StErrorMessage>
            De aanmelding is mislukt, probeer nogmaals.
          </StErrorMessage>
        )}

        <Checkbox
          label="Ingelogd blijven"
          margin="-24px 0 24px -8px"
          checked={rememberMeCheck}
          onClick={() => setRememberMeCheck(!rememberMeCheck)}
        />

        <BaseButton type="submit" label="Inloggen" onClick={submitLoginData} />
      </StForm>

      <StRegister>
        {"Nog geen account?\n"}
        <a href="#register" onClick={onRegisterClicked}>
          Klik hier om aan te melden!
        </a>
      </StRegister>
    </StArticle>
  );
};

export default Login;
