import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://zen-stroke.vercel.app";

export const metadata: Metadata = {
  title: "ZEN STROKE - 毎日書道チャレンジ",
  description: "今日の漢字を書いてスコアを競おう。Wordle風の毎日書道チャレンジ。結果をXでシェアして友達と競争！",
  keywords: ["書道", "漢字", "毎日チャレンジ", "Wordle", "ゲーム", "習字"],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231a1a2e'/><path d='M25 75L30 50 70 25 75 30 50 70Z' fill='%23f59e0b'/><path d='M25 75l10-5-5-5Z' fill='%23fbbf24'/></svg>",
  },
  openGraph: {
    title: "ZEN STROKE - 毎日書道チャレンジ",
    description: "今日の漢字を筆で書いてスコアを競おう。Wordle風の毎日書道ゲーム。",
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "ZEN STROKE",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "ZEN STROKE - 毎日書道チャレンジ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEN STROKE - 毎日書道チャレンジ",
    description: "今日の漢字を筆で書いてスコアを競おう。Wordle風の毎日書道ゲーム。",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#f5f0e8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
