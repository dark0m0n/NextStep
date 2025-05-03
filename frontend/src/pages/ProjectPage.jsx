import "../assets/styles/projPageCSS.css";
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

// Компонент ProjectPage
export default function ProjectPage() {

  return (
    <>
      <MyHeader/>
      <section className="project-section">
        <div className="mainInformation-proj">
          <div className="infoProj">
            <div className="info-proj">
              <h2>
                Кохайтеся, чорнобриві, Та не з москалями, Бо москалі — чужі
                люде, Роблять лихо з вами
              </h2>
            </div>

            <div className="imagesProj">
              <img src="images/ua.png" alt="Зображення" />
            </div>

            <div className="descrip">
              <h3>Про стартап</h3>
              <p>
                Тече вода в синє море, Та не витікає; Шука козак свою долю, А
                долі немає. Пішов козак світ за очі; Грає синє море, Грає серце
                козацькеє, А думка говорить: «Куди ти йдеш, не спитавшись? На
                кого покинув Батька, неньку старенькую, Молоду дівчину? На
                чужині не ті люде,— Тяжко з ними жити!
              </p>
              <p>
                Тече вода в синє море, Та не витікає; Шука козак свою долю, А
                долі немає. Пішов козак світ за очі; Грає синє море, Грає серце
                козацькеє, А думка говорить: «Куди ти йдеш, не спитавшись? На
                кого покинув Батька, неньку старенькую, Молоду дівчину? На
                чужині не ті люде,— Тяжко з ними жити!
              </p>
            </div>

            <p className="mark">
              卐 9.5 оцінити ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆
            </p>

            <h3>Відгуки</h3>

            <div className="fbs-proj">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="fb" key={i}>
                  <div className="peopInfo">
                    <img src="images/fb.png" alt="Аватар" />
                    <p className="name">Роберто</p>
                  </div>
                  <hr />
                  <p className="mark">
                    卐 9.5 оцінити ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆
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

        <div className="contacts-proj">
          <h3>Мінімальна вартість для внеску</h3>
          <p>250 000卐</p>
          <h3>Контакти</h3>
          <p>
            +38 (063) 555 66 44
            <br />
            lolkek4@gmail.com
          </p>
        </div>
      </section>

      <MyFooter/>
    </>
  );
}
