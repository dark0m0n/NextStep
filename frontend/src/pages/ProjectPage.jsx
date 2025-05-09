import "../assets/styles/projPageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";
import React, { useState } from "react";

const RatingStars = ({ max = 10, onChange }) => {
    const [selected, setSelected] = useState(0);
    const [hovered, setHovered] = useState(0);
    const handleClick = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="flex gap-1 cursor-pointer text-3xl">
            {Array.from({ length: max }, (_, i) => {
                const value = i + 1;
                const isActive = value <= (hovered || selected);

                return (
                    <span
                        key={value}
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => setHovered(value)}
                        onMouseLeave={() => setHovered(0)}
                        className={isActive ? "text-yellow-400" : "text-gray-400"}
                    >
                        {isActive ? "★" : "☆"}
                    </span>
                );
            })}
        </div>
    );
};

export default function ProjectPage() {
    const [rating, setRating] = useState(0);
    const [fbVisible, setfbVisible] = useState(false);

    const toggleFb = () => {
        setfbVisible(prev => {
            if (prev === true) {
                setRating(0); 
            }
            return !prev;
        });
    };

 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentField = document.getElementById("comment");

        const warningText1 = document.getElementById("wrongCom");
        const warningText2 = document.getElementById("wrongMark");

        const comment = commentField.value.trim();
        if (rating === 0) {
            warningText2.style.display = "block";
            return;
        } else {
            warningText2.style.display = "none";
        }
        if (comment.length < 1) {
            commentField.classList.add("input-error");
            warningText1.style.display = "block";
            return;
        } else {
            commentField.classList.remove("input-error");
            warningText1.style.display = "none";
        }


        console.log("Відгук:", comment);

        const formData = new FormData();

        formData.append('comment', commentField.value);



        try {
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Коментар посланий.');
            } else {
                console.log('Помилка при створенні коментаря.');
            }
        } catch (error) {
            console.error('Помилка запиту:', error);
            console.log('Не вдалося підлючитися до серверу.');
        }
    };
    return (
        <>
            <MyHeader />
            {console.log(getComputedStyle(document.body).overflow)}
            <section className="project-section">
                <div className="contacts-proj">
                    <h3>Мінімальна вартість для внеску</h3>
                    <p>250 000 $</p>
                    <h3>Контакти</h3>
                    <p>
                        +38 (063) 555 66 44
                        <br />
                        lolkek4@gmail.com
                    </p>
                </div>
                <div className="mainInformation-proj">
                    <div className="infoProj">
                        <div className="info-proj">
                            <h2>
                                Ugears – конструктори, якими захоплюється Disney
                            </h2>
                        </div>

                        <div className="imagesProj">
                            <img src="images/ua.png" alt="Зображення" />
                        </div>

                        <div className="descrip">
                            <h3>Про стартап</h3>
                            <p>
                                Скульптурні 3D пазли з картону, які без клею та додаткових інструментів стануть твоїм справжнім арт-об'єктом!
                            </p>
                            <p>
                                CARTONIC - це легкий та цікавий спосіб створити тривимірну модель популярного обʼєкта чи культової
                                особистості, відволіктись від буденних справ, провести час наодинці або з друзями та додати творчість у своє життя.
                            </p>
                            <p>
                                В наборі на тебе чекають картонні слайси з еко матеріалу, дерев’яні основи, заглушки для кріплення скульптури
                                та інструкція. Ти можеш залишити готову модель у крафті чи дати волю фантазії і додати яскравих фарб,
                                блиску та всього, що спаде на думку.
                            </p>
                            <p>
                                За основу наших пазлів ми взяли картон - матеріал вторинної переробки. Тому CARTONIC - це доступний
                                спосіб створювати декор екологічно та без шкоди для навколишнього середовища. Ми за мистецтво створювати,
                                а не засмічувати. Тож відкинь все зайве, виділи одну годину часу і перетвори картон на справжній ART
                            </p>
                        </div>
                        <p className="mark">
                            9.5 ★ ★ ★ ★ ★ ★ ★ ★ ★ ☆
                            <div className="start-fbs">
                                <button className="fbsbtn" onClick={toggleFb}>Надіслати відгук</button>
                            </div>
                        </p>
                        {fbVisible && (
                            <div className="overlay-createFBform">
                                <form onSubmit={handleSubmit}>
                                    <div className="createFBform">
                                        <div className="headFBform">
                                            <h2>Написати відгук</h2>
                                            <button className="close" onClick={toggleFb}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <p>Оцініть стартап</p>
                                        <div className="setmark">
                                            <RatingStars max={10} onChange={(value) => setRating(value)} />
                                            {console.log(rating)}

                                        </div>
                                        <p id="wrongMark">Будь ласка, поставте оцінку</p>
                                        <div className="form-group">
                                            <label htmlFor="comment" className='label'>Коментар</label>
                                            <textarea id="comment" name="comment" className='input-info-create text' placeholder="Додайте коментар" required></textarea>
                                            <p id="wrongCom">Поле обов'язкове для заповнення</p>
                                        </div>
                                        <button type="submit" id="formbtnS">Зберегти</button>
                                    </div>
                                </form>
                            </div>
                        )}


                        <h3>Відгуки</h3>

                        <div className="fbs-proj">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div className="fb" key={i}>
                                    <a href="profile">
                                        <div className="peopInfo">
                                        <img src="images/fb.png" alt="Аватар" />
                                        <p className="name">Роберто</p>
                                    </div></a>

                                    <hr />
                                    <p className="mark">
                                        9.5 ★ ★ ★ ★ ★ ★ ★ ★ ★ ☆
                                    </p>
                                    <p className="comm">
                                        Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                                        люде, Роблять лихо з вами
                                    </p>
                                </div>
                            ))}
                        </div>

                        <section className="tags-proj">
                            <h3>Теги</h3>
                            <ul>
                                <li>
                                    <a href="#">IT</a>
                                </li>
                                <li>
                                    <a href="#">Виробництво</a>
                                </li>
                                <li>
                                    <a href="#">Технології</a>
                                </li>
                                <li>
                                    <a href="#">Інновації</a>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section>

            <MyFooter />
        </>
    );
}