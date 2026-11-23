/**
 * Fashion-illustration figure (faceless croquis) that wears MERIDIA pieces.
 * Drawn in a 200×440 box: head ~y44, shoulders ~y86, hips ~y200, feet ~y415.
 */
import { luminance, mix } from "./garments";

export interface Outfit {
  top: { kind: "polo" | "shirt" | "sweater"; tone: string; stripe?: string };
  /** Sweater knotted over the shoulders */
  draped?: { tone: string };
  cap?: { tone: string };
  bracelet?: { tone: string; stripe?: string };
  trousers: string;
  skin: string;
  hair: string;
}

export const SKINS = ["#e9c6a8", "#c89670", "#8a5a3c", "#f1d4bb"];
export const HAIRS = ["#3b2a20", "#1f1a17", "#5e4027", "#2a211b"];

const INK: [number, number, number] = [24, 22, 20];
const CREAM: [number, number, number] = [247, 243, 236];

const TORSO = "M80 80 Q100 88 120 80 L134 88 L132 200 Q100 207 68 200 L66 88 Z";
const SHORT_SLEEVES = ["M66 88 L57 128 L72 132 L78 102 Z", "M134 88 L143 128 L128 132 L122 102 Z"];
const LONG_SLEEVES = ["M66 88 L51 206 L64 208 L78 102 Z", "M134 88 L149 206 L136 208 L122 102 Z"];

/** Hotspot anchor points in figure coordinates, used by the lookbook. */
export const ANCHORS = {
  top: { x: 100, y: 150 },
  draped: { x: 100, y: 96 },
  cap: { x: 100, y: 26 },
  bracelet: { x: 57, y: 211 },
} as const;

/** Viewboxes for the different "shots". All keep a 4:5 ratio. */
export const SHOTS = {
  full: "-76 -6 352 440",
  upper: "-12 58 224 280",
  head: "44 -2 112 140",
  wrist: "17 166 80 100",
} as const;
export type Shot = keyof typeof SHOTS;

