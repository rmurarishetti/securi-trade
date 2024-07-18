"use client"
import { useEffect } from 'react';
import Gradient from '@bedard/gradient';


const Hero = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new Gradient(canvas, {
        colors: ['#ffffff', '#f87171', '#f9a8d4', '#fef08a'],
        seed: Math.random(),
      });
  }, []);

  return (
    <div>
      <canvas className="w-full h-full" />
    </div>
  );
};

export default Hero;