import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { StH1, StArticle } from "../Utils/HTMLComponents";
import BaseInput from "../Components/Input/BaseInput";
import BaseButton from "../Components/Button/BaseButton";

import { login } from "../Hooks/Api";

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
  const [formPassword, setFormPassword] = useState("Hilol123.");
  const [formError, setFormError] = useState(false);

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

    login(formEmail, formPassword)
      .then(() => {
        navigate("../../account");
      })
      .catch(() => {
        setFormError(true);
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
