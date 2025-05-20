import { useEffect, useRef, useState } from "react";
import "../assets/styles/searchempCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchPage() {
    const [salaryMin, setSalaryMin] = useState(1);
    const [salaryMax, setSalaryMax] = useState(100000);
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
    const [selectedRatings, setSelectedRatings] = useState([]);
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
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => employee.rating >= r);
        const salaryMatch = employee.salary >= salaryMin && employee.salary <= salaryMax;
        const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(employee.category);
        const languageMatch = selectedLanguage.length === 0 || selectedLanguage.some(lang => employee.language.includes(lang));
        const countryMatch = selectedCountry.length === 0 || selectedCountry.includes(employee.country);
        return skillMatch && categoryMatch && ratingMatch && salaryMatch && languageMatch && countryMatch;
    });

    // Відсортовано + відфільтровано
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        switch (sortOption) {
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
    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) =>
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
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), salaryMax - 1);
        setSalaryMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), salaryMin + 1);
        setSalaryMax(value);
    };
    useEffect(() => {
        if (salaryMin >= salaryMax) {
            setSalaryMax(salaryMin + 1);
        }
    }, [salaryMin, salaryMax]);

    return (
        <>
            <MyHeader />
            <div className="maincont">
                <div className="filter-wrapper">
                    <aside className="sidebar-filter" ref={fltrRef}>
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
                                    <h5>Скіли</h5>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Пошук скілів..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                    {filteredSkills.length > 0 ? (
                                        filteredSkills.map((skill) => (
                                            <label key={skill} className="checkbox-label flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSkills.includes(skill)}
                                                    onChange={() => handleSkillChange(skill)}
                                                    className="fltrInput"
                                                />
                                                {skill}
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">Скіл не знайдено</p>
                                    )}
                            </div>
                            <div className="fltrpath">
                                <div className="fltrHead">
                                    <h5>Категорії</h5>
                                </div>
                                {categories.map(category => (
                                    <label key={category} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategory.includes(category)}
                                            onChange={() => handleCategoriesChange(category)}
                                            className="fltrInput"
                                        />
                                        {category}
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
                                    <h5>Мови</h5>
                                </div>
                                {languages.map((language) => (
                                    <label key={language} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedLanguage.includes(language)}
                                            onChange={() => handleLanguageChange(language)}
                                            className="fltrInput"
                                        />
                                        {language}
                                    </label>
                                ))}
                            </div>

                            <div className="fltrpath">
                                <div className="fltrHead">
                                    <h5>Країни</h5>
                                </div>
                                {countries.map((country) => (
                                    <label key={country} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedCountry.includes(country)}
                                            onChange={() => handleCountryChange(country)}
                                            className="fltrInput"
                                        />
                                        {country}
                                    </label>
                                ))}
                            </div>
                            <div className="fltrpath">
                                <div className="fltrHead">
                                    <h5>Заробітня плата (грн/год)</h5>
                                </div>
                                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                    <input
                                        type="number"
                                        min="0"
                                        onChange={handleMinChange}
                                        style={{ width: "100%" }}
                                        value={salaryMin}
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        onChange={handleMaxChange}
                                        style={{ width: "100%" }}

                                        value={salaryMax}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
                <section className="searchemp-section">
                    <div className="info-searchemp">
                        <h2>Знайти персонал</h2>
                        <p>Знайди справжніх професіоналів, які вже готові приступити до роботи</p>

                    </div>
                    <div className="options">
                        <div className="start-fltr">
                            <button className="fbtn" onClick={toggleFltr}>Фільтр</button>
                        </div>
                        <div className="start-fltr">
                            <div className="sort-control">
                                <label htmlFor="sortSelect">Сортувати:</label>
                                <select id="sortSelect" onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="">-- Без сортування --</option>
                                    <option value="salary-asc">З/п: від найменшої</option>
                                    <option value="salary-desc">З/п: від найбільшої</option>
                                    <option value="rating-asc">Рейтинг: від найменшого</option>
                                    <option value="rating-desc">Рейтинг: від найбільшого</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="blockss-searchemp">
                        <div className="blocks-searchemp">
                            {filteredEmployees.length === 0 && (
                                <p style={{ padding: "20px", fontStyle: "italic" }}>
                                    Немає проєктів, які відповідають обраним критеріям.
                                </p>
                            )}

                            {sortedEmployees.map((employee) => (
                                <div className="block-searchemp" key={employee.id}>
                                    <a href="/employee">{/* /employee/${employee.id} */}
                                    <div className="mainInfoEmp">
                                    
                                        <img src={employee.photo} alt={employee.name}/>
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
                        </div>
                    </div>

                </section>
            </div>
            <MyFooter />
        </>
    );
}