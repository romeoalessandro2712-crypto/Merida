/** Re-mounts on every navigation, so each page enters with the 3D transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
