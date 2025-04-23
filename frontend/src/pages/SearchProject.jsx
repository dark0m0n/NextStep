import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/searchprojCSS.css"; // Імпорт стилів для компонента
import "../App.css"; // Імпорт загальних стилів

export default function SearchPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [showSmenu, setShowSmenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // --- Перемикає видимість меню стартапів ---
  const toggleVisibility = () => {
    setShowSmenu((prev) => !prev);
  };

  // --- Перемикає видимість поля пошуку ---
  const toggleSearchField = () => {
    setShowSearch((prev) => !prev);
  };

  // --- Обробляє пошук ---
  const submitSearch = () => {
    if (searchQuery.trim()) {
      console.log("Пошук за запитом: " + searchQuery);
      // navigate(`/searchProj?query=${searchQuery}`);
    } else {
      alert("Будь ласка, введіть запит для пошуку.");
    }
  };

  return (
    <>
      <noscript>У Вас вимкнений або відсутній JavaScript для браузера!</noscript>
      <header>
        <div className="nav-container">
          <a href="/">
            <img className="logo" src="images/logo3_w.png" alt="Logo" />
          </a>

          {showSearch && (
            <div id="search-container" style={{ display: "flex" }}>
              <input
                type="text"
                id="search-input"
                placeholder="Введіть запит для пошуку..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button id="search-submit" onClick={submitSearch}>
                Знайти
              </button>
            </div>
          )}

          <nav>
            <button className="button" onClick={toggleSearchField}>
              Пошук
            </button>
            <button className="button" onClick={toggleVisibility}>
              Стартапи
            </button>
            <button className="button" href="#">
              Чати
            </button>
            <a href="/log">
              <button className="button">Профіль</button>
            </a>
          </nav>
        </div>

        {showSmenu && (
          <div id="smenu">
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
        )}
      </header>

      <section className="searchproj-section">
        <div className="info-searchproj">
          <h2>Знайти стартап</h2>
          <p>
            Знайди вже готовий і правильно організований проєкт, який чекає на
            персонал
          </p>
        </div>

        <div className="blockss-searchproj">
          <div className="process-searchproj">
            <p>10,000+ результатів</p>
            <p>Фільтр</p>
            <p>Сортувати: за ціною</p>
          </div>

          <div className="blocks-searchproj">
            {[...Array(16)].map((_, index) => (
              <div className="block-searchproj" data-tags="IT, Технології" key={index}>
                <img src="images/ua.png" alt="UA flag" />
                <p className="title">
                  Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                  люде, Роблять лихо з вами
                </p>
                <p className="mark">卐 9.5</p>
                <p className="price">Від 5000 грн</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>
            <a href="mailto:support@next.step">support@next.step</a>
          </p>
          <p>м. Львів, вул. Степана Бандери 12, Україна</p>

          <div className="footer-icons">
          <a href=""><img src="public/images/insta.png" alt="Instagram"  /></a>
          <a href=""> <img src="public/images/fb.png" alt="Facebook" /></a>
          <a href=""> <img src="public/images/yt.png" alt="YouTube" /></a>
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