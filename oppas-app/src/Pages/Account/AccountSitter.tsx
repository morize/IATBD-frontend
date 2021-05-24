import styled from "styled-components";
import { trigger } from "swr";

import { userId } from "../../Api/Api";
import {
  createSitter,
  createPetPreferences,
  updateSitterStatus,
  updatePetPreferences,
} from "../../Api/SitterCalls";
import { StH2, StH3, StSection } from "../../Utils/HTMLComponents";
import PetPreferences from "./AccountSitter/SitterSettings";
import PetCard from "../../Components/Card/PetCard/PetCard";

const StOptionsSection = styled(StSection)`
  display: flex;
  flex-direction: column;

  & p {
    margin: 24px 0 -12px 0;
  }
`;

const AccountSitter = () => {
  const onPetPreferencesSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    isSitterActive: boolean,
    create?: boolean,
    checkboxOptions?: { kind: string; checked: boolean }[]
  ) => {
    e.preventDefault();
    let sitterStatusData = new FormData();
    sitterStatusData.append(
      "sitter_status",
      isSitterActive ? "active" : "inactive"
    );

    create
      ? createSitter(sitterStatusData)
      : updateSitterStatus(sitterStatusData).then(() => {
          if (checkboxOptions) {
            let petPreferencesFormData = new FormData();
            petPreferencesFormData.append(
              "sitter_preferences",
              JSON.stringify(checkboxOptions)
            );
            create
              ? createPetPreferences(petPreferencesFormData)
              : updatePetPreferences(petPreferencesFormData);
          }
        });

    trigger(`api/sitters/${userId}`);
  };

  return (
    <>
      <StH2>Opasser</StH2>
      <StSection>
        <StH3>Mijn oppasvragen</StH3>

        <PetCard cardVariant="sitter">
          {/* <PetCardItem routeTo="xd" /> */}
        </PetCard>
      </StSection>

      <StOptionsSection>
        <StH3>Oppas instellingen</StH3>

        <PetPreferences onSubmit={onPetPreferencesSubmit} />
      </StOptionsSection>
    </>
  );
};

export default AccountSitter;
