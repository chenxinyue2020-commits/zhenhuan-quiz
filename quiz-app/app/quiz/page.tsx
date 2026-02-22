"use client";

import QuizContainer from "@/components/Quiz/QuizContainer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          甄嬛传 · 台词宫闱问答
        </h1>
        <p className="text-gray-700">
          每题给出一句《甄嬛传》经典台词，你需要在三位候选主子中，选出真正说出这句话的人。
        </p>
      </div>
      <QuizContainer sessionId={sessionId} />
    </div>
  );
}
