import React, { useEffect } from "react";
import Slideshow from "../Components/Slideshow";
import { slides } from "../Components/data";
import LocomotiveScroll from "locomotive-scroll";
import Logo from "../../src/Components/Logo";

export default function Presentation() {
  useEffect(() => {
    new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.5,
    });
  }, []);

  return (
    <div data-scroll-container>
      <Logo />

      <Slideshow />

      <section data-scroll-section style={{ height: "100vh" }}></section>
      {slides.map((slide, index) => {
        return (
          <>
            <section
              data-scroll-section
              id='textTrigger'
              style={{ height: "100vh" }}
            ></section>
            <section
              key={index}
              style={{ height: "200vh" }}
              className={slide.trigger.substring(1)}
              data-scroll-section
            ></section>
          </>
        );
      })}
      <section data-scroll-section style={{ height: "100vh" }}></section>
    </div>
  );
}
