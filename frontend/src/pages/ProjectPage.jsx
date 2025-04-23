import { useState } from "react";
import "../assets/styles/projPageCSS.css";
import "../App.css";

// Компонент ProjectPage
export default function ProjectPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Функція перемикання меню стартапів ---
  const toggleVisibility = () => {
    setShowMenu((prev) => !prev);
  };

  // --- Функція перемикання поля пошуку ---
  const toggleSearchField = () => {
    setShowSearch((prev) => !prev);
  };

  // --- Функція пошуку ---
  const submitSearch = () => {
    if (searchQuery.trim()) {
      console.log("Пошук за запитом: " + searchQuery);
      // window.location.href = `searchProj.html?query=${searchQuery}`;
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
            <img className="logo" src="images/logo3_w.png" alt="Логотип" />
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
              <button>Профіль</button>
            </a>
          </nav>
        </div>

        {showMenu && (
          <div id="smenu" style={{ display: "block" }}>
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

      <section className="project-section">
        <div className="mainInformation-proj">
          <div className="infoProj">
            <div className="info-proj">
              <h2>
                Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                люде, Роблять лихо з вами
              </h2>
            </div>

            <div className="imagesProj">
              <img src="images/ua.png" alt="Зображення" />
            </div>

            <div className="descrip">
              <h3>Про стартап</h3>
              <p>
                Тече вода в синє море, Та не витікає; Шука козак свою долю, А
                долі немає. Пішов козак світ за очі; Грає синє море, Грає серце
                козацькеє, А думка говорить: «Куди ти йдеш, не спитавшись? На
                кого покинув Батька, неньку старенькую, Молоду дівчину? На
                чужині не ті люде,— Тяжко з ними жити!
              </p>
              <p>
                Тече вода в синє море, Та не витікає; Шука козак свою долю, А
                долі немає. Пішов козак світ за очі; Грає синє море, Грає серце
                козацькеє, А думка говорить: «Куди ти йдеш, не спитавшись? На
                кого покинув Батька, неньку старенькую, Молоду дівчину? На
                чужині не ті люде,— Тяжко з ними жити!
              </p>
            </div>

            <p className="mark">
              卐 9.5 оцінити ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆
            </p>

            <h3>Відгуки</h3>

            <div className="fbs-proj">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="fb" key={i}>
                  <div className="peopInfo">
                    <img src="images/fb.png" alt="Аватар" />
                    <p className="name">Роберто</p>
                  </div>
                  <hr />
                  <p className="mark">
                    卐 9.5 оцінити ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆
                  </p>
                  <p className="comm">
                    Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                    люде, Роблять лихо з вами
                  </p>
                </div>
              ))}
            </div>

            <section className="tags-proj">
              <h3>Теги</h3>
              <ul>
                <li>
                  <a href="#">IT</a>
                </li>
                <li>
                  <a href="#">Виробництво</a>
                </li>
                <li>
                  <a href="#">Технології</a>
                </li>
                <li>
                  <a href="#">Інновації</a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="contacts-proj">
          <h3>Мінімальна вартість для внеску</h3>
          <p>250 000卐</p>
          <h3>Контакти</h3>
          <p>
            +38 (063) 555 66 44
            <br />
            lolkek4@gmail.com
          </p>
        </div>
      </section>

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
