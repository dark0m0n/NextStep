import React, { useState } from "react";

const MyHeader = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [smenuVisible, setSmenuVisible] = useState(false);

  const toggleVisibility = () => setSmenuVisible(prev => !prev);
  const toggleSearchField = () => setSearchVisible(prev => !prev);

  const submitSearch = () => {
    const query = document.getElementById('search-input').value;
    if (query) {
      console.log('Пошук за запитом:', query);
    } else {
      alert('Будь ласка, введіть запит для пошуку.');
    }
  };

  return (
    <header>
    <div className="nav-container">
      <a href="/"><img className="logo" src="images/logo3_w.png" alt="Logo" /></a>
      {searchVisible && (
        <div id="search-container">
          <input type="text" id="search-input" placeholder="Введіть запит для пошуку..." />
          <button id="search-submit" onClick={submitSearch}>Знайти</button>
        </div>
      )}
      <nav>
        <button className="button" onClick={toggleSearchField}>Пошук</button>
        <button className="button" onClick={toggleVisibility}>Стартапи</button>
        <a href="/chat"><button className="button">Чати</button></a>
        <a href="/log"><button className="button">Профіль</button></a>
      </nav>

      {smenuVisible && (
        <div id="smenu">
          <a href="/searchproj" className="smenu" id="one">Знайти стартап</a>
          <a href="/searchemp" className="smenu" id="one">Знайти персонал</a>
          <a href="/createproj" className="smenu" id="two">Створити стартап</a>
        </div>
      )}
      </div>
      </header>
  );
};

export default MyHeader;

