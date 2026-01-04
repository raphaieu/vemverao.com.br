"use client";

import { useEffect, useState } from "react";
import { QuizResponse, QuizResult } from "@/types/quiz";
import ScoreCard from "./ScoreCard";
import ArchetypeCard from "./ArchetypeCard";
import BadgesCard from "./BadgesCard";
import StatsCard from "./StatsCard";
import TopPlacesCard from "./TopPlacesCard";

interface DashboardContainerProps {
  quizResponseId: string;
  initialData: {
    responses: QuizResponse;
    result: QuizResult;
  };
}

export default function DashboardContainer({
  quizResponseId,
  initialData,
}: DashboardContainerProps) {
  const [aiTexts, setAiTexts] = useState<{
    summary?: string;
    advice?: string;
    caption?: string;
    reportName?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAITexts();
  }, [quizResponseId]);

  const loadAITexts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizResponseId }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiTexts(data);
      }
    } catch (error) {
      console.error("Erro ao carregar textos da IA:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold mb-2">🌊 Seu Verão Wrapped</h1>
          {aiTexts.reportName && (
            <p className="text-2xl font-semibold">{aiTexts.reportName}</p>
          )}
        </div>

        {/* Score and Archetype */}
        <div className="grid md:grid-cols-2 gap-6">
          <ScoreCard score={initialData.result.score} />
          <ArchetypeCard archetype={initialData.result.archetype} />
        </div>

        {/* Stats and Places */}
        <div className="grid md:grid-cols-2 gap-6">
          <StatsCard responses={initialData.responses} />
          <TopPlacesCard responses={initialData.responses} />
        </div>

        {/* Badges */}
        <BadgesCard badges={initialData.result.badges} />

        {/* AI Generated Content */}
        {aiTexts.summary && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Resumo do Verão
            </h3>
            <p className="text-gray-700 text-lg">{aiTexts.summary}</p>
          </div>
        )}

        {aiTexts.advice && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Conselhos para o Próximo Verão
            </h3>
            <div className="space-y-2">
              {aiTexts.advice.split("\n").map((line, index) => (
                <p key={index} className="text-gray-700">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Compartilhe seu Verão!
          </h3>
          <div className="space-y-4">
            <a
              href={`/results/${quizResponseId}/share`}
              className="inline-block bg-summer-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg"
            >
              📥 Gerar Imagem Compartilhável
            </a>
            {aiTexts.caption && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Legenda pronta:</p>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-gray-700">{aiTexts.caption}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(aiTexts.caption || "")}
                    className="mt-2 text-summer-orange hover:underline text-sm"
                  >
                    Copiar legenda
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

