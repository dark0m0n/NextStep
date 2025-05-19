import "../assets/styles/projPageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Компонент зірочок рейтингу
const RatingStars = ({ max = 10, onChange }) => {
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(0);

    const handleClick = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="flex gap-1 cursor-pointer text-3xl">
            {Array.from({ length: max }, (_, i) => {
                const value = i + 1;
                const isActive = value <= (hovered || selected);

                return (
                    <span
                        key={value}
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => setHovered(value)}
                        onMouseLeave={() => setHovered(0)}
                        className={isActive ? "text-yellow-400" : "text-gray-400"}
                        aria-label={`${value} зірок`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleClick(value);
                            }
                        }}
                    >
                        {isActive ? "★" : "☆"}
                    </span>
                );
            })}
        </div>
    );
};

export default function ProjectPage() {
    const { id } = useParams();
    const [startup, setStartup] = useState(null);
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [fbVisible, setFbVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [validationErrors, setValidationErrors] = useState({ rating: false, comment: false });

    // Функція для обчислення середнього рейтингу
    const calculateAverageRating = (reviewsArray) => {
        if (reviewsArray.length === 0) return 0;
        const sum = reviewsArray.reduce((acc, r) => acc + r.rating, 0);
        return +(sum / reviewsArray.length).toFixed(1); // округлюємо до 1 знаку
    };

    // Оновлення середнього рейтингу в бекенді
    const updateStartupRating = async (avgRating) => {
        try {
            const response = await fetch(`/api/startup/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ averageRating: avgRating }),
            });

            if (!response.ok) {
                console.error("Не вдалося оновити рейтинг стартапу");
            }
        } catch (err) {
            console.error("Помилка оновлення рейтингу:", err);
        }
    };

    // Тогл форми відгуку
    const toggleFb = () => {
        setFbVisible((prev) => {
            if (prev) {
                setRating(0);
                setComment("");
                setValidationErrors({ rating: false, comment: false });
            }
            return !prev;
        });
    };

    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const res = await fetch(`/api/startup/${id}`);
                if (!res.ok) throw new Error("Startup not found");
                const data = await res.json();
                setStartup(data);

                const userRes = await fetch(`/api/user/${data.userID}`);
                if (!userRes.ok) throw new Error("User not found");
                const userData = await userRes.json();
                setUser(userData);

                const reviewRes = await fetch(`/api/reviews/${id}`);
                if (!reviewRes.ok) throw new Error("Reviews not found");
                const reviewsData = await reviewRes.json();
                setReviews(reviewsData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchStartup();
    }, [id]);

    if (!startup || !user) return <div>Завантаження...</div>;

    const experienceList = startup.experience
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const categoriesList = startup.category
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    // Обробка сабміту відгуку
    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newValidationErrors = { rating: false, comment: false };

        if (rating === 0) {
            newValidationErrors.rating = true;
            hasError = true;
        }
        if (comment.trim().length === 0) {
            newValidationErrors.comment = true;
            hasError = true;
        }
        setValidationErrors(newValidationErrors);

        if (hasError) return;

        try {
            const token = localStorage.getItem("token");
            const userInfo = await fetch(`/api/user/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!userInfo.ok) throw new Error("Користувача не знайдено або неавторизовано");

            const userData = await userInfo.json();

            const formData = new FormData();
            formData.append("comment", comment.trim());
            formData.append("rating", rating);
            formData.append("userID", userData.id);
            formData.append("startupID", id);
            formData.append("createdAt", new Date().toISOString());

            const response = await fetch("http://localhost:8000/api/review", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const createdReview = await response.json();

                // Додаємо новий відгук у список локально
                setReviews((prev) => [...prev, createdReview]);

                // Обчислюємо середній рейтинг і оновлюємо стартап
                const newAvg = calculateAverageRating([...reviews, createdReview]);
                updateStartupRating(newAvg);

                // Оновлюємо стартап локально для показу нового середнього рейтингу
                setStartup((prev) => ({ ...prev, averageRating: newAvg }));

                toggleFb();
            } else {
                console.log("Помилка при створенні коментаря.");
            }
        } catch (error) {
            console.error("Помилка запиту:", error);
        }
    };

    return (
        <>
            <MyHeader />

            <section className="project-section">
                <div className="contacts-proj">
                    <h3>Мінімальна вартість для внеску</h3>
                    <p>{startup.investment}</p>
                    <h3>Контакти</h3>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.phoneNumber}</p>
                </div>

                <div className="mainInformation-proj">
                    <div className="infoProj">
                        <div className="info-proj">
                            <h2>{startup.title}</h2>
                            {/* Показуємо середній рейтинг */}
                            <p className="mark">
                                {startup.averageRating
                                    ? `${startup.averageRating} ★`.repeat(Math.floor(startup.averageRating)) +
                                      "☆".repeat(10 - Math.floor(startup.averageRating))
                                    : "Оцінка відсутня"}
                            </p>
                        </div>

                        <div className="imagesProj">
                            <img src={startup.imagePath} alt="Зображення" />
                        </div>

                        <div className="descrip">
                            <h3>Про стартап</h3>
                            <p>{startup.description}</p>
                        </div>

                        <div className="expir">
                            <h3>Досвід роботи</h3>
                            <div className="spc">
                                {experienceList.map((item, index) => (
                                    <div className="specs" key={index}>
                                        <p className="strong">
                                            <strong className="strong-profile">Спеціальність:</strong>
                                        </p>
                                        <p className="spec">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mark">
                            {/* Тут більше не показуємо фіксований рейтинг */}
                            {/* Кнопка відкриття форми */}
                            <div className="start-fbs">
                                <button className="fbsbtn" onClick={toggleFb}>
                                    Надіслати відгук
                                </button>
                            </div>
                        </p>

                        {fbVisible && (
                            <div className="overlay-createFBform">
                                <form onSubmit={handleSubmit}>
                                    <div className="createFBform">
                                        <div className="headFBform">
                                            <h2>Написати відгук</h2>
                                            <button
                                                className="close"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFb();
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 50 50"
                                                >
                                                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <p>Оцініть стартап</p>
                                        <div className="setmark">
                                            <RatingStars max={10} onChange={setRating} />
                                        </div>
                                        {validationErrors.rating && (
                                            <p id="wrongMark">Будь ласка, поставте оцінку</p>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="comment" className="label">
                                                Коментар
                                            </label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                className={`input-info-create text ${
                                                    validationErrors.comment ? "input-error" : ""
                                                }`}
                                                placeholder="Додайте коментар"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                            ></textarea>
                                            {validationErrors.comment && (
                                                <p id="wrongCom">Поле обов'язкове для заповнення</p>
                                            )}
                                        </div>

                                        <button type="submit" id="formbtnS">
                                            Зберегти
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <h3>Відгуки</h3>
                        <div className="fbs-proj">
                            {reviews.length === 0 ? (
                                <p>Наразі відгуків немає</p>
                            ) : (
                                reviews.map((review, i) => {
                                    const localDateObj = new Date(review.createdAt);
                                    const localDate = localDateObj.toLocaleDateString("uk-UA");
                                    const localTime = localDateObj.toLocaleTimeString("uk-UA", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return (
                                        <div className="fb" key={i}>
                                            <div className="peopInfo">
                                                <img src={review.user.imagePath} alt="Аватар" />
                                                <p className="name">{review.user.username}</p>
                                                <p className="review-date">{localDate}</p>
                                                <p className="review-date">{localTime}</p>
                                            </div>
                                            <hr />
                                            <p className="mark">
                                                {review.rating}{" "}
                                                {"★".repeat(review.rating) + "☆".repeat(10 - review.rating)}
                                            </p>
                                            <p className="comm">{review.comment}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <section className="tags-proj">
                            <h3>Теги</h3>
                            <ul>
                                {categoriesList.map((item, index) => (
                                    <li key={index}>
                                        <a href="#">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </section>

            <MyFooter />
        </>
    );
}
