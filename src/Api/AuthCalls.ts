import { cache } from "swr";
import { laravelApi, getSanctumToken } from "./Api";

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
    await laravelApi.post("api/login", loginData).then((response) => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          username: response.data.name,
          uuid: response.data.uuid,
          role: response.data.role,
          status: response.data.status,
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
  localStorage.clear();
  cache.clear();
  await laravelApi.post("api/logout").then(() => {});
};

export const register = async (formData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  if (sanctumToken) {
    await laravelApi.post("api/register", formData);
  }
};

export const sendEmailVerificationLink = async () => {
  await laravelApi.post("api/email-verification", {
    token: localStorage.getItem("activeToken"),
  });
};

export const sendResetPasswordEmail = async (email: string) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  await laravelApi.post("api/forgot-password", {
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
  await laravelApi.post("api/reset-password", {
    token: password_token,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  });
};
