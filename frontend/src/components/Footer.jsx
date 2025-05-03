
const MyFooter = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
          <p><a href="mailto:support@next.step">support@next.step</a></p>
          <p>м. Львів, вул. Степана Бандери 12, Україна</p>
          <div className="footer-icons">
          <a href=""><img src="/images/insta.png" alt="Instagram"/></a>
              <a href=""><img src="/images/fb.png" alt="Facebook"/></a>
              <a href=""><img src="/images/yt.png" alt="YouTube"/></a>
          </div>
          <div className="footer-links">
            <a href="#">Умови та положення</a>
            <a href="#">Політика конфіденційності</a>
          </div>
      </div>
      </footer>
  );
};

export default MyFooter;