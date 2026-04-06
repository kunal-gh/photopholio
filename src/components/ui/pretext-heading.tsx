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

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateLayout = () => {
      const width = containerRef.current!.offsetWidth;
      try {
        const prepared = prepareWithSegments(text, font);
        const result = layoutWithLines(prepared, width, 1.1);
        setLines(result.lines);
      } catch (e) {
        console.error("Pretext error", e);
      }
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [text, font]);

  return (
    <div ref={containerRef} className={className}>
      {lines.length > 0 ? (
        lines.map((l, i) => <div key={i}>{l.text}</div>)
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
}