import React, { useRef, useEffect } from "react";

export default function ProjectFilters({
    selectedTags, selectedTypes, selectedRatings,
    priceMin, priceMax, onlyHiring, allTags,
    handleTagChange, handleTypeChange, handleRatingChange,
    handleMinChange, handleMaxChange,
    setOnlyHiring, minSliderRef, maxSliderRef, toggleFltr, fltrRef
}) {
    return (
        <aside className="sidebar-filter" ref={fltrRef}>
            <div className="fltrHead">
                <h4>Фільтр</h4>
                <button className="close" onClick={toggleFltr}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                    </svg>
                </button>
            </div>
            <div className="fltrs">
                <div className="fltrpath">
                    <div className="fltrHead nabir">
                        <h5>Набір персоналу</h5>
                        <input
                            type="checkbox"
                            checked={onlyHiring}
                            onChange={() => setOnlyHiring(prev => !prev)}
                            className="fltrInput"
                        />
                    </div>
                </div>

                <div className="fltrpath">
                    <div className="fltrHead"><h5>За категоріями</h5></div>
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
                    <div className="fltrHead"><h5>Тип проєкту</h5></div>
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
                    <div className="fltrHead"><h5>Рейтинг</h5></div>
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
                    <div className="fltrHead"><h5>Необхідні інвестиції (грн)</h5></div>
                    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <input
                            type="text"
                            placeholder="Від"
                            onChange={handleMinChange}
                            value={priceMin}
                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <input
                            type="text"
                            placeholder="До"
                            onChange={handleMaxChange}
                            value={priceMax}
                            style={{ width: "100%", height: "30px", borderRadius: "5px", border: "1px solid #ccc" }}
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
                                ref={minSliderRef}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val < priceMax) handleMinChange(e);
                                }}
                                className="range-thumb min"
                            />
                        </div>
                        <div className="slider-track">
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="100"
                                value={priceMax}
                                ref={maxSliderRef}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val > priceMin) handleMaxChange(e);
                                }}
                                className="range-thumb max"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
