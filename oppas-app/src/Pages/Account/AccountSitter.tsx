import styled from "styled-components";

import { StH2, StH3, StSection } from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import Checkbox from "../../Components/Checkbox/Checkbox";
import PetCard from "../../Components/Card/PetCard/PetCard";
import Switch from "../../Components/Switch/Switch";

const StOptionsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px 84px;
  margin: 32px 0;

  & label {
    border-radius: 14px;

    &:hover {
      background: rgba(72, 72, 72, 0.15);
    }
  }
`;

const AccountSitter = () => {
  return (
    <>
      <StH2>Opasser</StH2>
      <StSection>
        <StH3>Mijn oppasvragen</StH3>

        <PetCard cardVariant="sitter">
          {/* <PetCardItem routeTo="xd" /> */}
        </PetCard>
      </StSection>

      <StSection>
        <StH3>Oppas instellingen</StH3>
        <Switch label="Ben ik een opasser?" />

        <StOptionsContainer>
          <Checkbox label="Katten" />
          <Checkbox label="Honden" />
          <Checkbox label="Cavia's" />
          <Checkbox label="Vissen" />
        </StOptionsContainer>

        <BaseButton label="Instellingen opslaan" />
      </StSection>
    </>
  );
};

export default AccountSitter;
