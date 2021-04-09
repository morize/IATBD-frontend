import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import api from "../Assets/Api";
import { StH1, StArticle } from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";

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
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formError, setFormError] = useState(false);

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
          // push login details and active state to redux
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

        <button
          onClick={(e) => {
            e.preventDefault();
            api.get("api/show").then((response) => {
              console.log(response.data);
            });
          }}
        >
          test
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            api.post("api/account/logout").then(() => {
              // delete session and deactive state to redux
              navigate("../../home");
            });
          }}
        >
          logout
        </button>
      </StForm>
    </StArticle>
  );
};

export default Login;
