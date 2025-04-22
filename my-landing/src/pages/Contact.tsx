import { useState } from 'react';
import './ContactPage.scss';

const Section = ({ title, image, text, className }: any) => {
  const [expanded, setExpanded] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    setFlicker(true);
    setTimeout(() => setFlicker(false), 800);
  };

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
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

const Card = ({ author, quote, img }: any) => (
  <div className="card">
    <div className="card-image">
      <img src={img} alt={author} />
    </div>
    <div className="card-content">
      <div className="author">{author}</div>
      <div className="quote">“{quote}”</div>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div className="contact-page">
      <Section
        title="Stoicism"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Marcus_Aurelius_Glyptothek_Munich_337.jpg/800px-Marcus_Aurelius_Glyptothek_Munich_337.jpg"
        text="Stoicism is a philosophy founded in Ancient Greece that teaches the development of self-control and fortitude as a means of overcoming destructive emotions."
        className="stoicism"
      />
      <Section
        title="Existentialism"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jean_Paul_Sartre_FP.JPG/800px-Jean_Paul_Sartre_FP.JPG"
        text="Existentialism emphasizes individual existence, freedom, and choice. It argues that humans define their own meaning in life, and try to make rational decisions despite existing in an irrational universe."
        className="existentialism reverse"
      />
      <Section
        title="Absurdism"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_posant_au_bureau%2C_faisant_face_%C3%A0_l%27objectif.jpg/800px-Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_posant_au_bureau%2C_faisant_face_%C3%A0_l%27objectif.jpg"
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
