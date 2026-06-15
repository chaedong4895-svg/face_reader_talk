import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import type { AnalysisResult, ImpressionTypeName } from '@/lib/types';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const VALID_TYPES: ImpressionTypeName[] = [
  '부드러운 조율가형',
  '차분한 전략가형',
  '밝은 분위기 메이커형',
  '신중한 관찰자형',
  '추진력 있는 실행가형',
  '따뜻한 보호자형',
  '감각적인 크리에이터형',
  '침착한 리더형',
];

const MOCK_RESULTS: Record<ImpressionTypeName, AnalysisResult> = {
  '부드러운 조율가형': {
    type: '부드러운 조율가형',
    summary: '주변을 편안하게 만드는 온화한 인상입니다.',
    keywords: ['온화함', '배려', '균형감'],
    strength: '사진 속 표정에서 차분하고 부드러운 분위기가 느껴져 신뢰감 있는 이미지로 해석됩니다.',
    relationship: '처음 만나는 사람에게도 부담을 주지 않고 편안하게 다가갈 것 같은 인상입니다.',
    workStyle: '급하게 판단하기보다 상황을 살피고 균형 있게 의견을 조율하는 이미지입니다.',
    advice: '때로는 자신의 의견을 더 적극적으로 표현하면 좋을 것 같습니다.',
    reason: '사진상 입가와 표정이 부드럽게 표현되어 있으며, 전체적인 분위기가 안정적으로 보입니다.',
  },
  '차분한 전략가형': {
    type: '차분한 전략가형',
    summary: '깊이 생각하고 차분하게 나아가는 인상입니다.',
    keywords: ['신중함', '집중력', '침착함'],
    strength: '전체적으로 정돈된 인상과 차분한 분위기가 강조되어 신뢰감을 줍니다.',
    relationship: '말보다 행동으로 보여주는 타입으로, 깊은 신뢰 관계를 형성하는 이미지입니다.',
    workStyle: '꼼꼼하게 상황을 분석하고 체계적으로 접근하는 이미지가 느껴집니다.',
    advice: '가끔은 감정을 좀 더 자유롭게 표현하면 주변과 더 쉽게 가까워질 수 있습니다.',
    reason: '사진 속 시선이 안정적이고 표정이 차분하게 표현되어 신중한 분위기로 해석되었습니다.',
  },
  '밝은 분위기 메이커형': {
    type: '밝은 분위기 메이커형',
    summary: '밝고 긍정적인 에너지가 느껴지는 인상입니다.',
    keywords: ['활기', '친근함', '긍정성'],
    strength: '표정에서 밝고 개방적인 분위기가 느껴져 주변 사람들에게 활력을 주는 이미지입니다.',
    relationship: '처음 보는 사람도 금방 친해질 것 같은 따뜻하고 친근한 인상을 줍니다.',
    workStyle: '팀의 분위기를 밝게 만들고 긍정적인 에너지를 전달하는 이미지입니다.',
    advice: '때로는 조용히 상황을 관찰하는 시간도 가지면 더 깊은 인상을 줄 수 있습니다.',
    reason: '사진 속 표정이 밝고 생동감 있게 표현되어 긍정적인 분위기로 해석되었습니다.',
  },
  '신중한 관찰자형': {
    type: '신중한 관찰자형',
    summary: '조용히 상황을 살피는 섬세한 인상입니다.',
    keywords: ['섬세함', '통찰력', '진중함'],
    strength: '사진 속 차분한 시선과 표정에서 상황을 꼼꼼하게 파악하는 이미지가 느껴집니다.',
    relationship: '먼저 나서기보다 상대방을 충분히 이해한 후 관계를 쌓아가는 인상입니다.',
    workStyle: '세부 사항을 놓치지 않고 꼼꼼하게 살펴보는 이미지로 해석됩니다.',
    advice: '자신의 생각을 좀 더 적극적으로 표현하면 주변의 신뢰를 더 얻을 수 있습니다.',
    reason: '사진 속 표정이 차분하고 시선이 안정적으로 표현되어 관찰력 있는 이미지로 해석되었습니다.',
  },
  '추진력 있는 실행가형': {
    type: '추진력 있는 실행가형',
    summary: '선명하고 강한 에너지가 느껴지는 인상입니다.',
    keywords: ['자신감', '에너지', '결단력'],
    strength: '선명한 표정과 또렷한 시선에서 강한 의지와 추진력 있는 이미지가 느껴집니다.',
    relationship: '솔직하고 직접적인 방식으로 관계를 이끌어가는 인상을 줍니다.',
    workStyle: '빠르게 결정하고 실행으로 옮기는 에너지 넘치는 이미지입니다.',
    advice: '때로는 천천히 주변을 살피며 진행하면 더 좋은 결과를 얻을 수 있습니다.',
    reason: '사진 속 표정과 시선에서 뚜렷하고 강한 인상이 느껴져 실행력 있는 이미지로 해석되었습니다.',
  },
  '따뜻한 보호자형': {
    type: '따뜻한 보호자형',
    summary: '든든하고 따뜻한 신뢰감을 주는 인상입니다.',
    keywords: ['따뜻함', '안정감', '신뢰'],
    strength: '사진 속 전체적인 분위기에서 포용력 있고 따뜻한 이미지가 강하게 느껴집니다.',
    relationship: '주변 사람들이 편하게 기댈 수 있는 든든한 존재감의 인상입니다.',
    workStyle: '팀원들을 세심하게 챙기고 안정적인 분위기를 만드는 이미지입니다.',
    advice: '자신을 위한 시간도 충분히 갖는 것이 장기적으로 더 좋은 에너지를 유지하는 데 도움이 됩니다.',
    reason: '사진 속 부드럽고 안정적인 표정에서 주변을 편안하게 만드는 따뜻한 이미지로 해석되었습니다.',
  },
  '감각적인 크리에이터형': {
    type: '감각적인 크리에이터형',
    summary: '독특한 감각과 개성이 느껴지는 인상입니다.',
    keywords: ['개성', '창의성', '감각'],
    strength: '사진 속 분위기에서 남다른 감각과 독창적인 에너지가 인상적으로 느껴집니다.',
    relationship: '독특한 관점과 아이디어로 주변 사람들에게 신선한 자극을 주는 인상입니다.',
    workStyle: '틀에 얽매이지 않고 새로운 방식으로 접근하는 창의적인 이미지입니다.',
    advice: '때로는 기존의 방식도 존중하며 유연하게 조율하면 더 넓은 공감을 얻을 수 있습니다.',
    reason: '사진 전체에서 느껴지는 독특한 분위기와 개성 있는 인상이 창의적인 이미지로 해석되었습니다.',
  },
  '침착한 리더형': {
    type: '침착한 리더형',
    summary: '안정감 있고 중심 잡힌 존재감의 인상입니다.',
    keywords: ['안정감', '존재감', '중심'],
    strength: '사진 속 또렷한 시선과 안정된 표정에서 중심 잡힌 리더십 이미지가 느껴집니다.',
    relationship: '흔들리지 않는 침착함으로 주변 사람들에게 안정감을 주는 인상입니다.',
    workStyle: '어떤 상황에서도 흔들리지 않고 차분하게 방향을 제시하는 이미지입니다.',
    advice: '때로는 유연하게 다양한 의견을 수용하는 모습을 보이면 더 넓은 공감을 얻을 수 있습니다.',
    reason: '사진 속 안정적인 시선과 정돈된 표정이 신뢰감 있는 리더십 이미지로 해석되었습니다.',
  },
};

