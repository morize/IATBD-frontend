import { laravelApi, sleep } from "./Api";

const userId =
  localStorage.getItem("userDetails") !== null &&
  JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

export const getSitter = async (
  url: string
): Promise<{
  id: string;
  user_id: string;
  sit_rating: number;
  sit_status: string;
}> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const createSitter = async (fData: FormData) =>
  await laravelApi.post(`api/sitters`, fData).then((response) => response.data);

export const updateSitterStatus = async (fData: FormData) =>
  await laravelApi
    .post(`api/sitters/${userId}`, fData)
    .then((response) => response.data);

export const getPetPreferences = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const createPetPreferences = async (fData: FormData) =>
  await laravelApi
    .post(`api/sitter-preferences`, fData)
    .then((response) => response.data);

export const updatePetPreferences = async (fData: FormData) =>
  await laravelApi
    .post(`api/sitter-preferences/${userId}`, fData)
    .then((response) => response.data);

export const getSitterRequests = async (
  url: string
): Promise<
  {
    id: number;
    sitter_id: number;
    pet_id: number;
    owner_name: string;
    pet_name: string;
    sitter_remarks: string;
    request_status: string;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));
