import type { Metadata } from "next";
import { ReturnsClient } from "./ReturnsClient";

export const metadata: Metadata = { title: "Request a return" };

export default function ReturnsPage() {
  return <ReturnsClient />;
}
