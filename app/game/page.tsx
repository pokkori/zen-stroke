"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useDrawing } from "@/hooks/useDrawing";
import { getTodayKanji, getTodayString, getDifficultyLabel, getDifficultyColor } from "@/lib/kanji";
import { scoreDrawing, StrokeScore, getRankEmoji, getRankLabel, getRankColor, updateStreak, hasPlayedToday, loadStreak, StreakData } from "@/lib/scoring";
import Link from "next/link";

const CANVAS_SIZE = 320;

export default function GamePage() {
  const kanji = getTodayKanji();
  const todayStr = getTodayString();
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasRef, undo, clear, hasDrawn } = useDrawing({ canvasSize: CANVAS_SIZE, minLineWidth: 3, maxLineWidth: 20, color: "#1a1a1a" });
  const [score, setScore] = useState<StrokeScore | null>(null);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const drawReference = useCallback(() => {
    const canvas = referenceCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.font = "bold 220px Noto Serif JP, serif";
    ctx.fillStyle = "rgba(0,0,0,0.13)"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(kanji.kanji, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 10);
  }, [kanji.kanji]);
  useEffect(() => {
    if (document.fonts) { document.fonts.ready.then(() => drawReference()); } else { setTimeout(drawReference, 500); }
    if (hasPlayedToday(todayStr)) { setAlreadyPlayed(true); setStreakData(loadStreak()); }
  }, [drawReference, todayStr]);
  const handleSubmit = useCallback(async () => {
    if (!hasDrawn || isSubmitting) return;
    const userCanvas = canvasRef.current; const refCanvas = referenceCanvasRef.current;
    if (!userCanvas || !refCanvas) return;
    setIsSubmitting(true);
    const result = scoreDrawing(userCanvas, refCanvas, kanji.strokeCount);
    setScore(result);
    const streak = updateStreak(todayStr); setStreakData(streak); setAlreadyPlayed(true);
    const parts: string[] = ["#ZenStroke " + kanji.kanji + "(" + kanji.reading + ")", getRankEmoji(result.rank) + " Rank" + result.rank, "Score: " + result.total + "pts", streak.streak >= 2 ? "🔥 " + streak.streak + "日連続" : "", "https://zen-stroke.vercel.app"].filter(Boolean);
    setShareMessage(parts.join("\n")); setIsSubmitting(false); setTimeout(() => setShowResult(true), 100);
  }, [hasDrawn, isSubmitting, canvasRef, kanji, todayStr]);
  const handleShare = useCallback(() => { window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareMessage), "_blank", "noopener,noreferrer"); }, [shareMessage]);
  const handleClear = useCallback(() => { clear(); setScore(null); setShowResult(false); }, [clear]);
  const formattedDate = new Date(todayStr).toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" });
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--washi)", fontFamily: "Noto Serif JP, serif" }}>
      <header className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(26,26,26,0.12)" }}>
        <Link href="/" className="flex items-center gap-2"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg><span style={{ fontWeight: 700, fontSize: "1rem" }}>ZEN STROKE</span></Link>
        <div className="flex items-center gap-3">{streakData && streakData.streak >= 1 && <span className="streak-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316" aria-hidden="true"><path d="M12 2C8 8 4 12 4 16a8 8 0 0 0 16 0c0-4-4-8-8-14z"/></svg> {streakData.streak}日連続</span>}<span style={{ fontSize: "0.8rem", color: "#666" }}>{formattedDate}</span></div>
      </header>
      <main className="flex-1 flex flex-col items-center px-4 py-4 gap-4">
        <div className="text-center">
          <div style={{ fontSize: "5rem", fontWeight: 900, color: "var(--sumi)", lineHeight: 1, textShadow: "2px 2px 0 rgba(0,0,0,0.08)" }}>{kanji.kanji}</div>
          <div style={{ fontSize: "1.1rem", color: "var(--vermillion)", fontWeight: 700 }}>{kanji.reading}</div>
          <div style={{ fontSize: "0.9rem", color: "#555" }}>{kanji.meaning}</div>
          <div className="flex items-center justify-center gap-2 mt-1"><span style={{ fontSize: "0.75rem", color: "#888" }}>{kanji.strokeCount}画</span><span style={{ fontSize: "0.75rem", fontWeight: 700 }} className={getDifficultyColor(kanji.difficulty)}>{getDifficultyLabel(kanji.difficulty)}</span></div>
        </div>
        <div className="canvas-container relative" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
          <div style={{ position: "absolute", inset: 0, background: "#fdfaf4" }} />
          <canvas ref={referenceCanvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} style={{ position: "absolute", inset: 0, background: "transparent", touchAction: "none" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(180,160,120,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(180,160,120,0.2) 1px, transparent 1px)", backgroundSize: "160px 160px" }} />
        </div>
        {!showResult && (
          <div className="flex items-center gap-3">
            <button onClick={undo} disabled={!hasDrawn} aria-label="一手戻す" style={{ background: hasDrawn ? "rgba(26,26,26,0.08)" : "rgba(26,26,26,0.04)", color: hasDrawn ? "var(--sumi)" : "#aaa", border: "1px solid rgba(26,26,26,0.12)", cursor: hasDrawn ? "pointer" : "not-allowed", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", minHeight: "44px" }}>↩ 一手戻す</button>
            <button onClick={handleClear} disabled={!hasDrawn} aria-label="描画をクリアする" style={{ background: hasDrawn ? "rgba(192,57,43,0.08)" : "rgba(26,26,26,0.04)", color: hasDrawn ? "var(--vermillion)" : "#aaa", border: "1px solid rgba(192,57,43,0.2)", cursor: hasDrawn ? "pointer" : "not-allowed", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", minHeight: "44px" }}>✕ クリア</button>
            <button onClick={handleSubmit} disabled={!hasDrawn || isSubmitting || alreadyPlayed} aria-label="書いた文字を採点する" style={{ background: (hasDrawn && !alreadyPlayed) ? "var(--vermillion)" : "rgba(26,26,26,0.15)", color: (hasDrawn && !alreadyPlayed) ? "#fff" : "#aaa", cursor: (hasDrawn && !alreadyPlayed) ? "pointer" : "not-allowed", padding: "8px 24px", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, border: "none", minHeight: "44px" }}>{isSubmitting ? "採点中…" : (alreadyPlayed && !score) ? "今日はプレイ済み" : "提出する"}</button>
          </div>
        )}
        {!hasDrawn && !showResult && <p style={{ fontSize: "0.8rem", color: "#888", textAlign: "center" }}>お手本の文字をなぞるように書いてみよう</p>}
        {showResult && score && (
          <div style={{ width: "100%", maxWidth: "384px", borderRadius: "16px", padding: "20px", background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", animation: "scoreReveal 0.6s ease forwards" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "3.5rem" }}>{getRankEmoji(score.rank)}</div>
              <div style={{ fontSize: "3rem", fontWeight: 900 }} className={getRankColor(score.rank)}>{score.rank}</div>
              <div style={{ color: "#555" }}>{getRankLabel(score.rank)}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "16px" }}>
              {[{label:"カバー率",value:score.coverage,color:"#2980b9"},{label:"精度",value:score.accuracy,color:"#27ae60"},{label:"バランス",value:score.smoothness,color:"#8e44ad"}].map((item)=>(<div key={item.label} style={{ textAlign: "center", borderRadius: "12px", padding: "8px", background: "rgba(0,0,0,0.03)" }}><div style={{ fontSize: "1.4rem", fontWeight: 800, color: item.color }}>{item.value}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>{item.label}</div></div>))}
            </div>
            <div style={{ textAlign: "center", borderRadius: "12px", padding: "12px", marginBottom: "16px", background: "rgba(192,57,43,0.06)" }}><span style={{ color: "#888" }}>総合スコア </span><span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--vermillion)" }}>{score.total}</span><span style={{ color: "#888" }}> / 100</span></div>
            {streakData && (<div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: "16px", borderRadius: "12px", padding: "12px", background: "rgba(0,0,0,0.03)" }}><div><div style={{ fontWeight: 800 }}>🔥{streakData.streak}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>連続日数</div></div><div><div style={{ fontWeight: 800 }}>🏅{streakData.bestStreak}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>最高記録</div></div><div><div style={{ fontWeight: 800 }}>📅{streakData.totalPlays}</div><div style={{ fontSize: "0.65rem", color: "#888" }}>総プレイ</div></div></div>)}
            <button onClick={handleShare} aria-label="書道の結果をXでシェアする" style={{ width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700, color: "#fff", background: "#000", border: "none", cursor: "pointer", minHeight: "44px" }}>𝕏 結果をシェアする</button>
            <p style={{ textAlign: "center", marginTop: "12px", fontSize: "0.75rem", color: "#aaa" }}>明日もまた挑戦しよう！</p>
          </div>
        )}
        {alreadyPlayed && !score && !showResult && (<div style={{ width: "100%", maxWidth: "384px", borderRadius: "16px", padding: "20px", textAlign: "center", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}><div style={{ fontSize: "2.5rem" }}>✅</div><div style={{ fontWeight: 700 }}>今日はプレイ済みです</div><div style={{ fontSize: "0.85rem", color: "#888" }}>明日また新しい漢字が出ます</div>{streakData && streakData.streak >= 1 && <div style={{ marginTop: "12px", padding: "8px", background: "rgba(192,57,43,0.06)", borderRadius: "12px" }}>🔥 {streakData.streak}日連続プレイ中！</div>}</div>)}
      </main>
      <footer style={{ textAlign: "center", padding: "16px", fontSize: "0.72rem", color: "#aaa", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <Link href="/legal" style={{ marginRight: "16px" }}>特定商取引法</Link>
        <Link href="/privacy">プライバシーポリシー</Link>
        <div style={{ marginTop: "4px" }}>© 2026 ポッコリラボ</div>
      </footer>
    </div>
  );
}