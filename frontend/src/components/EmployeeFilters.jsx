import React from "react";

export default function EmployeeFilters({
    fltrRef1,
    toggleFltr1,
    search,
    setSearch,
    filteredSkills,
    selectedSkills,
    selectedCategory,
    selectedRatings1,
    selectedLanguage,
    selectedCountry,
    salaryMin,
    salaryMax,
    languages,
    countries,
    categories,
    handleSkillChange,
    handleCategoriesChange,
    handleRatingChange1,
    handleLanguageChange,
    handleCountryChange,
    handleMinChange1,
    handleMaxChange1,
}) {
    return (
        <aside className="sidebar-filter" ref={fltrRef1}>
            <div className="fltrHead">
                <h4>Фільтр</h4>
                <button className="close" onClick={toggleFltr1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                    </svg>
                </button>
            </div>
            <div className="fltrs">
                <div className="fltrpath">
                    <h5>Скіли</h5>
                    <div className="search-skill-wrapper" style={{ display: "flex", alignItems: "center", marginBottom: "10px", border: "1px solid #14B8A6", borderRadius: "5px", padding: "5px", backgroundColor: "#fff" }}>
                        <svg width="18" height="18" fill="#14B8A6" style={{marginRight: "8px"}} viewBox="0 0 24 24">
            <path d="M21 20.3l-3.8-3.8c1.1-1.4 1.8-3.1 1.8-5C19 6.5 15.5 3 11.5 3S4 6.5 4 11.5 7.5 20 11.5 20c1.9 0 3.6-.7 5-1.8l3.8 3.8c.4.4 1 .4 1.4 0s.4-1 0-1.4zM6 11.5C6 8.5 8.5 6 11.5 6s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5S6 14.5 6 11.5z"/>
        </svg>        
        <input
            type="text"
            placeholder="Пошук скілів..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "16px",
                width: "100%",
                margin: "0",
            }}
                        /> 
                        </div>
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
                    <h5>Категорії</h5>
                    {categories.map((category) => (
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
                    <h5>Рейтинг</h5>
                    {[10, 9, 8, 7, 6, 5].map((rating) => (
                        <label key={rating} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedRatings1.includes(rating)}
                                onChange={() => handleRatingChange1(rating)}
                                className="fltrInput"
                            />
                            {rating}+
                        </label>
                    ))}
                </div>

                <div className="fltrpath">
                    <h5>Мови</h5>
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
                    <h5>Країни</h5>
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
                    <h5>Заробітня плата (грн/год)</h5>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Від"
                            onChange={handleMinChange1}
                            value={salaryMin}
                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <input
                            type="text"
                            placeholder="До"
                            onChange={handleMaxChange1}
                            value={salaryMax}
                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}
