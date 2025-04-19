import { useEffect, useRef, useState } from 'react';
import '../styles/TextSection.scss';

const TextSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wr" ref={sectionRef}>
      <div className={`text-section ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="text-section__wr">
          <p className="text-section__value">
            <span>"The most merciful thing in the world..."</span><br />
            <span>"The human beings..."</span><br /><br />
            <span>"The seas that lap..."</span>
          </p>
        </div>
        <div className="text-section__mask"></div>
      </div>
    </div>
  );
};

export default TextSection;
