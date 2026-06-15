# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## Environment Setup

`.env.local.example`을 복사해 `.env.local`을 만들고 키를 채운다:

- `ANTHROPIC_API_KEY` (필수): Claude Vision API 호출에 사용
- `NEXT_PUBLIC_KAKAO_JS_KEY` (선택): 카카오톡 공유 기능

## Architecture

**사용자 플로우**: `/` → `/upload` → `/analyzing` → `/result`

페이지 간 상태는 `sessionStorage`로 전달한다. 업로드된 이미지는 base64로 변환 후 세션에 임시 보관되고, `/analyzing`에서 API 호출 후 즉시 제거된다.

### 핵심 경로

| 경로 | 역할 |
|------|------|
| `app/api/analyze/route.ts` | 이미지 → Claude Vision → JSON 결과 반환 |
| `lib/types.ts` | `AnalysisResult`, `ImpressionTypeName` 타입 |
| `lib/impression-types.ts` | 8가지 인상 유형 메타데이터 (emoji, color, gradient) |
| `components/ResultCard.tsx` | 결과 표시 + html2canvas 캡처용 공유 카드 |
| `components/ShareButtons.tsx` | 이미지 저장, 링크 복사, 카카오, 인스타그램 공유 |

### API 설계

`POST /api/analyze`
- Body: `{ imageData: string (base64), mimeType: string }`
- Response: `AnalysisResult` JSON
- 이미지는 처리 후 즉시 폐기 — 서버에 저장하지 않음

### 인상 유형

8가지 유형(`lib/impression-types.ts`)은 각각 고유한 emoji, Tailwind color class, gradient를 가진다. Claude가 반환하는 `type` 필드가 이 유형명과 정확히 일치해야 한다. 유효하지 않은 값은 `route.ts`에서 기본값(`부드러운 조율가형`)으로 대체된다.

### 이미지 공유

`ShareButtons`는 `ResultCard`를 숨겨진 `div`에 오프스크린으로 렌더링하고 `html2canvas`로 PNG를 캡처한다. 캡처 시 `scale: 2`를 사용해 레티나 품질을 보장한다.

## 윤리 제약

API 시스템 프롬프트(`route.ts`)는 다음을 명시적으로 금지한다:
- 실제 성격/능력/신뢰도/범죄 성향 판단
- 인종, 건강, 경제력 추론
- 부정적·차별적 표현

결과 문구 변경 시 이 원칙을 반드시 유지해야 한다.
