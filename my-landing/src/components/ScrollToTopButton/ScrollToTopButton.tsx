import { useState, useEffect, useCallback, memo } from 'react';
import './ScrollToTopButton.scss';

const ScrollToTopButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Оптимізація з useCallback для запобігання зайвим ре-рендерам
  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    setClicked(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setClicked(false);
      setIsVisible(false);
    }, 800); 
  }, []);

  useEffect(() => {
    // Throttling для оптимізації scroll events
    let timeoutId: number;
    const throttledToggleVisibility = () => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        toggleVisibility();
        timeoutId = 0;
      }, 100);
    };

    window.addEventListener('scroll', throttledToggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [toggleVisibility]);

  if (!isVisible) return null;

  return (
    <button
      className={`scroll-to-top-button ${clicked ? 'clicked' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ^
    </button>
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

export default ScrollToTopButton;