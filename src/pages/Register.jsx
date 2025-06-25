import { useState } from "react";
import { APIUsers } from "../api";
import { useNavigate } from "react-router-dom";
import { fetchAndStoreUser } from "../services/userService.js";
import "../styles/formStyles.css";

export default function Register() {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIUsers.post("register/", formData);
      localStorage.setItem("token", res.data.token);

      await fetchAndStoreUser(res.data.token); // Загружаем данные пользователя

      navigate("/login");
    } catch (err) {
      alert(JSON.stringify(err.response.data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input
        name="phone_number"
        placeholder="Номер телефона"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
      />
      <input
        name="password2"
        type="password"
        placeholder="Повторите пароль"
        onChange={handleChange}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
