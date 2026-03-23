import Link from "next/link";
import { getTodayKanji, getDifficultyLabel } from "@/lib/kanji";

export default function HomePage() {
  const kanji = getTodayKanji();
  return (
    <div style={{ minHeight: "100vh", background: "var(--washi)", fontFamily: "Noto Serif JP, serif" }}>
      <header style={{ textAlign: "center", padding: "24px 16px 8px" }}>
        <div style={{ fontSize: "2.2rem", fontWeight: 900 }}>
          <span style={{ color: "var(--vermillion)" }}>ZEN</span> STROKE
        </div>
        <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "4px" }}>毎日書道チャレンジ</div>
      </header>
      <main style={{ maxWidth: "480px", margin: "0 auto", padding: "24px 16px" }}>
        <section style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1.2 }}>
            1日、1枚、<br/>
            <span style={{ color: "var(--vermillion)" }}>心を静めて書く。</span>
          </div>
          <p style={{ marginTop: "20px", color: "#555", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Wordleのように、毎日1文字の漢字に挑戦。<br/>
            お手本をなぞって書き、AIがスコアを採点。<br/>
            結果をXでシェアして友達と競争しよう。
          </p>
        </section>
        <section style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "0.8rem", color: "#888" }}>今日の漢字</div>
            <div style={{ fontSize: "5rem", fontWeight: 900, lineHeight: 1 }}>{kanji.kanji}</div>
            <div style={{ color: "var(--vermillion)", fontWeight: 700 }}>{kanji.reading}</div>
            <div style={{ fontSize: "0.9rem", color: "#555" }}>{kanji.meaning} / {getDifficultyLabel(kanji.difficulty)}</div>
          </div>
          <Link href="/game">
            <button aria-label="今日の漢字書道チャレンジを始める" style={{ width: "100%", padding: "16px", borderRadius: "12px", background: "var(--vermillion)", color: "#fff", fontSize: "1.1rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(192,57,43,0.4)", fontFamily: "Noto Serif JP, serif", minHeight: "44px" }}>
              今日の漢字を書く →
            </button>
          </Link>
        </section>
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, textAlign: "center", marginBottom: "16px" }}>スコアランク</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "8px" }}>
            {[{rank:"S",emoji:"🏆",label:"達人",color:"#f39c12"},{rank:"A",emoji:"⭐",label:"上手い",color:"#27ae60"},{rank:"B",emoji:"✨",label:"なかなか",color:"#2980b9"},{rank:"C",emoji:"👍",label:"もう少し",color:"#8e44ad"},{rank:"D",emoji:"🖌️",label:"練習あるのみ",color:"#7f8c8d"}].map((r) => (
              <div key={r.rank} style={{ textAlign: "center", background: "#fff", borderRadius: "12px", padding: "12px 4px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: "1.5rem" }}>{r.emoji}</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: r.color }}>{r.rank}</div>
                <div style={{ fontSize: "0.6rem", color: "#888" }}>{r.label}</div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ background: "#fff", borderRadius: "16px", padding: "20px", marginBottom: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontWeight: 700, marginBottom: "8px" }}>🔥 毎日の連続記録</h2>
          <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7 }}>毎日プレイして連続記録を更新しよう。<br/>連続が途切れないように、毎日1文字書き続けよう。</p>
        </section>
        <Link href="/game" style={{ display: "block" }}>
          <button aria-label="今すぐ書道チャレンジを始める" style={{ width: "100%", padding: "18px", borderRadius: "14px", background: "var(--vermillion)", color: "#fff", fontSize: "1.2rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(192,57,43,0.45)", fontFamily: "Noto Serif JP, serif", minHeight: "44px" }}>
            今すぐ書道チャレンジ
          </button>
        </Link>
      </main>
      <footer style={{ textAlign: "center", padding: "24px 16px", fontSize: "0.72rem", color: "#aaa", borderTop: "1px solid rgba(0,0,0,0.08)", marginTop: "32px" }}>
        <Link href="/legal" style={{ marginRight: "16px" }}>特定商取引法</Link>
        <Link href="/privacy">プライバシーポリシー</Link>
        <div style={{ marginTop: "4px" }}>© 2026 ポッコリラボ</div>
      </footer>
    </div>
  );
}