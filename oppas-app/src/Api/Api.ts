import axios from "axios";

export const laravelApiUrl = "http://localhost:8000";

const uuid = localStorage.getItem("userDetails") !== null && localStorage.getItem("userDetails");

export const userId = uuid ? JSON.parse(uuid)["uuid"]: "";

export const laravelApi = axios.create({
  baseURL: laravelApiUrl,
  withCredentials: true,
  timeout: 20000,
});

const timeBetweenRequests = 1000;

export const getSanctumToken = laravelApi
  .get("sanctum/csrf-cookie")
  .then((response) => response.config.headers["X-XSRF-TOKEN"]);

export function sleep<T>(response: T) {
  return new Promise<T>((resolve) =>
    setTimeout(resolve, timeBetweenRequests, response)
  );
}