function getMockResult(): AnalysisResult {
  const type = VALID_TYPES[Math.floor(Math.random() * VALID_TYPES.length)];
  return MOCK_RESULTS[type];
}

const SYSTEM_PROMPT = `당신은 재미있는 인상 분석 엔터테인먼트 서비스의 AI입니다.

반드시 지켜야 할 규칙:
- 이 결과는 오락 목적의 이미지 해석 콘텐츠입니다
- 실제 성격, 능력, 운명, 신뢰도, 범죄 성향, 직업 적합성을 절대 판단하지 않습니다
- 부정적이거나 차별적인 표현을 사용하지 않습니다
- 외모를 직접 비하하거나 희화화하지 않습니다
- 인종, 성별, 나이, 건강, 경제력, 성적 지향을 추론하지 않습니다

분석할 시각적 요소 (비민감 요소만):
- 사진의 전체적인 분위기와 톤 (밝음/차분함/활기참 등)
- 표정에서 느껴지는 인상 (부드러움, 밝음, 차분함, 또렷함 등)
- 시선의 방향과 안정감
- 사진 구도와 밝기

다음 8가지 인상 유형 중 가장 잘 어울리는 하나를 선택하세요:
1. 부드러운 조율가형
2. 차분한 전략가형
3. 밝은 분위기 메이커형
4. 신중한 관찰자형
5. 추진력 있는 실행가형
6. 따뜻한 보호자형
7. 감각적인 크리에이터형
8. 침착한 리더형

모든 설명은 다음 원칙으로 작성하세요:
- "사진상 보이는 인상", "사진 속 분위기", "전체적인 이미지"라는 표현을 사용
- "성격이 이렇다", "능력이 있다/없다"처럼 단정하지 않음
- 긍정적이고 부드러운 표현만 사용
- 모든 문장 끝에 "~합니다", "~됩니다", "~입니다" 사용

반드시 다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{
  "type": "인상 유형명",
  "summary": "한 줄 요약 (15-25자)",
  "keywords": ["키워드1", "키워드2", "키워드3"],
  "strength": "강점처럼 보이는 이미지 설명 (40-70자)",
  "relationship": "대인관계에서의 인상 설명 (40-70자)",
  "workStyle": "일할 때의 이미지 설명 (40-70자)",
  "advice": "주의하면 좋은 점 (40-60자)",
  "reason": "결과가 나온 이유 설명 (60-100자)"
}`;

export async function POST(request: NextRequest) {
  try {
    const { imageData, mimeType } = await request.json();

    if (!imageData || !mimeType) {
      return NextResponse.json({ error: '이미지 데이터가 없습니다.' }, { status: 400 });
    }

    // Mock 모드: MOCK_MODE=true 일 때 AI 호출 없이 템플릿 결과 반환
    if (process.env.MOCK_MODE === 'true') {
      await new Promise((r) => setTimeout(r, 1500));
      return NextResponse.json(getMockResult());
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 });
    }

    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1024,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${imageData}`,
                detail: 'low',
              },
            },
            {
              type: 'text',
              text: '이 사진을 분석해서 JSON 형식으로 인상 유형 결과를 제공해주세요.',
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
    });

    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error('응답이 없습니다.');

    const parsed: AnalysisResult = JSON.parse(text);

    if (!VALID_TYPES.includes(parsed.type)) {
      parsed.type = '부드러운 조율가형';
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('분석 오류:', error);
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다. 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}
