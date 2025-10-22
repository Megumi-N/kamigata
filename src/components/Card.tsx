import type { Card as CardType } from '@/types';
import { STYLES } from '@/constants';
import Image from 'next/image';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

/**
 * カード選択コンポーネント
 * クイズで表示される選択肢カードを表現します
 */
export default function Card({ card, onClick }: CardProps) {
  // データから画像パスを生成
  const imagePath = `/images/cards/${card.id}.${card.imageExt}`;

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col overflow-hidden w-full bg-neutral-50 ${STYLES.BORDER} rounded-md md:rounded-lg ${STYLES.BORDER_HOVER} ${STYLES.BORDER_ACTIVE} transition-all duration-150 ${STYLES.FOCUS_RING}`}
      aria-label={card.headline}
    >
      {/* 画像 */}
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5]">
        <Image
          src={imagePath}
          alt={card.headline}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 50vw"
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* テキスト（画像の上に重ねる） */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-center space-y-1 md:space-y-2">
        <p className="text-xs md:text-base leading-tight md:leading-relaxed text-white font-medium drop-shadow-lg">
          {card.headline}
        </p>
      </div>
    </button>
  );
}
