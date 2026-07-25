"use client";

import { useEffect, useState, ReactNode } from "react";

interface HeroParallaxProps {
  image: string;
  children: ReactNode;
}

export default function HeroParallax({ image, children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clamped = Math.min(scrollY, 700);
  const scale = 1 + (clamped / 700) * 0.16;
  const imgShift = clamped * 0.22;
  const fade = Math.max(0, 1 - scrollY / 480);

  return (
    <section className="relative h-screen -mt-20 overflow-hidden flex items-center">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${imgShift}px) scale(${scale})`, willChange: "transform" }}
      >
        <img src={image} alt="Premium car" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20"
        style={{ opacity: fade, transform: `translateY(${scrollY * 0.12}px)` }}
      >
        {children}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
