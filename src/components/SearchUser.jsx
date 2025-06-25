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
      const res = await APIUser.get("search-user/", {
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
        phone_number: result[0]?.phone_number,
        amount: Number(amount),
      });

      const newTransaction = {
        id: Date.now(),
        to_user_phone_number: result.phone_number,
        amount: Number(amount),
        created_at: result.timestap,
      };

      const existing = JSON.parse(localStorage.getItem("transactions")) || [];
      localStorage.setItem(
        "transactions",
        JSON.stringify([newTransaction, ...existing])
      );

      await updateUserFromAPI();
      setSendStatus("Деньги успешно отправлены!");
      setAmount("");
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
          <p>Телефон: {result[0].phone_number}</p>

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
