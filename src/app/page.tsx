'use client';

import { useState, useEffect } from 'react';
import type { SessionState, Card } from '@/types';
import cardsData from '@/data/cards.json';
import { generatePairs } from '@/lib/pairGenerator';
import { generateResult } from '@/lib/resultGenerator';
import ErrorBoundary from '@/components/ErrorBoundary';
import Onboarding from '@/components/Onboarding';
import Quiz from '@/components/Quiz';
import Calculating from '@/components/Calculating';
import Result from '@/components/Result';
import MobileOnly from '@/components/MobileOnly';

/**
 * メインページコンポーネント
 * セッション状態を管理し、各ステップ（オンボーディング、クイズ、計算中、結果）を表示
 */
export default function Home() {
  const [session, setSession] = useState<SessionState>({
    step: 'onboarding',
    currentQuestion: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnboardingComplete = () => {
    // カードデータを型付きで取得
    const cards = cardsData.cards as Card[];
    // ペア生成
    const pairs = generatePairs(cards);

    setSession({
      ...session,
      step: 'quiz',
      pairs,
    });
  };

  const handleQuizComplete = (selectedCards: Card[]) => {
    setSession({
      ...session,
      step: 'calculating',
      selectedCards,
    });
  };

  const handleCalculatingComplete = () => {
    if (!session.selectedCards) return;

    // 結果生成（クライアント側でタイムスタンプ付与）
    const result = {
      ...generateResult(session.selectedCards),
      timestamp: new Date().toISOString(),
    };

    setSession({
      ...session,
      step: 'result',
      result,
    });
  };

  const handleRestart = () => {
    setSession({
      step: 'onboarding',
      currentQuestion: 0,
    });
  };

  // ステップに応じてコンポーネントを表示
  return (
    <ErrorBoundary>
      <MobileOnly>
        {mounted && (
          <>
            {session.step === 'onboarding' && (
              <Onboarding onComplete={handleOnboardingComplete} />
            )}
            {session.step === 'quiz' && session.pairs && (
              <Quiz pairs={session.pairs} onComplete={handleQuizComplete} />
            )}
            {session.step === 'calculating' && (
              <Calculating onComplete={handleCalculatingComplete} />
            )}
            {session.step === 'result' && session.result && (
              <Result result={session.result} onRestart={handleRestart} />
            )}
          </>
        )}
      </MobileOnly>
    </ErrorBoundary>
  );
}
