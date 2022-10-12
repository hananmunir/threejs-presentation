import React from "react";
import { slides } from "../data";
import Slide from "./Slide";

export default function index() {
  return (
    <>
      {slides.map((slide, index) => {
        return <Slide key={index} slide={slide} />;
      })}
    </>
  );
}
