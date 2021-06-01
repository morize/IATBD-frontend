import { laravelApi, sleep } from "./Api";

export const getAllUsers = async (
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

export const getAllSitterRequests = async (
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
