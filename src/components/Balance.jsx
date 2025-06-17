import React, { useEffect, useState } from "react";

const Balance = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return <p>Пожалуйста, войдите в аккаунт</p>;
  }

  return (
    <div>
      <p>Телефон: {user.phone_number}</p>
      <p>Баланс: {user.balance} сум</p>
    </div>
  );
};

export default Balance;
