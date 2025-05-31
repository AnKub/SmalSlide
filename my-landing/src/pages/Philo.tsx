import React from 'react';
import { useState } from 'react';
import '../styles/Philo.scss';

const Section = ({ id, activeId, setActiveId, title, image, text, className }: any) => {
  const flicker = activeId === id;
  const expanded = activeId === id;

  const handleToggle = () => {
    if (expanded) {
      setActiveId(null);
    } else {
      setActiveId(id); 
    }
  };

  const validImage = image || 'https://placehold.co/400x300?text=No+Image';

  return (
    <div className={`section ${className} ${flicker ? 'flicker' : ''}`}>
      <div className={`text-block ${expanded ? 'expanded' : ''}`}>
        <div className="title">{title}</div>
        <div className="description">{text}</div>
        <button className="read-more-btn" onClick={handleToggle}>
          {expanded ? 'Collapse' : 'Read more'}
        </button>
      </div>
      <div className="image-block">
        <img src={validImage} alt={title} />
      </div>
    </div>
  );
};

const Card = ({ author, quote, img }: any) => {
  const validImg = img || 'https://placehold.co/300x300?text=No+Image';

  return (
    <div className="card">
      <div className="card-image">
        <img src={validImg} alt={author} />
      </div>
      <div className="card-content">
        <div className="author">{author}</div>
        <div className="quote">“{quote}”</div>
      </div>
    </div>
  );
};

const Philo = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="contact-page">
      <Section
        id="stoicism"
        title="Stoicism"
        image="/img/stoic.webp"
        text={`Stoicism is a philosophy founded in Ancient Greece that teaches the development of self-control and fortitude as a means of overcoming destructive emotions. 
Zeno of Citium was one of the first and most influential Stoic philosophers. He taught that we should live in harmony with nature and accept things we cannot control. 
A central idea of Stoicism is that virtue (such as wisdom, courage, and justice) is the highest good. 
Famous quote: “We suffer more in imagination than in reality.” – Seneca.`}
        className="stoicism"
        activeId={activeSection}
        setActiveId={setActiveSection}
      />

      <Section
        id="existentialism"
        title="Existentialism"
        image="/img/Kierkegaard.webp"
        text={`Existentialism emphasizes individual existence, freedom, and choice. It argues that humans define their own meaning in life, and try to make rational decisions despite existing in an irrational universe. 
Søren Kierkegaard is often considered the father of existentialism. He believed that truth is subjective and that each individual must take a leap of faith to live authentically. 
He focused on anxiety, despair, and the concept of personal responsibility. 
Famous quote: “Life can only be understood backwards; but it must be lived forwards.” – Kierkegaard.`}
        className="existentialism reverse"
        activeId={activeSection}
        setActiveId={setActiveSection}
      />

      <Section
        id="absurdism"
        title="Absurdism"
        image="/img/camus.webp"
        text={`Absurdism explores the conflict between the human tendency to seek inherent value and meaning in life and the inability to find any in a purposeless, meaningless or chaotic universe. 
Albert Camus was a key figure in Absurdism. He argued that although life is inherently absurd, we should embrace it and live with passion and integrity anyway. 
His idea of the 'absurd hero' is someone who continues to seek meaning even in a meaningless world. 
Famous quote: “The struggle itself toward the heights is enough to fill a man's heart.” – Camus.`}
        className="absurdism"
        activeId={activeSection}
        setActiveId={setActiveSection}
      />

      <div className="cards-section">
        <Card
          author="Ralph Waldo Emerson"
          quote="To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."
          img="img/emmerson.webp"
        />
        <Card
          author="Arthur Schopenhauer"
          quote="Compassion is the basis of morality."
          img="img/Schop.webp"
        />
        <Card
          author="Erich Maria Remarque"
          quote="A man is never afraid of a thing, but of the idea of it."
          img="img/Remarque.webp"
        />
      </div>
    </div>
  );
};

export default React.memo(Philo);
