'use client';

import Link from 'next/link';
import { Camera, Shield, Share2, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white px-6 pt-16 pb-12 text-center">
        <div className="text-5xl mb-4">🔮</div>
        <h1 className="text-3xl font-bold mb-2">관상톡</h1>
        <p className="text-violet-200 text-sm mb-8">사진 속 인상으로 나의 캐릭터 찾기</p>

        <Link
          href="/upload"
          className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform"
        >
          <Camera size={20} />
          지금 시작하기
        </Link>

        <p className="mt-6 text-xs text-violet-300">
          회원가입 없이 바로 체험 가능 · 분석 후 사진 자동 삭제
        </p>
      </div>

      {/* 특징 카드 */}
      <div className="px-4 py-8 space-y-3">
        <FeatureCard
          icon={<Sparkles size={20} className="text-violet-500" />}
          title="사진 한 장으로 간단하게"
          description="얼굴의 분위기, 표정, 인상을 바탕으로 나만의 인상 캐릭터를 확인해보세요."
        />
        <FeatureCard
          icon={<Share2 size={20} className="text-violet-500" />}
          title="공유하기 좋은 결과 카드"
          description="카카오톡, 인스타그램에 바로 공유할 수 있는 결과 카드를 제공합니다."
        />
        <FeatureCard
          icon={<Shield size={20} className="text-violet-500" />}
          title="개인정보 안전하게 보호"
          description="분석이 완료된 후 사진은 즉시 삭제됩니다. 저장하지 않습니다."
        />
      </div>

      {/* 인상 유형 미리보기 */}
      <div className="px-4 pb-8">
        <p className="text-center text-sm text-gray-500 mb-4">8가지 인상 유형 중 당신은?</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: '🌸', label: '조율가형' },
            { emoji: '🎯', label: '전략가형' },
            { emoji: '☀️', label: '메이커형' },
            { emoji: '🔭', label: '관찰자형' },
            { emoji: '⚡', label: '실행가형' },
            { emoji: '🌿', label: '보호자형' },
            { emoji: '🎨', label: '크리에이터형' },
            { emoji: '🏔️', label: '리더형' },
          ].map((type) => (
            <div
              key={type.label}
              className="bg-white rounded-xl p-2 text-center shadow-sm border border-gray-100"
            >
              <div className="text-xl mb-1">{type.emoji}</div>
              <p className="text-xs text-gray-600 leading-tight">{type.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div className="mx-4 mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs text-amber-700 leading-relaxed text-center">
          ⚠️ 본 서비스는 <strong>엔터테인먼트 목적</strong>의 인상 해석 콘텐츠입니다.
          <br />
          실제 성격, 능력, 운명 등을 판단하지 않습니다.
        </p>
      </div>

      {/* 하단 링크 */}
      <div className="mt-auto pb-8 text-center">
        <Link href="/privacy" className="text-xs text-gray-400 underline">
          개인정보 처리방침
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-sm text-gray-800 mb-0.5">{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
