import React from "react";

export default function EmployeeSorting({setSortOption }) {
    return (
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
    );
}
