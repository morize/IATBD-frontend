import { laravelApi, sleep } from "./Api";

export const getPetPreferences = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));
