'use client';

import { useState } from 'react';
import Button from './Button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'いいかも、から掬う。',
    description: '左右どちらか直感で選び、\nヘアスタイルを提案。',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-neutral-600 whitespace-pre-line">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          {currentSlide > 0 && (
            <Button variant="secondary" onClick={handleSkip}>
              スキップ
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentSlide < slides.length - 1 ? '次へ' : '始める'}
          </Button>
        </div>
      </div>
    </div>
  );
}
