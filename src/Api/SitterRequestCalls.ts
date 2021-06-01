import { laravelApi } from "./Api";

export const createSitterRequest = async (fData: FormData) =>
  await laravelApi.post(`api/sitter-requests`, fData);

  export const updateSitterRequest = async (status: {requestStatus: string}, requestId: number) =>
  await laravelApi.post(`api/sitter-requests/${requestId}`, status);
