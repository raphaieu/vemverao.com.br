interface ScoreCardProps {
  score: number;
}

export default function ScoreCard({ score }: ScoreCardProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Incrível!";
    if (score >= 60) return "Muito bom!";
    if (score >= 40) return "Bom!";
    return "Tranquilo!";
  };

  return (
    <div className="bg-gradient-to-br from-summer-yellow to-summer-orange rounded-2xl p-8 text-center shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-4">Score do Verão</h3>
      <div className={`text-8xl font-bold ${getScoreColor()} mb-2`}>
        {score}
      </div>
      <div className="text-3xl font-semibold text-white">{getScoreLabel()}</div>
      <div className="mt-4 w-full bg-white/30 rounded-full h-4">
        <div
          className="bg-white h-4 rounded-full transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

