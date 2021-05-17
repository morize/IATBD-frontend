import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";

import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";
import SelectButton from "../../Components/Button/SelectButton/SelectButton";

import Variants from "../../Utils/Variants";
import { getPetKinds, getPetBreeds } from "../../Hooks/Api";
import { StH2, StH3, StForm, StSection } from "../../Utils/HTMLComponents";

const DoubleInputContainer = styled.section`
  display: flex;
  justify-content: space-between;
  height: 7rem;

  & div {
    width: 48%;
  }
`;

const StTextAreaLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: ${Variants.primary};
`;

const StTextArea = styled.textarea`
  min-height: 100px;
  width: 100%;
  margin-bottom: 24px;
  padding: 8px;
  border: 1px solid #b3b3c2;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
`;

const CreatePet = () => {
  const [name, setName] = useState("");
  const [kindOption, setKindOption] =
    useState<{ label: string; value: string }>();
  const [breedOption, setBreedOption] =
    useState<{ label: string; value: string }| null>();

  const { data: kindsOfPetData } = useSWR("api/pet-kinds", getPetKinds);
  const { data: breedsOfKindData } = useSWR(
    `api/pet-kinds/${kindOption?.value}`,
    getPetBreeds
  );

  return (
    <>
      <StH2>Nieuw huisdier</StH2>
      <StForm>
        <StSection>
          <StH3>Huisdier gegevens</StH3>
          <BaseInput
            label="Naam:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DoubleInputContainer>
            <SelectButton
              options={
                kindsOfPetData
                  ? kindsOfPetData.map((item) => {
                      return { value: item, label: item };
                    })
                  : [{ value: "", label: "" }]
              }
              onChange={(option) => {
                setBreedOption(null);
                setKindOption(option);
              }}
              variant="input"
              labelForInput="Soort:"
              value={kindOption}
              placeholder="Soort..."
            />
            <SelectButton
              options={
                breedsOfKindData
                  ? breedsOfKindData.map((item) => {
                      return { value: item, label: item };
                    })
                  : [{ value: "", label: "" }]
              }
              onChange={(option) => setBreedOption(option)}
              variant="input"
              labelForInput="Ras:"
              value={breedOption!}
              placeholder="Ras..."
              isDisabled={!kindOption}
            />
          </DoubleInputContainer>

          <BaseInput label="Foto:" type="file" icon={<PublishIcon />} />
        </StSection>

        <StSection>
          <StH3>Oppas gegevens</StH3>
          <DoubleInputContainer>
            <BaseInput label="Datum Start:" />
            <BaseInput label="Datum Eind:" />
          </DoubleInputContainer>

          <BaseInput label="Uurtarief:" />

          <StTextAreaLabel>Uw opmerkingen:</StTextAreaLabel>
          <StTextArea />
          <BaseButton label="Bewaar huisdier" />
        </StSection>
      </StForm>
    </>
  );
};

export default CreatePet;
