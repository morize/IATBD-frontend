import styled from "styled-components";
import useSWR, { trigger } from "swr";

import { laravelApiUrl } from "../../Api/Api";
import {
  createSitter,
  createPetPreferences,
  updateSitterStatus,
  updatePetPreferences,
  getSitterRequests,
} from "../../Api/SitterCalls";
import { StH2, StH3, StSection } from "../../Utils/HTMLComponents";
import PetPreferences from "./AccountSitter/SitterSettings";
import PetCard, { SitterCardItem } from "../../Components/Card/PetCard/PetCard";

const StOptionsSection = styled(StSection)`
  display: flex;
  flex-direction: column;

  & p {
    margin: 24px 0 -12px 0;
  }
`;

const AccountSitter = () => {
  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: sitterRequestsData, isValidating: isSitterRequestsDataLoaded } =
    useSWR(`api/sitters/${userId}/requests`, getSitterRequests, {
      revalidateOnFocus: false,
    });

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
          {sitterRequestsData &&
            sitterRequestsData.map((request, key) => (
              <SitterCardItem
                petName={request.pet_name}
                owner={request.owner_name}
                status={
                  request.request_status === "pending"
                    ? "In afwachting"
                    : "Afgekeurd"
                }
                petImageUrl={`${laravelApiUrl}/api/pets/${request.pet_id}/image`}
                redirectTo={request.pet_id.toString()}
                key={key}
              />
            ))}
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
