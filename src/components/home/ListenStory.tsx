"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/providers";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/format";

/** The exact narration script (also shown as a transcript for accessibility). */
const TRANSCRIPT =
  "MERIDIA nasce da un'idea semplice: vestirsi bene non dovrebbe richiedere sforzo, né rumore. Disegniamo cinque pezzi essenziali, in fibre naturali: una polo a righe, una camicia di lino, una maglia leggera, un cappello di cotone e un bracciale intrecciato a mano. Non seguiamo le stagioni della moda, ma quelle della vita: una mattina al porto, un pranzo in terrazza, il tramonto sul lungomare. Comprare meno. Scegliere meglio. Indossare a lungo. Questa è MERIDIA.";

/** Narrated brand story (ElevenLabs voice "Luca"). Never autoplays. */
export function ListenStory() {
  const { t } = useT();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("pause", () => setPlaying(false));
    a.addEventListener("play", () => setPlaying(true));
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }

  return (
    <div className="mt-9">
      <audio ref={audioRef} src={asset("/audio/meridia-story-it.mp3")} preload="none" />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.listen.pause : t.listen.play}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold text-gold-light transition-colors hover:bg-gold hover:text-navy-deep"
        >
          {playing && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-gold/50" />}
          {playing ? (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="label text-cream">{t.listen.play}</p>
          <div className="mt-2 flex items-end gap-[3px]" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <span
                key={i}
                className={cn("w-[3px] rounded-full transition-colors duration-300", i / 32 < progress ? "bg-gold" : "bg-cream/25")}
                style={{ height: `${6 + Math.round(Math.abs(Math.sin(i * 1.7)) * 16)}px` }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[0.68rem] text-cream/60">
            {t.listen.note} ·{" "}
            <button type="button" onClick={() => setShowText((v) => !v)} aria-expanded={showText} className="underline underline-offset-2 hover:text-cream">
              {t.listen.transcript}
            </button>
          </p>
        </div>
      </div>
      {showText && <p className="mt-4 border-l border-gold/50 pl-4 font-serif text-base italic leading-relaxed text-cream/80">{TRANSCRIPT}</p>}
    </div>
  );
}
