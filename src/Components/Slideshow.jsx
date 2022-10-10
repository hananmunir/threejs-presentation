import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import Slides from "./index";

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   useEffect(() => {
//     const controls = new OrbitControls(camera, gl.domElement);
//     // How far you can dolly in and out ( PerspectiveCamera only )
//     // "target" sets the location of focus, where the object orbits around
//     // controls.target = new THREE.Vector3();

//     // How far you can dolly in and out ( PerspectiveCamera only )
//     controls.minDistance = 0;
//     controls.maxDistance = Infinity;

//     // How far you can zoom in and out ( OrthographicCamera only )
//     controls.minZoom = 0;
//     controls.maxZoom = Infinity;

//     // How far you can orbit vertically, upper and lower limits.
//     // Range is 0 to Math.PI radians.
//     controls.minPolarAngle = -Math.PI * 0.25; // radians
//     controls.maxPolarAngle = Math.PI * 0.8; // radians

//     // How far you can orbit horizontally, upper and lower limits.
//     // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
//     controls.minAzimuthAngle = -Math.PI / 4; // radians
//     controls.maxAzimuthAngle = Math.PI / 4; // radians

//     // Set to true to enable damping (inertia)
//     // If damping is enabled, you must call controls.update() in your animation loop
//     controls.enableDamping = false;
//     controls.dampingFactor = 0.05;

//     // controls option actually enables dollying in and out; left as "zoom" for backwards compatibility.
//     // Set to false to disable zooming
//     controls.enableZoom = true;
//     controls.zoomSpeed = 1.0;

//     // Set to false to disable rotating
//     controls.enableRotate = true;
//     controls.rotateSpeed = 1.0;

//     // Set to false to disable panning
//     controls.enablePan = true;
//     controls.panSpeed = 1.0;
//     controls.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
//     controls.keyPanSpeed = 7.0; // pixels moved per arrow key push

//     return () => {
//       controls.dispose();
//     };
//   }, [camera, gl]);
//   return null;
// };
// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();
  const loader = new THREE.CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/Images/stars.jpg",
    "/Images/stars.jpg",
    "/Images/stars.jpg",
    "/Images/stars.jpg",
    "/Images/stars.jpg",
    "/Images/stars.jpg",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

export default function Slideshow() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
    >
      <Canvas camera={{ fov: 75, near: 0.1, far: 80, position: [0, 0, 5] }}>
        <ambientLight intensity={1} color={"#ffffff"} />

        <SkyBox />

        <Slides />
      </Canvas>
    </div>
  );
}
