/**
 * ヘアスタイルのカテゴリ（アーキタイプ）
 * 8つの異なる髪型の方向性を表す
 */
export type Category =
  | 'ナチュラル・清潔感'
  | '韓国系・マッシュ'
  | 'センターパート・中性的'
  | 'ミニマル・無機質'
  | 'ストリート・パーマ'
  | 'バーバー・フェード'
  | 'クラシック・ジェントル'
  | 'アーティスト・アンニュイ';

/**
 * カードデータ
 * クイズの各選択肢を表現
 */
export interface Card {
  /** カードの一意ID（例: "q1a", "q1b"） */
  id: string;
  /** 質問ID（例: "Q1", "Q2"） */
  questionId: string;
  /** 回答の選択肢（A または B） */
  answer: 'A' | 'B';
  /** ユーザーに表示される選択肢のテキスト */
  headline: string;
  /** 質問の軸（例: "空気の温度感"） */
  description: string;
  /** 画像ファイルの拡張子（jpeg/jpg/png等） */
  imageExt: string;
}

/**
 * カードペア
 * 1つの質問に対する2つの選択肢をペアで管理
 */
export interface CardPair {
  cardA: Card;
  cardB: Card;
}

/**
 * スコアリング結果
 * 各カテゴリに対するスコアを保持
 */
export interface CategoryScores {
  [category: string]: number;
}

/**
 * 美容師向け情報の項目
 * 結果画面で表示される技術的な詳細情報
 */
export interface BarberMemoItem {
  /** 項目名（例: "長さ", "質感"） */
  label: string;
  /** 項目の値（例: "ショート〜ミディアム"） */
  value: string;
}

/**
 * 診断結果データ
 * ユーザーの診断結果を包括的に表現
 */
export interface Result {
  /** 結果生成時のタイムスタンプ（ISO 8601形式） */
  timestamp: string;
  /** ユーザーが選択したカードの配列 */
  selectedCards: Card[];
  /** 各カテゴリのスコア */
  scores: CategoryScores;
  /** 最も高いスコアのカテゴリ */
  topCategory: Category;
  /** 同点の場合は複数のカテゴリ */
  topCategories: Category[];
  /** 結果のサマリー情報 */
  summary: {
    /** 結果のタイトル */
    direction: string;
    /** 結果の説明文 */
    description: string;
    /** 美容師に見せる技術的な情報 */
    barberMemo: BarberMemoItem[];
  };
}

/**
 * セッション状態
 * アプリケーション全体のステートを管理
 */
export interface SessionState {
  /** 現在のステップ */
  step: 'onboarding' | 'quiz' | 'calculating' | 'result';
  /** 現在の質問番号（0始まり） */
  currentQuestion: number;
  /** 質問のペア配列（クイズステップで使用） */
  pairs?: CardPair[];
  /** ユーザーが選択したカード（クイズ完了後） */
  selectedCards?: Card[];
  /** 診断結果（結果ステップで使用） */
  result?: Result;
}
