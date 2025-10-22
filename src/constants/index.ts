/**
 * アプリケーション全体で使用する定数
 */

/**
 * barberMemo配列のインデックス定数
 * resultGenerator.tsで生成される配列の順序と対応
 */
export const BARBER_MEMO_INDEX = {
  ARCHETYPE: 0,
  LENGTH: 1,
  TEXTURE: 2,
  VOLUME: 3,
  BANGS: 4,
  STYLING: 5,
  MAINTENANCE: 6,
  KEYWORDS: 7,
} as const;

/**
 * カテゴリ名から画像ファイル名へのマッピング
 */
export const CATEGORY_IMAGE_MAP = {
  'ナチュラル・清潔感': 'natural-clean.jpeg',
  '韓国系・マッシュ': 'korean-mush.jpeg',
  'センターパート・中性的': 'center-part.jpeg',
  'ミニマル・無機質': 'minimal.jpeg',
  'ストリート・パーマ': 'street-perm.jpeg',
  'バーバー・フェード': 'barber-fade.jpeg',
  'クラシック・ジェントル': 'classic-gentle.jpeg',
  'アーティスト・アンニュイ': 'artist-annui.jpeg',
} as const;

/**
 * タイミング設定（ミリ秒）
 */
export const TIMING = {
  /** 計算画面の表示時間 */
  CALCULATING_DELAY: 1500,
  /** カード選択後のアニメーション遅延 */
  CARD_SELECTION_DELAY: 200,
} as const;

/**
 * レスポンシブ設計のブレークポイント（px）
 */
export const BREAKPOINTS = {
  /** モバイル専用の最大幅 */
  MOBILE_MAX: 640,
} as const;

/**
 * スタイリング定数
 */
export const STYLES = {
  /** カードやボタンの共通ボーダー */
  BORDER: 'border-2 border-neutral-300',
  /** ホバー時のボーダー */
  BORDER_HOVER: 'hover:border-neutral-900',
  /** アクティブ時のボーダー */
  BORDER_ACTIVE: 'active:border-neutral-900',
  /** フォーカスリング */
  FOCUS_RING: 'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2',
} as const;
