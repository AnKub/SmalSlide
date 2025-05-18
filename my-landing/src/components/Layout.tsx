import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Layout.scss';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const bgClass = (() => {
    if (path === '/') return 'bg-home';
    if (path === '/nytnews') return 'bg-about';
    if (path === '/contact') return 'bg-contact';
    if (path === '/library') return 'bg-home';
    if (path === '/weather') return 'bg-weather';
    return '';
  })();

  return (
    <div className={`layout ${bgClass}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
