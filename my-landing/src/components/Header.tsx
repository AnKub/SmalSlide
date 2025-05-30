import { Link } from 'react-router-dom';
import MiniWeather from "./MiniWeather";
import '../styles/Header.scss'; 

const Header = () => {
  return (
    <header className="header">
  <nav className="header__nav">
  <Link to="/" className="header__logo">Nice</Link>

  <div className="header__links">
    <Link to="/">Home</Link>
    <Link to="/nytnews">NY-Times</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/library">Library</Link>
    <Link to="/weather">Weather</Link>
  </div>

    
  <div className="header__extras">
    <div className="header__weather">
          <MiniWeather />
        </div>
    <Link to="/login" className="header__login-button">In</Link>
  </div>
</nav>

    </header>
  );
};

export default Header;
