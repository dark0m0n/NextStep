import "../assets/styles/searchprojCSS.css"; // Імпорт стилів для компонента
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function SearchPage() {

  return (
    <>
      <MyHeader/>

      <section className="searchproj-section">
        <div className="info-searchproj">
          <h2>Знайти стартап</h2>
          <p>
            Знайди вже готовий і правильно організований проєкт, який чекає на
            персонал
          </p>
        </div>

        <div className="blockss-searchproj">
          <div className="process-searchproj">
            <p>10,000+ результатів</p>
            <p>Фільтр</p>
            <p>Сортувати: за ціною</p>
          </div>

          <div className="blocks-searchproj">
            {[...Array(16)].map((_, index) => (
              <div className="block-searchproj" data-tags="IT, Технології" key={index}>
                <img src="images/ua.png" alt="UA flag" />
                <p className="title">
                  Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                  люде, Роблять лихо з вами
                </p>
                <p className="mark">卐 9.5</p>
                <p className="price">Від 5000 грн</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MyFooter/>
    </>
  );
}