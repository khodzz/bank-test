import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/header.css";
import {
  fetchAndStoreUser,
  getUserFromLocalStorage,
} from "../services/userService.js";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = getUserFromLocalStorage();
    if (localUser) {
      setUser(localUser);
    } else {
      fetchAndStoreUser().then(setUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <p className="header-logo">LOGO</p>
          </div>
          <div className="header-links">
            <Link className="header-link" to="/">
              Главная
            </Link>
            <Link className="header-link" to="/send">
              Отправить
            </Link>
            <Link className="header-link" to="/history">
              История транзакций
            </Link>
          </div>

          <div className="header-reg">
            {isAuthenticated ? (
              <>
                <p className="header-balance">
                  Баланс: {user?.balance ?? "Загрузка..."}
                </p>
                <p className="header-phone">
                  Телефон: {user?.phone_number ?? "Загрузка..."}
                </p>
                <button onClick={logout} className="header-link-button">
                  Выход
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="header-link">
                  Регистрация
                </Link>
                <Link to="/login" className="header-link links">
                  Вход
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
