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
  const [errors, setErrors] = useState({}); // Для хранения ошибок
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone_number, password, password2 } = formData;

    const newErrors = {};
    if (!phone_number) newErrors.phone_number = "Введите номер телефона.";
    if (!password) newErrors.password = "Введите пароль.";
    if (!password2) newErrors.password2 = "Повторите пароль.";
    if (password && password2 && password !== password2) {
      newErrors.password2 = "Пароли не совпадают.";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await APIUsers.post("register/", {
        phone_number,
        password,
        password2,
      });
      localStorage.setItem("token", res.data.token);
      await fetchAndStoreUser(res.data.token);
      navigate("/");
    } catch (err) {
      setErrors({
        apiError:
          err?.response?.data?.detail || "Неизвестная ошибка регистрации.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Регистрация</h2>

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

      <div className="input-group">
        <input
          name="password2"
          type="password"
          placeholder="Повторите пароль"
          value={formData.password2}
          onChange={handleChange}
        />
        {errors.password2 && <div className="error">{errors.password2}</div>}
      </div>

      {errors.apiError && <div className="error">{errors.apiError}</div>}

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
