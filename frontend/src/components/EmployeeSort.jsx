import React from "react";

export default function EmployeeSorting({setSortOption1 }) {
    return (
        <div className="sort-control">
            <label htmlFor="sortSelect">Сортувати:</label>
            <select id="sortSelect" onChange={(e) => setSortOption1(e.target.value)}>
                <option value="">-- Без сортування --</option>
                <option value="salary-asc">З/п: від найменшої</option>
                <option value="salary-desc">З/п: від найбільшої</option>
                <option value="rating-asc">Рейтинг: від найменшого</option>
                <option value="rating-desc">Рейтинг: від найбільшого</option>
            </select>
        </div>
    );
}
