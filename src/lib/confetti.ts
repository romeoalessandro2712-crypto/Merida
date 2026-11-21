/** Small gold confetti burst from a point. Decorative; skipped with reduced motion. */
export function confetti(x: number, y: number, count = 46) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#b89b5e", "#d9c28f", "#1b2a44", "#f7f3ec", "#6b705c"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const size = 5 + Math.random() * 6;
    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size * (Math.random() > 0.5 ? 0.4 : 1)}px`,
      background: colors[i % colors.length],
      zIndex: "100",
      pointerEvents: "none",
      borderRadius: Math.random() > 0.6 ? "999px" : "1px",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 120;
    el.animate(
      [
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 260}px)) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
    ).onfinish = () => el.remove();
  }
}
