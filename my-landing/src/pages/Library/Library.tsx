import { useEffect, useState, useCallback, memo } from "react";
import "./Library.scss";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  culture: string;
  department: string;
  dimensions: string;
}

const CATEGORIES = [
  "Architecture",
  "Sculpture",
  "Paintings",
  "Drawings",
  "Photographs",
  "Furniture",
];

const formatCategoryForQuery = (category: string) => category.toLowerCase();

const Library = memo(() => {
  const [artworks, setArtworks] = useState<ArtObject[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Architecture");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Кешування для Metropolitan Museum API
  const cacheKey = (category: string) => `met_artworks_${category.toLowerCase()}`;
  const CACHE_DURATION = 10 * 60 * 1000; // 10 хвилин
  
  const getCachedArtworks = (category: string) => {
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
  
  const setCachedArtworks = (category: string, data: ArtObject[]) => {
    try {
      localStorage.setItem(cacheKey(category), JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Cache write error:', e);
    }
  };

  const fetchArtworks = useCallback(async (category: string) => {
    // Перевірити кеш
    const cachedData = getCachedArtworks(category);
    if (cachedData) {
      setArtworks(cachedData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    setArtworks([]);

    try {
      const query = formatCategoryForQuery(category);
      const searchResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`
      );

      if (!searchResponse.ok) throw new Error("Search API error");

      const searchData = await searchResponse.json();
      if (!searchData.objectIDs?.length) {
        setArtworks([]);
        return;
      }

      const objectIDs = searchData.objectIDs.slice(0, 20);
      
      // Оптимізація: обмежити кількість одночасних запитів
      const batchSize = 5;
      const artworks: ArtObject[] = [];
      
      for (let i = 0; i < objectIDs.length; i += batchSize) {
        const batch = objectIDs.slice(i, i + batchSize);
        const artworkPromises = batch.map((id: number) =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Object API error");
              return res.json();
            })
            .catch(() => null) // Ігнорувати помилки окремих об'єктів
        );

        const batchResults = await Promise.all(artworkPromises);
        const validArtworks = batchResults.filter(
          (artwork) => artwork && artwork.primaryImageSmall
        );
        artworks.push(...validArtworks);
        
        // Невелика пауза між batch'ами
        if (i + batchSize < objectIDs.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      // Зберегти в кеш
      setCachedArtworks(category, artworks);
      setArtworks(artworks);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtworks(selectedCategory);
  }, [selectedCategory, fetchArtworks]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setMenuOpen(false);
  }, []);

  return (
    <div className="library-page">
      {/* <h1 className="library-title">{selectedCategory} Highlights</h1> */}

      <div className="circle-menu-container">
        <div
          className={`circle-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label="Toggle category menu"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMenuOpen((prev) => !prev);
          }}
        >
          ☰
        </div>

        <ul className={`circle-menu ${menuOpen ? "show" : ""}`}>
          {CATEGORIES.map((category, i) => (
            <li
              key={category}
              className="menu-item"
              onClick={() => handleCategorySelect(category)}
              style={{ transitionDelay: `${i * 0.05}s` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCategorySelect(category);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {loading && <p className="status-message">Loading artworks...</p>}
      {!loading && artworks.length === 0 && !error && (
        <p className="status-message">No artworks found for this category.</p>
      )}
      {error && <p className="status-message">Failed to load data. Try again later.</p>}

      <div className="library-section">
        {artworks.map((artwork, index) => (
          <div
            className={`section ${index % 2 !== 0 ? "reverse" : ""}`}
            key={artwork.objectID}
          >
            <div className="image-block">
              <img src={artwork.primaryImageSmall} alt={artwork.title} />
            </div>
            <div className="text-block">
              <div className="title">{artwork.title}</div>
              <div className="description">
                <p><strong>Artist:</strong> {artwork.artistDisplayName || "Unknown"}</p>
                <p><strong>Date:</strong> {artwork.objectDate || "Unknown"}</p>
                <p><strong>Material:</strong> {artwork.medium || "N/A"}</p>
                <p><strong>Culture:</strong> {artwork.culture || "N/A"}</p>
                <p><strong>Size:</strong> {artwork.dimensions || "N/A"}</p>
                <p><strong>Department:</strong> {artwork.department || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Library.displayName = 'Library';

export default Library;
