'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, Camera, CheckCircle2, AlertCircle, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('JPG, PNG 이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1];
      sessionStorage.setItem('uploadedImageData', base64);
      sessionStorage.setItem('uploadedImageMime', file.type);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const clearPreview = () => {
    setPreviewUrl(null);
    setError(null);
    sessionStorage.removeItem('uploadedImageData');
    sessionStorage.removeItem('uploadedImageMime');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (!previewUrl || !agreed) return;
    router.push('/analyzing');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-gray-800">사진 업로드</h1>
      </header>

      <div className="flex-1 px-4 py-6 space-y-5">
        {/* 안내 문구 */}
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
          <p className="text-xs text-violet-700 leading-relaxed">
            본 서비스는 <strong>엔터테인먼트 목적</strong>의 인상 해석 콘텐츠입니다. 실제 성격,
            능력, 운명 등을 판단하지 않습니다.
            <br />
            <strong>본인 사진 또는 사용 동의를 받은 사진</strong>만 업로드해 주세요.
          </p>
        </div>

        {/* 업로드 영역 */}
        {!previewUrl ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-violet-400 bg-violet-50'
                : 'border-gray-300 bg-white hover:border-violet-400 hover:bg-violet-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                <Upload size={24} className="text-violet-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-1">사진을 선택하거나 드래그하세요</p>
                <p className="text-xs text-gray-400">JPG, PNG · 최대 5MB</p>
              </div>
              <button className="mt-2 flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold">
                <Camera size={16} />
                사진 선택
              </button>
            </div>
          </div>
        ) : (
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="업로드된 사진"
              className="w-full max-h-72 object-contain"
            />
            <button
              onClick={clearPreview}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center"
            >
              <X size={14} />
            </button>
            <div className="p-3 flex items-center gap-2 border-t border-gray-100">
              <CheckCircle2 size={16} className="text-green-500" />
              <p className="text-sm text-gray-600">사진이 선택되었습니다</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* 촬영 가이드 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="font-semibold text-sm text-gray-700 mb-3">📷 좋은 결과를 위한 팁</p>
          <ul className="space-y-2">
            {[
              '얼굴이 잘 보이는 정면 사진을 사용하세요',
              '밝은 곳에서 촬영된 사진이 좋습니다',
              '선글라스, 마스크, 과도한 필터는 지양해 주세요',
              '얼굴이 한 명만 나오는 사진을 선택해 주세요',
            ].map((tip) => (
              <li key={tip} className="text-xs text-gray-500 flex items-start gap-2">
                <span className="text-violet-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* 동의 체크박스 */}
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                agreed ? 'bg-violet-600 border-violet-600' : 'border-gray-300 bg-white'
              }`}
            >
              {agreed && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-gray-600 leading-relaxed">
            인상 분석을 위한 사진의 일시적 처리에 동의합니다. 분석 완료 후 사진은 즉시 삭제되며,
            제3자에게 제공되지 않습니다.{' '}
            <Link href="/privacy" className="text-violet-600 underline">
              개인정보 처리방침
            </Link>
          </span>
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="px-4 pb-8 pt-2 bg-gray-50">
        <button
          onClick={handleAnalyze}
          disabled={!previewUrl || !agreed}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
            previewUrl && agreed
              ? 'bg-violet-600 text-white shadow-lg active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          인상 분석 시작하기 ✨
        </button>
      </div>
    </div>
  );
}
