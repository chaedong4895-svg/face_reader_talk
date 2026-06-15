'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Link, MessageCircle, Check } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
import type { AnalysisResult } from '@/lib/types';
import { IMPRESSION_TYPES } from '@/lib/impression-types';
import ResultCard from './ResultCard';

interface ShareButtonsProps {
  result: AnalysisResult;
}

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const captureCard = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
  };

  const handleDownload = async () => {
    setSaving(true);
    try {
      const blob = await captureCard();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `관상톡_${result.type}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('링크 복사가 지원되지 않는 환경입니다.');
    }
  };

  const handleKakao = async () => {
    const kakaKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    const typeData = IMPRESSION_TYPES[result.type];

    if (kakaKey && typeof window !== 'undefined' && (window as unknown as { Kakao?: { isInitialized: () => boolean; Share: { sendDefault: (opts: unknown) => void } } }).Kakao) {
      const Kakao = (window as unknown as { Kakao: { isInitialized: () => boolean; Share: { sendDefault: (opts: unknown) => void } } }).Kakao;
      if (!Kakao.isInitialized()) return;
      Kakao.Share.sendDefault({
        objectType: 'text',
        text: `${typeData.emoji} 나의 인상 캐릭터는 "${result.type}"!\n${result.summary}\n\n관상톡에서 확인해보세요 🔮`,
        link: { mobileWebUrl: window.location.origin, webUrl: window.location.origin },
      });
    } else {
      // Fallback: 이미지 저장 후 카카오 열기
      await handleDownload();
      alert('사진을 저장했습니다. 카카오톡에서 직접 공유해 주세요!');
    }
  };

  const handleInstagram = async () => {
    await handleDownload();
    alert('사진을 저장했습니다. 인스타그램 스토리에 직접 업로드해 주세요!');
  };

  return (
    <div className="space-y-3">
      {/* 숨겨진 공유용 카드 (캡처 전용) */}
      <div className="fixed -top-[9999px] -left-[9999px]" aria-hidden>
        <ResultCard ref={cardRef} result={result} forShare />
      </div>

      <p className="text-sm font-semibold text-gray-700 text-center">결과 공유하기</p>

      <div className="grid grid-cols-2 gap-3">
        <ShareButton
          onClick={handleDownload}
          disabled={saving}
          icon={<Download size={18} />}
          label={saving ? '저장 중...' : '이미지 저장'}
          className="bg-gray-800 text-white"
        />
        <ShareButton
          onClick={handleCopyLink}
          icon={copied ? <Check size={18} /> : <Link size={18} />}
          label={copied ? '복사됨!' : '링크 복사'}
          className="bg-gray-100 text-gray-700"
        />
        <ShareButton
          onClick={handleKakao}
          icon={<MessageCircle size={18} />}
          label="카카오톡"
          className="bg-[#FEE500] text-[#3C1E1E]"
        />
        <ShareButton
          onClick={handleInstagram}
          icon={<InstagramIcon size={18} />}
          label="인스타그램"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        />
      </div>
    </div>
  );
}

function ShareButton({
  onClick,
  icon,
  label,
  className,
  disabled,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${className} ${disabled ? 'opacity-60' : ''}`}
    >
      {icon}
      {label}
    </button>
  );
}
