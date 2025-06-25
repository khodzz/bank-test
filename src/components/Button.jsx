import React from "react";
import { APIUser } from "../api";
import { updateUserFromAPI } from "../services/updateUserService";
import "../styles/button.css";

const Button = () => {
  const handleClick = async () => {
    try {
      await APIUser.post("increase-balance/");

      await updateUserFromAPI();
      setTimeout(() => {
        location.reload();
      }, 400);
    } catch (error) {
      console.error("Ошибка при увеличении баланса:", error);
    }
  };

  return (
    <div className="button-div">
      <button onClick={handleClick}>Кликни!!!</button>
    </div>
  );
};

export default Button;
