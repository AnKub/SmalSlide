import { useState } from 'react';
import '../styles/ContaktPage.scss';

const Section = ({ title, image, text, className }: any) => {
  const [expanded, setExpanded] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    setFlicker(true);
    setTimeout(() => setFlicker(false), 800);
  };

  const validImage = image || 'https://placehold.co/400x300?text=No+Image';

  return (
    <div className={`section ${className} ${flicker ? 'flicker' : ''}`}>
      <div className="text-block">
        <div className="title">{title}</div>
        <div className={`description ${expanded ? 'expanded' : ''}`}>
          {text}
        </div>
        <button className="read-more-btn" onClick={toggleExpand}>
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

const Contact = () => {
  return (
    <div className="contact-page">
      <Section
        title="Stoicism"
        image="/img/stoic.jfif"
        text="Stoicism is a philosophy founded in Ancient Greece that teaches the development of self-control and fortitude as a means of overcoming destructive emotions."
        className="stoicism"
      />
      <Section
        title="Existentialism"
        image="/img/Kierkegaard.jfif"
        text="Existentialism emphasizes individual existence, freedom, and choice. It argues that humans define their own meaning in life, and try to make rational decisions despite existing in an irrational universe."
        className="existentialism reverse"
      />
      <Section
        title="Absurdism"
         image="/img/camus.jfif"
        text="Absurdism explores the conflict between the human tendency to seek inherent value and meaning in life and the inability to find any in a purposeless, meaningless or chaotic universe."
        className="absurdism"
      />

      <div className="cards-section">
        <Card
          author="Ralph Waldo Emerson"
          quote="To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."
          img="https://upload.wikimedia.org/wikipedia/commons/2/2e/Ralph_Waldo_Emerson_ca1857_retouched.jpg"
        />
        <Card
          author="Arthur Schopenhauer"
          quote="Compassion is the basis of morality."
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Arthur_Schopenhauer_Portrait.jpg/800px-Arthur_Schopenhauer_Portrait.jpg"
        />
        <Card
          author="Erich Maria Remarque"
          quote="A man is never afraid of a thing, but of the idea of it."
          img="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Erich_Maria_Remarque.jpg/800px-Erich_Maria_Remarque.jpg"
        />
      </div>
    </div>
  );
};

export default Contact;
