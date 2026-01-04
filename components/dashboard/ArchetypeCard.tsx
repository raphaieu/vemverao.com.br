interface ArchetypeCardProps {
  archetype: string;
}

const archetypeEmojis: Record<string, string> = {
  "Veranista Raiz": "🌊",
  "Praieiro Zen": "🧘",
  "Turista Premium": "✈️",
  "Noite Sem Fim": "🌙",
  "Romance de Verão": "💘",
  "Caos Organizado": "🎭",
  "Explorador Urbano": "🗺️",
  "Sossego & Sol": "☀️",
};

export default function ArchetypeCard({ archetype }: ArchetypeCardProps) {
  const emoji = archetypeEmojis[archetype] || "🌊";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Seu Arquétipo</h3>
      <p className="text-2xl font-bold text-summer-orange">{archetype}</p>
    </div>
  );
}

