"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT, useUI } from "@/lib/providers";
import { REWARD_HOURS, drawPrize, formatCountdown, playedStore, rewardStore, useReward, type Reward } from "@/lib/engagement";
import { confetti } from "@/lib/confetti";
import { pct } from "@/lib/pricing";
import { ModalShell } from "@/components/ui/ModalShell";
import { ButtonLink } from "@/components/ui/Button";
import { CrestMedallion } from "@/components/brand/CrestMedallion";

const DISMISS_KEY = "meridia:scratch-dismissed";
const BRUSH = 24;
const REVEAL_AT = 0.45;

/** Opens the scratch card automatically once, a few seconds into the first visit. */
export function ScratchAutoOpen() {
  const { openModal } = useUI();
  const { played } = useReward();
  const pathname = usePathname();

  useEffect(() => {
    if (played || pathname.startsWith("/checkout")) return;
    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const id = window.setTimeout(() => openModal("scratch"), 4500);
    return () => window.clearTimeout(id);
  }, [played, pathname, openModal]);

  return null;
}

export function ScratchModal() {
  const { modal, closeModal } = useUI();
  const { t } = useT();
  if (modal !== "scratch") return null;
  const close = () => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    closeModal();
  };
  return (
    <ModalShell labelledBy="scratch-title" onClose={close} closeLabel={t.scratch.close}>
      <ScratchDialog onDone={close} />
    </ModalShell>
  );
}

function ScratchDialog({ onDone }: { onDone: () => void }) {
  const { t } = useT();
  const { reward, active, now } = useReward();
  // Re-opening after a win shows the same prize; otherwise draw a fresh one for this card.
  const [prize] = useState<Omit<Reward, "expiresAt">>(() => (active && reward ? reward : drawPrize()));
  const [revealed, setRevealed] = useState(Boolean(active));
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);

  const finish = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    rewardStore.set({ ...prize, expiresAt: Date.now() + REWARD_HOURS * 3600 * 1000 });
    playedStore.set(true);
    const r = canvasRef.current?.getBoundingClientRect();
    if (r) confetti(r.left + r.width / 2, r.top + r.height / 2);
  }, [prize, revealed]);

  // Paint the gold foil.
  useEffect(() => {
    if (revealed) return;
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth;
    const h = c.clientHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#8a6d3b");
    g.addColorStop(0.3, "#d9c28f");
    g.addColorStop(0.5, "#f3e6c0");
    g.addColorStop(0.7, "#c9ad6e");
    g.addColorStop(1, "#8a6d3b");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 9) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(30,23,18,0.72)";
    ctx.font = "600 14px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t.scratch.foil.split("").join(" "), w / 2, h / 2 + 5);
    ctx.globalCompositeOperation = "destination-out";
  }, [revealed, t.scratch.foil]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function scratch(p: { x: number; y: number }) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    const from = last.current ?? p;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x, p.y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    last.current = p;
    if (++moves.current % 6 === 0) checkCleared();
  }

  function checkCleared() {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if (data[i] < 128) clear++;
    }
    if (clear / total >= REVEAL_AT) finish();
  }

  const remaining = active && reward && now ? reward.expiresAt - now : REWARD_HOURS * 3600 * 1000;

  return (
    <>
      <CrestMedallion size="sm" />
      <p className="label mt-6 text-taupe">{t.scratch.label}</p>
      <h2 id="scratch-title" className="mt-2 font-serif text-3xl font-medium leading-tight text-navy sm:text-4xl">
        {t.scratch.title}
      </h2>
      <p className="mt-2 text-sm text-charcoal/75">{t.scratch.subtitle}</p>

      <div className="relative mx-auto mt-6 aspect-[16/9] w-full max-w-[340px] select-none overflow-hidden border border-gold">
        {/* Prize underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-deep text-cream">
          <span className="label text-gold-light">{t.scratch.won}</span>
          <span className="font-serif text-6xl font-medium leading-none text-cream">-{pct(prize.rate)}</span>
          <span className="mt-1 text-xs text-cream/70">{t.scratch.off}</span>
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full cursor-grab touch-none active:cursor-grabbing"
            onPointerDown={(e) => {
              drawing.current = true;
              last.current = null;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(point(e));
            }}
            onPointerMove={(e) => {
              if (drawing.current) scratch(point(e));
            }}
            onPointerUp={() => {
              drawing.current = false;
              last.current = null;
              checkCleared();
            }}
            onPointerCancel={() => {
              drawing.current = false;
            }}
          />
        )}
      </div>

      {!revealed ? (
        <button type="button" onClick={finish} className="label mt-4 text-taupe underline-offset-4 hover:text-navy hover:underline">
          {t.scratch.reveal}
        </button>
      ) : (
        <div className="animate-fade-up">
          <p className="label mt-6 text-taupe">{t.scratch.code}</p>
          <div className="mt-2 flex items-stretch border border-dashed border-navy/50">
            <span className="flex flex-1 items-center justify-center font-serif text-2xl tracking-[0.2em] text-navy">{prize.code}</span>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(prize.code);
                } catch {
                  /* code is visible anyway */
                }
                setCopied(true);
              }}
              className="label border-l border-dashed border-navy/50 px-4 py-3 text-navy hover:bg-ecru"
              aria-live="polite"
            >
              {copied ? t.scratch.copied : t.scratch.copy}
            </button>
          </div>
          <p className="mt-3 text-xs text-olive">
            {t.scratch.validity}
            {active && ` · ${t.scratch.expires} ${formatCountdown(remaining)}`}
          </p>
          <p className="mt-1 text-[0.7rem] text-taupe">{t.scratch.note}</p>
          <ButtonLink href="/shop" size="lg" className="mt-6 w-full" onClick={onDone}>
            {t.scratch.cta}
          </ButtonLink>
        </div>
      )}
      {!revealed && (
        <button type="button" onClick={onDone} className="label mt-5 block w-full text-[0.62rem] text-taupe hover:text-navy">
          {t.scratch.later}
        </button>
      )}
    </>
  );
}
