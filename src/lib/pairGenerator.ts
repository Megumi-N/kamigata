import type { Card, CardPair } from '@/types';

/**
 * 固定の6ペアを生成
 * 各質問に対応するカードペア（q1a/q1b, q2a/q2b, ...）を返す
 *
 * @param cards - 全カードデータ
 * @returns 6つのカードペアの配列
 */
export function generatePairs(cards: Card[]): CardPair[] {
  // 質問ペアのID定義
  const questionPairs = [
    ['q1a', 'q1b'], // Q1: 空気の温度感
    ['q2a', 'q2b'], // Q2: 人との距離感
    ['q3a', 'q3b'], // Q3: 秩序 vs 揺らぎ
    ['q4a', 'q4b'], // Q4: 色と湿度の感覚
    ['q5a', 'q5b'], // Q5: 情報密度
    ['q6a', 'q6b'], // Q6: 存在感の出し方
  ];

  const pairs: CardPair[] = [];

  for (const [idA, idB] of questionPairs) {
    const cardA = cards.find((c) => c.id === idA);
    const cardB = cards.find((c) => c.id === idB);

    if (cardA && cardB) {
      pairs.push({ cardA, cardB });
    }
  }

  return pairs;
}
