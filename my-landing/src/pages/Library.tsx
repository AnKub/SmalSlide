import { useEffect, useState } from "react";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImageSmall: string;
  artistDisplayName: string;
}

const Lybrary = () => {
  const [items, setItems] = useState<ArtObject[]>([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sculpture")
      .then((res) => res.json())
      .then((data) => {
        const objectIDs: number[] = data.objectIDs?.slice(0, 5) || [];

        return Promise.all(
          objectIDs.map((id: number) =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((res) => res.json())
          )
        );
      })
      .then((objects: ArtObject[]) => {
        setItems(objects);
      })
      .catch((error) => {
        console.error("Error fetching art objects:", error);
      });
  }, []);

  return (
    <div className="page library-page">
      <h1>Library</h1>
      {items.map((item) => (
        <div key={item.objectID} style={{ marginBottom: "2rem" }}>
          <h2>{item.title}</h2>
          <img src={item.primaryImageSmall} alt={item.title} style={{ maxWidth: "200px" }} />
          <p>{item.artistDisplayName || "Unknown Artist"}</p>
        </div>
      ))}
    </div>
  );
};

export default Lybrary;
