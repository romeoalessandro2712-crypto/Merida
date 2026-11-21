import Image from "next/image";
import { asset } from "@/lib/asset";
import { Guilloche } from "@/components/brand/Guilloche";

/**
 * First-load brand moment, pure CSS so it plays before JavaScript loads.
 * Hidden on later loads in the same session by the inline script in the layout.
 */
export function Intro() {
  return (
    <div aria-hidden="true" className="intro overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[140vmax] -translate-x-1/2 -translate-y-1/2 text-gold opacity-[0.14]">
        <Guilloche />
      </div>
      <div className="intro-crest relative">
        <span className="absolute inset-[-40%] rounded-full bg-gold/25 blur-3xl" />
        <span className="absolute inset-[-8%] rounded-full border border-gold/80" />
        <Image
          src={asset("/brand/meridia-crest-600.jpg")}
          alt=""
          width={320}
          height={320}
          priority
          className="relative h-36 w-36 rounded-full object-cover md:h-44 md:w-44"
        />
      </div>
      <span className="intro-line h-px w-32 bg-gold" />
      <span className="intro-word font-serif text-3xl md:text-4xl">MERIDIA</span>
    </div>
  );
}
