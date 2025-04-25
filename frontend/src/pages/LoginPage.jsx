import { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/logCSS.css";
import "../App.css";

const Button = ({ children, ...props }) => (
  <button
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    {...props}
  />
);

export default function LoginPage() {
  const [isSmenuVisible, setSmenuVisible] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = () => setSmenuVisible((prev) => !prev);
  const toggleSearchField = () => setSearchVisible((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // При успішній авторизації перенаправляємо на сторінку профілю
        navigate("/profile");
      } else {
        // Якщо авторизація не вдалася, показуємо повідомлення про помилку
        setError("Неправильний логін або пароль");
      }
    } catch (err) {
      console.error("Помилка при авторизації:", err);
      setError("Сталася помилка. Спробуйте ще раз пізніше.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000); // 5 секунд
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
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
            <h1>Увійти</h1>
          </div>
          <form onSubmit={handleLogin} className="auth-toggle">
            <div className="auth-log-form">
              <label htmlFor="username" className="log-label">Логін</label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="auth-log-form">
              <label htmlFor="password" className="log-label">Пароль</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="login-error">{error}</p>}
            <Button type="submit">Увійти</Button>
          </form>
          <p className="register-text">
            Не маєте акаунту? <Link to="/createprof" className="register-link">Зареєструйтеся</Link>
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
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
      </footer>
    </div>
  );
}
