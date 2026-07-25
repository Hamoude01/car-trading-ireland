"use client";

import { useEffect, useRef, useState } from "react";

interface CinematicShowcaseProps {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
}

export default function CinematicShowcase({ image, eyebrow, title, text }: CinematicShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scale = 0.68 + progress * 0.52;
  const radius = Math.max(0, 36 - progress * 36);
  const textOpacity =
    progress < 0.45 ? progress / 0.45 : Math.max(0, 1 - (progress - 0.55) / 0.35);

  return (
    <section ref={ref} className="relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-10">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: `scale(${scale})`, borderRadius: `${radius}px`, willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative text-center px-6" style={{ opacity: textOpacity, willChange: "opacity" }}>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white mt-4 max-w-4xl mx-auto leading-[1.05]">
            {title}
          </h2>
          <p className="text-gray-300 mt-6 max-w-xl mx-auto leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  );
}
