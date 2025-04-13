
import '../styles/Header.scss';

const Header = () => {
  return (
    <header className = 'site-header'>
      <div className="Logo">My Shot</div>
      <nav>
       <ul className='nav-list'>
     <li><a href="#">Home</a></li>
     <li><a href="#">About</a></li>
     <li><a href="#">Contact</a></li>
       </ul>
      </nav>
    </header>
  );
};
export default Header;