import { forwardRef } from 'react';
import type { AnalysisResult } from '@/lib/types';
import { IMPRESSION_TYPES } from '@/lib/impression-types';

interface ResultCardProps {
  result: AnalysisResult;
  forShare?: boolean;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(function ResultCard(
  { result, forShare = false },
  ref
) {
  const typeData = IMPRESSION_TYPES[result.type];

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br ${typeData.bgGradient} rounded-3xl p-6 ${forShare ? 'w-[360px]' : 'w-full'}`}
    >
      {/* 헤더 */}
      <div className="text-center mb-5">
        <div className="text-4xl mb-2">{typeData.emoji}</div>
        <h2 className={`text-xl font-bold ${typeData.color} mb-1`}>{result.type}</h2>
        <p className="text-gray-600 text-sm">{result.summary}</p>
      </div>

      {/* 키워드 */}
      <div className="flex justify-center gap-2 mb-5 flex-wrap">
        {result.keywords.map((kw) => (
          <span
            key={kw}
            className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/70 ${typeData.color} border border-current/20`}
          >
            # {kw}
          </span>
        ))}
      </div>

      {/* 상세 섹션 */}
      <div className="space-y-3">
        <DetailRow emoji="✨" label="강점 이미지" text={result.strength} />
        <DetailRow emoji="🤝" label="대인관계 인상" text={result.relationship} />
        <DetailRow emoji="💼" label="일할 때 이미지" text={result.workStyle} />
        <DetailRow emoji="💡" label="주의하면 좋은 점" text={result.advice} />
      </div>

      {/* 워터마크 */}
      <div className="mt-5 text-center">
        <p className="text-xs text-gray-400">🔮 관상톡</p>
      </div>
    </div>
  );
});

function DetailRow({ emoji, label, text }: { emoji: string; label: string; text: string }) {
  return (
    <div className="bg-white/60 rounded-2xl px-4 py-3">
      <p className="text-xs text-gray-500 mb-1">
        {emoji} {label}
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

export default ResultCard;
