import React, { useEffect, useRef, useState } from 'react';
import './TextSection.scss';
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
      body: `Stars are cosmic forges, born from vast clouds of hydrogen gas. Through immense pressure and heat, hydrogen nuclei fuse into helium — a process that releases the energy we perceive as starlight.
As stars age and hydrogen is exhausted, they begin to fuse helium into carbon. The chain continues: carbon into neon, neon into oxygen, then into silicon. Each step produces heavier elements and releases even more energy.
But the process has a limit. When a star finally begins to create iron, the game changes. Unlike previous elements, iron does not release energy when fused — it demands it. The core collapses under its own gravity, and in massive stars, this triggers a supernova.
This dramatic death scatters elements across the cosmos — seeding future stars, planets, and even us. The iron in your blood was forged in the heart of a dying star.
Iron doesn’t just end a star — it begins a world.`, 
      showMore: 'more',
      showLess: 'less',
      toggleLang: 'Укр'
    },
    uk: {
      title: 'Життєвий цикл зірок: від гелію до заліза',
      body: `Зірки — це космічні кузні, що народжуються з гігантських хмар водню. Під впливом величезного тиску й температури ядра водню зливаються в гелій — процес, який вивільняє енергію, що ми бачимо як зоряне світло.
З віком, коли водень вичерпується, зірка починає зливати гелій у вуглець. Ланцюг продовжується: вуглець — у неон, неон — у кисень, потім у кремній. Кожен етап створює важчі елементи та виділяє ще більше енергії.
Але цей процес має межу. Коли зірка починає створювати залізо — все змінюється. На відміну від попередніх елементів, залізо не виділяє енергії при злитті — навпаки, воно її поглинає. Ядро зірки обвалюється під дією власної гравітації, і в масивних зірках це спричиняє наднову.
Ця драматична смерть розкидає елементи по всьому космосу — формуючи майбутні зірки, планети й навіть нас. Залізо в твоїй крові було створене в серці вмираючої зірки.
Залізо не лише завершує життя зірки — воно починає новий світ.`,
      showMore: 'Показати',
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
