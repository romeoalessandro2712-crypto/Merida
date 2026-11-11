import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessClient />
    </Suspense>
  );
}
