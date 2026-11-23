"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { getLenis } from "@/lib/smooth-scroll";

type Phase = "idle" | "cover" | "reveal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Smooth page-to-page relocation: an internal link click raises a navy curtain with the
 * crest, the new page loads behind it, then the curtain lifts away.
 * Links (or ancestors) marked `data-no-transition` are skipped.
 */
export function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<number[]>([]);

  const set = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      if (a.closest("[data-no-transition]")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (phaseRef.current === "cover") {
        e.preventDefault();
        return;
      }

      e.preventDefault(); // stop next/link; we navigate once the curtain is down
      let path = url.pathname;
      if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || "/";
      set("cover");
      later(() => router.push(path + url.search + url.hash, { scroll: true }), 380);
      // Safety net: never leave the curtain down.
      later(() => {
        if (phaseRef.current === "cover") set("reveal");
      }, 3500);
    }

    document.addEventListener("click", onClick, true);
    const pending = timers.current;
    return () => {
      document.removeEventListener("click", onClick, true);
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, [router]);

  // Arrived on the new page: jump to top behind the curtain, then lift it.
  useEffect(() => {
    if (phaseRef.current !== "cover") return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => {
      set("reveal");
      timers.current.push(window.setTimeout(() => set("idle"), 600));
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div aria-hidden="true" className="route-curtain" data-phase={phase}>
      <div className="curtain-inner flex flex-col items-center gap-5 text-cream">
        <Image
          src={asset("/brand/meridia-crest-600.jpg")}
          alt=""
          width={96}
          height={96}
          className="h-20 w-20 rounded-full object-cover ring-1 ring-gold ring-offset-4 ring-offset-navy-deep"
        />
        <span className="h-px w-24 bg-gold" />
        <span className="font-serif text-xl tracking-[0.32em]">MERIDIA</span>
      </div>
    </div>
  );
}
