import { laravelApi, sleep } from "./Api";

export const getPetPreferences = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

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
