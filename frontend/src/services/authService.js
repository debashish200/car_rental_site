import API from "./api";

export const loginUser = (data) => {
  return API.post("auth/login/", data);
};

export const registerUser = (data) => {
  return API.post("auth/register/", data);
};

export const logoutUser = (refreshToken) => {
  return API.post("auth/logout/", {
    refresh: refreshToken,
  });
};