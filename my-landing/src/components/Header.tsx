import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MiniWeather from "./MiniWeather";
import defaultAvatar from '/svg/avatar.svg'; 
import '../styles/Header.scss';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setIsLoggedIn(true);
      setAvatarUrl(parsed.avatar || null);
    }
  }, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">Nice</Link>

        <div className="header__links">
          <Link to="/">Philo</Link>
          <Link to="/nytnews">NY-Times</Link>         
          <Link to="/library">Library</Link>
          <Link to="/weather">Weather</Link> 
          <Link to="/philo">About us</Link>
        </div>

        <div className="header__extras">
          <div className="header__weather">
            <MiniWeather />
          </div>

          {!isLoggedIn ? (
            <Link to="/login" className="header__login-button">In</Link>
          ) : (
            <Link to="/user" className="header__user-button">
              <img
                src={avatarUrl || defaultAvatar}
                alt="avatar"
                className="header__user-avatar"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
