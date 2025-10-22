import scoringConfig from '@/data/scoring.json';
import type { Card, CategoryScores, Category } from '@/types';

/**
 * 最終質問の回答に与える追加スコア（タイブレイク用）
 */
const LAST_ANSWER_BONUS = 0.5;

/**
 * 選択されたカードから重み付けスコアを集計し、トップカテゴリを決定
 *
 * スコアリングロジック:
 * 1. 各回答に対して、設定ファイルから重みを取得して加算
 * 2. 最終質問の回答には+0.5のボーナスを付与（タイブレイク用）
 * 3. 同点の場合は、fixedPriority配列の順序で決定
 *
 * @param selectedCards - ユーザーが選択したカードの配列
 * @returns スコア、トップカテゴリ、同点カテゴリのリスト
 */
export function calculateCategoryScores(selectedCards: Card[]): {
  scores: CategoryScores;
  topCategory: Category;
  topCategories: Category[];
} {
  // 全カテゴリのスコアを0で初期化
  const scores: CategoryScores = {};
  scoringConfig.categories.forEach((cat) => {
    scores[cat] = 0;
  });

  // 選択されたカードから重みを集計
  selectedCards.forEach((card, index) => {
    const question = scoringConfig.questions.find(
      (q) => q.id === card.questionId
    );
    if (!question) return;

    const weights = question.answers[card.answer];
    if (!weights) return;

    Object.entries(weights).forEach(([category, weight]) => {
      scores[category] = (scores[category] || 0) + weight;

      // 最終質問の回答には追加ボーナス（lastAnswerDiscriminator）
      if (index === selectedCards.length - 1) {
        scores[category] += LAST_ANSWER_BONUS;
      }
    });
  });

  // 最高スコアを取得
  const maxScore = Math.max(...Object.values(scores));

  // 最高スコアのカテゴリをすべて取得
  const topCategories = Object.entries(scores)
    .filter(([, score]) => score === maxScore)
    .map(([category]) => category as Category);

  // タイブレイクロジック
  let topCategory: Category;

  if (topCategories.length === 1) {
    // 単独トップの場合
    topCategory = topCategories[0];
  } else {
    // 同点の場合：fixedPriority配列の順序で決定
    const fixedPriority = scoringConfig.scoring.fixedPriority;
    const sortedByPriority = topCategories.sort(
      (a, b) => fixedPriority.indexOf(a) - fixedPriority.indexOf(b)
    );
    topCategory = sortedByPriority[0];
  }

  return {
    scores,
    topCategory,
    topCategories,
  };
}
