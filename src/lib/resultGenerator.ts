import type { Result, Card, Category } from '@/types';
import { calculateCategoryScores } from './scoring';
import archetypesData from '@/data/archetypes.json';

/**
 * アーキタイプ情報の型定義
 */
type ArchetypeInfo = {
  title: string;
  description: string;
  keywords: string[];
  length: string;
  texture: string;
  volume: string;
  bangs: string;
  styling: string;
  maintenance: string;
  image: string;
};

/**
 * JSONファイルからアーキタイプ情報を取得
 */
const ARCHETYPE_INFO = archetypesData.archetypes as Record<Category, ArchetypeInfo>;

/**
 * 選択カードから結果を生成
 */
export function generateResult(selectedCards: Card[]): Result {
  const { scores, topCategory, topCategories } =
    calculateCategoryScores(selectedCards);
  const archetype = ARCHETYPE_INFO[topCategory];

  // 美容師に見せるポイント
  const barberMemo = [
    { label: 'アーキタイプ', value: topCategory },
    { label: '長さ', value: archetype.length },
    { label: '質感', value: archetype.texture },
    { label: 'ボリューム', value: archetype.volume },
    { label: '前髪', value: archetype.bangs },
    { label: 'スタイリング', value: archetype.styling },
    { label: 'メンテナンス', value: archetype.maintenance },
    { label: 'キーワード', value: archetype.keywords.join(', ') },
  ];

  return {
    timestamp: '', // タイムスタンプは呼び出し側で設定
    selectedCards,
    scores,
    topCategory,
    topCategories,
    summary: {
      direction: archetype.title,
      description: archetype.description,
      barberMemo,
    },
  };
}

