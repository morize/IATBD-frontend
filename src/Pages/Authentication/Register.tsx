import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, login } from "../../Api/AuthCalls";
import { StH1, StSection, StForm } from "../../Utils/HTMLComponents";
import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";

const Register = () => {
  const navigate = useNavigate();

  const [formUsername, setFormUsername] = useState("morize");
  const [formEmail, setFormEmail] = useState("mauricemr@outlook.com");
  const [formPassword, setFormPassword] = useState("Hilol123.");
  const [formConfPassword, setFormConfPassword] = useState("Hilol123.");

  const submitRegisterData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = {
      name: formUsername,
      email: formEmail,
      password: formPassword,
      password_confirmation: formConfPassword,
    };

    register(formData).then(() => {
      e.preventDefault();
      login(formData.email, formData.password).then(() =>
        navigate("../../account")
      );
    });
  };

  return (
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

        <BaseButton
          type="submit"
          label="Register"
        />
      </StForm>
    </StSection>
  );
};

export default Register;
