import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeFilters from "../components/EmployeeFilters.jsx";
import EmployeeSort from "../components/EmployeeSort.jsx";
import "../assets/styles/searchempCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

const getUnique = (arr) => Array.from(new Set(arr.filter(Boolean)));

export default function SearchPage() {
    const [maxInvestment, setMaxInvestment] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query")?.toLowerCase() || ""; // отримуємо параметр з URL
    const searchWords = Array.from(new Set(searchQuery.toLowerCase().split(" ").filter(Boolean)));

    const allEmployees = users.map(user => ({
        id: user.id,
        name: user.firstname + " " + user.lastname,
        photo: user.imagePath,
        specialization: user.specialties || user.category,
        skills: Array.isArray(user.skills)
            ? user.skills
            : typeof user.skills === "string"
                ? user.skills.split(";").map(s => s.trim())
                : [],
        category: user.category,
        rating: user.rating,
        salary: user.salary,
        country: user.country,
        language: Array.isArray(user.language)
            ? user.language
            : typeof user.language === "string"
                ? user.language.split(",").map(l => l.trim())
                : [],
        description: user.additionalInfo || "",
    }));

    const skills = getUnique(allEmployees.flatMap(emp => emp.skills));
    const languages = getUnique(allEmployees.flatMap(emp => emp.language));
    const countries = getUnique(allEmployees.map(emp => emp.country));
    const categories = getUnique(allEmployees.map(emp => emp.category));

    console.log("Emp", allEmployees);
    console.log("skills", skills);
    console.log("langs", languages)
    console.log("coutries", countries);
    console.log("cats", categories);


    const handleRemoveWord = (wordToRemove) => {
        const updatedWords = searchWords.filter(word => word !== wordToRemove);
        if (updatedWords.length > 0) {
            queryParams.set("query", updatedWords.join(" "));
        } else {
            queryParams.delete("query");
        }
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const handleClearAllQueries1 = () => {
        queryParams.delete("query");
        navigate(`${location.pathname}?${queryParams.toString()}`);
    };

    const [sortOption1, setSortOption1] = useState("");

    //Увімк/вимк меню фільтрів
    const fltrRef1 = useRef(null);
    const [fltrVisible, setFltrVisible] = useState(false);

    const toggleFltr1 = () => {
        setFltrVisible(prev => {
            const newState = !prev;
            if (fltrRef1.current) {
                fltrRef1.current.classList.toggle("visible", newState);
            }
            return newState;
        });
    };
    useEffect(() => {
        if (window.innerWidth >= 768 && fltrRef1.current) {
            setFltrVisible(true);
            fltrRef1.current.classList.add("visible");
        }
    }, []);

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedRatings1, setSelectedRatings1] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);



    const [search, setSearch] = useState("");

    const [salaryMin, setSalaryMin] = useState(1);
    const maxSalaryInData = Math.max(...allEmployees.map(emp => emp.salary));
    const [salaryMax, setSalaryMax] = useState(maxSalaryInData);

    useEffect(() => {
        const maxSalaryInData = Math.max(...allEmployees.map(emp => emp.salary));
        setMaxInvestment(maxSalaryInData);
        setSalaryMax(prev => (prev === "" || prev === 0 ? maxSalaryInData : prev));
    }, [allEmployees]);

    const filteredSkills = skills.filter(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
    );

    // Відфільтровано
    const filteredEmployees = allEmployees.filter((employee) => {
        const searchWords = searchQuery.toLowerCase().split(" ").filter(Boolean);
        const skillMatch = selectedSkills.length === 0 || selectedSkills.some(skill => employee.skills.includes(skill));
        const ratingMatch = selectedRatings1.length === 0 || selectedRatings1.some(r => employee.rating >= r);
        const salaryMatch =
            (salaryMin === "" || employee.salary >= salaryMin) && (salaryMax === "" || employee.salary <= salaryMax);
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(employee.category);
        const languageMatch = selectedLanguage.length === 0 || selectedLanguage.some(lang => employee.language.includes(lang));
        const countryMatch = selectedCountry.length === 0 || selectedCountry.includes(employee.country);
        const fullText = (
            employee.name +
            " " +
            employee.specialization +
            " " +
            employee.skills.join(" ") +
            " " +
            employee.category +
            " " +
            employee.description
        ).toLowerCase();

        const queryMatch = searchWords.length === 0 || searchWords.some(word => fullText.includes(word));
        return skillMatch && categoryMatch && ratingMatch && salaryMatch && languageMatch && countryMatch && queryMatch;
    });

    // Відсортовано + відфільтровано
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        switch (sortOption1) {
            case "salary-asc":
                return a.salary - b.salary;
            case "salary-desc":
                return b.salary - a.salary;
            case "rating-asc":
                return a.rating - b.rating;
            case "rating-desc":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    // Фільтр по спеціалізації
    const handleCategoriesChange = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((t) => t !== category)
                : [...prev, category]
        );
    };

    // Фільтр по рейтингу
    const handleRatingChange1 = (rating) => {
        setSelectedRatings1((prev) =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
    };

    // Фільтр по скілам
    const handleSkillChange = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill)
                ? prev.filter((t) => t !== skill)
                : [...prev, skill]
        );
    };

    // Фільтр по мовам
    const handleLanguageChange = (language) => {
        setSelectedLanguage((prev) =>
            prev.includes(language)
                ? prev.filter((t) => t !== language)
                : [...prev, language]
        );
    };

    // Фільтр по країнам
    const handleCountryChange = (country) => {
        setSelectedCountry((prev) =>
            prev.includes(country)
                ? prev.filter((t) => t !== country)
                : [...prev, country]
        );
    };

    const handleMinChange1 = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            const num = Number(val);
            if (val === "") {
                setSalaryMin("");
            } else if (num < salaryMax && num <= maxInvestment) {
                setSalaryMin(num);
            } else if (num > maxInvestment) {
                setSalaryMin(maxInvestment);
            }
        }
    };

    const handleMaxChange1 = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            const num = Number(val);
            if (val === "") {
                setSalaryMax("");
            } else if (num > salaryMin && num <= maxInvestment) {
                setSalaryMax(num);
            } else if (num > maxInvestment) {
                setSalaryMax(maxInvestment);
            }
        }
    };

    useEffect(() => {
        if (salaryMin >= salaryMax) {
            setSalaryMax(salaryMin);
        }
    }, [salaryMin, salaryMax]);
    const resetFilters = () => {
        setSelectedSkills([]);
        setSelectedCategory([]);
        setSelectedRatings1([]);
        setSelectedLanguage([]);
        setSelectedCountry([]);
        setSearch("");
        setSalaryMin(1);
        setSalaryMax(maxSalaryInData);
    }
    return (
        <>
            <MyHeader />
            <div className="maincont1">
                <div className="filter-wrapper">
                    <EmployeeFilters
                        fltrRef1={fltrRef1}
                        toggleFltr1={toggleFltr1}
                        search={search}
                        setSearch={setSearch}
                        filteredSkills={filteredSkills}
                        selectedSkills={selectedSkills}
                        selectedCategory={selectedCategory}
                        selectedRatings1={selectedRatings1}
                        selectedLanguage={selectedLanguage}
                        selectedCountry={selectedCountry}
                        salaryMin={salaryMin}
                        salaryMax={salaryMax}
                        skills={skills}
                        languages={languages}
                        countries={countries}
                        categories={categories}
                        handleSkillChange={handleSkillChange}
                        handleCategoriesChange={handleCategoriesChange}
                        handleRatingChange1={handleRatingChange1}
                        handleLanguageChange={handleLanguageChange}
                        handleCountryChange={handleCountryChange}
                        handleMinChange1={handleMinChange1}
                        handleMaxChange1={handleMaxChange1}
                        resetFilters={resetFilters}
                    />

                </div>
                <section className="searchemp-section">
                    <div className="info-searchemp">
                        <h2>Знайти персонал</h2>
                        <p>Знайди справжніх професіоналів, які вже готові приступити до роботи</p>

                    </div>
                    {searchWords.length > 0 && filteredEmployees.length !== 0 && (
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
                            <button className="searchQuery" onClick={handleClearAllQueries1}>
                                Очистити
                            </button>
                        </div>
                    )}
                    <div className="options">
                        <div className="start-fltr">
                            <button className="fbtn" onClick={toggleFltr1}>Фільтр</button>
                        </div>
                        <div className="start-fltr">
                            <EmployeeSort setSortOption1={setSortOption1} />
                        </div>
                    </div>

                    <div className="blockss-searchemp">
                        <div className="blocks-searchemp">
                            {filteredEmployees.length === 0 && (
                                <p style={{ padding: "20px", fontStyle: "italic" }}>
                                    Немає персоналу, який відповідає вашому запиту.
                                </p>
                            )}

                            {sortedEmployees.map((employee) => {
                                const specializations = employee.specialization.split(",").map(s => s.trim());
                                const displayedSpecs = specializations.slice(0, 2);
                                const hasMore = specializations.length > 2;

                                const displayedLangs = employee.language.slice(0, 4);
                                const hasMoreLangs = employee.language.length > 4;

                                return (
                                <div className="block-searchemp" key={employee.id}>
                                    <a href="/employee">{/* /employee/${employee.id} */}
                                        <div className="mainInfoEmp">

                                            <img src={employee.photo} alt={employee.name} />
                                            <div className="column margin20">
                                                <p className="name">{employee.name}</p>
                                                <p className="specialization">
                                                        {displayedSpecs.map((spec, index) => (
                                                            <span key={index}>{spec}</span>  
                                                        ))}
                                                        {hasMore && <span className="ellipsis-inline">. . .</span>}
                                                </p>
                                                <div className="languages">
                                             {displayedLangs.map((language, index) => (
                                                <span className="language" key={index}>{language}</span>
                                            ))}
                                            {hasMoreLangs && <span>. . .</span>}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="skills">
                                            {employee.skills.slice(0, 7).map((skill, index) => (
                                                <span className="skill-tag" key={index}>{skill}</span>
                                            ))}
                                            {employee.skills.length > 8 && <span className="more">. . .</span>}
                                        </div>
                                        <p className="about">
                                            {employee.description && employee.description.length > 100
                                                ? employee.description.slice(0, 200) + '. . .'
                                                : employee.description}
                                        </p>
                                        <p className="rating">★ {employee.rating}</p>
                                        <p className="salary">від {employee.salary} грн/год</p>
                                    </a>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                </section>
            </div>
            <MyFooter />
        </>
    );
}