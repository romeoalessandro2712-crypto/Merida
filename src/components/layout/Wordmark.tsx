import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/format";
import { asset } from "@/lib/asset";

export function Wordmark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label="MERIDIA — Home" className={cn("group flex items-center gap-2.5 md:gap-3", className)}>
      <span className="relative inline-flex">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-[-4px] rounded-full border transition-colors duration-500",
            light ? "border-gold" : "border-gold/70",
          )}
        />
        <Image
          src={asset("/brand/meridia-crest-600.jpg")}
          alt=""
          width={56}
          height={56}
          className="relative h-9 w-9 rounded-full object-cover transition-transform duration-700 group-hover:rotate-[8deg] md:h-12 md:w-12"
          priority
        />
      </span>
      <span
        className={cn(
          "pt-0.5 font-serif text-[1.3rem] font-medium leading-none tracking-[0.18em] transition-colors duration-500 md:text-[1.9rem] md:tracking-[0.24em]",
          light ? "text-cream" : "text-navy",
        )}
      >
        MERIDIA
      </span>
    </Link>
  );
}
