import { QuizResponse } from "@/types/quiz";

interface TopPlacesCardProps {
  responses: QuizResponse;
}

export default function TopPlacesCard({ responses }: TopPlacesCardProps) {
  const places = responses.ondeCurtiu || [];
  const topLugar = responses.topLugar;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Top Lugares</h3>
      {topLugar && (
        <div className="mb-4">
          <div className="bg-gradient-to-r from-summer-yellow to-summer-orange rounded-lg p-4">
            <div className="text-sm text-white/80 mb-1">#1 Lugar</div>
            <div className="text-xl font-bold text-white">{topLugar}</div>
          </div>
        </div>
      )}
      <div className="space-y-2">
        {places.slice(0, 3).map((place, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
          >
            <div className="text-2xl">#{index + 1}</div>
            <div className="font-semibold text-gray-800 capitalize">
              {place.replace("_", " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

