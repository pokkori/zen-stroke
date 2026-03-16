export interface KanjiChallenge {
  kanji: string;
  reading: string;
  meaning: string;
  strokeCount: number;
  difficulty: "easy" | "medium" | "hard";
}

export const KANJI_LIST: KanjiChallenge[] = [
  { kanji: "一", reading: "いち", meaning: "一つ", strokeCount: 1, difficulty: "easy" },
  { kanji: "二", reading: "に", meaning: "二つ", strokeCount: 2, difficulty: "easy" },
  { kanji: "三", reading: "さん", meaning: "三つ", strokeCount: 3, difficulty: "easy" },
  { kanji: "山", reading: "やま", meaning: "山", strokeCount: 3, difficulty: "easy" },
  { kanji: "川", reading: "かわ", meaning: "川", strokeCount: 3, difficulty: "easy" },
  { kanji: "日", reading: "にち", meaning: "太陽・日", strokeCount: 4, difficulty: "easy" },
  { kanji: "月", reading: "つき", meaning: "月", strokeCount: 4, difficulty: "easy" },
  { kanji: "木", reading: "き", meaning: "木", strokeCount: 4, difficulty: "easy" },
  { kanji: "水", reading: "みず", meaning: "水", strokeCount: 4, difficulty: "easy" },
  { kanji: "火", reading: "ひ", meaning: "火", strokeCount: 4, difficulty: "easy" },
  { kanji: "土", reading: "つち", meaning: "土", strokeCount: 3, difficulty: "easy" },
  { kanji: "金", reading: "きん", meaning: "金・金属", strokeCount: 8, difficulty: "medium" },
  { kanji: "空", reading: "そら", meaning: "空", strokeCount: 8, difficulty: "medium" },
  { kanji: "海", reading: "うみ", meaning: "海", strokeCount: 9, difficulty: "medium" },
  { kanji: "花", reading: "はな", meaning: "花", strokeCount: 7, difficulty: "easy" },
  { kanji: "風", reading: "かぜ", meaning: "風", strokeCount: 9, difficulty: "medium" },
  { kanji: "雨", reading: "あめ", meaning: "雨", strokeCount: 8, difficulty: "medium" },
  { kanji: "竹", reading: "たけ", meaning: "竹", strokeCount: 6, difficulty: "easy" },
  { kanji: "松", reading: "まつ", meaning: "松", strokeCount: 8, difficulty: "medium" },
  { kanji: "心", reading: "こころ", meaning: "心", strokeCount: 4, difficulty: "easy" },
  { kanji: "愛", reading: "あい", meaning: "愛", strokeCount: 13, difficulty: "hard" },
  { kanji: "夢", reading: "ゆめ", meaning: "夢", strokeCount: 13, difficulty: "hard" },
  { kanji: "道", reading: "みち", meaning: "道", strokeCount: 12, difficulty: "medium" },
  { kanji: "光", reading: "ひかり", meaning: "光", strokeCount: 6, difficulty: "easy" },
  { kanji: "星", reading: "ほし", meaning: "星", strokeCount: 9, difficulty: "medium" },
  { kanji: "雪", reading: "ゆき", meaning: "雪", strokeCount: 11, difficulty: "medium" },
  { kanji: "桜", reading: "さくら", meaning: "桜", strokeCount: 10, difficulty: "medium" },
  { kanji: "和", reading: "わ", meaning: "和・調和", strokeCount: 8, difficulty: "medium" },
  { kanji: "禅", reading: "ぜん", meaning: "禅", strokeCount: 13, difficulty: "hard" },
  { kanji: "美", reading: "うつくしい", meaning: "美しい", strokeCount: 9, difficulty: "medium" },
  { kanji: "龍", reading: "りゅう", meaning: "龍", strokeCount: 16, difficulty: "hard" },
  { kanji: "鳥", reading: "とり", meaning: "鳥", strokeCount: 11, difficulty: "medium" },
  { kanji: "森", reading: "もり", meaning: "森", strokeCount: 12, difficulty: "medium" },
  { kanji: "石", reading: "いし", meaning: "石", strokeCount: 5, difficulty: "easy" },
  { kanji: "草", reading: "くさ", meaning: "草", strokeCount: 9, difficulty: "medium" },
  { kanji: "春", reading: "はる", meaning: "春", strokeCount: 9, difficulty: "medium" },
  { kanji: "夏", reading: "なつ", meaning: "夏", strokeCount: 10, difficulty: "medium" },
  { kanji: "秋", reading: "あき", meaning: "秋", strokeCount: 9, difficulty: "medium" },
  { kanji: "冬", reading: "ふゆ", meaning: "冬", strokeCount: 5, difficulty: "easy" },
  { kanji: "白", reading: "しろ", meaning: "白", strokeCount: 5, difficulty: "easy" },
  { kanji: "黒", reading: "くろ", meaning: "黒", strokeCount: 11, difficulty: "medium" },
  { kanji: "青", reading: "あお", meaning: "青", strokeCount: 8, difficulty: "medium" },
  { kanji: "赤", reading: "あか", meaning: "赤", strokeCount: 7, difficulty: "easy" },
  { kanji: "緑", reading: "みどり", meaning: "緑", strokeCount: 14, difficulty: "hard" },
  { kanji: "門", reading: "もん", meaning: "門", strokeCount: 8, difficulty: "medium" },
  { kanji: "山", reading: "やま", meaning: "山", strokeCount: 3, difficulty: "easy" },
  { kanji: "田", reading: "た", meaning: "田んぼ", strokeCount: 5, difficulty: "easy" },
  { kanji: "力", reading: "ちから", meaning: "力", strokeCount: 2, difficulty: "easy" },
  { kanji: "大", reading: "だい", meaning: "大きい", strokeCount: 3, difficulty: "easy" },
  { kanji: "小", reading: "しょう", meaning: "小さい", strokeCount: 3, difficulty: "easy" },
];

// 今日の漢字を取得（日付から決定論的に選択）
export function getTodayKanji(): KanjiChallenge {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return KANJI_LIST[dayOfYear % KANJI_LIST.length];
}

// 今日の日付文字列 "2026-03-16"
export function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export function getDifficultyLabel(difficulty: string): string {
  return { easy: "初級", medium: "中級", hard: "上級" }[difficulty] ?? "";
}

export function getDifficultyColor(difficulty: string): string {
  return {
    easy: "text-green-600",
    medium: "text-yellow-600",
    hard: "text-red-600",
  }[difficulty] ?? "";
}
