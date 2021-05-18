import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import SelectButton from "../../Components/Select/Select";
import PetOverviewCard from "../../Components/Card/PetCard/PetOverviewCard";

import { getAllPets, getPetKinds, laravelApiUrl } from "../../Hooks/Api";
import { StH1, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StOverview = styled(StSection)`
  display: flex;
  flex-direction: column;
  background: url(${dogPattern});
  border-radius: 8px;
  padding: 3rem 0;
  min-height: 34rem;
`;

const StFilterHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.5rem 4rem 1rem 4rem;

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
  const { data: kindsOfPetData } = useSWR("api/pet-kinds", getPetKinds);
  const { data: petOverviewData } = useSWR("api/pets", getAllPets);
  
  const [filterKind, setFilterKind] = useState({
    value: "",
    label: "Huisdier Soort",
  });
  const [filterHourlyPay, setFilterHourlyPay] = useState({
    value: "",
    label: "Uurtarief",
  });

  const navigate = useNavigate();

  const filteredPetOverviewData = () => {
    if (filterKind.value !== "") {
      return petOverviewData?.filter(
        (item) => item.pet_kind === filterKind.value
      );
    }

    if (filterHourlyPay.value !== "") {
      switch (filterHourlyPay.value) {
        case ">4":
          return petOverviewData?.filter((item) => 4 > item.sit_hourly_prize);

        case "4<8":
          return petOverviewData?.filter(
            (item) => 4 < item.sit_hourly_prize && item.sit_hourly_prize < 8
          );

        case "8<":
          return petOverviewData?.filter((item) => item.sit_hourly_prize > 8);

        default:
          return petOverviewData;
      }
    }
    return petOverviewData;
  };

  return (
    <>
      <StSection>
        <StH1>Huisdieren Overzicht</StH1>
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
              onChange={(option) => {
                setFilterKind(option);
                setFilterHourlyPay({
                  value: "",
                  label: "Uurtarief",
                });
              }}
              variant={"filter"}
            />
            <SelectButton
              value={filterHourlyPay}
              options={[
                { value: ">4", label: "> 4€" },
                { value: "4<8", label: "4€ < 8€" },
                { value: "8<", label: "8€ <" },
              ]}
              onChange={(option) => {
                setFilterHourlyPay(option);
                setFilterKind({
                  value: "",
                  label: "Huisdier Soort",
                });
              }}
              variant={"filter"}
            />
          </StFilterHeader>

          <StOverviewGrid>
            {petOverviewData &&
              filteredPetOverviewData()?.map((item, key) => (
                <PetOverviewCard
                  petName={item.pet_name}
                  petKind={item.pet_kind}
                  petImg={`${laravelApiUrl}/api/pets/${item.id}/image`}
                  sitterHourlyPrize={item.sit_hourly_prize}
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
