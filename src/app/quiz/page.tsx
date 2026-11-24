import type { Metadata } from "next";
import { QuizClient } from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz di stile",
  description: "Tre domande e ti proponiamo un look MERIDIA completo, già scontato del 15%.",
};

export default function QuizPage() {
  return <QuizClient />;
}
