import { Link } from 'react-router-dom';
import '../styles/Header.scss'; 

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">My App</Link>
        <div className="header__links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="header__extras">
          <Link to="/weather" className="header__weather">
            🌤️ 15°C Germany
          </Link>
          <Link to="/login" className="header__login-button">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
