import { laravelApi } from "./Api";

export const getUserDetails = async (
  url: string
): Promise<{
  uuid: number;
  name: string;
  email: string;
  email_verified_at: string;
  updated_at: string;
  blocked: number;
  admin: number;
}> => await laravelApi.get(url).then((response) => response.data);

export const submitUserMedia = async (fData: FormData) =>
  await laravelApi
    .post("api/users-media", fData)
    .then((response) => response.data);

export const updateUserMedia = async (fData: FormData) =>
  await laravelApi
    .post(
      `api/users-media/${
        JSON.parse(localStorage.getItem("userDetails")!)["uuid"]
      }`,
      fData
    )
    .then((response) => response.data);

export const getUserMedia = async (
  url: string
): Promise<{
  image_1: number;
  image_2: string;
  video_link: string;
}> => await laravelApi.get(url).then((response) => response.data);
