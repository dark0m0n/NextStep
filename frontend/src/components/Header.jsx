import React, { useState, useEffect } from "react";


const MyHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [smenuVisible, setSmenuVisible] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchType, setSearchType] = useState("project"); // 'project' або 'employee'
    const [showSettings, setShowSettings] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleVisibility = () => setSmenuVisible(prev => !prev);
    const toggleMenu = () => {
        setMenuVisible(prev => !prev);
        setIsOpen(prev => !prev);
    }
    const toggleSettings = () => setShowSettings(prev => !prev);

    useEffect(() => {
        fetch("http://localhost:8000/api/me", {
          credentials: "include",
        })
          .then((res) => {
            if (res.status === 401) {
              return null;
            }
            if (!res.ok) throw new Error("Не вдалося завантажити профіль");
            return res.json();
          })
          .then((user) => {
            if (!user) return;
              setUserData(user);
              setIsAuthenticated(true);
          })
          .catch((err) => console.error("Помилка завантаження:", err));
    }, []);
    

    const submitSearch = () => {
        const inputElement = document.getElementById("search-input");
        const query = inputElement.value.trim();

        if (query) {
            const keywords = query;
            const url = searchType === "project"
                ? `/searchproj?query=${encodeURIComponent(keywords)}`
                : `/searchemp?query=${encodeURIComponent(keywords)}`;
            window.location.href = url;
        }
    };

    return (
        <header>
            <div className="nav-container">
                <div className="logo">
                    <a href="/"><img src="/images/logo_13.png" alt="Logo" /></a>
                </div>

                <div id="search-container" style={{ position: "relative" }}>
                    <button id="togProp" onClick={toggleSettings}>
                        <svg className="rotate" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M 10.490234 2 C 10.011234 2 9.6017656 2.3385938 9.5097656 2.8085938 L 9.1757812 4.5234375 C 8.3550224 4.8338012 7.5961042 5.2674041 6.9296875 5.8144531 L 5.2851562 5.2480469 C 4.8321563 5.0920469 4.33375 5.2793594 4.09375 5.6933594 L 2.5859375 8.3066406 C 2.3469375 8.7216406 2.4339219 9.2485 2.7949219 9.5625 L 4.1132812 10.708984 C 4.0447181 11.130337 4 11.559284 4 12 C 4 12.440716 4.0447181 12.869663 4.1132812 13.291016 L 2.7949219 14.4375 C 2.4339219 14.7515 2.3469375 15.278359 2.5859375 15.693359 L 4.09375 18.306641 C 4.33275 18.721641 4.8321562 18.908906 5.2851562 18.753906 L 6.9296875 18.1875 C 7.5958842 18.734206 8.3553934 19.166339 9.1757812 19.476562 L 9.5097656 21.191406 C 9.6017656 21.661406 10.011234 22 10.490234 22 L 13.509766 22 C 13.988766 22 14.398234 21.661406 14.490234 21.191406 L 14.824219 19.476562 C 15.644978 19.166199 16.403896 18.732596 17.070312 18.185547 L 18.714844 18.751953 C 19.167844 18.907953 19.66625 18.721641 19.90625 18.306641 L 21.414062 15.691406 C 21.653063 15.276406 21.566078 14.7515 21.205078 14.4375 L 19.886719 13.291016 C 19.955282 12.869663 20 12.440716 20 12 C 20 11.559284 19.955282 11.130337 19.886719 10.708984 L 21.205078 9.5625 C 21.566078 9.2485 21.653063 8.7216406 21.414062 8.3066406 L 19.90625 5.6933594 C 19.66725 5.2783594 19.167844 5.0910937 18.714844 5.2460938 L 17.070312 5.8125 C 16.404116 5.2657937 15.644607 4.8336609 14.824219 4.5234375 L 14.490234 2.8085938 C 14.398234 2.3385937 13.988766 2 13.509766 2 L 10.490234 2 z M 12 8 C 14.209 8 16 9.791 16 12 C 16 14.209 14.209 16 12 16 C 9.791 16 8 14.209 8 12 C 8 9.791 9.791 8 12 8 z"></path>
                        </svg>
                    </button>
                <div className="searchinp-togProp">
                        <input type="text" id="search-input" placeholder="Введіть запит для пошуку..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submitSearch();
                                }
                            }}
                        />
                    <button id="search-submit" onClick={submitSearch}><svg fill="#FFFFFF" height="25" width="25" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 183.792 183.792" xml: space="preserve" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22 c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583 c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0 C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806 c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25 c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"></path> </g></svg></button>
                </div>
                    {showSettings && (
                        <div className="searchProp">
                            <div className="searchType">
                                <p className="search-label">Де шукати:</p>
                                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="project">Стартапи</option>
                                        <option value="employee">Працівники</option>
                                    </select>
                            </div>
                        </div>
                    )}
                </div>

                <button className="mainnavbtn" onClick={toggleMenu}>
                    <div id="nav-icon" className={isOpen ? "open" : ""}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {menuVisible && (
                    <nav id="nav">
                        <a href={isAuthenticated ? `/profile/${userData.username}` : "/log"}>
                        <button className="button menubtn">Профіль</button></a>
                        <a href="/chat"><button className="button menubtn">Чати</button></a>
                        <button className="button menubtn" onClick={toggleVisibility}>Стартапи</button>

                        {smenuVisible && (
                            <div id="smenu">
                                <hr className="hrMENU" />
                                <a href="/searchproj" className="smenu" id="one"><button className="smbtn">Знайти стартап</button></a>
                                <a href="/searchemp" className="smenu" id="one"><button className="smbtn">Знайти персонал</button></a>
                                <a href="/createproj" className="smenu" id="two"><button className="smbtn stronger">Створити стартап</button></a>
                            </div>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default MyHeader;
