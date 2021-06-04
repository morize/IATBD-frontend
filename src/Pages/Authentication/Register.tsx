import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { register, login } from "../../Api/AuthCalls";
import {
  StH1,
  StSection,
  StForm,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import Variants from "../../Utils/Variants";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";

const StErrorMessage = styled.p`
  margin: -16px 0 30px 0;
  color: ${Variants.danger};
`;

const Register = () => {
  const navigate = useNavigate();

  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfPassword, setFormConfPassword] = useState("");
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [error, setError] = useState(false);

  const submitRegisterData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingComponent(true);

    let formData = {
      name: formUsername,
      email: formEmail,
      password: formPassword,
      password_confirmation: formConfPassword,
    };

    register(formData)
      .then(() =>
        login(formData.email, formData.password).then(() =>
          navigate("../../account")
        )
      )
      .catch(() => {
        setError(true);
        setLoadingComponent(false);
      });
  };

  return !loadingComponent ? (
    <StSection>
      <StH1>Aanmelden</StH1>
      <StForm onSubmit={submitRegisterData}>
        <BaseInput
          label="Gebruikersnaam:"
          placeholder="Voer uw gebruikersnaam in"
          onChange={(e) => setFormUsername(e.target.value)}
        />
        <BaseInput
          label="Email:"
          placeholder="Voer uw email in"
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <BaseInput
          label="Wachtwoord:"
          type="password"
          placeholder="Voer uw wachtwoord in"
          onChange={(e) => setFormPassword(e.target.value)}
        />
        <BaseInput
          label="Herhaal wachtwoord:"
          type="password"
          placeholder="Voer uw wachtwoord in nogmaals"
          onChange={(e) => setFormConfPassword(e.target.value)}
        />
        {error && (
          <StErrorMessage>
            De registratie is mislukt, probeer nogmaals.
          </StErrorMessage>
        )}

        <BaseButton type="submit" label="Register" />
      </StForm>
    </StSection>
  ) : (
    <LoadingComponent />
  );
};

export default Register;
