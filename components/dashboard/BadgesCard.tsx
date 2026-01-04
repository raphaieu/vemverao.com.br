interface BadgesCardProps {
  badges: string[];
}

export default function BadgesCard({ badges }: BadgesCardProps) {
  if (badges.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Badges</h3>
        <p className="text-gray-500">Nenhum badge conquistado ainda</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Badges Conquistados</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-summer-yellow to-summer-orange rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-2">{badge.split(" ")[0]}</div>
            <div className="text-sm font-semibold text-white">
              {badge.substring(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

