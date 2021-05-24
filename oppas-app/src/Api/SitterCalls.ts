import { laravelApi, sleep, userId } from "./Api";

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
