"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroScrollButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#problema"
      aria-label="Ir a la siguiente sección"
      className={`group fixed bottom-8 left-1/2 z-20 -translate-x-1/2 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="flex items-center gap-2.5 rounded-full border border-border/80 bg-background/70 py-2.5 pr-3.5 pl-4 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/50 group-hover:shadow-md">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-foreground/50 uppercase transition-colors duration-300 group-hover:text-primary">
          Descubre más
        </span>

        <ChevronDown
          className="animate-chevron-pulse h-3.5 w-3.5 text-foreground/50 transition-colors duration-300 group-hover:text-primary"
          strokeWidth={2.5}
          aria-hidden
        />
      </span>
    </a>
  );
}
