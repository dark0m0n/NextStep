import {useRef } from "react";
import "../assets/styles/profilePageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function ProfilePage() {
  const profilePhotoRef = useRef(null);

  // ---------------- Функція попереднього перегляду фото профілю ----------------
  const previewProfilePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePhotoRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <MyHeader />

      <div className="profile-container">
        <div className="profile-header">
          <img
            src="images/logo.png"
            alt="Фото профілю"
            className="profile-photo"
            id="profile-photo"
            ref={profilePhotoRef}
          />
          <div className="profile-info">
            <h1>Назар Двін</h1>
            <h3>Аналіз даних, Маркетинг</h3>
          </div>
        </div>

        <div className="profile-exp">
          <div className="expir">
            <h2>Досвід роботи</h2>
            <div className="spc">
              {[...Array(5)].map((_, index) => (
                <div className="specs" key={index}>
                  <p className="strong">
                    <strong className="strong-profile">Спеціальність:</strong>
                  </p>
                  <p className="spec">{index === 0 ? "Аналіз даних" : "Маркетинг"}</p>
                  <p className="exp">{index === 0 ? "10 днів" : "0 днів"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="section">
                      <p className="strong">
                          <strong className="strong-profile">Контактна інформація</strong>
                      </p>
            <ul>
              <li>
                
              <strong className="strong-descr">Тел.:</strong> +380 63 000 00 00
              </li>
              <li>
                <strong className="strong-descr">Email:</strong> nextstep@gmail.com
              </li>
              <li>
                <strong className="strong-descr">Країна:</strong> Україна
              </li>
            </ul>
          </div>

          <div className="section">
            <strong className="strong-profile">Навички</strong>
            <ul>
              <li>Project Management</li>
              <li>Public Relations</li>
              <li>Teamwork</li>
              <li>Time Management</li>
              <li>Leadership</li>
              <li>Critical Thinking</li>
            </ul>
          </div>

          <div className="section">
            <strong className="strong-profile">Володіння мовами</strong>
            <ul>
              <li>English (Fluent)</li>
              <li>French (Fluent)</li>
              <li>German (Basic)</li>
              <li>Spanish (Intermediate)</li>
            </ul>
          </div>

          <div className="other">
            <strong className="strong-profile">Додаткова інформація</strong>
            <p className="otherInfo">
              Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
                          Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
                          Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
                          Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
                          Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
                          Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
                          дизайні... 
            </p>
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
}