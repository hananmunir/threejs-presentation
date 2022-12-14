import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import Slides from "./SlideComponent/index";
import Text from "./Text";

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
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Canvas camera={{ fov: 75, near: 0.1, far: 80, position: [0, 0, 5] }}>
        <ambientLight intensity={1} color={"#ffffff"} />
        <Text
          text={"Virtual Pitch Deck"}
          smPosition={[-11, 0, -30]}
          lgPosition={[-33, 0, -25]}
          smSize={2}
          lgSize={6}
        />
        <SkyBox />
        <Slides />
      </Canvas>
    </div>
  );
}
