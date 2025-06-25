import { APIUser } from "../api";

export const updateUserFromAPI = async () => {
  try {
    const response = await APIUser.get("balance-info/");
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
  }
};

export function getUserFromLocalStorage() {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export const fetchAndStoreUser = async () => {
  try {
    const response = await APIUser.get("balance-info/");
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Ошибка при загрузке пользователя:", error);
    return null;
  }
};
