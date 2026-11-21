/** Prefix a /public file path with the deploy base path (needed on GitHub Pages). */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
