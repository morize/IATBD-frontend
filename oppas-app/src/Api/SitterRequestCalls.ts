import { laravelApi } from "./Api";

export const createSitterRequest = async (fData: FormData) =>
  await laravelApi.post(`api/sitter-requests`, fData);
