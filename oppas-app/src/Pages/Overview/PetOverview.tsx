import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import SelectButton from "../../Components/Button/SelectButton/SelectButton";
import PetOverviewCard from "../../Components/Card/PetCard/PetOverviewCard";

import { getAvailablePets, getPetKinds } from "../../Hooks/Api";
import { StH1, StH2, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StOverview = styled(StSection)`
  display: flex;
  flex-direction: column;
  background: url(${dogPattern});
  border-radius: 8px;
  padding: 2rem 0;
  min-height: 34rem;
`;

const StFilterHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.8rem 4rem;

  & button {
    width: 12rem;
    margin-right: 0.8rem;

    &:last-child {
      margin: 0;
    }
  }
`;

const StOverviewGrid = styled(StSection)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 14rem);
  grid-gap: 4rem;
`;

const PetOverview = () => {
  const { data: petOverviewData } = useSWR("api/sitter/pets", getAvailablePets);
  const { data: kindsOfPetData } = useSWR("api/pet/kinds", getPetKinds);

  const [filterKind, setFilterKind] = useState({
    value: "",
    label: "Huisdier Soort",
  });
  const [filterHourlyPay, setFilterHourlyPay] = useState({
    value: "",
    label: "Uurtarief",
  });

  const navigate = useNavigate();
  
  return (
    <>
      <StSection>
        <StH1>Overzicht</StH1>
        <StH2>Beschikbare huisdieren</StH2>
        <StOverview>
          <StFilterHeader>
            <SelectButton
              value={filterKind}
              options={
                kindsOfPetData
                  ? kindsOfPetData.map((item) => {
                      return { value: item, label: item };
                    })
                  : [{ value: "", label: "" }]
              }
              onChange={(option) => setFilterKind(option)}
            />
            <SelectButton
              value={filterHourlyPay}
              options={[
                { value: "> 4€", label: "> 4€" },
                { value: "4€ < 8€", label: "4€ < 8€" },
                { value: "8€ <", label: "8€ <" },
              ]}
              onChange={(option) => setFilterHourlyPay(option)}
            />
          </StFilterHeader>

          <StOverviewGrid>
            {petOverviewData &&
              petOverviewData.map((item, key) => (
                <PetOverviewCard
                  petName={item.pet_name}
                  petKind={item.pet_kind}
                  onClick={() => navigate(`${item.id}/profiel`)}
                  key={key}
                />
              ))}
          </StOverviewGrid>
        </StOverview>
      </StSection>
    </>
  );
};

export default PetOverview;
