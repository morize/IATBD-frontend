import { useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { StH1, StArticle } from "../Utils/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";

import { customApi } from "../Hooks/Api";

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

  const navigate = useNavigate();

  const submitRegisterData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    customApi.get("sanctum/csrf-cookie").then(() => {
      let formData = {
        name: formUsername,
        email: formEmail,
        password: formPassword,
        password_confirmation: formConfPassword,
      };

      customApi.post("api/account/register", formData).then((response) => {
        console.log(response.data);
        navigate("../../account");
      });
    });
  };

  return (
    <StArticle>
      <StH1>Aanmelden</StH1>
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
      {/* <button
        onClick={() => {
          api.get("api/show").then((response) => {
            console.log(response.data);
          });
        }}
      >
        test lol xD
      </button> */}
    </StArticle>
  );
};

export default Register;
