import useSWR from "swr";
import styled from "styled-components";

import { getPetKinds } from "../../Api/PetCalls";
import { getPetPreferences } from "../../Api/SitterCalls";
import { StH2, StH3, StSection } from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import Checkbox from "../../Components/Checkbox/Checkbox";
import PetCard from "../../Components/Card/PetCard/PetCard";
import Switch from "../../Components/Switch/Switch";
import { useEffect, useState } from "react";

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

const replaceArrayInstance = (
  array: { kind: string; checked: boolean }[],
  value: string
) => {
  let object = array.find((o) => o.kind === value);

  if (object) {
    let arrayInstance = [...array];
    let index = object && array.indexOf(object);
    arrayInstance[index] = object && {
      kind: object.kind,
      checked: !object.checked,
    };
    return arrayInstance;
  }
  return array;
};

const AccountSitter = () => {
  const [kindPreferences, setKindPreferences] =
    useState<{ kind: string; checked: boolean }[] | undefined>();

  const userId = JSON.parse(localStorage.getItem("userDetails")!)["uuid"];
  const { data: kindsOfPetData, isValidating: areKindsLoaded } = useSWR(
    "api/pet-kinds",
    getPetKinds,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: kindPreferencesData, isValidating: arePreferencesLoaded } =
    useSWR(`api/sitters/${userId}/pets`, getPetPreferences, {
      revalidateOnFocus: false,
    });

  useEffect(() => {
    if (!areKindsLoaded && !arePreferencesLoaded) {
      setKindPreferences(
        kindsOfPetData?.map((kind) => {
          return { kind: kind, checked: kindPreferencesData!.includes(kind) };
        })
      );
    }
  }, [areKindsLoaded, arePreferencesLoaded, kindPreferencesData, kindsOfPetData, setKindPreferences]);

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
          {kindPreferences?.map((kind, key) => (
            <Checkbox
              label={kind.kind}
              key={key}
              checked={kind.checked}
              onClick={(kind) =>
                setKindPreferences(replaceArrayInstance(kindPreferences, kind))
              }
              value={kind.kind}
            />
          ))}
        </StOptionsContainer>

        <BaseButton label="Instellingen opslaan" />
      </StSection>
    </>
  );
};

export default AccountSitter;
