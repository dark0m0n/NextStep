import { useEffect, useRef, useState } from "react";
import "../assets/styles/searchprojCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchPage() {
    const [priceMin, setPriceMin] = useState(1);
    const [priceMax, setPriceMax] = useState(100000);
    const [sortOption, setSortOption] = useState("");

    //Увімк/вимк меню фільтрів
    const fltrRef = useRef(null);
    const [fltrVisible, setFltrVisible] = useState(false);

    const toggleFltr = () => {
        setFltrVisible(prev => {
            const newState = !prev;
            if (fltrRef.current) {
                fltrRef.current.classList.toggle("visible", newState);
            }
            return newState;
        });
    };
    useEffect(() => {
        if (window.innerWidth >= 768 && fltrRef.current) {
            setFltrVisible(true);
            fltrRef.current.classList.add("visible");
        }
    }, []);

    // Для бд
    const tags = ["IT", "Виробництво", "Інновації", "Технології"];
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    // Просто бд проєктів
    const allProjects = [
        // IT
        { id: 1, tag: "IT", title: "Хмарна CRM-платформа", mark: 9.2, price: 3000, projType: "Стартап" },
        { id: 2, tag: "IT", title: "Система управління задачами", mark: 8.5, price: 4500, projType: "Малий бізнес" },
        { id: 3, tag: "IT", title: "Онлайн-сервіс для аналітики", mark: 7.8, price: 7000, projType: "Пілотний проєкт" },

        // Виробництво
        { id: 4, tag: "Виробництво", title: "Міні-лінія фасування кави", mark: 6.5, price: 15000, projType: "Стартап" },
        { id: 5, tag: "Виробництво", title: "Автоматизований верстат ЧПУ", mark: 8.0, price: 30000, projType: "Малий бізнес" },
        { id: 6, tag: "Виробництво", title: "Еко-пакування з крохмалю", mark: 7.0, price: 20000, projType: "MVP" },

        // Інновації
        { id: 7, tag: "Інновації", title: "Розумна система моніторингу повітря", mark: 9.0, price: 18000, projType: "Пілотний проєкт" },
        { id: 8, tag: "Інновації", title: "Доповнена реальність для освіти", mark: 8.7, price: 12000, projType: "Малий бізнес" },
        { id: 9, tag: "Інновації", title: "Нанопокриття для панелей", mark: 6.8, price: 9500, projType: "Стартап" },

        // Технології
        { id: 10, tag: "Технології", title: "3D-принтер з переробленого пластику", mark: 9.5, price: 35000, projType: "Стартап" },
        { id: 11, tag: "Технології", title: "Сенсорна рукавиця для реабілітації", mark: 8.1, price: 25000, projType: "MVP" },
        { id: 12, tag: "Технології", title: "AI-модуль контролю енергії", mark: 9.0, price: 40000, projType: "Пілотний проєкт" }
    ];

    // Відфільтровано
    const filteredProjects = allProjects.filter((project) => {
        const tagMatch = selectedTags.length === 0 || selectedTags.includes(project.tag);
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => project.mark >= r);
        const priceMatch = project.price >= priceMin && project.price <= priceMax;
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.projType);
        return tagMatch && typeMatch && ratingMatch && priceMatch;
    });

    // Відсортовано + відфільтровано
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (sortOption) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "rating-asc":
                return a.mark - b.mark;
            case "rating-desc":
                return b.mark - a.mark;
            default:
                return 0;
        }
    });
    // Фільтр по типу
    const handleTypeChange = (projType) => {
        setSelectedTypes((prev) =>
            prev.includes(projType)
                ? prev.filter((t) => t !== projType)
                : [...prev, projType]
        );
    };

    // Фільтр по оцінці
    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) =>
            prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
        );
    };

    // Фільтр по тегам
    const handleTagChange = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    // Фільтри по ціні
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), priceMax - 1);
        setPriceMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), priceMin + 1);
        setPriceMax(value);
    };
    if (priceMin >= priceMax) {
        setPriceMax(priceMin + 1);
    }

    // Слайдер цін (динам. зміна кольору)
    const minSliderRef = useRef(null);
    const maxSliderRef = useRef(null);
    const getSliderBackground = (value, min, max) => {
        const percent = ((value - min) / (max - min)) * 100;
        return `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    };

    useEffect(() => {
        if (minSliderRef.current) {
            minSliderRef.current.style.background = getSliderBackground(priceMin, 0, 100000);
        }
        if (maxSliderRef.current) {
            maxSliderRef.current.style.background = getSliderBackground(priceMax, 0, 100000);
        }
    }, [priceMin, priceMax]);
    return (
        <>
            <MyHeader />
            <div className="maincont">
            <div className="filter-wrapper">
                <aside className="sidebar-filter"ref={fltrRef}>
                    <div className="fltrHead">
                        <h4>Фільтр</h4>
                    <button className="close" onClick={toggleFltr}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="fltrs">
                        <div className="fltrpath">
                            <div className="fltrHead">
                                <h5>За тегами</h5>
                            </div>
                                {tags.map((tag) => (
                                    <label key={tag} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagChange(tag)}
                                            className="fltrInput"
                                        />
                                        {tag}
                                    </label>
                                ))}
                        </div>
                        <div className="fltrpath">
                            <div className="fltrHead">
                                <h5>Тип проєкту</h5>
                            </div>
                                    {["Стартап", "Малий бізнес", "Пілотний проєкт", "MVP"].map(type => (
                                        <label key={type} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeChange(type)}
                                                className="fltrInput"
                                            />
                                            {type}
                                        </label>
                                    ))}
                        </div>
                        <div className="fltrpath">
                            <div className="fltrHead">
                                <h5>Рейтинг</h5>
                            </div>
                                    {[10, 9, 8, 7, 6, 5].map(rating => (
                                        <label key={rating} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(rating)}
                                                onChange={() => handleRatingChange(rating)}
                                                className="fltrInput"
                                            />
                                            {rating}+
                                        </label>
                                    ))}
                        </div>
                        <div className="fltrpath">
                            <div className="fltrHead">
                                <h5>Необхідні інвестиції (грн)</h5>
                            </div>
                                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                        <input
                                            type="number"
                                            min="0"
                                            onChange={handleMinChange}
                                            style={{ width: "100%" }}
                                            value={priceMin}
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            onChange={handleMaxChange}
                                            style={{ width: "100%" }}
                                            
                                            value={priceMax}
                                        />
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="100"
                                        value={priceMin}
                                        ref={minSliderRef}
                                        onInput={(e) => {
                                            setPriceMin(Number(e.target.value));
                                            e.target.style.background = getSliderBackground(e.target.value, 0, 100000);
                                        }}
                                        style={{ width: "100%", marginBottom: "5px" }}
                                    />

                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="100"
                                        value={priceMax}
                                        ref={maxSliderRef}
                                        onInput={(e) => {
                                            setPriceMax(Number(e.target.value));
                                            e.target.style.background = getSliderBackground(e.target.value, 0, 100000);
                                        }}
                                        style={{ width: "100%" }}
                                    />
                        </div>
                    </div>
                    </aside>
                
            </div>
            <section className="searchproj-section">
                <div className="info-searchproj">
                    <h2>Знайти стартап</h2>
                    <p>
                        Знайди вже готовий і правильно організований проєкт, який чекає на
                        персонал
                    </p>

                </div>
                    <div className="options1">
                        <div className="start-fltr">
                            <button className="fbtn" onClick={toggleFltr}>Фільтр</button>
                        </div>
                        <div className="start-fltr">    
                            <div className="sort-control">
                                <label htmlFor="sortSelect">Сортувати:</label>
                                <select id="sortSelect1" onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="">-- Без сортування --</option>
                                    <option value="price-asc">Ціна: від найменшої</option>
                                    <option value="price-desc">Ціна: від найбільшої</option>
                                    <option value="rating-asc">Оцінка: від найменшої</option>
                                    <option value="rating-desc">Оцінка: від найбільшої</option>
                                </select>
                            </div>
                        </div>
                    </div>
                <div className="blockss-searchproj">
                    <div className="blocks-searchproj">
                            {filteredProjects.length === 0 && (
                                <p style={{ padding: "20px", fontStyle: "italic" }}>
                                    Немає проєктів, які відповідають обраним критеріям.
                                </p>
                            )}

                            {sortedProjects.map((project, index) => (
                            <div className="block-searchproj" data-tags={project.tag} key={index}>
                                <a href="/project">{/* /project/${project.id} */}
                                    <img src="images/ua.png" alt="UA flag" />
                                    <p className="title">{project.title}</p>
                                    <p className="mark">★ {project.mark}</p>
                                    <p className="price">Від {project.price.toLocaleString()} грн</p>
                                </a>
                            </div>
                        ))}
                    </div>

                    
                </div>
                
            </section>
            </div>
            <MyFooter />
        </>
    );
}