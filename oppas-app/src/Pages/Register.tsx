import { useState } from "react";
import styled from "styled-components";

import api from "../Hooks/Api";
import { StH1, StArticle } from "../Utils/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";

const StForm = styled.form`
  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const Register = () => {
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfPassword, setFormConfPassword] = useState("");

  const submitRegisterData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    api.get("sanctum/csrf-cookie").then((response) => {
      let formData = {
        name: formUsername,
        email: formEmail,
        password: formPassword,
        password_confirmation: formConfPassword,
      };

      api.post("api/account/register", formData).then((response) => {
        console.log(response.data);
      });
    });
  };

  return (
    <StArticle>
      <StH1>Login</StH1>
      <StForm>
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

        <BaseButton
          type="submit"
          label="Register"
          onClick={submitRegisterData}
        />
      </StForm>
    </StArticle>
  );
};

export default Register;
