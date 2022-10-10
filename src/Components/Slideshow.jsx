import { Canvas, useThree } from "@react-three/fiber";
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shadow } from "@react-three/drei";
import Slide from "./Slide";
import Text from "./Text";

const doggos =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

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
        <Text />
        <group>
          <Slide url={doggos} />
        </group>
        <Shadow />
      </Canvas>
    </div>
  );
}
