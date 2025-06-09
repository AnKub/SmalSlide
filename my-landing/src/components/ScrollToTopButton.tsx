import { useState, useEffect } from 'react';
import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    setClicked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Після анімації зникнення ховаємо кнопку
    setTimeout(() => {
      setClicked(false);
      setIsVisible(false);
    }, 800); // тривалість має відповідати анімації fade-out
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className={`scroll-to-top-button ${clicked ? 'clicked' : ''}`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
