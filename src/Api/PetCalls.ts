import { laravelApi, sleep } from "./Api";

export interface PetResponseType {
  id: number;
  owner_id: number;
  owner_name: string;
  pet_name: string;
  pet_breed: string;
  pet_kind: string;
  pet_image: string;
  sit_hourly_prize: number;
  sit_date_start: string;
  sit_date_end: string;
  sit_remarks: string;
}

export interface PetRequestResponseType {
  id: number;
  sitter_id: number;
  pet_id: number;
  owner_name: string;
  pet_name: string;
  sitter_name: string;
  sitter_remarks: string;
  request_status: string;
}

export const getAllPets = async (url: string): Promise<PetResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getSpecificPet = async (url: string): Promise<PetResponseType> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const submitNewPet = async (fData: FormData) =>
  await laravelApi.post("api/pets", fData).then((response) => response.data);

export const getPetKinds = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getPetBreeds = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getUserPets = async (url: string): Promise<PetResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getPetRequests = async (
  url: string
): Promise<PetRequestResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const translateStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "In afwachting";
    case "accepted":
      return "Geaccepteerd";
    case "rejected":
      return "Afgewezen";
    default:
      return "Default";
  }
};
