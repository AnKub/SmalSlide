import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <div className="footer__logo">
          <img src="svg/lo.png" alt="Logo" style={{ maxHeight: '150px' }} />
        </div>
      </div>
      <div className="footer__center">
        <p>&copy; 2024 | All rights reserved | Privacy Policy</p>
      </div>
      <div className="footer__right">
        <div className="footer__links">
          <a href="https://linkedin.com">
            <img src="svg/astro.ico" alt="LinkedIn" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com">
            <img src="svg/git.ico" alt="GitHub" />
            <span>GitHub</span>
          </a>
          <a href="https://telegram.org">
            <img src="svg/mini.ico" alt="Telegram" />
            <span>Telegram</span>
          </a>
          <a href="https://djinni.app">
            <img src="svg/eye.ico" alt="Djinni" />
            <span>Djinni</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
