import useSWR from "swr";

import { laravelApiUrl } from "../../Api/Api";
import { getUserPets } from "../../Api/PetCalls";
import { LoadingComponent, StH2, StSection } from "../../Utils/HTMLComponents";
import PetCard, { PetCardItem } from "../../Components/Card/PetCard/PetCard";

const AccountPet = () => {
  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: userPetsData, isValidating: isUserPetsDataValidating } = useSWR(
    `api/user/${userId}/pets`,
    getUserPets
  );

  return !isUserPetsDataValidating ? (
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
  ) : (
    <LoadingComponent />
  );
};

export default AccountPet;
