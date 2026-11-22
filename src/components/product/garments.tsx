/**
 * Line-art garment drawings used as placeholder "product photos" until real
 * photography exists. Each piece is filled with its colour (and stripe colour when
 * set) inside a 200×250 viewBox.
 */
import type { ReactNode } from "react";

export type ArtKind = "polo" | "shirt" | "sweater" | "cap" | "bracelet";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function mix(hex: string, target: [number, number, number], t: number) {
  const [r, g, b] = hexToRgb(hex);
  const m = (a: number, z: number) => Math.round(a + (z - a) * t);
  return `rgb(${m(r, target[0])} ${m(g, target[1])} ${m(b, target[2])})`;
}
export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
const INK: [number, number, number] = [24, 22, 20];
const CREAM: [number, number, number] = [247, 243, 236];

const SHAPES: Record<Exclude<ArtKind, "bracelet">, { body: string; extra?: string }> = {
  polo: {
    body: "M64 58 L86 46 Q100 54 114 46 L136 58 L168 76 L156 112 L140 104 L141 208 Q100 214 59 208 L60 104 L44 112 L32 76 Z",
  },
  shirt: {
    body: "M66 56 L86 44 L100 54 L114 44 L134 56 L156 70 L176 188 L158 192 L144 112 L145 216 L55 216 L56 112 L42 192 L24 188 L44 70 Z",
  },
  sweater: {
    body: "M66 54 Q100 70 134 54 L160 66 L182 184 L162 190 L146 108 L148 206 L52 206 L54 108 L38 190 L18 184 L40 66 Z",
  },
  cap: {
    body: "M44 150 Q44 84 108 78 Q168 80 172 150 Z",
    extra: "M44 150 Q22 150 16 164 Q52 186 112 170 Q146 162 172 150 Z",
  },
};

function details(kind: ArtKind): ReactNode {
  switch (kind) {
    case "polo":
      return (
        <>
          <path d="M86 46 L93 68 L100 58 L107 68 L114 46" />
          <path d="M86 46 Q100 56 114 46" />
          <path d="M96 58 L96 96 L104 96 L104 58" />
          <circle cx="100" cy="70" r="2.2" />
          <circle cx="100" cy="84" r="2.2" />
          <path d="M41 104 L57 97 M159 104 L143 97" />
          <path d="M60 200 Q100 206 140 200" />
        </>
      );
    case "shirt":
      return (
        <>
          <path d="M86 44 L91 68 L100 54 L109 68 L114 44" />
          <path d="M100 56 L100 216" />
          {[76, 98, 120, 142, 164, 186, 206].map((y) => (
            <circle key={y} cx="104" cy={y} r="1.8" />
          ))}
          <path d="M112 90 h18 v20 q-9 4 -18 0 Z" />
          <path d="M26 178 L43 181 M174 178 L157 181" />
        </>
      );
    case "sweater":
      return (
        <>
          <path d="M66 54 Q100 78 134 54" />
          <path d="M70 57 Q100 73 130 57" />
          <path d="M52 196 L148 196" />
          {Array.from({ length: 19 }, (_, i) => 56 + i * 5).map((x) => (
            <path key={x} d={`M${x} 197 L${x} 205`} opacity="0.6" />
          ))}
          <path d="M21 175 L40 180 M179 175 L160 180" />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M108 78 Q96 112 94 150 M108 78 Q140 110 146 150" />
          <circle cx="108" cy="78" r="4.5" />
          <circle cx="76" cy="106" r="1.6" />
          <circle cx="134" cy="102" r="1.6" />
          <path d="M28 162 Q60 178 110 166" strokeDasharray="2 2.5" />
        </>
      );
    default:
      return null;
  }
}

export function Garment({ kind, tone, stripe, id }: { kind: ArtKind; tone: string; stripe?: string; id: string }) {
  const dark = luminance(tone) < 0.45;
  const outline = mix(tone, INK, 0.45);
  const detail = dark ? mix(tone, CREAM, 0.45) : mix(tone, INK, 0.4);

  if (kind === "bracelet") return <Bracelet tone={tone} stripe={stripe} outline={outline} id={id} />;

  const { body, extra } = SHAPES[kind];
  const vertical = kind === "shirt";
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        {stripe && (
          <pattern
            id={`${id}-stripes`}
            width={vertical ? 7 : 12}
            height={vertical ? 7 : 12}
            patternUnits="userSpaceOnUse"
          >
            {vertical ? <rect width="2.2" height="7" fill={stripe} /> : <rect width="12" height="5" fill={stripe} />}
          </pattern>
        )}
        {kind === "sweater" && (
          <pattern id={`${id}-knit`} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 0 L3 3 L6 0" fill="none" stroke={detail} strokeWidth="0.5" opacity="0.35" />
          </pattern>
        )}
      </defs>
      {extra && <path d={extra} fill={mix(tone, INK, 0.12)} stroke={outline} strokeWidth="1.3" />}
      <path d={body} fill={tone} />
      <g clipPath={`url(#${id}-clip)`}>
        {stripe && <rect x="0" y="0" width="200" height="250" fill={`url(#${id}-stripes)`} />}
        {kind === "sweater" && <rect x="0" y="0" width="200" height="250" fill={`url(#${id}-knit)`} />}
        <rect x="0" y="0" width="200" height="250" fill={`url(#${id}-shade)`} />
      </g>
      <path d={body} fill="none" stroke={outline} strokeWidth="1.3" />
      <g fill="none" stroke={detail} strokeWidth="1.1">
        {details(kind)}
      </g>
    </g>
  );
}

/** Braided cord bracelet with a brushed-gold clasp. `stripe` is the second cord colour. */
function Bracelet({ tone, stripe, outline, id }: { tone: string; stripe?: string; outline: string; id: string }) {
  const beads = Array.from({ length: 34 }, (_, i) => {
    const a = (i / 34) * Math.PI * 2;
    return {
      x: 100 + Math.cos(a) * 66,
      y: 128 + Math.sin(a) * 30,
      rot: (Math.atan2(30 * Math.cos(a), -66 * Math.sin(a)) * 180) / Math.PI,
      front: Math.sin(a) > 0,
      i,
      a,
    };
  }).filter((b) => Math.abs(Math.cos(b.a) - 1) > 0.02 || b.i > 1);
  const draw = (b: (typeof beads)[number]) => (
    <ellipse
      key={b.i}
      cx={b.x.toFixed(2)}
      cy={b.y.toFixed(2)}
      rx="7.5"
      ry="4.6"
      transform={`rotate(${(b.rot + 35).toFixed(1)} ${b.x.toFixed(2)} ${b.y.toFixed(2)})`}
      fill={stripe && b.i % 2 ? stripe : tone}
      stroke={outline}
      strokeWidth="0.9"
      opacity={b.front ? 1 : 0.85}
    />
  );
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3e6c0" />
          <stop offset="0.5" stopColor="#c9ad6e" />
          <stop offset="1" stopColor="#8a6d3b" />
        </linearGradient>
      </defs>
      {beads.filter((b) => !b.front).map(draw)}
      {beads.filter((b) => b.front).map(draw)}
      <rect x="156" y="118" width="20" height="20" rx="4" fill={`url(#${id}-gold)`} stroke="#8a6d3b" strokeWidth="1" />
      <text x="166" y="132.5" textAnchor="middle" fontSize="10" fontFamily="Georgia, serif" fill="#5a4626">
        M
      </text>
    </g>
  );
}
