import { cn } from "@/lib/utils";

const SIZE_CLASSES = {
  xs: "h-3 w-3 border-[1.5px]",
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-6 w-6 border-[2.5px]",
} as const;

export type SpinnerSize = keyof typeof SIZE_CLASSES;

interface SpinnerProps {
  size?: SpinnerSize;
  color?: "inherit" | string;
  className?: string;
}

export default function Spinner({
  size = "sm",
  color = "inherit",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        SIZE_CLASSES[size],
        color !== "inherit" && color,
        className,
      )}
    />
  );
}
