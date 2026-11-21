/**
 * Sends a small 3D "garment tag" from the clicked element to the cart icon,
 * then gives the cart icon a little bounce.
 */
export function flyToCart(source: Element | null | undefined, hex: string) {
  if (typeof window === "undefined") return;
  const target = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!target) return;

  const bump = () =>
    target.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.3) rotate(-8deg)" }, { transform: "scale(1)" }],
      { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!source || reduced) {
    bump();
    return;
  }

  const a = source.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  const dx = b.left + b.width / 2 - ax;
  const dy = b.top + b.height / 2 - ay;

  const tag = document.createElement("div");
  Object.assign(tag.style, {
    position: "fixed",
    left: `${ax}px`,
    top: `${ay}px`,
    width: "56px",
    height: "70px",
    marginLeft: "-28px",
    marginTop: "-35px",
    background: `linear-gradient(160deg, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%), ${hex}`,
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 18px 40px -12px rgba(27,42,68,0.45)",
    zIndex: "80",
    pointerEvents: "none",
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(tag);

  const anim = tag.animate(
    [
      { transform: "perspective(600px) translate(0, 0) rotateY(0deg) scale(1)", opacity: 1 },
      { transform: `perspective(600px) translate(${dx * 0.5}px, ${dy * 0.5 - 140}px) rotateY(200deg) scale(0.75)`, opacity: 1, offset: 0.5 },
      { transform: `perspective(600px) translate(${dx}px, ${dy}px) rotateY(360deg) scale(0.15)`, opacity: 0.4 },
    ],
    { duration: 850, easing: "cubic-bezier(0.5, 0, 0.3, 1)" },
  );
  anim.onfinish = () => {
    tag.remove();
    bump();
  };
}
