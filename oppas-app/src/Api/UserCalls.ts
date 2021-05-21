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
