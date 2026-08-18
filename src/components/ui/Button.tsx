import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import Spinner, { type SpinnerSize } from "./Spinner";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-white border border-primary shadow-sm shadow-primary/20 hover:bg-primary/90 active:bg-primary/95 focus-visible:ring-primary/30",
  secondary:
    "bg-white text-foreground border border-border shadow-sm hover:bg-background active:bg-border/40 focus-visible:ring-primary/20",
  outline:
    "bg-transparent text-primary border border-primary/40 hover:bg-primary-muted/30 hover:border-primary active:bg-primary-muted/50 focus-visible:ring-primary/30",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-primary-muted/25 active:bg-primary-muted/40 focus-visible:ring-primary/20",
  danger:
    "bg-danger text-white border border-danger shadow-sm shadow-danger/20 hover:bg-danger/90 active:bg-danger/95 focus-visible:ring-danger/30",
  success:
    "bg-success text-white border border-success shadow-sm shadow-success/20 hover:bg-success/90 active:bg-success/95 focus-visible:ring-success/30",
} as const;

const SIZE_CLASSES = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2.5 px-6 text-[0.95rem]",
} as const;

const ICON_SIZE_CLASSES = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

const SPINNER_SIZE_BY_BUTTON_SIZE: Record<ButtonSize, SpinnerSize> = {
  sm: "xs",
  md: "sm",
  lg: "sm",
};

export type ButtonVariant = keyof typeof VARIANT_CLASSES;
export type ButtonSize = keyof typeof SIZE_CLASSES;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** children is a single icon; makes the button a square proportion. */
  iconOnly?: boolean;
}

/**
 * Base button for the system. Single source of button styles — do not
 * reimplement loose button variants in modules, always consume this component.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    iconOnly = false,
    type = "button",
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-sans font-semibold tracking-tight cursor-pointer",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        !isDisabled && "active:scale-[0.98]",
        VARIANT_CLASSES[variant],
        iconOnly ? ICON_SIZE_CLASSES[size] : SIZE_CLASSES[size],
        fullWidth && !iconOnly && "w-full",
        className,
      )}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={SPINNER_SIZE_BY_BUTTON_SIZE[size]} color="inherit" />
        </span>
      )}

      <span
        className={cn(
          "inline-flex items-center justify-center",
          iconOnly ? "" : "gap-2",
          loading && "invisible",
        )}
      >
        {leftIcon && !iconOnly && (
          <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">
            {leftIcon}
          </span>
        )}
        {iconOnly ? (
          <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">
            {children}
          </span>
        ) : (
          children
        )}
        {rightIcon && !iconOnly && (
          <span className="inline-flex shrink-0 [&>svg]:h-4 [&>svg]:w-4">
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
});

export default Button;
