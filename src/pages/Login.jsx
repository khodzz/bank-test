import { useState } from "react";
import { APIUsers } from "../api";
import { useNavigate } from "react-router-dom";
import { fetchAndStoreUser } from "../services/userService.js";
import "../styles/formStyles.css";

export default function Login() {
  const [formData, setFormData] = useState({ phone_number: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone_number, password } = formData;

    // Проверим ошибки
    const newErrors = {};
    if (!phone_number) newErrors.phone_number = "Введите номер телефона.";
    if (!password) newErrors.password = "Введите пароль.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await APIUsers.post("login/", formData);
      localStorage.setItem("token", res.data.token);

      await fetchAndStoreUser(res.data.token);
      navigate("/"); // Успешный вход
    } catch (err) {
      setErrors({
        apiError:
          err?.response?.data?.detail || "Неизвестная ошибка авторизации",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Вход</h2>

      <div className="input-group">
        <input
          name="phone_number"
          placeholder="Номер телефона"
          value={formData.phone_number}
          onChange={handleChange}
        />
        {errors.phone_number && (
          <div className="error">{errors.phone_number}</div>
        )}
      </div>

      <div className="input-group">
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>

      {errors.apiError && (
        <div className="error">Пароль введен неправильно</div>
      )}

      <button type="submit">Войти</button>
    </form>
  );
}
