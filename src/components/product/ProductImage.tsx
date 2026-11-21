import Image from "next/image";
import { cn } from "@/lib/format";
import { asset } from "@/lib/asset";

/**
 * Single image component for the whole storefront.
 *
 * - With `src`: renders a real photo via next/image (object-cover, 4:5 by default).
 * - Without `src`: renders an elegant tonal placeholder derived from `tone` (a hex colour),
 *   so the layout is realistic before photography exists.
 *
 * To drop real photos in later, set `images` on a product colour in /data/products.ts
 * and this component will pick them up automatically.
 */
export interface ProductImageProps {
  src?: string;
  alt: string;
  /** Hex colour used for the placeholder gradient */
  tone?: string;
  /** Vary the gradient so galleries don't look identical (0–3) */
  variant?: number;
  /** Tailwind aspect class. Defaults to portrait 4:5 */
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show a faint monogram watermark on placeholders */
  monogram?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(hex: string, target: [number, number, number], amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const m = (a: number, t: number) => Math.round(a + (t - a) * amount);
  return `rgb(${m(r, target[0])} ${m(g, target[1])} ${m(b, target[2])})`;
}

const CREAM: [number, number, number] = [247, 243, 236];
const INK: [number, number, number] = [20, 18, 16];

export function placeholderStyle(tone: string, variant = 0): React.CSSProperties {
  const light = mix(tone, CREAM, 0.42);
  const mid = mix(tone, CREAM, 0.12);
  const dark = mix(tone, INK, 0.22);
  const angles = [160, 200, 135, 25];
  const angle = angles[variant % angles.length];
  return {
    backgroundColor: mid,
    backgroundImage: `linear-gradient(${angle}deg, ${light} 0%, ${mid} 48%, ${dark} 100%)`,
  };
}

export function ProductImage({
  src,
  alt,
  tone = "#8f8273",
  variant = 0,
  aspect = "aspect-[4/5]",
  className,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority,
  monogram = true,
}: ProductImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-ecru", aspect, className)}>
      {src ? (
        <Image src={asset(src)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
          style={placeholderStyle(tone, variant)}
        >
          {/* soft light sweep */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)",
            }}
          />
          {/* fine grain */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {monogram && (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center font-serif text-[22vw] md:text-[7vw] leading-none text-cream/25 select-none"
            >
              M
            </span>
          )}
        </div>
      )}
    </div>
  );
}
