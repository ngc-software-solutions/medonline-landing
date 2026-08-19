"use client";

import type { LucideIcon } from "lucide-react";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function NavLink({
  id,
  label,
  Icon,
  onClick,
  index = 0,
  isActive = false,
}: {
  id: string;
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  index?: number;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={() => {
        scrollTo(id);
        onClick?.();
      }}
      aria-current={isActive ? "true" : undefined}
      style={{ animationDelay: `${index * 80}ms` }}
      className={`group flex shrink-0 animate-fade-in-up items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-300 hover:border-primary/20 hover:bg-primary-muted/25 hover:text-primary ${
        isActive
          ? "border-primary/20 bg-primary-muted/40 text-primary"
          : "border-transparent text-foreground/70"
      }`}
    >
      <Icon
        className="h-4 w-4 shrink-0 text-primary transition-colors duration-300"
        strokeWidth={2}
        aria-hidden
      />
      {label}
    </button>
  );
}
