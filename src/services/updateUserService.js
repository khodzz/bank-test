import { APIUser } from "../api";

export const updateUserFromAPI = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await APIUser.get("balance/");
    const user = response.data;

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
  }
};
