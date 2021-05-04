import styled from "styled-components";

import BaseButton from "../../Components/Button/BaseButton";
import Checkbox from "../../Components/Checkbox/Checkbox";
import PetCard, { PetCardItem } from "../../Components/Card/PetCard/PetCard";
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
    <>
      <StH2>Opasser</StH2>

      <Switch label="Ben ik een opasser?" />

      <StSection>
        <StH3>Mijn oppasvragen</StH3>

        <PetCard>
          <PetCardItem />
          <PetCardItem />
        </PetCard>
      </StSection>

      <StSection>
        <StH3>Ik ben een opasser voor</StH3>

        <StOptionsContainer>
          <Checkbox label="Katten" />
          <Checkbox label="Honden" />
          <Checkbox label="Cavia's" />
          <Checkbox label="Vissen" />
        </StOptionsContainer>

        <BaseButton label="Dierensoorten opslaan" />
      </StSection>
    </>
  );
};

export default AccountSitter;
