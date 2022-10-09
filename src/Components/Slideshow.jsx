import { Canvas, useThree } from "@react-three/fiber";
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shadow } from "@react-three/drei";

const doggos =
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
const Texture = ({ texture }) => {
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
          trigger: ".b",
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
    <mesh ref={puppyRef} position={[0, 0, -100]}>
      <planeBufferGeometry attach='geometry' args={[5, 4]} />
      <meshBasicMaterial attach='material' map={texture} />
    </mesh>
  );
};
const Image = ({ url }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);

  return <Texture texture={texture} />;
};

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
        <Image url={doggos} />
        <Shadow />
      </Canvas>
    </div>
  );
}
