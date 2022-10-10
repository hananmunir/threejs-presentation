import { Canvas, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { OrbitControls, Shadow, Text } from "@react-three/drei";
import Slides from "./index";

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
        {/* <Text /> */}
        <Slides />

        <SkyBox />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
