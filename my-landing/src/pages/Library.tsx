
// import { useEffect, useState } from "react";
// import "../styles/Library.scss";

// interface ArtObject {
//   objectID: number;
//   title: string;
//   primaryImageSmall: string;
//   artistDisplayName: string;
// }

// const Library = () => {
//   const [items, setItems] = useState<ArtObject[]>([]);

//   useEffect(() => {
//     fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sculpture")
//       .then((res) => res.json())
//       .then((data) => {
//         const objectIDs: number[] = data.objectIDs?.slice(0, 6) || [];
//         return Promise.all(
//           objectIDs.map((id) =>
//             fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then((res) =>
//               res.json()
//             )
//           )
//         );
//       })
//       .then((objects) => {
//         setItems(objects);
//       })
//       .catch((error) => {
//         console.error("Error fetching art objects:", error);
//       });
//   }, []);

//   return (
//     <div className="library-page">
//       <h1 className="library-title">Art Library</h1>
//       <div className="library-section">
//         {items.map((item, index) => (
//           <div
//             className={`section ${index % 2 !== 0 ? "reverse" : ""}`}
//             key={item.objectID}
//           >
//             <div className="image-block">
//               <img src={item.primaryImageSmall} alt={item.title} />
//             </div>
//             <div className="text-block">
//               <div className="title">{item.title}</div>
//               <div className="description">{item.artistDisplayName || "Unknown Artist"}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Library;
