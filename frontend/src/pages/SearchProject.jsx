import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/searchprojCSS.css";
import ProjectFilters from "../components/ProjectFilters.jsx";
import ProjectSort from "../components/ProjectSort.jsx";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchPage() {
    const [maxInvestment, setMaxInvestment] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query")?.toLowerCase() || ""; // отримуємо параметр з URL
    const searchWords = Array.from(new Set(searchQuery.toLowerCase().split(" ").filter(Boolean)));

    const handleRemoveWord = (wordToRemove) => {
        const updatedWords = searchWords.filter(word => word !== wordToRemove);
        if (updatedWords.length > 0) {
            queryParams.set("query", updatedWords.join(" "));
        } else {
            queryParams.delete("query");
        }
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleClearAllQueries = () => {
        queryParams.delete("query");
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

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
            mark: Number(project.averageRating),
            tag: Array.isArray(project.category)
              ? project.category
              : typeof project.category === "string"
              ? project.category.split(",").map((category) => category.trim())
              : [],
              imagePath: project.imagePath || "/images/ua.png",
            price: Number(project.investment),
          }));

            const maxPrice = Math.max(...processedData.map(p => p.price), 0);

            setMaxInvestment(maxPrice);
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
        const priceMatch =
  (priceMin === "" || project.price >= priceMin) &&
  (priceMax === "" || project.price <= priceMax);

        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.projectType);
        const hiringMatch = !onlyHiring || project.hiring === true;
        const fullText = (
            project.title +
            " " +
            project.projectType +
            " " +
            project.description.join(" ") +
            " " +
            project.tag
        ).toLowerCase();

        const queryMatch = searchWords.length === 0 || searchWords.some(word => fullText.includes(word));
        return tagMatch && typeMatch && ratingMatch && priceMatch && hiringMatch && queryMatch;
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
    const handleTypeChange = (projectType) => {
        setSelectedTypes((prev) =>
            prev.includes(projectType)
                ? prev.filter((t) => t !== projectType)
                : [...prev, projectType]
        );
    };

    // Фільтр по оцінці
    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) =>
            prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
        );
    };

    // Фільтр по категоріям
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
            } else if (num < priceMax && num <= maxInvestment) {
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
            } else if (num > priceMin && num <= maxInvestment) {
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
            minSliderRef.current.style.background = getSliderBackground(priceMin, 0, maxInvestment);
        }
        if (maxSliderRef.current) {
            maxSliderRef.current.style.background = getSliderBackground(priceMax, 0, maxInvestment);
        }
    }, [priceMin, priceMax, maxInvestment]);
        const resetFilters1 = () => {
        setSelectedTags([]);
        setSelectedTypes([]);
        setSelectedRatings([]);
        setPriceMin("");
        setPriceMax("");
        setSortOption("");
        setOnlyHiring(false);
    }
    return (
        <>
            <MyHeader />
            <div className="maincont">
            <div className="filter-wrapper">
                    <ProjectFilters
                        fltrRef={fltrRef}
                        fltrVisible={fltrVisible}
                        toggleFltr={toggleFltr}
                        onlyHiring={onlyHiring}
                        setOnlyHiring={setOnlyHiring}
                        selectedTags={selectedTags}
                        handleTagChange={handleTagChange}
                        allTags={allTags}
                        selectedTypes={selectedTypes}
                        handleTypeChange={handleTypeChange}
                        selectedRatings={selectedRatings}
                        handleRatingChange={handleRatingChange}
                        priceMin={priceMin}
                        priceMax={priceMax}
                        handleMinChange={handleMinChange}
                        handleMaxChange={handleMaxChange}
                        minSliderRef={minSliderRef}
                        maxSliderRef={maxSliderRef}
                        maxInvestment={maxInvestment}
                        resetFilters1={resetFilters1}
                    />
            </div>
            <section className="searchproj-section">
                <div className="info-searchproj">
                    <h2>Знайти стартап</h2>
                    <p>
                        Знайди вже готовий і правильно організований проєкт, який чекає на
                        персонал
                    </p>
                </div>
                    {searchWords.length > 0 && filteredProjects.length === 0 && (
                        <div className="searchQueries">
                            {searchWords.map((word, index) => (
                                    <span key={index} className="searchQuery">
                                        <button className="removeQuery" onClick={() => handleRemoveWord(word)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 50 50">
                                                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                            </svg>
                                        </button>
                                        {word}
                                    </span>
                            ))}
                            <button className="searchQuery" onClick={handleClearAllQueries}>
                                Очистити
                            </button>
                        </div>
                    )}
                    <div className="options1">
                        <button className="fbtn" onClick={toggleFltr}>Фільтр</button>
                        <ProjectSort sortOption={sortOption} setSortOption={setSortOption} />
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
                            <a href={`/project/${project.id}`} className="block-link">
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