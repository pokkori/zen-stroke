import Link from "next/link";
import { getTodayKanji, getDifficultyLabel } from "@/lib/kanji";

function BrushIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="brush-g" x1="20" y1="10" x2="52" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#e74c3c" />
        </linearGradient>
      </defs>
      {/* brush handle */}
      <rect x="30" y="8" width="12" height="36" rx="3" fill="#4a3728" />
      <rect x="32" y="10" width="8" height="32" rx="2" fill="#5d4037" />
      {/* metal band */}
      <rect x="29" y="40" width="14" height="6" rx="1" fill="#bdc3c7" />
      {/* brush tip */}
      <path d="M30 46 Q36 68 42 46Z" fill="url(#brush-g)" />
      {/* ink drop */}
      <circle cx="36" cy="64" r="3" fill="#c0392b" opacity="0.5" />
      {/* sparkle */}
      <circle cx="52" cy="14" r="2" fill="#e74c3c" opacity="0.5" />
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { x: 15, y: 20, size: 3, dur: 7, del: 0 },
    { x: 82, y: 35, size: 4, dur: 6, del: 1 },
    { x: 45, y: 75, size: 3, dur: 8, del: 0.5 },
    { x: 70, y: 12, size: 3, dur: 6.5, del: 2 },
    { x: 25, y: 55, size: 4, dur: 7.5, del: 1.5 },
    { x: 90, y: 60, size: 3, dur: 6, del: 0.8 },
  ];
  return (
    <>
      <style>{`
        @keyframes inkFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.3); opacity: 0.4; }
          100% { transform: translateY(0) scale(1); opacity: 0.15; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(192,57,43,0.3), 0 0 40px rgba(192,57,43,0.15); }
          50% { box-shadow: 0 0 30px rgba(192,57,43,0.5), 0 0 60px rgba(192,57,43,0.25); }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(192,57,43,0.4) 0%, transparent 70%)`,
            animation: `inkFloat ${p.dur}s ease-in-out ${p.del}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  const kanji = getTodayKanji();
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%),
                     radial-gradient(ellipse at 50% 80%, rgba(99,179,237,0.1) 0%, transparent 50%),
                     #0F0F1A`,
        fontFamily: "Noto Serif JP, serif",
      }}
    >
      <FloatingParticles />

      <header className="text-center pt-8 pb-4 relative z-10">
        <div className="text-2xl font-black tracking-wider">
          <span
            style={{
              background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ZEN
          </span>
          <span className="text-gray-300"> STROKE</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">毎日書道チャレンジ</div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 pb-8 relative z-10">
        {/* Hero */}
        <section className="text-center mb-10">
          <div className="flex justify-center mb-6" style={{ filter: 'drop-shadow(0 0 16px rgba(192,57,43,0.3))' }}>
            <BrushIcon />
          </div>
          <div className="text-3xl font-black leading-tight text-gray-200">
            1日、1枚、<br/>
            <span
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              心を静めて書く。
            </span>
          </div>
          <p className="mt-5 text-gray-400 leading-relaxed text-sm">
            Wordleのように、毎日1文字の漢字に挑戦。<br/>
            お手本をなぞって書き、AIがスコアを採点。<br/>
            結果をXでシェアして友達と競争しよう。
          </p>
        </section>

        {/* Today's kanji card - glassmorphism */}
        <section
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <div className="text-center mb-4">
            <div className="text-xs text-gray-500">今日の漢字</div>
            <div className="text-7xl font-black leading-none mt-2 text-white" style={{ filter: 'drop-shadow(0 2px 8px rgba(192,57,43,0.3))' }}>
              {kanji.kanji}
            </div>
            <div
              className="font-bold mt-2"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {kanji.reading}
            </div>
            <div className="text-sm text-gray-400">{kanji.meaning} / {getDifficultyLabel(kanji.difficulty)}</div>
          </div>
          <Link href="/game">
            <button
              aria-label="今日の漢字書道チャレンジを始める"
              className="w-full py-4 rounded-2xl text-white text-lg font-bold transition-all hover:scale-[1.02] active:scale-95 min-h-[52px]"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                animation: 'pulseGlow 3s ease-in-out infinite',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Noto Serif JP, serif',
              }}
            >
              今日の漢字を書く
            </button>
          </Link>
        </section>

        {/* Score ranks */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-center mb-4 text-gray-300">スコアランク</h2>
          <div className="grid grid-cols-5 gap-2">
            {[
              { rank: "S", label: "達人", color: "#f39c12" },
              { rank: "A", label: "上手い", color: "#27ae60" },
              { rank: "B", label: "なかなか", color: "#2980b9" },
              { rank: "C", label: "もう少し", color: "#8e44ad" },
              { rank: "D", label: "練習あるのみ", color: "#7f8c8d" },
            ].map((r) => (
              <div
                key={r.rank}
                className="text-center rounded-xl py-3 px-1"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-xl font-black" style={{ color: r.color }}>{r.rank}</div>
                <div className="text-[0.6rem] text-gray-500">{r.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Streak info */}
        <section
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2 className="font-bold mb-2 text-gray-300">毎日の連続記録</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            毎日プレイして連続記録を更新しよう。<br/>連続が途切れないように、毎日1文字書き続けよう。
          </p>
        </section>

        {/* Bottom CTA */}
        <Link href="/game" className="block">
          <button
            aria-label="今すぐ書道チャレンジを始める"
            className="w-full py-4 rounded-2xl text-white text-xl font-bold transition-all hover:scale-[1.02] active:scale-95 min-h-[52px]"
            style={{
              background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
              boxShadow: '0 0 24px rgba(192,57,43,0.4)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Noto Serif JP, serif',
            }}
          >
            今すぐ書道チャレンジ
          </button>
        </Link>
      </main>

      <footer className="text-center py-6 px-4 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex justify-center gap-4 text-xs text-gray-600">
          <Link href="/legal" className="hover:text-red-400 transition-colors">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-red-400 transition-colors">プライバシーポリシー</Link>
        </div>
        <div className="text-xs text-gray-700 mt-2">© 2026 ポッコリラボ</div>
      </footer>
    </div>
  );
}
