"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.3 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver arriba"
      className={`group fixed right-6 bottom-6 z-20 transition-all duration-500 ease-out sm:right-8 sm:bottom-8 cursor-pointer ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary shadow-sm shadow-primary/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-primary/90 group-hover:shadow-md">
        <ChevronUp
          className=" h-6 w-6 text-white"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </button>
  );
}
