import React, { useState, useEffect, useRef } from 'react';
import ShapeBlur from '../ShapeBlur/ShapeBlur';
import './ExtraEffect.scss';

const ExtraEffect = () => {
  const [language, setLanguage] = useState<'en' | 'uk'>('en');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const text = {
    en: 'This is an extra effect component that can be expanded or collapsed.',
    uk: 'Це компонент додаткового ефекту, який можна розгорнути або згортати.',
  };

  return (
    <div
      className={`extra-effect-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={sectionRef}
    >
      <div className="blur-effect-background">
        <ShapeBlur
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={0.5}
          roundness={0.2}
          borderSize={0.05}
          circleSize={0.5}
          circleEdge={1}
        />
      </div>

      <div className="extra-effect__content">
        <p>{text[language]}</p>
        <button onClick={() => setLanguage(prev => (prev === 'en' ? 'uk' : 'en'))}>
          {language === 'en' ? 'Switch to UA' : 'Switch to EN'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ExtraEffect);
