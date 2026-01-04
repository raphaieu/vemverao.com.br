import { QuizResponse } from "@/types/quiz";

interface StatsCardProps {
  responses: QuizResponse;
}

export default function StatsCard({ responses }: StatsCardProps) {
  const stats = [
    {
      label: "Lugares Visitados",
      value: responses.ondeCurtiu?.length || 0,
      icon: "📍",
    },
    {
      label: "Viagens",
      value:
        responses.viajou === true || responses.viajou === "true"
          ? responses.quantidadeDestinos || "0"
          : "0",
      icon: "✈️",
    },
    {
      label: "Dates",
      value: responses.numeroDates || "0",
      icon: "💘",
    },
    {
      label: "Saídas/Semana",
      value: responses.frequenciaSaidas || "0-1",
      icon: "🎉",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Estatísticas</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-summer-light to-white rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-summer-orange mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

