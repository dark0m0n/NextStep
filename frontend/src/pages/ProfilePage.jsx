import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/profilePageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function MyProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/api/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
          return null;
        }
        if (!res.ok) throw new Error("Не вдалося завантажити профіль");
        return res.json();
      })
      .then((data) => data && setUserData(data))
      .catch((err) => console.error("Помилка завантаження:", err));
  }, [navigate]);



  if (!userData) {
    return <div>Завантаження...</div>;
  }


  return (
    <>
      <MyHeader />
  
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={userData.imagePath || "/images/logo.png"}
            alt="Фото профілю"
            className="profile-photo"
            id="profile-photo"
          />
            <div className="profile-info">
              <h2 className="profile-name">{userData.username}</h2>
              <h2>{userData.firstname} {userData.lastname}</h2>
              <div className="mainUserInfo">
              <p><strong className="strong-profile">Сфера:</strong> {userData.category}</p>
              <p><strong className="strong-profile">Країна:</strong> {userData.country}</p>
              <p><strong className="strong-profile">Рейтинг:</strong> {(userData.rating ?? "-") + "★"}</p>
              </div>
              
            </div>
        </div>
  
        <div className="profile-exp">
        <h2>Досвід роботи</h2>
        <div className="expir">
            {userData.specialties.split(",").map((spec, index) => {
              const [name, experience] = spec.split(":").map((s) => s.trim());
              return (
                <div className="spc" key={index}>
                  <div className="specs">
                    <p className="strong">
                      <strong className="strong-profile">Спеціальність:</strong>
                      <p>{name}</p>
                    </p>
                    <p className="strong">
                      <strong className="strong-profile">Досвід:</strong>
                      <p> {experience || "-"}</p>
                    </p>
                  </div>
                </div>
              );
            })}
</div>
        </div>
  
        <div className="profile-content">
          <div className="section">
            <p className="strong">
              <strong className="strong-profile">Контактна інформація</strong>
            </p>
            <ul>
              <li><strong className="strong-descr">Тел.:</strong> {userData.phoneNumber}</li>
              <li><strong className="strong-descr">Email:</strong> {userData.email}</li>
              <li><strong className="strong-descr">Країна:</strong> {userData.country}</li>
            </ul>
          </div>
  
          <div className="section">
            <strong className="strong-profile">Навички</strong>
            <ul>
              {userData.skills.split(";").map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
  
          <div className="section">
            <strong className="strong-profile">Володіння мовами</strong>
            <ul>
              {userData.language.split(",").map((lang, index) => (
                <li key={index}>{lang.trim()}</li>
              ))}
            </ul>
          </div>
  
          <div className="other">
            <strong className="strong-profile">Додаткова інформація</strong>
            <p className="otherInfo">{userData.additionalInfo}</p>
          </div>
        </div>
  
        <button onClick={() => navigate(`/editprofile`)} style={{ fontSize: "20px" }} >Редагувати профіль</button>
      </div>
  
      <MyFooter />
    </>
  );
  
}
