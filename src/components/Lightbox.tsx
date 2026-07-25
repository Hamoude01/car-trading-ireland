"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export default function Lightbox({ images, index, title, onClose, onIndexChange }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const prev = useCallback(() => {
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!zoomed) return;
    dragging.current = true;
    start.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!zoomed || !dragging.current) return;
    setOffset({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (zoomed) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (zoomed || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) next();
    else if (dx > 50) prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
      data-testid="lightbox"
      role="dialog"
      aria-modal="true"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white">
        <span className="text-sm font-medium text-white/80 truncate max-w-[60%]">{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70 tabular-nums mr-1">
            {index + 1} / {images.length}
          </span>
          <button
            onClick={() => { setZoomed((z) => !z); setOffset({ x: 0, y: 0 }); }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            data-testid="lightbox-zoom-btn"
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
            data-testid="lightbox-close-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[index]}
          alt={`${title} — photo ${index + 1}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onDoubleClick={() => { setZoomed((z) => !z); setOffset({ x: 0, y: 0 }); }}
          draggable={false}
          className="max-h-full max-w-full object-contain transition-transform duration-200"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomed ? 2.4 : 1})`,
            cursor: zoomed ? "grab" : "zoom-in",
          }}
          data-testid="lightbox-image"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
              aria-label="Previous photo"
              data-testid="lightbox-prev-btn"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
              aria-label="Next photo"
              data-testid="lightbox-next-btn"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 sm:px-6 py-4 overflow-x-auto justify-start sm:justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setZoomed(false); setOffset({ x: 0, y: 0 }); onIndexChange(i); }}
              className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                i === index ? "border-accent" : "border-transparent opacity-50 hover:opacity-90"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
