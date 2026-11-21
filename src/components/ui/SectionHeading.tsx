import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Ornament } from "@/components/brand/Ornament";

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  action,
  className,
}: {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        {label && <span className="label text-taupe">{label}</span>}
        <h2 className="font-serif text-3xl md:text-[2.6rem] leading-[1.1] text-navy font-medium">{title}</h2>
        {align === "center" && <Ornament className="my-1" />}
        {subtitle && <p className="max-w-xl text-sm text-taupe leading-relaxed">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
