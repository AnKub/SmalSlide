import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import axios from 'axios';
import './NYTNews.scss';

interface Article {
  id: string;
  title: string;
  abstract: string;
  imgUrl: string | null;
  section: string;
}

const categories = [
  { key: 'all', label: 'All' },
  { key: 'politics', label: 'Politics' },
  { key: 'science', label: 'Science' },
  { key: 'technology', label: 'Technology' },
  { key: 'world', label: 'World' },
  { key: 'health', label: 'Health' },
  { key: 'business', label: 'Business' },
  { key: 'sports', label: 'Sports' },
  { key: 'arts', label: 'Arts' },
];

const NYTNews = memo(() => {
  const [articlesByCategory, setArticlesByCategory] = useState<Record<string, Article[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_NYT_API_KEY;

  const cacheKey = (category: string) => `nyt_articles_${category}`;
  const CACHE_DURATION = 5 * 60 * 1000; 
  
  const getCachedData = (category: string) => {
    try {
      const cached = localStorage.getItem(cacheKey(category));
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
    return null;
  };
  
  const setCachedData = (category: string, data: Article[]) => {
    try {
      localStorage.setItem(cacheKey(category), JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Cache write error:', e);
    }
  };

  const fetchCategoryArticles = useCallback(async (category: string) => {
   
    const cachedData = getCachedData(category);
    if (cachedData) {
      setArticlesByCategory((prev) => ({
        ...prev,
        [category]: cachedData,
      }));
      return;
    }

    try {
      const url =
        category === 'all'
          ? `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
          : `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`;

      const res = await axios.get(url);
      const formatted = res.data.results.map((item: any) => ({
        id: item.url,
        title: item.title,
        abstract: item.abstract,
        imgUrl: item.multimedia?.[0]?.url || null,
        section: item.section.toLowerCase(),
      }));

      const articles = formatted.slice(0, 20);
      
      setCachedData(category, articles);
      
      setArticlesByCategory((prev) => ({
        ...prev,
        [category]: articles,
      }));
    } catch (error) {
      console.error(`Failed to fetch ${category} articles:`, error);
    }
  }, [apiKey]);

  useEffect(() => {
    if (!articlesByCategory[activeCategory]) {
      fetchCategoryArticles(activeCategory);
    }
  }, [activeCategory, fetchCategoryArticles]);

  const filteredArticles = useMemo(() => {
    const allArticles = Object.values(articlesByCategory).flat();
    return activeCategory === 'all' ? allArticles : articlesByCategory[activeCategory] || [];
  }, [articlesByCategory, activeCategory]);
  
  const selectedArticle = useMemo(() => 
    filteredArticles.find((a) => a.id === selectedArticleId),
    [filteredArticles, selectedArticleId]
  );
  
  const closeArticle = useCallback(() => setSelectedArticleId(null), []);

  return (
    <div className="page blog-page">
      <div className="category-tabs" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={activeCategory === cat.key ? 'active' : ''}
            onClick={() => setActiveCategory(cat.key)}
            role="tab"
            aria-selected={activeCategory === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="articles-list" role="list">
        {filteredArticles.length === 0 ? (
          <p className="loading-text">Loading articles...</p>
        ) : (
          filteredArticles.map(({ id, title, imgUrl }) => (
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
              <div className="image-placeholder">
                {imgUrl ? (
                  <img src={imgUrl} alt={title} />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="article-content">
                <h2>{title}</h2>
              </div>
            </article>
          ))
        )}
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
});

NYTNews.displayName = 'NYTNews';

export default NYTNews;
