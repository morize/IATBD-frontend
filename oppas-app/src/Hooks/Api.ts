import axios from "axios";

const laravelApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const getSanctumToken = laravelApi
  .get("sanctum/csrf-cookie")
  .then((response) => response.config.headers["X-XSRF-TOKEN"]);

export const login = async (formEmail: string, formPassword: string) => {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  if (sanctumToken) {
    await laravelApi
      .post("api/account/login", {
        email: formEmail,
        password: formPassword,
        token: sanctumToken,
      })
      .then((response) => {
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
}> => {
  const apiUserData = await laravelApi
    .post("api/account/user/details", {
      token: localStorage.getItem("activeToken"),
    })
    .then((response) => response.data);

  return apiUserData;
};
