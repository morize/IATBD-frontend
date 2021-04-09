import axios from "axios";

export const customApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
