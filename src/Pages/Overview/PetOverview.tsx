import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { laravelApiUrl } from "../../Api/Api";
import { getAllPets, getPetKinds } from "../../Api/PetCalls";

import { LoadingComponent, StH1, StSection } from "../../Utils/HTMLComponents";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";
import SelectButton from "../../Components/Select/Select";
import PetOverviewCard from "../../Components/Card/PetCard/PetOverviewCard";

const StOverview = styled(StSection)`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  padding: 6%;
  background: url(${dogPattern});
  border-radius: 8px;
  box-sizing: border-box;

  @media(max-width: 600px){
    padding: 4%;
  }
`;

const StFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4% 12%;

  @media(max-width: 600px){
    flex-direction: column;

    
  }
`;

const StOverviewGrid = styled(StSection)`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, clamp(180px, 40%, 220px));
  grid-gap: 60px;

  @media(max-width: 600px){
    grid-template-columns: repeat(auto-fit, 70%);
    grid-gap: 30px;
  }
`;

const PetOverview = () => {
  const { data: kindsOfPetData } = useSWR("api/pet-kinds", getPetKinds, {
    revalidateOnFocus: false,
  });
  const { data: petOverviewData, isValidating: isPetOverviewDataValidating } =
    useSWR("api/pets", getAllPets, {
      revalidateOnFocus: false,
    });

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
              variant="filter"
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
              variant="filter"
            />
          </StFilterHeader>

          <StOverviewGrid>
            {!isPetOverviewDataValidating ? (
              petOverviewData &&
              filteredPetOverviewData()?.map((item, key) => (
                <PetOverviewCard
                  petName={item.pet_name}
                  petKind={item.pet_kind}
                  petImgUrl={`${laravelApiUrl}/api/pets/${item.id}/image`}
                  sitterHourlyPrize={item.sit_hourly_prize}
                  onClick={() => navigate(`profiel/${item.id}`)}
                  key={key}
                />
              ))
            ) : (
              <LoadingComponent />
            )}
          </StOverviewGrid>
        </StOverview>
      </StSection>
    </>
  );
};

export default PetOverview;
