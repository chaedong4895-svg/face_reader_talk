import type { ImpressionTypeData, ImpressionTypeName } from './types';

export const IMPRESSION_TYPES: Record<ImpressionTypeName, ImpressionTypeData> = {
  '부드러운 조율가형': {
    name: '부드러운 조율가형',
    emoji: '🌸',
    color: 'text-rose-600',
    bgGradient: 'from-rose-50 to-pink-50',
    tagline: '주변을 편안하게 만드는 온화한 에너지',
  },
  '차분한 전략가형': {
    name: '차분한 전략가형',
    emoji: '🎯',
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-50 to-blue-50',
    tagline: '깊이 생각하고 차분하게 나아가는 이미지',
  },
  '밝은 분위기 메이커형': {
    name: '밝은 분위기 메이커형',
    emoji: '☀️',
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-yellow-50',
    tagline: '밝고 개방적인 에너지가 느껴지는 인상',
  },
  '신중한 관찰자형': {
    name: '신중한 관찰자형',
    emoji: '🔭',
    color: 'text-teal-600',
    bgGradient: 'from-teal-50 to-cyan-50',
    tagline: '조용히 상황을 살피는 섬세한 이미지',
  },
  '추진력 있는 실행가형': {
    name: '추진력 있는 실행가형',
    emoji: '⚡',
    color: 'text-orange-600',
    bgGradient: 'from-orange-50 to-red-50',
    tagline: '선명하고 또렷한 인상으로 강한 에너지 전달',
  },
  '따뜻한 보호자형': {
    name: '따뜻한 보호자형',
    emoji: '🌿',
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-emerald-50',
    tagline: '든든하고 따뜻한 신뢰감을 주는 이미지',
  },
  '감각적인 크리에이터형': {
    name: '감각적인 크리에이터형',
    emoji: '🎨',
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-violet-50',
    tagline: '독특한 감각과 개성이 느껴지는 인상',
  },
  '침착한 리더형': {
    name: '침착한 리더형',
    emoji: '🏔️',
    color: 'text-slate-600',
    bgGradient: 'from-slate-50 to-gray-50',
    tagline: '안정감 있고 중심 잡힌 존재감의 이미지',
  },
};
