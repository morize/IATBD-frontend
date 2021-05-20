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
        <PetCard cardVariant="owner">
          {userPetsData &&
            userPetsData.map((pet, key) => (
              <PetCardItem
                petName={pet.pet_name}
                petKind={pet.pet_kind}
                petBreed={pet.pet_breed}
                petImageUrl={`${laravelApiUrl}/api/pets/${pet.id}/image`}
                redirectTo={pet.id.toString()}
                key={key}
              />
            ))}
        </PetCard>
      </StSection>
    </>
  );
};

export default AccountPet;
