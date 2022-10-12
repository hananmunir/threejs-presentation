import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PresentationControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);
const Texture = ({
  texture,
  position,
  trigger,
  direction,
  isVideo,
  videoSrc,
}) => {
  const [video] = useState(() => {
    if (isVideo) {
      const vid = document.createElement("video");
      vid.src = videoSrc;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = false;
      vid.preload = "auto";

      return vid;
    }
    return null;
  });

  const slideRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Target the two specific elements we have forwarded refs to
      if (direction === "down" || direction === "up") {
        gsap.to(slideRef.current?.position, {
          scrollTrigger: {
            trigger: trigger,
            scrub: 1.5,
          },
          y: direction === "down" ? -30 : 30,

          duration: 1,
        });
      } else {
        gsap.to(slideRef.current?.position, {
          scrollTrigger: {
            trigger: trigger,
            scrub: 1.5,
          },
          x: direction === "right" ? -8 : direction === "left" ? 6 : 0,
          z:
            direction === "right" || direction === "left"
              ? window.innerWidth < 500
                ? 1
                : 6
              : 10,

          duration: 1,
        });
      }
    });

    return () => ctx.revert();
  }, [direction, trigger]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    slideRef.current.rotation.x = Math.cos(t / 4) / 6;
    slideRef.current.rotation.y = Math.sin(t / 4) / 6;

    if (isVideo) {
      if (
        slideRef.current?.position.distanceTo(new THREE.Vector3(0, 0, 0)) < 8
      ) {
        video?.play();
      } else {
        video?.pause();
      }
    }
  });

  return (
    <PresentationControls
      global={false} // Spin globally or by dragging the model
      cursor={true} // Whether to toggle cursor style on drag
      snap={true} // Snap-back to center (can also be a spring config)
      speed={1} // Speed factor
      zoom={1} // Zoom factor when half the polar-max is reached
      rotation={[0, 0, 0]} // Default rotation
      polar={[-Math.PI * 0.2, Math.PI * 0.2]} // Vertical limits
      azimuth={[-Math.PI * 0.2, Math.PI * 0.2]} // Horizontal limits
      config={{ mass: 1, tension: 170, friction: 45 }} // Spring config
    >
      <mesh ref={slideRef} position={position}>
        {!isVideo ? (
          <>
            <planeGeometry
              attach='geometry'
              args={window.innerWidth < 500 ? [6, 10] : [7, 4, 4]}
            />
            <meshBasicMaterial
              attach='material'
              map={texture}
              side={THREE.DoubleSide}
            />
          </>
        ) : (
          <>
            <planeGeometry args={[3.2, 1.9]} />
            <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
              <videoTexture attach='map' args={[video]} />
              <videoTexture attach='emissiveMap' args={[video]} />
            </meshStandardMaterial>
          </>
        )}
      </mesh>
    </PresentationControls>
  );
};
export default function Slide({ slide }) {
  const texture = useMemo(() => {
    if (!slide.isVideo) {
      return new THREE.TextureLoader().load(slide.src);
    }
  }, [slide.src, slide.isVideo]);

  return (
    <>
      <Texture
        texture={texture}
        position={slide.position}
        trigger={slide.trigger}
        direction={slide.direction}
        isVideo={slide.isVideo}
        videoSrc={slide.src}
      />
    </>
  );
}
