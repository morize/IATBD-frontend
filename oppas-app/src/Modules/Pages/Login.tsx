import styled from "styled-components";

import {
  StH1,
  StH2,
  StP,
  StSection,
  StArticle,
} from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";

const StForm = styled.form`
  & div {
    margin-bottom: 30px;

    & input {
      font-family: "Fira Sans", sans-serif;
    }
  }
`;

const Login = () => {
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
