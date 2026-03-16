import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEN STROKE - 毎日書道チャレンジ",
  description: "今日の漢字を書いてスコアを競おう。Wordle風の毎日書道チャレンジ。結果をXでシェアして友達と競争！",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✏️</text></svg>",
  },
  openGraph: {
    title: "ZEN STROKE - 毎日書道チャレンジ",
    description: "今日の漢字を筆で書いてスコアを競おう。Wordle風の毎日書道ゲーム。",
    type: "website",
    locale: "ja_JP",
    url: "https://zen-stroke.vercel.app",
    siteName: "ZEN STROKE",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEN STROKE - 毎日書道チャレンジ",
    description: "今日の漢字を筆で書いてスコアを競おう。Wordle風の毎日書道ゲーム。",
  },
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
