'use client';

import { useEffect } from 'react';
import { TIMING } from '@/constants';

interface CalculatingProps {
  onComplete: () => void;
}

/**
 * 計算中表示コンポーネント
 * クイズ完了後、結果表示前のローディング画面
 */
export default function Calculating({ onComplete }: CalculatingProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, TIMING.CALCULATING_DELAY);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full bg-neutral-900 animate-pulse`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
