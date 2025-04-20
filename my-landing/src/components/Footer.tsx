import '../styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section footer__left">
        <div className="footer__logo">
          <img src="svg/lo.png" alt="Logo" />
        </div>
      </div>

      <div className="footer__section">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      <div className="footer__section">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">API Docs</a></li>
        </ul>
      </div>

      <div className="footer__section">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Cookie Policy</a></li>
        </ul>
      </div>

      <div className="footer__section footer__right">
        <h4>Follow Us</h4>
        <div className="footer__socials">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="svg/astro.ico" alt="LinkedIn" /> LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <img src="svg/git.ico" alt="GitHub" /> GitHub
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <img src="svg/mini.ico" alt="Telegram" /> Telegram
          </a>
          <a href="https://djinni.app" target="_blank" rel="noopener noreferrer">
            <img src="svg/eye.ico" alt="Djinni" /> Djinni
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
