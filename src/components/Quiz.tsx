'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CardPair, Card as CardType } from '@/types';
import { TIMING, CATEGORY_IMAGE_MAP } from '@/constants';
import { calculateCategoryScores } from '@/lib/scoring';
import Card from './Card';

interface QuizProps {
  pairs: CardPair[];
  onComplete: (selectedCards: CardType[]) => void;
}

/**
 * クイズコンポーネント
 * カードペアを表示してユーザーに選択させるインタラクティブな質問画面
 */
export default function Quiz({ pairs, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);

  const currentPair = pairs[currentQuestion];

  const handleCardSelect = useCallback((card: CardType) => {
    const newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);

    if (currentQuestion < pairs.length - 1) {
      // 次の質問へ
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, TIMING.CARD_SELECTION_DELAY);
    } else {
      // 最後の質問: 結果画像をプリロード
      const { topCategory } = calculateCategoryScores(newSelectedCards);
      const resultImagePath = `/images/archetypes/${CATEGORY_IMAGE_MAP[topCategory]}`;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resultImagePath;
      document.head.appendChild(link);

      // 完了
      setTimeout(() => {
        onComplete(newSelectedCards);
      }, TIMING.CARD_SELECTION_DELAY);
    }
  }, [currentQuestion, pairs.length, selectedCards, onComplete]);

  // 次の質問の画像をプリロード
  useEffect(() => {
    if (currentQuestion < pairs.length - 1) {
      const nextPair = pairs[currentQuestion + 1];
      const nextImages = [
        `/images/cards/${nextPair.cardA.id}.${nextPair.cardA.imageExt}`,
        `/images/cards/${nextPair.cardB.id}.${nextPair.cardB.imageExt}`,
      ];

      // プリロードを実行
      nextImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    }
  }, [currentQuestion, pairs]);

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleCardSelect(currentPair.cardA);
      } else if (e.key === 'ArrowRight') {
        handleCardSelect(currentPair.cardB);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPair, handleCardSelect]);

  // 質問ラベルを取得
  const questionLabel = currentPair.cardA.description;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-white">
      <div className="w-full max-w-4xl flex flex-col justify-center space-y-4 md:space-y-8">
        {/* Progress - ドット表示 */}
        <div className="flex gap-2 justify-center">
          {pairs.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentQuestion
                  ? 'bg-neutral-900 w-8'
                  : index < currentQuestion
                  ? 'bg-neutral-500'
                  : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>

        {/* Question Label */}
        <div className="text-center space-y-1">
          <p className="text-sm md:text-3xl text-neutral-500">
            Q{currentQuestion + 1}｜{questionLabel}
          </p>
        </div>

        {/* Cards - モバイルは横並び、デスクトップはそのまま */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <Card
            card={currentPair.cardA}
            onClick={() => handleCardSelect(currentPair.cardA)}
          />
          <Card
            card={currentPair.cardB}
            onClick={() => handleCardSelect(currentPair.cardB)}
          />
        </div>
      </div>
    </div>
  );
}
