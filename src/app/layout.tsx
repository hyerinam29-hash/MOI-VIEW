import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOI VIEW (모이뷰) - AI 여행 경험 합성',
  description: '여행이 어려운 이들에게 대리 만족을 선사하는 AI 기반 여행 경험 합성 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
