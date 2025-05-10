
import { useEffect, useState } from "react";

const Library = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sculpture")
      .then(res => res.json())
      .then(data => {
        const objectIDs = data.objectIDs.slice(0, 5); // обмеження до 5 результатів
        return Promise.all(
          objectIDs.map(id =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
          )
        );
      })
      .then(setItems);
  }, []);

  return (
    <div className="page library-page">
      <h1>Library</h1>
      {items.map((item) => (
        <div key={item.objectID} style={{ marginBottom: "2rem" }}>
          <h2>{item.title}</h2>
          <img src={item.primaryImageSmall} alt={item.title} style={{ maxWidth: "200px" }} />
          <p>{item.artistDisplayName}</p>
        </div>
      ))}
    </div>
  );
};

export default Library;
