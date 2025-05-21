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
    skills,
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
                            type="number"
                            min="0"
                            value={salaryMin}
                            onChange={handleMinChange1}
                            style={{ width: "100%" }}
                        />
                        <input
                            type="number"
                            min="0"
                            value={salaryMax}
                            onChange={handleMaxChange1}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}
