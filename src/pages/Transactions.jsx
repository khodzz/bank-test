import React, { useEffect, useState } from "react";
import { APIUser } from "../api";
import "../styles/transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await APIUser.get("transactions/");
        setTransactions(response.data);
      } catch (err) {
        console.warn("С сервера не получены транзакции, пробуем localStorage");

        const local = localStorage.getItem("transactions");
        if (local) {
          setTransactions(JSON.parse(local));
        } else {
          setTransactions([]);
        }
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transactions">
      <h2>История транзакций</h2>
      {error && <p className="error">{error}</p>}
      {transactions.length > 0 ? (
        transactions.map((tx) => (
          <div key={tx.id} className="transaction-card">
            <p>Сумма: {tx.amount}</p>
            <p>Кому: {tx.other_user}</p>
            <p>
              Дата:{" "}
              {tx.timestamp
                ? new Date(tx.timestamp).toLocaleString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Не указана"}
            </p>
          </div>
        ))
      ) : (
        <p>У вас пока нет транзакций.</p>
      )}
    </div>
  );
};

export default Transactions;
