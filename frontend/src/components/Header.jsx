import React, { useState, useEffect } from "react";

const MyHeader = () => {
  const [smenuVisible, setSmenuVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleVisibility = () => setSmenuVisible(prev => !prev);
  const toggleMenu = () => setMenuVisible(prev => !prev);

    const submitSearch = () => {
        const inputElement = document.getElementById('search-input');
        const query = document.getElementById('search-input').value;


    if (query) {
        console.log('Пошук за запитом:', query);
        } else {
            inputElement.style.borderColor = 'red';
        }
    };
  return (
    <header>
          <div className="nav-container">
              <div className="logo">
                  <a href="/"><img src="images/logo3_w.png" alt="Logo" /></a>
              </div>

              <div id="search-container">
                <input type="text" id="search-input" placeholder="Введіть запит для пошуку..." />
                <button id="search-submit" onClick={submitSearch}>Знайти</button>
              </div>

              <button className="mainnavbtn" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <rect width="25" height="3" rx="2.5" fill="white" />
                      <rect y="6" width="25" height="3" rx="2.5" fill="white" />
                      <rect y="12" width="25" height="3" rx="2.5" fill="white" />
                  </svg>
              </button>

              {menuVisible && (
                  <nav id="nav">
                      <a href="/log"><button className="button menubtn">Профіль</button></a>
                      <a href="/chat"><button className="button menubtn">Чати</button></a>
                      <button className="button menubtn" onClick={toggleVisibility}>Стартапи</button>
                      
                      {smenuVisible && (
                          <div id="smenu">
                              <hr className="hrMENU"></hr>
                              <a href="/searchproj" className="smenu" id="one"><button className="smbtn">Знайти стартап</button></a>
                              <a href="/searchemp" className="smenu" id="one"><button className="smbtn">Знайти персонал</button></a>
                              <a href="/createproj" className="smenu" id="two"><button className="smbtn stronger">Створити стартап</button></a>
                          </div>
                      )}

                          

                      
            </nav>) }
      </div>
      </header>
  );
};

export default MyHeader;

