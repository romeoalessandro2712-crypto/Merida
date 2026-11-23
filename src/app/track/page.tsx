import type { Metadata } from "next";
import { Suspense } from "react";
import { TrackClient } from "./TrackClient";

export const metadata: Metadata = { title: "Track your order" };

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackClient />
    </Suspense>
  );
}
