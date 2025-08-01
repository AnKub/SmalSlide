// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// interface ShapeBlurProps {
//   variation?: number;
//   pixelRatioProp?: number;
//   shapeSize?: number;
//   roundness?: number;
//   borderSize?: number;
//   circleSize?: number;
//   circleEdge?: number;
// }

// const ShapeBlur: React.FC<ShapeBlurProps> = ({
//   variation = 0,
//   pixelRatioProp = window.devicePixelRatio || 1,
//   shapeSize = 0.5,
//   roundness = 0.2,
//   borderSize = 0.05,
//   circleSize = 0.5,
//   circleEdge = 1
// }) => {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const animationFrameId = useRef<number | null>(null);
// console.log({ roundness, borderSize, circleSize, circleEdge });
//   useEffect(() => {
//     const mount = mountRef.current;
//     if (!mount) return;

//     const width = mount.clientWidth;
//     const height = mount.clientHeight;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });

//     renderer.setSize(width, height);
//     renderer.setPixelRatio(pixelRatioProp);
//     mount.appendChild(renderer.domElement);


//     const geometry = new THREE.SphereGeometry(shapeSize, 32, 32);
//     const material = new THREE.MeshStandardMaterial({
//       color: 0x55aaff,
//       transparent: true,
//       opacity: 0.4,
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     const light = new THREE.PointLight(0xffffff, 1);
//     light.position.set(10, 10, 10);
//     scene.add(light);

//     camera.position.z = 2;

//     const animate = () => {
//       animationFrameId.current = requestAnimationFrame(animate);
//       mesh.rotation.x += 0.005;
//       mesh.rotation.y += 0.005;
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!mount) return;
//       const newWidth = mount.clientWidth;
//       const newHeight = mount.clientHeight;
//       renderer.setSize(newWidth, newHeight);
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
//       window.removeEventListener('resize', handleResize);
//       mount.removeChild(renderer.domElement);
//     };
//   }, [pixelRatioProp, shapeSize, variation]);

//   return (
//     <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
//   );
// };

// export default ShapeBlur;
