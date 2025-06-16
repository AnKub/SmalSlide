import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import './styles/Layout.scss';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const bgClass = (() => {
    if (path === '/') return 'bg-contact';
    if (path === '/nytnews') return 'bg-about';
    if (path === '/philo') return 'bg-contact';
    if (path === '/library') return 'bg-home';
    if (path === '/weather') return 'bg-weather';
    if (path === '/login') return 'bg-login';
    if (path === '/user') return 'bg-home';
    return '';
  })();

  return (
    <div className={`layout ${bgClass}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
