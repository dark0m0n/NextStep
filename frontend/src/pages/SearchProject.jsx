import { useEffect, useRef, useState, useMemo } from "react";
import "../assets/styles/searchprojCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchPage() {
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
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
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [onlyHiring, setOnlyHiring] = useState(false);
    

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/startups");
                if (!res.ok) throw new Error("Помилка при завантаженні даних");
                const data = await res.json();

                const processedData = data.map((project) => ({
                    ...project,
                    mark: Number(project.mark),
                    tag: Array.isArray(project.tag)
                        ? project.tag
                        : typeof project.tag === "string"
                            ? project.tag.split(",").map((tag) => tag.trim())
                            : [],
                    imagePath: project.imagePath || "images/ua.png",
                }));

                setAllProjects(processedData);
            } catch (err) {
                console.error(err);
                setError("Не вдалося завантажити проєкти");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchProjects();
    }, []);
    

    // Відфільтровано
    const filteredProjects = allProjects.filter((project) => {
        const tagMatch = selectedTags.length === 0 || project.tag.some(tag => selectedTags.includes(tag));
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => project.mark >= r);
        const priceMatch = project.price >= priceMin && project.price <= priceMax;
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.projType);
        const hiringMatch = !onlyHiring || project.hiring === true;
        return tagMatch && typeMatch && ratingMatch && priceMatch && hiringMatch;
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

    const handleMinChange = (e) => {
        const val = e.target.value;
    
        if (/^\d*$/.test(val)) {
            const num = Number(val);
    
            if (val === "") {
                setPriceMin("");
            } else if (num < priceMax && num <= 100000) {
                setPriceMin(num);
            }
        }
    };
    
    const handleMaxChange = (e) => {
        const val = e.target.value;
    
        if (/^\d*$/.test(val)) {
            const num = Number(val);
    
            if (val === "") {
                setPriceMax("");
            } else if (num > priceMin && num <= 100000) {
                setPriceMax(num);
            }
        }
    };
    useEffect(() => {
        if (priceMin >= priceMax) {
            setPriceMax(priceMin);
        }
    }, [priceMin, priceMax]);

    // Слайдер цін (динам. зміна кольору)
    const minSliderRef = useRef(null);
    const maxSliderRef = useRef(null);
    const getSliderBackground = (value, min, max) => {
        const percent = ((value - min) / (max - min)) * 100;
        return `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    };

    const allTags = useMemo(() => [...new Set(allProjects.flatMap(project => project.tag))], [allProjects]);


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
                                    <h5>Набір персоналу</h5>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={onlyHiring}
                                        onChange={() => setOnlyHiring(prev => !prev)}
                                        className="fltrInput"
                                    />
                        </div>
                        <div className="fltrpath">
                            <div className="fltrHead">
                                <h5>За тегами</h5>
                            </div>
                                {allTags.map((tag) => (
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
                                        type="text"
                                        placeholder="Від"
                                        min="0"
                                        max={priceMax}
                                            onChange={handleMinChange}
                                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
                                            value={priceMin}
                                        />
                                        <input
                                        type="text"
                                        placeholder="До"
                                        min="0"
                                        max={priceMax}
                                            onChange={handleMaxChange}
                                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
                                            
                                            value={priceMax}
                                        />
                                    </div>

                                    <div className="range-slider-container">
    <div className="slider-track">
        <input
            type="range"
            min="0"
            max="100000"
            step="100"
            value={priceMin}
            onChange={(e) => {
                const val = Number(e.target.value);
                if (val < priceMax) setPriceMin(val);
            }}
            className="range-thumb min"
            style={{
                background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${(priceMin / 100000) * 100}%, white ${(priceMin / 100000) * 100}%, white 100%)`,
            }}
                                        />
                                    </div>
                                    <div className="slider-track">
        <input
            type="range"
            min="0"
            max="100000"
            step="100"
            value={priceMax}
            onChange={(e) => {
                const val = Number(e.target.value);
                if (val > priceMin) setPriceMax(val);
            }}
            className="range-thumb max"
            style={{
                background: `linear-gradient(to right, 
                    #14B8A6 0%, 
                    #14B8A6 ${(priceMax / 100000) * 100}%, 
                    white ${(priceMax / 100000) * 100}%, 
                    white 100%)`,
            }}
        />
    </div>
</div>


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
                    {isLoading ? (
    <p style={{ padding: "20px" }}>Завантаження проєктів...</p>
) : error ? (
    <p style={{ padding: "20px", color: "red" }}>{error}</p>
) : filteredProjects.length === 0 ? (
    <p style={{ padding: "20px", fontStyle: "italic" }}>
        Немає проєктів, які відповідають обраним критеріям.
    </p>
) : (
    sortedProjects.map((project) => (
        <div className="block-searchproj" data-tags={project.tag} key={project.id}>
            <a href={`project/${project.id}`} className="block-link">
                <img src={project.imagePath}  alt={project.title} />
                <p className="title">{project.title}</p>
                <p className="mark">★ {project.mark}</p>
                <p className="price">Від {project.price}</p>
            </a>
        </div>
    ))
)}
                    </div>

                    
                </div>
                
            </section>
            </div>
            <MyFooter />
        </>
    );
}