import { useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";

import BaseInput from "../../Components/Input/BaseInput";
import BaseButton from "../../Components/Button/BaseButton";
import SelectButton from "../../Components/Select/Select";
import BaseDatepicker from "../../Components/Datepicker/BaseDatepicker";

import Variants from "../../Utils/Variants";
import { getPetKinds, getPetBreeds, submitNewPet } from "../../Hooks/Api";
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
  font-family: "Fira Sans", sans-serif;
  color: ${Variants.default};
  box-sizing: border-box;
  outline: none;
`;

const StErrorMessage = styled.p`
  color: ${Variants.danger};
  margin: -14px 0 30px 0;
`;

const CreatePet = () => {
  const [name, setName] = useState("");

  const [kindOption, setKindOption] =
    useState<{ label: string; value: string }>();
  const [breedOption, setBreedOption] =
    useState<{ label: string; value: string } | null>();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const [hourlyPay, setHourlyPay] = useState("");
  const [remarks, setRemarks] = useState("");

  const [error, setError] = useState(false);

  const { data: kindsOfPetData } = useSWR("api/pet-kinds", getPetKinds);
  const { data: breedsOfKindData } = useSWR(
    `api/pet-kinds/${kindOption?.value}`,
    getPetBreeds
  );

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && setImageFile(e.target.files[0]);

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      name &&
      kindOption &&
      breedOption &&
      imageFile &&
      startDate &&
      endDate &&
      hourlyPay
    ) {
      let fData = new FormData();

      fData.append("pet_name", name);
      fData.append("pet_kind", kindOption.value);
      fData.append("pet_breed", breedOption.value);
      fData.append("pet_image", imageFile);
      fData.append("sit_start_date", format(startDate, "dd/MM/yyyy"));
      fData.append("sit_end_date", format(endDate, "dd/MM/yyyy"));
      fData.append("sit_hourly_pay", hourlyPay);
      remarks && fData.append("sit_remarks", remarks);

      submitNewPet(fData).then((response) => console.log(response));
    } else {
      if (!error) setError(true);
    }
  };

  return (
    <>
      <StH2>Nieuw huisdier</StH2>
      <StForm onSubmit={(e) => submitFormData(e)}>
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

          <BaseInput
            label="Foto:"
            type="file"
            icon={<PublishIcon />}
            onChange={(e) => handleImageInput(e)}
          />
        </StSection>

        <StSection>
          <StH3>Oppas gegevens</StH3>
          <BaseDatepicker
            selected={startDate}
            endDate={endDate}
            selectsStart
            label="Datum Start"
            onChange={setStartDate}
          />
          <BaseDatepicker
            label="Datum Eind"
            selected={endDate}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            selectsEnd
            onChange={setEndDate}
          />

          <BaseInput
            label="Uurtarief:"
            type="number"
            min="0"
            value={hourlyPay}
            onChange={(e) => setHourlyPay(e.target.value)}
          />

          <StTextAreaLabel>Uw opmerkingen:</StTextAreaLabel>
          <StTextArea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          {error && (
            <StErrorMessage>
              U heeft een van de velden niet ingevuld.
            </StErrorMessage>
          )}
          <BaseButton label="Bewaar huisdier" type="submit" />
        </StSection>
      </StForm>
    </>
  );
};

export default CreatePet;
