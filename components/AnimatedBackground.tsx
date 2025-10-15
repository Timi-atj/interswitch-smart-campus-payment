
import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute left-[-10%] top-[-20%] w-[80rem] h-[80rem] opacity-40 animate-pulse" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#blur)">
          <circle cx="200" cy="200" r="260" fill="#002b36" />
          <circle cx="520" cy="420" r="220" fill="#003b5c" />
        </g>
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />

      <svg className="absolute right-[-10%] bottom-[-10%] w-[60rem] h-[60rem] opacity-30" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00FFC6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0099FF" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path fill="url(#g1)" d="M300,50 C420,80 540,170 540,300 C540,420 420,520 300,540 C180,520 60,420 60,300 C60,170 180,80 300,50 Z" />
      </svg>
    </div>
  );
}
