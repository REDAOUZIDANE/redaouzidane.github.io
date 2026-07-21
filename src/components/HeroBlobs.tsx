"use client";

import { useEffect, useRef } from "react";

export function HeroBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(e: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (blobARef.current) {
        blobARef.current.style.transform = `translate3d(${x * -30}px, ${y * -30}px, 0)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate3d(${x * 24}px, ${y * 24}px, 0)`;
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Outer div: slow ambient CSS float. Inner div: mouse-parallax via inline transform. */}
      <div className="blob-float absolute -top-32 right-[-10%] h-96 w-96">
        <div
          ref={blobARef}
          className="h-full w-full rounded-full bg-green-100 blur-3xl transition-transform duration-300 ease-out"
        />
      </div>
      <div className="blob-float-delay absolute -bottom-32 left-[-10%] h-96 w-96">
        <div
          ref={blobBRef}
          className="h-full w-full rounded-full bg-navy-900/5 blur-3xl transition-transform duration-300 ease-out"
        />
      </div>
    </div>
  );
}
