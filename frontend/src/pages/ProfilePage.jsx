import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/profilePageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const {username} = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/user/${username}`, {
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Profile load error");
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error("Помилка:", error));
  }, [username]);

  if (!userData) {
    return <div>Завантаження...</div>;
  }

  return (
    <>
      <MyHeader />

      <div className="profile-container">
        <div className="profile-header">
          <img
            src={userData.imagePath || "images/logo.png"}
            alt="Фото профілю"
            className="profile-photo"
            id="profile-photo"
          />
          <div className="profile-info">
            <h1>{userData.firstname} {userData.lastname}</h1>
            <h3>{userData.specialties}</h3>
          </div>
        </div>

        <div className="profile-exp">
          <div className="expir">
            <h2>Досвід роботи</h2>
            <div className="spc">
              {/*замінити логікою коли буде справжній досвід */}
              <div className="specs">
                <p className="strong">
                  <strong className="strong-profile">Спеціальність:</strong>
                </p>
                <p className="spec">{userData.specialties}</p>
                <p className="exp">0 днів</p>
              </div>
            </div>
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
              {userData.skills.split(",").map((skill, index) => (
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
        <button onClick={() => navigate(`/editprofile`)}>Редагувати профіль</button>
      </div>

      <MyFooter />
    </>
  );
}
