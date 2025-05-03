import "../assets/styles/searchempCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";



// ------------------------ Компонент Block ------------------------
const Block = ({ imgSrc, title, mark, price }) => (
  <div className="block" data-tags="IT, Технології">
    <img src={imgSrc} alt="block preview" />
    <p className="title">{title}</p>
    <p className="mark">{mark}</p>
    <p className="price">{price}</p>
  </div>
);

// ------------------------ Компонент MainSection ------------------------
const MainSection = () => {
  const blocksData = [
    "images/insta.png",
    "images/logo.png",
    "images/logo.png",
    "images/logo2.jpg",
    "images/logo3.png",
    "images/usa.png",
    "images/fb.png",
  ];

  const blockTitle =
    "Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі люде, Роблять лихо з вами";
  const mark = "卐 9.5";
  const price = "Від 5000 грн";

  return (
    <section className="searchemp-section">
      <div className="info-searchemp">
        <h2>Знайти персонал</h2>
        <p>Знайди справжніх професіоналів, які вже готові приступити до роботи</p>
      </div>
      <div className="blockss">
        <div className="process-searchemp">
          <p>10,000+ результатів</p>
          <p>Фільтр</p>
          <p>Сортувати: за ціною</p>
        </div>
        <div className="blocks">
          {blocksData.map((src, index) => (
            <Block
              key={index}
              imgSrc={src}
              title={blockTitle}
              mark={mark}
              price={price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ------------------------ Головний компонент ------------------------
const SearchEmpPage = () => {
  return (
    <>
      <MyHeader />
      <MainSection />
      <MyFooter />
    </>
  );
};

export default SearchEmpPage;
