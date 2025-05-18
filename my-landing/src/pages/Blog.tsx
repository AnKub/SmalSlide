import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Blog.scss';

interface Article {
  id: string;
  title: string;
  abstract: string;
  imgUrl: string | null;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${import.meta.env.VITE_NYT_API_KEY}`
        );

        const formatted = res.data.results.map((item: any) => ({
          id: item.url,
          title: item.title,
          abstract: item.abstract,
          imgUrl: item.multimedia?.[0]?.url || null,
        }));

        setArticles(formatted.slice(0, 12)); 
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const closeArticle = () => setSelectedArticleId(null);

  return (
    <div className="page blog-page">
      <div className="articles-list" role="list">
        {articles.map(({ id, title, imgUrl }) => (
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
              {imgUrl ? (
                <img src={imgUrl} alt={title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              ) : (
                <span>No Image</span>
              )}
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
            <p>{selectedArticle.abstract}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
