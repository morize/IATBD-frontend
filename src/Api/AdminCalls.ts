import { laravelApi, sleep } from "./Api";
import { UserResponseType } from "./UserCalls";
import { SitterRequestsResponseType } from "./SitterRequestCalls";

// User
export const getAllUsers = async (url: string): Promise<UserResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const updateUserStatus = async (userId: number, status: string) => {
  await laravelApi.post(`api/user/${userId}/status`, {
    status: status,
  });
};

// Sitter Requests
export const getAllSitterRequests = async (
  url: string
): Promise<SitterRequestsResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const deleteSitterRequest = async (requestId: number) => {
  await laravelApi.delete(`api/sitter-requests/${requestId}`);
};
