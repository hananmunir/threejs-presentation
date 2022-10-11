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
  //reduce opacity on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 1,
        ease: "easeIn",
        scrollTrigger: {
          trigger: "#textTrigger",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <mesh ref={textRef} position={[-38, -2, -25]}>
      <textGeometry args={["Virtual Deck", { font, size: 10, height: 1 }]} />
      <meshBasicMaterial attach='material' color={"white"} />
    </mesh>
  );
}
