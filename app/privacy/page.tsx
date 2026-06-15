import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-bold text-gray-800">개인정보 처리방침</h1>
      </header>

      <div className="flex-1 px-4 py-6 space-y-6 text-sm text-gray-700">
        <Section title="1. 수집하는 정보">
          <p>
            관상톡은 인상 분석 서비스 제공을 위해 사용자가 업로드한 얼굴 사진을 일시적으로
            처리합니다. 이 외 개인을 식별할 수 있는 정보는 수집하지 않습니다.
          </p>
        </Section>

        <Section title="2. 사진 처리 및 삭제 정책">
          <ul className="space-y-2 list-none">
            <Li>업로드된 사진은 분석 목적으로만 일시적으로 처리됩니다.</Li>
            <Li>분석 완료 즉시 서버에서 사진이 삭제됩니다.</Li>
            <Li>사용자의 명시적 동의 없이 사진을 저장하지 않습니다.</Li>
            <Li>분석 결과는 사용자 기기(세션)에만 임시 저장됩니다.</Li>
          </ul>
        </Section>

        <Section title="3. 제3자 제공 금지">
          <p>
            수집된 사진 및 분석 결과를 제3자에게 제공하지 않습니다. AI 모델 학습 목적으로도
            사용하지 않습니다.
          </p>
        </Section>

        <Section title="4. AI 분석 처리">
          <p>
            인상 분석은 AI 언어 모델(Claude, Anthropic)을 통해 처리됩니다. 이미지는 분석 요청
            시 API로 전송되며, 전송 후 즉시 삭제됩니다. Anthropic의 개인정보 처리방침도
            적용됩니다.
          </p>
        </Section>

        <Section title="5. 사용 목적 제한">
          <p>
            본 서비스는 엔터테인먼트 목적으로만 제공됩니다. 실제 성격, 능력, 신뢰도, 건강 상태,
            범죄 가능성, 고용 적합성 등을 판단하는 데 사용해서는 안 됩니다.
          </p>
        </Section>

        <Section title="6. 사용자 권리">
          <ul className="space-y-2 list-none">
            <Li>서비스 이용 중 언제든지 분석을 중단할 수 있습니다.</Li>
            <Li>저장된 결과는 브라우저 세션 종료 시 자동 삭제됩니다.</Li>
            <Li>문의사항은 서비스 내 문의 채널을 통해 접수하실 수 있습니다.</Li>
          </ul>
        </Section>

        <Section title="7. 만 14세 미만 이용 제한">
          <p>
            본 서비스는 만 14세 이상을 대상으로 합니다. 만 14세 미만의 경우 보호자의 동의
            없이는 이용하실 수 없습니다.
          </p>
        </Section>

        <div className="text-xs text-gray-400 pt-2 pb-8">
          <p>시행일: 2026년 6월 15일</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <h2 className="font-bold text-gray-800 mb-2">{title}</h2>
      <div className="text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-violet-400 mt-0.5 shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}
