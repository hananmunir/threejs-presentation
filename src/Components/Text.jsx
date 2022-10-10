import React from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
//import Font from "/Fonts/Roboto_Bold.json";

extend({ TextGeometry });

export default function Text() {
  const font = new FontLoader().parse("/Fonts/Roboto_Bold.json");

  return (
    <mesh>
      <textGeometry args={["Hello World", { font, size: 1, height: 1 }]} />
      <meshPhysicalMaterial attach='material' color={"black"} />
    </mesh>
  );
}
