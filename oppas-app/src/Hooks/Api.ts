import axios from "axios";

const laravelApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

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
          email: response.data.email,
          isAdmin: response.data.admin,
          isBlocked: response.data.blocked,
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

export const getUserDetails = async (): Promise<{
  uuid: number;
  name: string;
  email: string;
  email_verified_at: string;
  updated_at: string;
  blocked: number;
  admin: number;
}> =>
  await laravelApi
    .post("api/account/user/details", {
      token: localStorage.getItem("activeToken"),
    })
    .then((response) => response.data);

export const sendResetPasswordEmail = async (email: string) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  await laravelApi.post("api/account/forgot-password", {
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

export const getAvailablePets = async (): Promise<
  {
    id: number;
    pet_name: string;
    pet_kind: string;
    //sitter_hourly_fee: float;
  }[]
> => await laravelApi.get("api/sitter/pets").then((response) => response.data);

export const getPetKinds = async (): Promise<string[]> =>
  await laravelApi.get("api/pet/kinds").then((response) => response.data);
