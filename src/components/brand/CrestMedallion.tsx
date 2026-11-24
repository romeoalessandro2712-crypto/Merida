import Image from "next/image";
import { useId } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/format";

const SIZES = {
  lg: "h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52",
  hero: "h-24 w-24 sm:h-40 sm:w-40 md:h-52 md:w-52",
  md: "h-24 w-24 md:h-28 md:w-28",
  sm: "h-16 w-16",
};

/** The MERIDIA crest presented as a medallion: gold rings, glow and an optional rotating motto. */
export function CrestMedallion({
  size = "lg",
  rotatingText = false,
  priority,
  className,
}: {
  size?: keyof typeof SIZES;
  rotatingText?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <span aria-hidden="true" className="absolute inset-[-35%] rounded-full bg-gold/25 blur-3xl" />
      {rotatingText ? (
        <div aria-hidden="true" className="absolute inset-[-36%] text-gold">
          <svg viewBox="0 0 200 200" className="spin-60 h-full w-full">
            <defs>
              <path id={`ring-${id}`} d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
            </defs>
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
            <text fontSize="7" fill="currentColor" style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.18em" }}>
              <textPath href={`#ring-${id}`} textLength="536" lengthAdjust="spacing">
                MERIDIA · EUROPEAN SENSIBILITY · TIMELESS DESIGN · EVERYDAY SOPHISTICATION ·
              </textPath>
            </text>
          </svg>
        </div>
      ) : (
        <span aria-hidden="true" className="absolute inset-[-14%] rounded-full border border-gold/40" />
      )}
      <span aria-hidden="true" className="absolute inset-[-5%] rounded-full border border-gold/80" />
      <Image
        src={asset("/brand/meridia-crest-600.jpg")}
        alt="MERIDIA crest"
        width={420}
        height={420}
        priority={priority}
        className={cn(SIZES[size], "relative rounded-full object-cover shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)]")}
      />
    </div>
  );
}
