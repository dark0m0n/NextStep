import { useState, useRef } from "react";
import "../assets/styles/profilePageCSS.css";
import "../App.css";

export default function ProfilePage() {
  const [showSmenu, setShowSmenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);
  const profilePhotoRef = useRef(null);

  // ---------------- Функція перемикання відображення smenu ----------------
  const toggleVisibility = () => {
    setShowSmenu((prev) => !prev);
  };

  // ---------------- Функція перемикання поля пошуку ----------------
  const toggleSearchField = () => {
    setShowSearch((prev) => !prev);
  };

  // ---------------- Функція надсилання пошуку ----------------
  const submitSearch = () => {
    const searchQuery = searchInputRef.current.value;
    if (searchQuery) {
      console.log("Пошук за запитом: " + searchQuery);
      // window.location.href = `searchProj.html?query=${searchQuery}`;
    } else {
      alert("Будь ласка, введіть запит для пошуку.");
    }
  };

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
      <noscript>У Вас вимкнений або відсутній JavaScript для браузера!</noscript>

      <header>
        <div className="nav-container">
          <a href="/">
            <img className="logo" src="images/logo3_w.png" alt="Лого" />
          </a>

          <div
            id="search-container"
            style={{ display: showSearch ? "flex" : "none" }}
          >
            <input
              type="text"
              id="search-input"
              ref={searchInputRef}
              placeholder="Введіть запит для пошуку..."
            />
            <button id="search-submit" onClick={submitSearch}>
              Знайти
            </button>
          </div>

          <nav>
            <button className="button" onClick={toggleSearchField}>
              Пошук
            </button>
            <button className="button" onClick={toggleVisibility}>
              Стартапи
            </button>
            <button className="button">Чати</button>
            <a href="/log">
              <button>Профіль</button>
            </a>
          </nav>
        </div>

        <div id="smenu" style={{ display: showSmenu ? "block" : "none" }}>
          <a href="/searchproj" className="smenu" id="one">
            Знайти стартап
          </a>
          <a href="/searchemp" className="smenu" id="one">
            Знайти персонал
          </a>
          <a href="/createproj" className="smenu" id="two">
            Створити стартап
          </a>
        </div>
      </header>

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

        <div className="profile-content">
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
            <h2>Контактна інформація</h2>
            <ul>
              <li>
                <strong className="strong-profile">Тел.:</strong> +380 63 000 00 00
              </li>
              <li>
                <strong className="strong-profile">Email:</strong> nextstep@gmail.com
              </li>
              <li>
                <strong className="strong-profile">Країна:</strong> Україна
              </li>
            </ul>
          </div>

          <div className="section">
            <h2>Навички</h2>
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
            <h2>Володіння мовами</h2>
            <ul>
              <li>English (Fluent)</li>
              <li>French (Fluent)</li>
              <li>German (Basic)</li>
              <li>Spanish (Intermediate)</li>
            </ul>
          </div>

          <div className="other">
            <h2>Додаткова інформація</h2>
            <p className="otherInfo">
              Lorem Ipsum - це текст-"риба", що використовується в друкарстві та
              дизайні... (скорочено для прикладу)
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>
            <a href="mailto:support@next.step">support@next.step</a>
          </p>
          <p>м. Львів, вул. Степана Бандери 12, Україна</p>

          <div className="footer-icons">
          <a href=""><img src="/images/insta.png" alt="Instagram"/></a>
              <a href=""><img src="/images/fb.png" alt="Facebook"/></a>
              <a href=""><img src="/images/yt.png" alt="YouTube"/></a>
          </div>

          <div className="footer-links">
            <a href="#">Умови та положення</a>
            <a href="#">Політика конфіденційності</a>
          </div>
        </div>
      </footer>
    </>
  );
}