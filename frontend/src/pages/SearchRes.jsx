import { useEffect, useRef, useState, useMemo } from "react";
import EmployeeFilters from "../components/EmployeeFilters.jsx";
import EmployeeSort from "../components/EmployeeSort.jsx";
import ProjectFilters from "../components/ProjectFilters";
import ProjectSort from "../components/ProjectSort";
import "../assets/styles/searchempCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchRes() {

    const type = 'project';

    //----------------Для searchEmp----------------
    //----------------Для searchEmp----------------
    //----------------Для searchEmp----------------

    const [salaryMin, setSalaryMin] = useState(1);
    const [salaryMax, setSalaryMax] = useState(100000);
    const [sortOption1, setSortOption1] = useState("");

    //Увімк/вимк меню фільтрів
    const fltrRef1 = useRef(null);
    const [fltrVisible1, setFltrVisible1] = useState(false);

    const toggleFltr1 = () => {
        setFltrVisible1(prev => {
            const newState = !prev;
            if (fltrRef1.current) {
                fltrRef1.current.classList.toggle("visible", newState);
            }
            return newState;
        });
    };
    useEffect(() => {
        if (window.innerWidth >= 768 && fltrRef1.current) {
            setFltrVisible1(true);
            fltrRef1.current.classList.add("visible");
        }
    }, []);

    // Для бд
    const skills = [
        "React",
        "HTML",
        "CSS",
        "JavaScript",
        "Photoshop",
        "Illustrator",
        "Figma",
        "Flutter",
        "Dart",
        "SEO",
        "SMM",
        "Креативне письмо",
        "Node.js",
        "Express",
        "MongoDB",
        "Google Ads",
        "Email-маркетинг",
        "CRM",
        "Vue.js",
        "TypeScript",
        "Tailwind"
    ];
    const languages = [
        "Українська",
        "Англійська",
        "Китайська",
        "Португальська",
        "Корейська",
        "Японська",
        "Польська"
    ];
    const countries = [
        "Україна",
        "Британія",
        "Франція",
        "США",
        "Корея",
        "Японія",
        "Польша"
    ];
    const categories = [
        "ІТ та Програмування",
        "Дизайн",
        "Маркетинг",
        "Копірайтинг та Контент",
        "Менеджмент / CRM"
    ];
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedRatings1, setSelectedRatings1] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    // Просто бд людей
    const allEmployees = [
        {
            id: 1,
            name: "Олена Іваненко",
            photo: "images/employee.png",
            specialization: "Frontend Developer",
            skills: ["React", "HTML", "CSS", "JavaScript"],
            category: "ІТ та Програмування",
            rating: 9.4,
            salary: 500,
            country: "Україна",
            language: ["Українська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
        },
        {
            id: 2,
            name: "Іван Петренко",
            photo: "/images/employee.png",
            specialization: "Веб-розробка",
            skills: ["HTML", "CSS", "JavaScript", "React"],
            category: "ІТ та Програмування",
            rating: 4.8,
            salary: 400,
            country: "Британія",
            language: ["Англійська", "Китайська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
        },
        {
            id: 3,
            name: "Олена Іванова",
            photo: "/images/employee.png",
            specialization: "Графічний дизайн",
            skills: ["Photoshop", "Illustrator", "Figma"],
            category: "Дизайн",
            rating: 4.6,
            salary: 350,
            country: "Корея",
            language: ["Корейська", "Українська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."

        },
        {
            id: 4,
            name: "Максим Орлов",
            photo: "/images/employee.png",
            specialization: "Мобільна розробка",
            skills: ["Flutter", "Dart"],
            category: "ІТ та Програмування",
            rating: 4.9,
            salary: 500,
            country: "США",
            language: ["Англійська", "Португальська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
        },
        {
            id: 5,
            name: "Анна Коваль",
            photo: "/images/employee.png",
            specialization: "Копірайтинг",
            skills: ["SEO", "SMM", "Креативне письмо"],
            category: "Копірайтинг та Контент",
            rating: 4.2,
            salary: 300,
            country: "Польша",
            language: ["Польська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."

        },
        {
            id: 6,
            name: "Юрій Степаненко",
            photo: "/images/employee.png",
            specialization: "Веб-розробка",
            skills: ["Node.js", "Express", "MongoDB"],
            category: "ІТ та Програмування",
            rating: 4.7,
            salary: 450,
            country: "Японія",
            language: ["Японська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."

        },
        {
            id: 7,
            name: "Світлана Дяченко",
            photo: "/images/employee.png",
            specialization: "Маркетинг",
            skills: ["Google Ads", "Email-маркетинг", "CRM"],
            category: "Маркетинг",
            rating: 4.4,
            salary: 370,
            country: "Україна",
            language: ["Українська", "Англійська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."

        },
        {
            id: 8,
            name: "Роман Бондар",
            photo: "/images/employee.png",
            specialization: "Веб-розробка",
            skills: ["Vue.js", "TypeScript", "Tailwind"],
            category: "ІТ та Програмування",
            rating: 4.5,
            salary: 420,
            country: "Франція",
            language: ["Португальська"],
            description: "Lorem Ipsum - це текст-'риба', що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною 'рибою' аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. 'Риба' не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."

        }
    ];

    const [search, setSearch] = useState("");

const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(search.toLowerCase())
  );

    // Відфільтровано
    const filteredEmployees = allEmployees.filter((employee) => {
        const skillMatch = selectedSkills.length === 0 || selectedSkills.some(skill => employee.skills.includes(skill));
        const ratingMatch = selectedRatings1.length === 0 || selectedRatings1.some(r => employee.rating >= r);
        const salaryMatch = employee.salary >= salaryMin && employee.salary <= salaryMax;
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(employee.category);
        const languageMatch = selectedLanguage.length === 0 || selectedLanguage.some(lang => employee.language.includes(lang));
        const countryMatch = selectedCountry.length === 0 || selectedCountry.includes(employee.country);
        return skillMatch && categoryMatch && ratingMatch && salaryMatch && languageMatch && countryMatch;
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

    // Фільтри по зп
    const handleMinChange1 = (e) => {
        const value = Math.min(Number(e.target.value), salaryMax - 1);
        setSalaryMin(value);
    };

    const handleMaxChange1 = (e) => {
        const value = Math.max(Number(e.target.value), salaryMin + 1);
        setSalaryMax(value);
    };
    useEffect(() => {
        if (salaryMin >= salaryMax) {
            setSalaryMax(salaryMin + 1);
        }
    }, [salaryMin, salaryMax]);

    //----------------Для searchProj----------------
    //----------------Для searchProj----------------
    //----------------Для searchProj----------------

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
                    {type === 'employee' && <EmployeeFilters
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
                    />}
                    {type === 'project' && 
                    <div className="filter-wrapper">
                        <ProjectFilters
                            selectedTags={selectedTags}
                            selectedTypes={selectedTypes}
                            selectedRatings={selectedRatings}
                            priceMin={priceMin}
                            priceMax={priceMax}
                            onlyHiring={onlyHiring}
                            allTags={allTags}
                            handleTagChange={handleTagChange}
                            handleTypeChange={handleTypeChange}
                            handleRatingChange={handleRatingChange}
                            handleMinChange={handleMinChange}
                            handleMaxChange={handleMaxChange}
                            setOnlyHiring={setOnlyHiring}
                            minSliderRef={minSliderRef}
                            maxSliderRef={maxSliderRef}
                            toggleFltr={toggleFltr}
                            fltrRef={fltrRef}
                        />
                    </div>}
                </div>
                <section className="searchemp-section">
                    { type === 'employee' && <div className="info-searchemp">
                        <h2>Знайти персонал</h2>
                        <p>Знайди справжніх професіоналів, які вже готові приступити до роботи</p>

                    </div>}
                    {type === 'project' && <div className="info-searchemp">
                        <h2>Знайти стартап</h2>
                        <p>Знайди вже готовий і правильно організований проєкт, який чекає на персонал</p>
                            
                            
                        
                    </div>}
                    <div className="options">
                        <div className="start-fltr">
                            {type === 'employee' &&
                                <button className="fbtn" onClick={toggleFltr1}>Фільтр</button>}
                            {type === 'project' &&
                                <button className="fbtn" onClick={toggleFltr}>Фільтр</button>}
                        </div>
                        <div className="start-fltr">
                            {type === 'employee' && <EmployeeSort setSortOption1={setSortOption1} /> }
                            {type === 'project' && <ProjectSort setSortOption={setSortOption} />}
                        </div>
                    </div>
                    <div className="blockss-searchemp">
                        <div className="blocks-searchemp">
                            {type === 'employee' && (
                                <>
                                    {filteredEmployees.length === 0 && (
                                        <p style={{ padding: "20px", fontStyle: "italic" }}>
                                            Немає проєктів, які відповідають обраним критеріям.
                                        </p>
                                    )}

                                    {sortedEmployees.map((employee) => (
                                        <div className="block-searchemp" key={employee.id}>
                                            <a href={`/profile/${employee.username}`}>{/* /employee/${employee.id} */}
                                                <div className="mainInfoEmp">
                                                    <img src={employee.photo} alt={employee.name} />
                                                    <div className="column margin20">
                                                        <p className="name">{employee.name}</p>
                                                        <p className="specialization">{employee.specialization}</p>
                                                        <div className="languages">
                                                            {employee.language.map((language, index) => (
                                                                <span className="language" key={index}>{language}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="skills">
                                                    {employee.skills.map((skill, index) => (
                                                        <span className="skill-tag" key={index}>{skill}</span>
                                                    ))}
                                                </div>
                                                <p className="about">
                                                    {employee.description && employee.description.length > 100
                                                        ? employee.description.slice(0, 200) + '...'
                                                        : employee.description}
                                                </p>
                                                <p className="rating">★ {employee.rating}</p>
                                                <p className="salary">від {employee.salary} грн/год</p>
                                            </a>
                                        </div>
                                    ))}
                                </>
                            )}

                            {type === 'project' && (
                                isLoading ? (
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
                                                <img src={project.imagePath} alt={project.title} />
                                                <p className="title">{project.title}</p>
                                                <p className="mark">★ {project.mark}</p>
                                                <p className="price">Від {project.price}</p>
                                            </a>
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>

                </section>
            </div>
            <MyFooter />
        </>
    );
}