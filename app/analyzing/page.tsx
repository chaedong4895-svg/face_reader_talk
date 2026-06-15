'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MESSAGES = [
  '사진 속 인상 요소를 살펴보고 있습니다...',
  '얼굴의 분위기와 표정을 분석합니다...',
  '전체적인 이미지 톤을 파악하고 있습니다...',
  '결과 유형을 선택하고 있습니다...',
  '맞춤 결과를 생성하고 있습니다...',
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  useEffect(() => {
    const imageData = sessionStorage.getItem('uploadedImageData');
    const mimeType = sessionStorage.getItem('uploadedImageMime');

    if (!imageData || !mimeType) {
      router.replace('/upload');
      return;
    }

    let cancelled = false;

    async function analyze() {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageData, mimeType }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || '분석 실패');
        }

        const result = await res.json();
        if (cancelled) return;

        sessionStorage.setItem('analysisResult', JSON.stringify(result));
        sessionStorage.removeItem('uploadedImageData');
        sessionStorage.removeItem('uploadedImageMime');
        router.push('/result');
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : '알 수 없는 오류';
        sessionStorage.setItem('analysisError', msg);
        router.push('/upload');
      }
    }

    analyze();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 items-center justify-center text-white px-6">
      {/* 애니메이션 원 */}
      <div className="relative mb-10">
        <div className="w-28 h-28 rounded-full border-4 border-white/20 absolute inset-0 animate-ping" />
        <div className="w-28 h-28 rounded-full border-4 border-white/40 absolute inset-0 animate-ping [animation-delay:0.5s]" />
        <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center relative">
          <span className="text-5xl">🔮</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">인상 분석 중{dots}</h2>
      <p className="text-violet-200 text-sm text-center leading-relaxed min-h-[3rem] transition-all">
        {MESSAGES[messageIndex]}
      </p>

      <div className="mt-10 flex gap-1.5">
        {MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === messageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      <p className="mt-10 text-xs text-violet-300">
        분석 후 사진은 즉시 삭제됩니다
      </p>
    </div>
  );
}
