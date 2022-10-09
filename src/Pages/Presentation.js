import React from "react";
import Slideshow from "../Components/Slideshow";

export default function Presentation() {
  return (
    <div>
      <Slideshow />
      <section style={{ height: "100vh" }} className='a'></section>
      <section style={{ height: "100vh" }} className='b'></section>
      <section style={{ height: "100vh" }} className='c'></section>
    </div>
  );
}
