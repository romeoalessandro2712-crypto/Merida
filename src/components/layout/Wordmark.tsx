import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/format";

export function Wordmark({ className, withCrest = true }: { className?: string; withCrest?: boolean }) {
  return (
    <Link href="/" aria-label="MERIDIA — Home" className={cn("flex items-center gap-2 md:gap-2.5 group", className)}>
      {withCrest && (
        <Image
          src={asset("/brand/meridia-crest-600.jpg")}
          alt=""
          width={36}
          height={36}
          className="h-7 w-7 md:h-9 md:w-9 rounded-full border border-line object-cover"
          priority
        />
      )}
      <span className="font-serif text-[1.25rem] tracking-[0.16em] md:text-[1.75rem] md:tracking-[0.22em] text-navy font-medium leading-none pt-0.5">
        MERIDIA
      </span>
    </Link>
  );
}
