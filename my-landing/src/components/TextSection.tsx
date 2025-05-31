import React, { useEffect, useRef, useState } from 'react';
import '../styles/TextSection.scss';
import StarImage from '/img/star.webp';

const TextSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<'en' | 'uk'>('en');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const texts = {
    en: {
      title: 'The Lifecycle of Stars: From Helium to Iron',
      body: `Stars are cosmic forges, born from vast clouds of hydrogen gas...`, // скорочено для прикладу
      showMore: 'Show More',
      showLess: 'Show Less',
      toggleLang: 'Укр'
    },
    uk: {
      title: 'Життєвий цикл зірок: від гелію до заліза',
      body: `Зірки — це космічні кузні, що народжуються з гігантських хмар водню...`,
      showMore: 'Показати більше',
      showLess: 'Сховати',
      toggleLang: 'Eng'
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'uk' : 'en'));
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="wr" ref={sectionRef}>
      <div className={`text-section ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="text-content">
          <div className="text-section__header">
            <h2>{texts[language].title}</h2>
            <button className="lang-toggle" onClick={toggleLanguage}>
              {texts[language].toggleLang}
            </button>
          </div>
          <div className={`text-section__wr ${isExpanded ? 'expanded' : ''}`}>
            <p className="text-section__value">{texts[language].body}</p>
          </div>
          <button className="expand-toggle" onClick={toggleExpand}>
            {isExpanded ? texts[language].showLess : texts[language].showMore}
          </button>
        </div>
        <img src={StarImage} alt="Stars" className="text-section__image pulse" />
      </div>
    </div>
  );
};

export default React.memo(TextSection);
