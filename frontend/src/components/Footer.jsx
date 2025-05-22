
const MyFooter = () => {
  return (
    <footer className="footer">
    <div className="footer-content">

          <div className="footer-icons">
              <a href=""><img src="/images/tg.svg" alt="Telegram"/></a>
              <a href=""><img src="/images/yt.svg" alt="YouTube"/></a>
              <a href=""><img src="/images/fc.svg" alt="Facebook"/></a>
          </div>
              <p><a href="mailto:support@next.step">support@next.step</a></p>
              <div className="logo">
                  <a href="/"><img src="images/logo_13.png" alt="Logo" /></a>
              </div>
              <p>м. Львів, вул. Степана Бандери 12, Україна</p>
              <div className="footer-links">
                <a href="#">Умови та положення</a>
                <a href="#">Політика конфіденційності</a>
              </div>
      </div>
      </footer>
  );
};

export default MyFooter;