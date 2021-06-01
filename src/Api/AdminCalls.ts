import { laravelApi, sleep } from "./Api";

export const getAllUsers = async (
  url: string
): Promise<
  {
    uuid: number;
    email: string;
    name: string;
    role: string;
    status: string;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const updateUserStatus = async (userId: number, status: string) => {
  await laravelApi.post(`api/user/${userId}/status`, {
    status: status,
  });
};

export const getAllSitterRequests = async (
  url: string
): Promise<
  {
    id: number;
    owner_name: string;
    pet_name: string;
    sitter_name: string;
    request_status: string;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const deleteSitterRequest = async (requestId: number) => {
  await laravelApi.delete(`api/sitter-requests/${requestId}`);
};
