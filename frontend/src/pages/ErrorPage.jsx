import React from "react";
import "../assets/styles/error.css";
import fisherImage from "/images/fisher.png";
import MyHeader from "../components/Header";    
import MyFooter from "../components/Footer";


export default function ErrorPage({ errorCode = 500, message = "Щось пішло не так..." }) {
    return (
        <div>
      <MyHeader />
      <div className="error-page">
  <img src={fisherImage} alt="fisher" className="fisher-img" />
  <div className="fisher-container">
    <div className="error-popup">
      <h1>Помилка {errorCode}</h1>
      <p>{message}</p>
      <button onClick={() => window.location.href = "/"}>На головну</button>
    </div>
  </div>
</div>
            <MyFooter/>
            </div>
  );
}