"use client";

import { QuizResponse, QuizResult } from "@/types/quiz";

interface ShareableCardProps {
  responses: QuizResponse;
  result: QuizResult;
  reportName?: string;
}

export default function ShareableCard({
  responses,
  result,
  reportName,
}: ShareableCardProps) {
  return (
    <div
      id="shareable-card"
      className="w-[800px] h-[1000px] bg-gradient-to-br from-summer-yellow via-summer-orange to-summer-blue p-12 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🌊</div>
        <div className="absolute top-40 right-20 text-7xl">☀️</div>
        <div className="absolute bottom-40 left-20 text-6xl">🏖️</div>
        <div className="absolute bottom-20 right-10 text-8xl">🌴</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2">🌊 Vem Verão</h1>
          {reportName && (
            <p className="text-2xl text-white/90 font-semibold">{reportName}</p>
          )}
        </div>

        {/* Score */}
        <div className="text-center mb-8">
          <div className="text-9xl font-bold text-white drop-shadow-lg">
            {result.score}
          </div>
          <div className="text-3xl text-white/90 font-semibold">Score do Verão</div>
        </div>

        {/* Archetype */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">{getArchetypeEmoji(result.archetype)}</div>
          <div className="text-3xl font-bold text-white">{result.archetype}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-4xl mb-2">📍</div>
            <div className="text-2xl font-bold text-white">
              {responses.ondeCurtiu?.length || 0}
            </div>
            <div className="text-sm text-white/80">Lugares</div>
          </div>
          <div>
            <div className="text-4xl mb-2">✈️</div>
            <div className="text-2xl font-bold text-white">
              {responses.viajou === true || responses.viajou === "true"
                ? responses.quantidadeDestinos || "0"
                : "0"}
            </div>
            <div className="text-sm text-white/80">Viagens</div>
          </div>
          <div>
            <div className="text-4xl mb-2">💘</div>
            <div className="text-2xl font-bold text-white">
              {responses.numeroDates || "0"}
            </div>
            <div className="text-sm text-white/80">Dates</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {result.badges.length > 0 && (
        <div className="relative z-10 mb-8">
          <div className="text-center text-white/80 text-sm mb-2">Badges</div>
          <div className="flex justify-center gap-3 flex-wrap">
            {result.badges.slice(0, 4).map((badge, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-semibold"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 text-center">
        <div className="text-white/80 text-lg font-semibold">
          vemverao.com.br
        </div>
        <div className="text-white/60 text-sm mt-2">
          Descubra seu verão em vemverao.com.br
        </div>
      </div>
    </div>
  );
}

function getArchetypeEmoji(archetype: string): string {
  const emojis: Record<string, string> = {
    "Veranista Raiz": "🌊",
    "Praieiro Zen": "🧘",
    "Turista Premium": "✈️",
    "Noite Sem Fim": "🌙",
    "Romance de Verão": "💘",
    "Caos Organizado": "🎭",
    "Explorador Urbano": "🗺️",
    "Sossego & Sol": "☀️",
  };
  return emojis[archetype] || "🌊";
}

