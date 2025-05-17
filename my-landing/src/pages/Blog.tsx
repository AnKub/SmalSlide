import { useState } from 'react';
import '../styles/Blog.scss';

const articles = [
  {
    id: 1,
    title: 'The Power of React',
    body: 'React is a JavaScript library for building user interfaces...',
    imgAlt: 'React Logo',
  },
  {
    id: 2,
    title: 'History of the Internet',
    body: 'The Internet began as a research project funded by the US...',
    imgAlt: 'Internet Globe',
  },
  {
    id: 3,
    title: 'The Science of Sleep',
    body: 'Sleep is essential for human health...',
    imgAlt: 'Sleeping Person',
  },
  {
    id: 4,
    title: 'Space Exploration Milestones',
    body: 'From the Moon landing to Mars rovers...',
    imgAlt: 'Space Rocket',
  },
];

const Blog = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  const closeArticle = () => {
    setSelectedArticleId(null);
  };

  return (
    <div className="page blog-page">
      <div className="articles-list" role="list">
        {articles.map(({ id, title, imgAlt }) => (
          <article
            key={id}
            className={`article-card ${selectedArticleId === id ? 'selected' : ''}`}
            tabIndex={0}
            role="listitem"
            onClick={() => setSelectedArticleId(id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedArticleId(id);
              }
            }}
            aria-expanded={selectedArticleId === id}
          >
            <div className="image-placeholder" aria-label={`Image for ${title}`}>
              <span>{imgAlt}</span>
            </div>
            <div className="article-content">
              <h2>{title}</h2>
            </div>
          </article>
        ))}
      </div>

      {selectedArticle && (
        <div className="modal-overlay" onClick={closeArticle}>
          <div
            className="article-details-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={closeArticle}
              aria-label="Close article details"
            >
              &times;
            </button>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
