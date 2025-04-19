// src/components/Footer.tsx
import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section footer__left">
        <div className="footer__logo">
          <img src="svg/lo.png" alt="Logo" />
        </div>
      </div>

      <div className="footer__section footer__center">
        <p>&copy; 2024 | All rights reserved | Privacy Policy</p>
      </div>

      <div className="footer__section footer__right">
        <div className="footer__links">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="svg/astro.ico" alt="LinkedIn" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img src="svg/git.ico" alt="GitHub" />
            <span>GitHub</span>
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <img src="svg/mini.ico" alt="Telegram" />
            <span>Telegram</span>
          </a>
          <a href="https://djinni.app" target="_blank" rel="noopener noreferrer">
            <img src="svg/eye.ico" alt="Djinni" />
            <span>Djinni</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
