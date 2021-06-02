import { laravelApi } from "./Api";

export interface SitterRequestsResponseType {
  id: number;
  sitter_id: number;
  pet_id: number;
  owner_name: string;
  pet_name: string;
  sitter_name: string;
  sitter_remarks: string;
  request_status: string;
}

export const createSitterRequest = async (fData: FormData) =>
  await laravelApi.post(`api/sitter-requests`, fData);

export const updateSitterRequest = async (
  status: { requestStatus: string },
  requestId: number
) => await laravelApi.post(`api/sitter-requests/${requestId}`, status);
