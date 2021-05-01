import styled from "styled-components";

import BaseButton from "../../Components/Button/BaseButton";
import Checkbox from "../../Components/Checkbox/Checkbox";
import Switch from "../../Components/Switch/Switch";
import { StH2, StH3, StSection, StForm } from "../../Utils/HTMLComponents";

const StOptionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px 84px;
  margin-bottom: 32px;

  & label {
    flex-direction: column;
    border-radius: 14px;
    &:hover {
      background: rgba(72, 72, 72, 0.1);
    }
  }
`;

const AccountSitter = () => {
  return (
    <StSection>
      <StH2>Oppas</StH2>
      <Switch label="Ben ik een opasser?" />
      <StForm>
        <StH3>Mijn oppasvragen</StH3>

        <StOptionsContainer>
          <Checkbox label="Placeholder" />
          <Checkbox label="Placeholder" />
          <Checkbox label="Placeholder" />
          <Checkbox label="Placeholder" />
        </StOptionsContainer>
      </StForm>

      <StForm>
        <StH3>Oppas voor:</StH3>

        <StOptionsContainer>
          <Checkbox label="Katten" />
          <Checkbox label="Honden" />
          <Checkbox label="Cavia's" />
          <Checkbox label="Vissen" />
        </StOptionsContainer>

        <BaseButton label="Dierensoorten opslaan" />
      </StForm>
    </StSection>
  );
};

export default AccountSitter;
