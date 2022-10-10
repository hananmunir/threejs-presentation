import React from "react";
import Slideshow from "../Components/Slideshow";
import { slides } from "../Components/data";

export default function Presentation() {
  return (
    <div>
      <Slideshow />
      <section style={{ height: "100vh" }}></section>
      {slides.map((slide, index) => {
        return (
          <section
            key={index}
            style={{ height: "200vh" }}
            className={slide.trigger.substring(1)}
          ></section>
        );
      })}
    </div>
  );
}
