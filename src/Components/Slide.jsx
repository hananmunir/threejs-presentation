import { Canvas, useThree } from "@react-three/fiber";
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Texture = ({ texture, position, trigger }) => {
  gsap.registerPlugin(ScrollTrigger);
  const { camera } = useThree();
  const puppyRef = React.useRef();
  useEffect(() => {
    const boxes = camera;
    camera.position.set(0, -1.5, 0);
    const ctx = gsap.context(() => {
      // Target the two specific elements we have forwarded refs to
      gsap.to(puppyRef.current.position, {
        scrollTrigger: {
          trigger: trigger,
          scrub: true,
        },
        z: 10,
        
        //repeat: -1,
        duration: 1,

        //repeatDelay: 1,

        //yoyo: true,
        onUpdate: () => {
          camera.lookAt(puppyRef.current.position);
        },
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <mesh ref={puppyRef} position={position}>
      <planeBufferGeometry attach='geometry' args={[5, 4]} />
      <meshBasicMaterial attach='material' map={texture} />
    </mesh>
  );
};
export default function Slide({ url }) {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);

  return (
    <>
      <Texture texture={texture} position={[0, 0, -100]} trigger='.b' />
      <Texture texture={texture} position={[0, 0, -200]} trigger='.c' />
    </>
  );
}
