import { useState } from "react";
import { APIUser } from "../api";
import { updateUserFromAPI } from "../services/updateUserService";
import "../styles/UserSearch.css";

const UserSearch = () => {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [sendStatus, setSendStatus] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSendStatus("");
    if (!phone) return;

    try {
      const res = await APIUser.get("search/", {
        params: { phone_number: phone },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Пользователь не найден или ошибка запроса.");
    }
  };

  const handleSendMoney = async () => {
    setSendStatus("");
    setError("");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Введите корректную сумму.");
      return;
    }
    if (!result) {
      setError("Сначала найдите пользователя.");
      return;
    }

    try {
      await APIUser.post("send-money/", {
        phone_number: result.phone_number,
        amount: Number(amount),
      });

      // Обновляем данные текущего пользователя после отправки
      const updatedUser = await updateUserFromAPI();
      setSendStatus("Деньги успешно отправлены!");

      setAmount("");

      // Можно обновить состояние user (если есть) или вызвать глобальный апдейт
      // Например, если у тебя есть контекст или состояние в родителе — обновить там
    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке денег.");
    }
  };

  return (
    <div className="user-search-container">
      <h2>Поиск пользователя</h2>
      <form className="user-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Введите номер телефона"
        />
        <button type="submit">Поиск</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="user-result">
          <h3>Найден пользователь:</h3>
          <p>Телефон: {result.phone_number}</p>
          <p>Баланс: {result.balance} </p>

          <div className="send-money-container">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Сумма для отправки"
            />
            <button onClick={handleSendMoney}>Отправить деньги</button>
          </div>

          {sendStatus && <p className="send-status">{sendStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