export function Figure({ outfit, id }: { outfit: Outfit; id: string }) {
  const { top } = outfit;
  const outline = mix(top.tone, INK, 0.45);
  const detail = luminance(top.tone) < 0.45 ? mix(top.tone, CREAM, 0.45) : mix(top.tone, INK, 0.4);
  const skinShade = mix(outfit.skin, INK, 0.25);
  const sleeves = top.kind === "polo" ? SHORT_SLEEVES : LONG_SLEEVES;
  const vertical = top.kind === "shirt";

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <clipPath id={`${id}-topclip`}>
          <path d={TORSO} />
          {sleeves.map((d) => (
            <path key={d} d={d} />
          ))}
        </clipPath>
        <linearGradient id={`${id}-fshade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        {top.stripe && (
          <pattern id={`${id}-fstripes`} width={vertical ? 5 : 9} height={vertical ? 5 : 9} patternUnits="userSpaceOnUse">
            {vertical ? <rect width="1.6" height="5" fill={top.stripe} /> : <rect width="9" height="3.6" fill={top.stripe} />}
          </pattern>
        )}
      </defs>

      {/* Floor shadow */}
      <ellipse cx="100" cy="418" rx="58" ry="6" fill="#3a2c20" opacity="0.14" />

      {/* Legs / trousers */}
      <path d="M71 196 L129 196 L132 408 L107 408 L100 252 L93 408 L68 408 Z" fill={outfit.trousers} stroke={mix(outfit.trousers, INK, 0.4)} strokeWidth="1.1" />
      <path d="M85 214 L83 404 M115 214 L117 404" stroke={mix(outfit.trousers, INK, 0.25)} strokeWidth="0.7" opacity="0.6" fill="none" />
      {/* Loafers */}
      <ellipse cx="80" cy="413" rx="15" ry="5.5" fill="#4a3326" />
      <ellipse cx="120" cy="413" rx="15" ry="5.5" fill="#4a3326" />

      {/* Arms (skin) + hands */}
      <path d="M66 90 L52 214 L62 215 L77 102 Z M134 90 L148 214 L138 215 L123 102 Z" fill={outfit.skin} stroke={skinShade} strokeWidth="0.8" />
      <path d="M52 214 Q50 226 55 230 Q61 230 62 215 Z" fill={outfit.skin} stroke={skinShade} strokeWidth="0.8" />
      <path d="M148 214 Q150 226 145 230 Q139 230 138 215 Z" fill={outfit.skin} stroke={skinShade} strokeWidth="0.8" />

      {/* Neck + head */}
      <path d="M93.5 62 L93.5 84 L106.5 84 L106.5 62 Z" fill={outfit.skin} stroke={skinShade} strokeWidth="0.8" />
      <ellipse cx="100" cy="46" rx="15.5" ry="19.5" fill={outfit.skin} stroke={skinShade} strokeWidth="0.8" />
      {!outfit.cap && <path d="M84.5 46 Q83 22 100 24 Q118 22 115.5 46 Q114 33 100 32.5 Q87 33 84.5 46 Z" fill={outfit.hair} />}

      {/* Top */}
      <path d={TORSO} fill={top.tone} />
      {sleeves.map((d) => (
        <path key={d} d={d} fill={top.tone} />
      ))}
      <g clipPath={`url(#${id}-topclip)`}>
        {top.stripe && <rect x="0" y="0" width="200" height="440" fill={`url(#${id}-fstripes)`} />}
        <rect x="0" y="0" width="200" height="440" fill={`url(#${id}-fshade)`} />
      </g>
      <g fill="none" stroke={outline} strokeWidth="1.1">
        <path d={TORSO} />
        {sleeves.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" stroke={detail} strokeWidth="0.9">
        {top.kind === "polo" && (
          <>
            <path d="M88 82 L94 96 L100 88 L106 96 L112 82" />
            <path d="M97 88 L97 110 L103 110 L103 88" />
            <path d="M59 124 L72 128 M141 124 L128 128" />
          </>
        )}
        {top.kind === "shirt" && (
          <>
            <path d="M88 81 L93 98 L100 88 L107 98 L112 81" />
            <path d="M100 88 L100 204" />
            <path d="M52 198 L64 200 M148 198 L136 200" />
            <path d="M108 112 h12 v14 q-6 3 -12 0 Z" />
          </>
        )}
        {top.kind === "sweater" && (
          <>
            <path d="M84 82 Q100 96 116 82" />
            <path d="M69 192 L131 192" />
            <path d="M52 198 L64 200 M148 198 L136 200" />
          </>
        )}
      </g>

      {/* Sweater knotted over the shoulders */}
      {outfit.draped && (
        <g stroke={mix(outfit.draped.tone, INK, 0.4)} strokeWidth="1" fill={outfit.draped.tone}>
          <path d="M66 86 Q100 104 134 86 L136 98 Q100 118 64 98 Z" />
          <path d="M96 106 L88 138 L96 140 L102 110 Z" />
          <path d="M104 106 L112 138 L104 140 L98 110 Z" />
          <circle cx="100" cy="108" r="5" />
        </g>
      )}

      {/* Cap */}
      {outfit.cap && (
        <g stroke={mix(outfit.cap.tone, INK, 0.45)} strokeWidth="1">
          <path d="M84.5 40 Q85 19 101 19 Q117 20 116.5 40 Z" fill={outfit.cap.tone} />
          <path d="M84.5 40 Q71 41 68 48 Q88 51 104 44 Q98 41 84.5 40 Z" fill={mix(outfit.cap.tone, INK, 0.12)} />
          <path d="M101 19 Q96 29 95 40 M101 19 Q109 29 110 40" fill="none" opacity="0.6" />
          <circle cx="101" cy="19" r="1.8" fill={outfit.cap.tone} />
        </g>
      )}

      {/* Bracelet on the left wrist */}
      {outfit.bracelet && (
        <g>
          <ellipse
            cx="57"
            cy="211.5"
            rx="7"
            ry="2.8"
            fill="none"
            stroke={outfit.bracelet.tone}
            strokeWidth="2.6"
            strokeDasharray={outfit.bracelet.stripe ? "2 1.4" : undefined}
          />
          {outfit.bracelet.stripe && <ellipse cx="57" cy="211.5" rx="7" ry="2.8" fill="none" stroke={outfit.bracelet.stripe} strokeWidth="2.6" strokeDasharray="1.4 2" strokeDashoffset="2" />}
          <rect x="61" y="209.1" width="4" height="4.4" rx="0.8" fill="#c9ad6e" stroke="#8a6d3b" strokeWidth="0.5" />
        </g>
      )}
    </g>
  );
}
