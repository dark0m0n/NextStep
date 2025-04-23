import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/logCSS.css";
import "../App.css";

const Button = ({ children, ...props }) => (
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    className="px-3 py-2 border rounded w-full"
    {...props}
  />
);

export default function LoginPage() {
  const [isSmenuVisible, setSmenuVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleVisibility = () => setSmenuVisible((prev) => !prev);
  const toggleSearchField = () => setSearchVisible((prev) => !prev);

  return (
    <>
    <div className="page-wrapper">
      <header>
        <div className="nav-container">
          <Link to="/">
            <img className="logo" src="/images/logo3_w.png" alt="NextStep Logo" />
          </Link>

          {isSearchVisible && (
            <div id="search-container">
              <Input type="text" placeholder="Введіть запит для пошуку..." id="search-input" />
              <Button onClick={() => console.log("Search clicked")} id="search-submit">Знайти</Button>
            </div>
          )}
          
          <nav>
            <Button onClick={toggleSearchField}>Пошук</Button>
            <Button onClick={toggleVisibility}>Стартапи</Button>
            <Button>Чати</Button>
            <Link to="/log">
              <Button>Профіль</Button>
            </Link>
          </nav>
        </div>

        {isSmenuVisible && (
          <div id="smenu">
            <Link className="smenu" id="one" to="/searchproj">Знайти стартап</Link>
            <Link className="smenu" id="one" to="/searchemp">Знайти персонал</Link>
            <Link className="smenu" id="two" to="/createproj">Створити стартап</Link>
          </div>
        )}
      </header>

      <section className="auth-container">
        <div className="formlog">
            <div className="auth-header">
                <h1>Увійти або Реєстрація</h1>
            </div>
          <div className="auth-toggle">
            <Link to="/profile">
              <Button id="login-btn">Увійти</Button>
            </Link>
            <Link to="/createprof">
              <Button id="register-btn">Реєстрація</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>
                <a href="mailto:support@next.step">
                  support@next.step
                </a>
              </p>
              <p>м. Львів, вул. Степана Бандери 12, Україна</p>

            <div className="footer-icons">
              <a href=""><img src="/images/insta.png" alt="Instagram"/></a>
              <a href=""><img src="/images/fb.png" alt="Facebook"/></a>
              <a href=""><img src="/images/yt.png" alt="YouTube"/></a>
            </div>

            <div className="footer-links">
              <a href="#">
                Умови та положення
              </a>
              <a href="#">
                Політика конфіденційності
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
      </>
  );
}
