/** Slowly drifting coloured light behind dark sections. Purely decorative. */
export function Aurora({ variant = "navy" }: { variant?: "navy" | "chocolate" }) {
  const a = variant === "navy" ? "rgba(184,155,94,0.38)" : "rgba(184,155,94,0.32)";
  const b = variant === "navy" ? "rgba(70,98,150,0.45)" : "rgba(107,112,92,0.35)";
  const c = variant === "navy" ? "rgba(74,51,38,0.55)" : "rgba(27,42,68,0.55)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob aurora-a left-[55%] top-[5%] h-[55vmax] w-[55vmax]" style={{ background: a }} />
      <div className="aurora-blob aurora-b -left-[15%] top-[40%] h-[50vmax] w-[50vmax]" style={{ background: b }} />
      <div className="aurora-blob aurora-a left-[20%] -top-[30%] h-[40vmax] w-[40vmax]" style={{ background: c }} />
    </div>
  );
}
