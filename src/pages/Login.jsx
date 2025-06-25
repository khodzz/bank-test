import { useState } from "react";
import { APIUsers } from "../api";
import { useNavigate } from "react-router-dom";
import { fetchAndStoreUser } from "../services/userService.js";
import "../styles/formStyles.css";

export default function Login() {
  const [formData, setFormData] = useState({ phone_number: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIUsers.post("login/", formData);
      localStorage.setItem("token", res.data.token);

      await fetchAndStoreUser(res.data.token); // Загружаем данные пользователя

      navigate("/");
    } catch (err) {
      alert(JSON.stringify(err.response.data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div style={{ display: "none" }}>asdasd</div>
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
      <button type="submit">Войти</button>
    </form>
  );
}
