"use client";
import { useEffect } from "react";
import Gradient from "@bedard/gradient";
import SignUpForm from "./SignUpForm";

const Hero = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
      colors: ["#6ec3f4", "#3a3aff", "#ff61ab", "#E63946"],
      seed: Math.random(),
    });
  }, []);

  return (
    <div className="h-3/4 relative flex sm:flex-col">
      <div className="z-0">
        <canvas className="w-full"></canvas>
      </div>
      <div className="absolute bottom-0 right-0 flex sm:w-1/2 w-full pt-10 sm:h-1/3 h-1/2 z-20 bg-white flex justify-center items-center">
        <div id="start" className="w-full pt-10">
          <SignUpForm />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 hidden sm:flex w-full h-1/3 z-10 bg-white -skew-y-12"></div>
      <div className="absolute top-0 sm:left-12 flex sm:w-1/2 w-full h-full justify-center z-30">
        <span className="md:text-5xl lg:text-6xl sm:text-lg pl-8 sm:flex-col flex font-bold justify-center items-center hidden sm:flex sm:items-start text-[#3A3A3A]/75 py-5">
          <div className="text-black">Single Access.</div>
          <div className="py-2">Multi Market. </div>
          <div className="text-black">Round-The-Clock.</div>
        </span>

        <div className="w-full items-center h-1/2 justify-center font-bold text-md z-30 text-black py-5 sm:hidden flex">
          {" "}
          Single Access. Multi Market. Round-The-Clock.
        </div>
      </div>
    </div>
  );
};

export default Hero;
