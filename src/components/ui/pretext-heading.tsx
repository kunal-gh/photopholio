"use client";
import React, { useEffect, useState, useRef } from "react";
import { prepareWithSegments, layoutWithLines, LayoutLine } from "@chenglou/pretext";

interface Props {
  text: string;
  font?: string;
  className?: string;
}

export function PretextHeading({ text, font = "80px var(--font-headline)", className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LayoutLine[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!containerRef.current) return;
    
    const updateLayout = () => {
      // Find the absolute tightest bounding wrap to ensure zero layout overflows
      const width = containerRef.current!.offsetWidth;
      try {
        const prepared = prepareWithSegments(text, font);
        const result = layoutWithLines(prepared, width, 1.15); // Adjust line height slightly for cinematic effect
        setLines(result.lines);
      } catch (e) {
        console.error("Pretext layout error", e);
      }
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [text, font]);

  return (
    <div ref={containerRef} className={`${className} flex flex-col items-center justify-center overflow-hidden w-full relative`}>
      {lines.length > 0 ? (
        lines.map((l, i) => (
          <div 
            key={i} 
            className="whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 translate-y-12 blur-sm"
            style={{
              animation: `slideUpFade 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s forwards`
            }}
          >
            {l.text}
          </div>
        ))
      ) : (
        <div className="opacity-0">{text}</div> // Hide until pretext calculates
      )}
      <style jsx>{`
        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}