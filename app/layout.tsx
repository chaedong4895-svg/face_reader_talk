import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '관상톡 - 나의 인상 캐릭터 찾기',
  description:
    '사진 한 장으로 나만의 관상 인상 캐릭터를 확인해보세요. 재미있는 엔터테인먼트 콘텐츠입니다.',
  openGraph: {
    title: '관상톡 - 나의 인상 캐릭터 찾기',
    description: '사진 한 장으로 나만의 관상 인상 캐릭터를 확인해보세요.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full font-[family-name:var(--font-noto-sans-kr)] bg-gray-50 antialiased">
        <div className="mx-auto max-w-md min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
