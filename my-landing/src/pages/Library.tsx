// import { useEffect, useState } from "react";
// import "../styles/Library.scss";

// interface ArtObject {
//   objectID: number;
//   title: string;
//   primaryImageSmall: string;
//   artistDisplayName: string;
// }

// const Lybrary = () => {
//   const [items, setItems] = useState<ArtObject[]>([]);

//   useEffect(() => {
//     fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sculpture")
//       .then((res) => res.json())
//       .then((data) => {
//         const objectIDs: number[] = data.objectIDs?.slice(0, 5) || [];

//         return Promise.all(
//           objectIDs.map((id: number) =>
//             fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((res) => res.json())
//           )
//         );
//       })
//       .then((objects: ArtObject[]) => {
//         setItems(objects);
//       })
//       .catch((error) => {
//         console.error("Error fetching art objects:", error);
//       });
//   }, []);

//   return (
//     <div className="library-page">
//       <h1 className="library-title">Library</h1>
//       {items.map((item) => (
//         <div className="library-item" key={item.objectID}>
//           <h2 className="library-item-title">{item.title}</h2>
//           <img
//             className="library-item-image"
//             src={item.primaryImageSmall}
//             alt={item.title}
//           />
//           <p className="library-item-artist">
//             {item.artistDisplayName || "Unknown Artist"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Lybrary;
