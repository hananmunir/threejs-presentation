import React, { useEffect, useState, useRef } from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
//import Font from "/Fonts/Roboto_Bold.json";
import Font from "../Fonts/Roboto_Regular.json";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

extend({ TextGeometry });

export default function Text() {
  const font = new FontLoader().parse(Font);
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current.position, {
        scrollTrigger: {
          trigger: ".textTrigger",
          scrub: 1,
        },
        y: 100,
        duration: 1,
        ease: "easeIn",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <mesh
      ref={textRef}
      position={window.innerWidth < 500 ? [-11, 0, -30] : [-33, 0, -25]}
    >
      <textGeometry
        args={[
          "Virtual Pitch Deck",
          {
            font,
            size: window.innerWidth < 500 ? 2 : 6,
            height: 0.6,
          },
        ]}
      />
      <meshBasicMaterial attach='material' color={"white"} />
    </mesh>
  );
}
