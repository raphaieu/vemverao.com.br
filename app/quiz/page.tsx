"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizContainer from "@/components/quiz/QuizContainer";
import { QuizResponse } from "@/types/quiz";

export default function QuizPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (responses: QuizResponse) => {
    if (!session?.user) return;

    setLoading(true);
    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/results/${data.id}`);
      } else {
        console.error("Erro ao submeter quiz");
      }
    } catch (error) {
      console.error("Erro ao submeter quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-summer-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-summer-orange mx-auto"></div>
            <p className="mt-4 text-gray-700">Processando suas respostas...</p>
          </div>
        </div>
      )}
      <QuizContainer onSubmit={handleSubmit} />
    </div>
  );
}

