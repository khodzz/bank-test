import axios from "axios";

const APIUsers = axios.create({
  baseURL: "https://banktemurlan.pythonanywhere.com/api/v1/users/",
});

const APIUser = axios.create({
  baseURL: "https://banktemurlan.pythonanywhere.com/api/v1/user/",
});

APIUsers.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
});

APIUser.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Token ${token}`;
  }
  return req;
});

export { APIUsers, APIUser };
