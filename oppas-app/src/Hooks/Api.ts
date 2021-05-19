import axios from "axios";

export const laravelApiUrl = "http://localhost:8000";

const laravelApi = axios.create({
  baseURL: laravelApiUrl,
  withCredentials: true,
  timeout: 2000,
});

const timeBetweenRequests = 1000;

function sleep<T>(response: T) {
  return new Promise<T>((resolve) =>
    setTimeout(resolve, timeBetweenRequests, response)
  );
}

const getSanctumToken = laravelApi
  .get("sanctum/csrf-cookie")
  .then((response) => response.config.headers["X-XSRF-TOKEN"]);

export const login = async (
  formEmail: string,
  formPassword: string,
  rememberMeCheck?: boolean
) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  const loginData = rememberMeCheck
    ? {
        email: formEmail,
        password: formPassword,
        token: sanctumToken,
        remember: "1",
      }
    : {
        email: formEmail,
        password: formPassword,
        token: sanctumToken,
      };

  if (sanctumToken) {
    await laravelApi.post("api/account/login", loginData).then((response) => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          username: response.data.name,
          uuid: response.data.uuid,
        })
      );

      localStorage.setItem(
        "activeToken",
        response.config.headers["X-XSRF-TOKEN"]
      );
    });
  }
};

export const logout = async () => {
  await laravelApi.post("api/account/logout").then(() => localStorage.clear());
};

export const register = async (formData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  if (sanctumToken) {
    await laravelApi.post("api/account/register", formData);
  }
};

export const sendEmailVerificationLink = async () => {
  await laravelApi.post("api/account/email/verification/send", {
    token: localStorage.getItem("activeToken"),
  });
};

export const sendResetPasswordEmail = async (email: string) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  await laravelApi.post("account/forgot-password", {
    token: sanctumToken,
    email: email,
  });
};

export const submitNewPassword = async (
  email: string,
  password: string,
  password_confirmation: string,
  password_token: string
) => {
  await laravelApi.post("api/account/reset-password", {
    token: password_token,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  });
};

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

export const getAllPets = async (
  url: string
): Promise<
  {
    id: number;
    pet_name: string;
    pet_kind: string;
    pet_image: string;
    sit_hourly_prize: number;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getSpecificPet = async (
  url: string
): Promise<{
  owner_id: number;
  pet_name: string;
  pet_breed: string;
  pet_kind: string;
  pet_image: string;
  sit_hourly_prize: number;
  sit_date_start: string;
  sit_date_end: string;
  sit_remarks: string;
}> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));


export const submitNewPet = async (fData: FormData) =>
  await laravelApi.post("api/pets", fData).then((response) => response.data);

export const submitSitterMedia = async (fData: FormData) =>
  await laravelApi
    .post("api/users-media", fData)
    .then((response) => response.data);


export const getPetKinds = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));

export const getPetBreeds = async (url: string): Promise<string[]> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));


export const getUserPets = async (
  url: string
): Promise<
  {
    id: string;
    pet_name: string;
    pet_breed: string;
    pet_kind: string;
    pet_image: string;
  }[]
> =>
  await laravelApi
    .get(url)
    .then((response) => response.data)
    .then((response) => sleep(response));
