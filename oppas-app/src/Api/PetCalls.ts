import { laravelApi, sleep } from "./Api";

export const getAllPets = async (
  url: string
): Promise<
  {
    id: number;
    pet_name: string;
    pet_kind: string;
    pet_image: string;
    sit_hourly_prize: number;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getSpecificPet = async (
  url: string
): Promise<{
  owner_id: number;
  pet_name: string;
  pet_breed: string;
  pet_kind: string;
  pet_image: string;
  sit_hourly_prize: number;
  sit_date_start: string;
  sit_date_end: string;
  sit_remarks: string;
}> =>
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

export const getUserPets = async (
  url: string
): Promise<
  {
    id: string;
    pet_name: string;
    pet_breed: string;
    pet_kind: string;
    pet_image: string;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));
