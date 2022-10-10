import { Canvas, useThree, useFrame } from "@react-three/fiber";
import React, { useMemo, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Texture = ({ texture, position, trigger, direction }) => {
  gsap.registerPlugin(ScrollTrigger);
  const { camera } = useThree();
  const puppyRef = React.useRef();
  // camera.position.set(0, -1.5, 0);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Target the two specific elements we have forwarded refs to
      if (direction === "up") {
        console.log(puppyRef.current.position);
        gsap.to(puppyRef.current.position, {
          scrollTrigger: {
            trigger: trigger,
            scrub: true,
          },
          y: 0,
          z: 1,

          //repeat: -1,
          duration: 1,

          //repeatDelay: 1,

          //yoyo: true,
          onUpdate: () => {
            // camera.lookAt(puppyRef.current.position);
            console.log(puppyRef.current.position);
          },
        });
      } else {
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
      }
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    //ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    puppyRef.current.rotation.x = Math.cos(t / 4) / 6;
    puppyRef.current.rotation.y = Math.sin(t / 4) / 6;
    puppyRef.current.position.y = (1 + Math.sin(t / 1.5)) / 6;
  });

  return (
    <mesh ref={puppyRef} position={position}>
      <planeBufferGeometry attach='geometry' args={[7, 4, 4]} />
      <meshBasicMaterial attach='material' map={texture} />
    </mesh>
  );
};
export default function Slide({ slide }) {
  const texture = useMemo(
    () => new THREE.TextureLoader().load(slide.src),
    [slide.src]
  );

  return (
    <>
      <Texture
        texture={texture}
        position={slide.position}
        trigger={slide.trigger}
        direction={slide.direction}
      />
    </>
  );
}
