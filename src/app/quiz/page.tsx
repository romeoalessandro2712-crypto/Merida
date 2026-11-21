import type { Metadata } from "next";
import { QuizClient } from "./QuizClient";

export const metadata: Metadata = { title: "Style quiz" };

export default function QuizPage() {
  return <QuizClient />;
}
