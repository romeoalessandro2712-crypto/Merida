import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost" | "chocolate" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-cream border border-navy hover:bg-navy-deep hover:border-navy-deep",
  chocolate: "bg-chocolate text-cream border border-chocolate hover:bg-[#2f1f15]",
  secondary: "bg-transparent text-navy border border-navy hover:bg-navy hover:text-cream",
  ghost: "bg-transparent text-navy border border-transparent hover:border-line",
  light: "bg-cream text-navy border border-cream hover:bg-ecru hover:border-ecru",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.68rem]",
  md: "h-12 px-7 text-[0.7rem]",
  lg: "h-14 px-9 text-[0.72rem]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.18em] font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none";

export function buttonClass(variant: Variant = "primary", size: Size = "md", className = "") {
  return cn(baseClass, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}
