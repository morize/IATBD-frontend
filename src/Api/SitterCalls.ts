import { laravelApi, sleep } from "./Api";
import { SitterRequestsResponseType } from "./SitterRequestCalls";

export const getSitter = async (
  url: string
): Promise<{
  id: string;
  user_id: string;
  sitter_status: string;
}> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const createSitter = async (fData: FormData) =>
  await laravelApi.post(`api/sitters`, fData).then((response) => response.data);

export const updateSitterStatus = async (fData: FormData, userId: string) =>
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

export const updatePetPreferences = async (fData: FormData, userId: string) =>
  await laravelApi
    .post(`api/sitter-preferences/${userId}`, fData)
    .then((response) => response.data);

export const getSitterRequests = async (
  url: string
): Promise<SitterRequestsResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const createSitterReview = async (fData: FormData) =>
  await laravelApi
    .post(`api/sitter-reviews`, fData)
    .then((response) => response.data);

export interface SitterResponseType {
  id: number;
  sitter_id: number;
  reviewer_id: number;
  rating: number;
  review: string;
}

export const getSitterReviews = async (url: string): Promise<SitterResponseType[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));
