import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { StH1, StArticle } from "../Utils/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";
import { useLogin } from "../Hooks/Auth";
import api from "../Hooks/Api";

const StErrorMessage = styled.p`
  color: red;
  margin: -20px 0 30px 0;
`;

const StForm = styled.form`
  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [formEmail, setFormEmail] = useState("mauricemr@outlook.com");
  const [formPassword, setFormPassword] = useState("hilol123");
  const [formError, setFormError] = useState(false);

  let loginHook = useLogin();

  const submitLoginData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    api.get("sanctum/csrf-cookie").then((response) => {
      api
        .post("api/account/login", {
          email: formEmail,
          password: formPassword,
          token: response.config.headers["X-XSRF-TOKEN"],
        })
        .then(() => {
          localStorage.setItem(
            "activeToken",
            response.config.headers["X-XSRF-TOKEN"]
          );
          loginHook();
          navigate("../../account");
        })
        .catch(() => {
          setFormError(true);
        });
    });
  };

  return (
    <StArticle>
      <StH1>Login</StH1>
      <StForm>
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

        {formError && (
          <StErrorMessage>
            De aanmelding is mislukt, probeer nogmaals.
          </StErrorMessage>
        )}

        <BaseButton type="submit" label="Login" onClick={submitLoginData} />
      </StForm>
    </StArticle>
  );
};

export default Login;
