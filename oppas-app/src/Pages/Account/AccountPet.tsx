import useSWR from "swr";

import PetCard, { PetCardItem } from "../../Components/Card/PetCard/PetCard";
import { StH2, StSection } from "../../Utils/HTMLComponents";
import { getUserPets, laravelApiUrl } from "../../Hooks/Api";

const AccountPet = () => {
  const { data: userPetsData } = useSWR(
    `api/account/user/${
      JSON.parse(localStorage.getItem("userDetails")!)["uuid"]
    }/pets`,
    getUserPets
  );

  return (
    <>
      <StH2>Mijn huisdieren</StH2>
      <StSection>
        <PetCard variant="owner">
          {userPetsData &&
            userPetsData.map((pet, key) => (
              <PetCardItem
                pet_name={pet.pet_name}
                pet_kind={pet.pet_kind}
                pet_breed={pet.pet_breed}
                pet_image={`${laravelApiUrl}/api/pets/${pet.id}/image`}
                routeTo={pet.id.toString()}
                key={key}
              />
            ))}
        </PetCard>
      </StSection>
    </>
  );
};

export default AccountPet;
