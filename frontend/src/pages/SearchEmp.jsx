import React, { useState } from "react";
import "../assets/styles/searchempCSS.css"; // Імпорт стилів для компонента
import "../App.css"; // Імпорт загальних стилів

// ------------------------ Компонент Header ------------------------
const Header = () => {
  const [isSmenuVisible, setSmenuVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Перемикач видимості меню стартапів
  const toggleVisibility = () => {
    setSmenuVisible((prev) => !prev);
  };

  // Перемикач поля пошуку
  const toggleSearchField = () => {
    setSearchVisible((prev) => !prev);
  };

  // Обробка пошуку
  const submitSearch = () => {
    if (searchQuery.trim()) {
      console.log("Пошук за запитом: " + searchQuery);
      // window.location.href = `searchProj.html?query=${searchQuery}`;
    } else {
      alert("Будь ласка, введіть запит для пошуку.");
    }
  };

  return (
    <header>
      <div className="nav-container">
        <a href="/">
          <img className="logo" src="images/logo3_w.png" alt="NextStep Logo" />
        </a>
        {isSearchVisible && (
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
          <button className="button">Чати</button>
          <a href="/log">
            <button className="button">Профіль</button>
          </a>
        </nav>
      </div>
      {isSmenuVisible && (
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
  );
};

// ------------------------ Компонент Block ------------------------
const Block = ({ imgSrc, title, mark, price }) => (
  <div className="block" data-tags="IT, Технології">
    <img src={imgSrc} alt="block preview" />
    <p className="title">{title}</p>
    <p className="mark">{mark}</p>
    <p className="price">{price}</p>
  </div>
);

// ------------------------ Компонент MainSection ------------------------
const MainSection = () => {
  const blocksData = [
    "images/insta.png",
    "images/logo.png",
    "images/logo.png",
    "images/logo2.jpg",
    "images/logo3.png",
    "images/usa.png",
    "images/fb.png",
  ];

  const blockTitle =
    "Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі люде, Роблять лихо з вами";
  const mark = "卐 9.5";
  const price = "Від 5000 грн";

  return (
    <section className="searchemp-section">
      <div className="info-searchemp">
        <h2>Знайти персонал</h2>
        <p>Знайди справжніх професіоналів, які вже готові приступити до роботи</p>
      </div>
      <div className="blockss">
        <div className="process-searchemp">
          <p>10,000+ результатів</p>
          <p>Фільтр</p>
          <p>Сортувати: за ціною</p>
        </div>
        <div className="blocks">
          {blocksData.map((src, index) => (
            <Block
              key={index}
              imgSrc={src}
              title={blockTitle}
              mark={mark}
              price={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ------------------------ Компонент Footer ------------------------
const Footer = () => (
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
);

// ------------------------ Головний компонент ------------------------
const SearchEmpPage = () => {
  return (
    <>
      <noscript>
        У Вас вимкнений або відсутній JavaScript для браузера!
      </noscript>
      <Header />
      <MainSection />
      <Footer />
    </>
  );
};

export default SearchEmpPage;
