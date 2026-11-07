"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function NavLink({
  id,
  label,
  Icon,
  onClick,
  index = 0,
  isActive = false,
  className = "",
  style,
}: {
  id: string;
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  index?: number;
  isActive?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollTo(id);
        onClick?.();
      }}
      aria-current={isActive ? "location" : undefined}
      style={style ?? { animationDelay: `${index * 60}ms` }}
      className={cn(
        `group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-[color,background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/20 hover:bg-primary-muted/25 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-[0.98] ${
        isActive
          ? "border-primary/20 bg-white/60 text-primary"
          : "border-transparent text-foreground/70"
        }`,
        className,
      )}
    >
      <Icon
        className={`size-4 shrink-0 transition-colors duration-300 ${
          isActive ? "text-primary" : "text-primary/70 group-hover:text-primary"
        }`}
        strokeWidth={2}
        aria-hidden
      />
      {label}
    </button>
  );
}
