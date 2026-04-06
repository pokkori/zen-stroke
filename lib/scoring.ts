export interface StrokeScore {
  coverage: number;   // お手本をどれだけカバーしたか (0-100)
  accuracy: number;  // はみ出し具合 (0-100)
  smoothness: number; // 線の滑らかさ (0-100)
  total: number;      // 総合スコア (0-100)
  rank: "S" | "A" | "B" | "C" | "D";
}

/**
 * Canvas の ImageData を比較してスコアリング
 * - coverageScore: 参照Canvasの黒ピクセルのうち、ユーザーCanvasでも黒いピクセルの割合
 * - accuracyScore: ユーザーCanvasの黒ピクセルのうち、参照Canvasで黒いピクセルの割合
 * - smoothnessScore: ストローク数や黒ピクセルの連続性から算出
 */
export function scoreDrawing(
  userCanvas: HTMLCanvasElement,
  referenceCanvas: HTMLCanvasElement,
  strokeCount: number
): StrokeScore {
  const size = 320;
  const userCtx = userCanvas.getContext("2d");
  const refCtx = referenceCanvas.getContext("2d");

  if (!userCtx || !refCtx) {
    return { coverage: 0, accuracy: 0, smoothness: 0, total: 0, rank: "D" };
  }

  const userData = userCtx.getImageData(0, 0, size, size);
  const refData = refCtx.getImageData(0, 0, size, size);

  let refBlackPixels = 0;
  let userBlackPixels = 0;
  let intersection = 0;

  // 各ピクセルを走査（4チャンネル: R,G,B,A）
  for (let i = 0; i < userData.data.length; i += 4) {
    const userBrightness =
      (userData.data[i] + userData.data[i + 1] + userData.data[i + 2]) / 3;
    const refBrightness =
      (refData.data[i] + refData.data[i + 1] + refData.data[i + 2]) / 3;
    const userAlpha = userData.data[i + 3];
    const refAlpha = refData.data[i + 3];

    // ユーザーの黒ピクセル: アルファが十分で輝度が低い
    const isUserBlack = userAlpha > 50 && userBrightness < 100;
    // 参照の黒ピクセル: アルファが十分で輝度が低い
    const isRefBlack = refAlpha > 50 && refBrightness < 100;

    if (isRefBlack) refBlackPixels++;
    if (isUserBlack) userBlackPixels++;
    if (isUserBlack && isRefBlack) intersection++;
  }

  // ユーザーが何も書いていない場合
  if (userBlackPixels === 0) {
    return { coverage: 0, accuracy: 0, smoothness: 0, total: 0, rank: "D" };
  }

  // カバレッジ: お手本のどれだけをカバーしたか
  const coverageRaw = refBlackPixels > 0 ? (intersection / refBlackPixels) * 100 : 0;
  // 精度: ユーザーの書き込みのうち、お手本に重なっている割合
  const accuracyRaw = userBlackPixels > 0 ? (intersection / userBlackPixels) * 100 : 0;

  // 面積比チェック: お手本と比べて書いた量が適切か
  const areaRatio = refBlackPixels > 0 ? userBlackPixels / refBlackPixels : 0;
  // 1.0が理想、0.3未満や3.0超過はペナルティ
  const areaBonus = areaRatio >= 0.3 && areaRatio <= 3.0
    ? Math.min(100, 100 - Math.abs(1 - areaRatio) * 20)
    : Math.max(0, 50 - Math.abs(1 - areaRatio) * 10);

  // 滑らかさスコア（書いたピクセル数から推定）
  // 多すぎる/少なすぎるストロークにペナルティ
  const smoothnessRaw = Math.min(100, Math.max(0, areaBonus));

  const coverage = Math.min(100, Math.round(coverageRaw));
  const accuracy = Math.min(100, Math.round(accuracyRaw));
  const smoothness = Math.round(smoothnessRaw);

  // 総合スコア（重み付き平均）
  const total = Math.round(coverage * 0.4 + accuracy * 0.4 + smoothness * 0.2);

  // ランク決定
  let rank: "S" | "A" | "B" | "C" | "D";
  if (total >= 85) rank = "S";
  else if (total >= 70) rank = "A";
  else if (total >= 55) rank = "B";
  else if (total >= 40) rank = "C";
  else rank = "D";

  return { coverage, accuracy, smoothness, total, rank };
}

export function getRankEmoji(rank: string): string {
  return (
    { S: "", A: "", B: "", C: "", D: "" }[rank] ?? ""
  );
}

export function getRankLabel(rank: string): string {
  return (
    { S: "達人", A: "上手い", B: "なかなか", C: "もう少し", D: "練習あるのみ" }[rank] ?? ""
  );
}

export function getRankColor(rank: string): string {
  return (
    {
      S: "text-yellow-500",
      A: "text-green-500",
      B: "text-blue-500",
      C: "text-purple-500",
      D: "text-gray-500",
    }[rank] ?? "text-gray-500"
  );
}

export interface StreakData {
  lastPlayDate: string; // "2026-03-16"
  streak: number;
  bestStreak: number;
  totalPlays: number;
}

export function loadStreak(): StreakData {
  if (typeof window === "undefined") {
    return { lastPlayDate: "", streak: 0, bestStreak: 0, totalPlays: 0 };
  }
  try {
    const raw = localStorage.getItem("zen_streak");
    if (!raw) return { lastPlayDate: "", streak: 0, bestStreak: 0, totalPlays: 0 };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { lastPlayDate: "", streak: 0, bestStreak: 0, totalPlays: 0 };
  }
}

export function saveStreak(data: StreakData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("zen_streak", JSON.stringify(data));
}

export function updateStreak(today: string): StreakData {
  const current = loadStreak();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak: number;
  if (current.lastPlayDate === today) {
    // 今日すでにプレイ済み
    newStreak = current.streak;
  } else if (current.lastPlayDate === yesterdayStr) {
    // 連続プレイ
    newStreak = current.streak + 1;
  } else {
    // ストリーク切れ
    newStreak = 1;
  }

  const updated: StreakData = {
    lastPlayDate: today,
    streak: newStreak,
    bestStreak: Math.max(current.bestStreak, newStreak),
    totalPlays: current.lastPlayDate === today ? current.totalPlays : current.totalPlays + 1,
  };
  saveStreak(updated);
  return updated;
}

export function hasPlayedToday(today: string): boolean {
  const data = loadStreak();
  return data.lastPlayDate === today;
}
