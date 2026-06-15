export type ImpressionTypeName =
  | '부드러운 조율가형'
  | '차분한 전략가형'
  | '밝은 분위기 메이커형'
  | '신중한 관찰자형'
  | '추진력 있는 실행가형'
  | '따뜻한 보호자형'
  | '감각적인 크리에이터형'
  | '침착한 리더형';

export interface AnalysisResult {
  type: ImpressionTypeName;
  summary: string;
  keywords: string[];
  strength: string;
  relationship: string;
  workStyle: string;
  advice: string;
  reason: string;
}

export interface ImpressionTypeData {
  name: ImpressionTypeName;
  emoji: string;
  color: string;
  bgGradient: string;
  tagline: string;
}
