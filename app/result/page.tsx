'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';
import type { AnalysisResult } from '@/lib/types';
import ResultCard from '@/components/ResultCard';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (!stored) {
      router.replace('/');
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      router.replace('/');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-600">
          <Home size={20} />
        </Link>
        <h1 className="font-bold text-gray-800">나의 인상 캐릭터</h1>
        <div className="w-9" />
      </header>

      <div className="flex-1 px-4 py-6 space-y-5">
        {/* 결과 카드 */}
        <ResultCard result={result} />

        {/* 결과 근거 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="font-semibold text-sm text-gray-700 mb-3">🔍 결과가 나온 이유</p>
          <p className="text-sm text-gray-600 leading-relaxed">{result.reason}</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 leading-relaxed">
              ※ 본 결과는 사진 속 인상을 바탕으로 한 엔터테인먼트 콘텐츠이며, 실제 성격이나
              능력을 판단하는 자료가 아닙니다.
            </p>
          </div>
        </div>

        {/* 다시 분석 */}
        <button
          onClick={() => {
            sessionStorage.removeItem('analysisResult');
            router.push('/upload');
          }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-2 border-violet-300 text-violet-600 font-bold text-sm hover:bg-violet-50 transition-colors active:scale-95"
        >
          <RotateCcw size={16} />
          다른 사진으로 다시 분석하기
        </button>

        <Link href="/" className="block text-center text-sm text-gray-400 pb-4">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
