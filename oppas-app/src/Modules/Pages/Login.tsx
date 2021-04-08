import styled from "styled-components";
import axios from "axios";

import { StH1, StArticle } from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";
import { useEffect } from "react";

const StForm = styled.form`
  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const Login = () => {
  useEffect(() => {
    let payload = {
      email: "mauricemr@outlook.com",
      password: "hilol123",
      cookie: "xd",
    };
    axios
      .post("http://127.0.0.1:8000/api/login", payload, {
        headers: { "Access-Control-Allow-Origin": "http://172.21.1.8:3000" },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return (
    <StArticle>
      <StH1>Login</StH1>
      <StForm>
        <BaseInput
          label="Gebruikersnaam:"
          placeholder="Voer uw gebruikersnaam in"
        />
        <BaseInput
          label="Wachtwoord:"
          type="password"
          placeholder="Voer uw wachtwoord in"
        />
        <BaseButton type="submit" label="Login" />
      </StForm>
    </StArticle>
  );
};

export default Login;
