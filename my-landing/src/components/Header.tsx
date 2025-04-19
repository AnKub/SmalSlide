import { Link } from 'react-router-dom';
import MiniWeather from "../components/MiniWeather";
import '../styles/Header.scss'; 

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">Nice</Link>

        <div className="header__weather">
          <MiniWeather />
        </div>

        <div className="header__links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link> 
          <Link to="/weather">Weather</Link>
        </div>

        <div className="header__extras">        
          <Link to="/login" className="header__login-button">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
