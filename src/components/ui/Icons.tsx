import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);
export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" {...base} fill={filled ? "currentColor" : "none"} {...p}>
    <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8.1a4.3 4.3 0 0 1 7.5 2.4c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);
export const BagIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...base} {...p}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
);
export const ChevronIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...base} {...p}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);
export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" fill="currentColor" {...p}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.5 1.2 6.4L12 17.3l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
  </svg>
);
export const FilterIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true" {...base} {...p}>
    <path d="M4 6h16M7 12h10m-7 6h4" />
  </svg>
);
