import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import styled from "styled-components";

import { login } from "../../Api/AuthCalls";
import {
  LoadingComponent,
  StH2,
  StSection,
  StLabel,
  StP,
  StForm,
  StErrorMessage,
} from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";
import Checkbox from "../../Components/Checkbox/Checkbox";

const StPasswordResetIndicator = styled(StP)`
  margin-bottom: 32px;
`;

const StPasswordForgotAnchor = styled.a`
  position: absolute;
  right: 0;

  & label {
    font-size: clamp(0.8rem, 0.9vw, 1rem);
    color: ${Variants.info};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StRegisterRedirect = styled.section`
  margin-top: 8%;
  text-align: center;
  font-size: clamp(0.9rem, 4vw, 1.2rem);
  color: ${Variants.primary};
  white-space: pre-wrap;

  & a {
    display: block;
    margin-top: 2%;
    font-weight: 600;
    color: ${Variants.primary};
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    margin-top: auto;
    margin-bottom: clamp(2rem, 15%, 8rem);
  }
`;

interface LocationState {
  state: { didPasswordReset?: string } | null;
}

const Login = () => {
  const navigate = useNavigate();
  const { state }: LocationState = useLocation();

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formStatus, setFormStatus] = useState("default");
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [rememberMeCheck, setRememberMeCheck] = useState(false);

  const submitFormLoginData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingComponent(true);

    login(formEmail, formPassword, rememberMeCheck)
      .then(() => navigate("../../account"))
      .catch(() => {
        setLoadingComponent(false);
        setFormStatus("error");
      });
  };

  return !loadingComponent ? (
    <>
      <StSection>
        <StH2>Inloggen</StH2>

        {state?.didPasswordReset && (
          <StPasswordResetIndicator variant="success">
            U heeft uw wachtwoord opnieuw ingesteld.
          </StPasswordResetIndicator>
        )}

        <StForm onSubmit={submitFormLoginData}>
          <BaseInput
            label="Email:"
            placeholder="Voer uw email in"
            onChange={(e) => setFormEmail(e.target.value)}
          />
          <StPasswordForgotAnchor
            onClick={() => navigate("../wachtwoord-vergeten")}
          >
            <StLabel>Wachtwoord vergeten?</StLabel>
          </StPasswordForgotAnchor>

          <BaseInput
            label="Wachtwoord:"
            type="password"
            placeholder="Voer uw wachtwoord in"
            onChange={(e) => setFormPassword(e.target.value)}
          />

          {formStatus === "error" && (
            <StErrorMessage>
              De aanmelding is mislukt, probeer nogmaals.
            </StErrorMessage>
          )}

          <Checkbox
            label="Ingelogd blijven"
            margin="-2% 0 2% -8px"
            value="login"
            checked={rememberMeCheck}
            onClick={() => setRememberMeCheck(!rememberMeCheck)}
          />

          <BaseButton label="Inloggen" type="submit" />
        </StForm>
      </StSection>

      <StRegisterRedirect>
        {"Nog geen account?\n"}
        <NavLink to="../aanmelden">Klik hier om aan te melden!</NavLink>
      </StRegisterRedirect>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default Login;
