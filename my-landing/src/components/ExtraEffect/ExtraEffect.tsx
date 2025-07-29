import React,  {useState, useEffect, useRef} from 'react';
import './ExtraEffect.scss';

const ExtraEffect = () => {
  const [language, setLanguage] = useState<'en' | 'uk'>('en');
  const [isVisisble, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if(sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect(); 
  }, []);

  const text = {
    en: 'This is an extra effect component that can be expanded or collapsed.',
    uk: 'Це компонент додаткового ефекту, який можна розгорнути або згортати.'
  };
  return (
    <div className={`extra-effect ${isVisisble ? 'visible' : 'hidden'}`} 
    ref={sectionRef}>
      <div className="extra-effect__content">
        <p>{text[language]}</p>
        <button onClick={() => setLanguage(prev => (prev === 'en' ? 'uk' : 'en'))}>
          {language === 'en' ? 'Switch to Ukrainian' : 'Switch to English'}
        </button>
      </div>
    </div>
  );
};
  export default React.memo(ExtraEffect);