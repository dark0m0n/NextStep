import '../assets/styles/index.css';
import MyHeader from "../components/Header.jsx";
import MyFooter from "../components/Footer.jsx";

export default function NextStepPage() {

  return (
    <>
      <MyHeader />

      <section className="hero">
        <div className="overlay">
          <div className="hero-content">
            <h1>Допомагаємо вам досягти успіху</h1>
            <p>
              Знайди існуючий стартап, вже навчених працівників або створи свій
              стартап
            </p>
            <button className="start-btn">Get Started</button>
          </div>
        </div>
      </section>

      <section className="mission">
        <h2>Місія та цінності</h2>
        <div className="values">
          <img src="public/images/plusmin.png" alt="Цінності"  className="plusmin"/>
        </div>

        <div className="mission-text">
          <p>
            <strong>NextStep</strong> допоможе знайти однодумців, створити сильні
            команди та запустити свої ідеї в життя. Ми створюємо простір, де
            народжуються команди, а з ними — й майбутні інновації.
          </p>
        </div>

        <div className="mission-text">
          <p>
            Ми віримо, що сильні проєкти народжуються з єдності та
            взаєморозуміння. Відкритість між учасниками — основа для здорової
            стартап-культури. Допомагаємо на кожному етапі: від ідеї до перших
            користувачів. Можливість швидко знайти свою команду або приєднатися
            до крутої ідеї. Створюємо умови для особистісного та професійного
            зростання кожного учасника спільноти.
          </p>
        </div>

        <h2>Наші досягнення</h2>
        <br />
        <div className="all-ach">
          <div className="achieves">
            <div className="headers-ach">
              <p className="line">Більше 1000 запущених</p>
              <p className="line">стартапів</p>
            </div>
            <p>
              на індивідуальних програмах консалтингової та менторської підтримки
            </p>
          </div>
          <div className="achieves">
            <div className="headers-ach">
              <p className="line">1500+ працівників ВЖЕ</p>
              <p className="line">знайшли роботу</p>
            </div>
            <p>
              в ще не запущених стартапах керуючись рекомендаціями NextStep
            </p>
          </div>
        </div>

        <div className="achieves">
          <div className="headers-ach">
            <p className="line">Розроблено майже 500</p>
            <p className="line">стартапів</p>
          </div>
          <p>які були запропоновані майбутніми власниками</p>
        </div>

        <hr />
        <h2>Кейси</h2>
        <div className="case">
          <div className="cases">
            <img src="public/images/usa.png" alt="Кейс 1" />
            <p>Компанія Hello228: Продаж вітань закордон</p>
          </div>
          <div className="cases">
            <img src="public/images/usa.png" alt="Кейс 2" />
            <p>АТ Hello1488: Продаж вітань в Україні</p>
          </div>
          <div className="cases">
            <img src="public/images/usa.png" alt="Кейс 3" />
            <p>ТОВ Hello: Вітають і доставляють будь куди</p>
          </div>
        </div>

        <hr />
        <h2>Наші партнери</h2>
        <div className="spons">
          <img src="public/images/usa.png" alt="Партнер 1" />
          <img src="public/images/usa.png" alt="Партнер 2" />
          <img src="public/images/usa.png" alt="Партнер 3" />
        </div>
      </section>

      <div className="center-wrapper">
        <h2>Приєднуйся до NextStep, де ти знайдеш і можливості, і натхнення</h2>
        <form className="form-container">
          <label htmlFor="email" className="label-main">Email*</label>
          <input
            type="email"
            id="email"
            placeholder="username@gmail.com"
            required
            className="field-main"
          />

          <label htmlFor="name" className="label-main">ПІБ*</label>
          <input
            type="text"
            id="name"
            placeholder="Ваше ім'я та прізвище"
            required
            className="field-main"
          />

          <label htmlFor="phone" className="label-main">Телефон*</label>
          <div className="phone-field">
            <select defaultValue="+380" className="field-main">
              <option value="+380">+380</option>
            </select>
            <input type="tel" placeholder="1234567890" required className="field-main"/>
          </div>

          <label htmlFor="company" className="label-main">Назва компанії*</label>
          <input type="text" id="company" required className="field-main"/>

          <label className="label-main checkbox">
            <input type="checkbox" id="consent" required className="check-main"/>
            <span class="checkmark"></span>
                Заповнюючи цю форму, я погоджуюсь на збір та обробку персональних
              даних
         </label>

          <button type="submit" className="submit-button-main">Подати заявку</button>
        </form>
      </div>

      <MyFooter />
    </>
  );
}
