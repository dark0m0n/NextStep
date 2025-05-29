import { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/logCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
          navigate(`/`);
      } else {
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
      <MyHeader/>

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

      <MyFooter/>
    </div>
  );
}
