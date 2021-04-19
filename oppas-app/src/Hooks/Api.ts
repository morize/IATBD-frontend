import axios from "axios";

const laravelApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const getSanctumToken = laravelApi
  .get("sanctum/csrf-cookie")
  .then((response) => response.config.headers["X-XSRF-TOKEN"]);

export const login = async function (formEmail: string, formPassword: string) {
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
            isAdmin: response.data.admin,
            isBlocked: response.data.blocked,
            email: response.data.email,
          })
        );

        localStorage.setItem(
          "activeToken",
          response.config.headers["X-XSRF-TOKEN"]
        );

        // console.log(response.config.headers["X-XSRF-TOKEN"]);
        // console.log(localStorage.getItem("userDetails"));
      });
  }
};

export const logout = async function () {
  await laravelApi.post("api/account/logout").then(() => localStorage.clear());
};

export const register = async function (formData: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  const sanctumToken = await getSanctumToken.then((token: string) => token);

  if (sanctumToken) {
    await laravelApi.post("api/account/register", formData);
  }
};

export const sendEmailVerificationLink = async function (
  formEmail: string,
  formPassword: string
) {
  // const sanctumToken = await getSanctumToken.then((token: string) => token);

  await laravelApi.post("api/account/email/verification/send", {
    email: formEmail,
    password: formPassword,
    token: localStorage.getItem("activeToken"),
  });
};
