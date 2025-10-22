'use client';

import type { Result as ResultType } from '@/types';
import { BARBER_MEMO_INDEX, CATEGORY_IMAGE_MAP } from '@/constants';
import Button from './Button';
import Image from 'next/image';

interface ResultProps {
  result: ResultType;
  onRestart: () => void;
}

export default function Result({ result, onRestart }: ResultProps) {
  // トップカテゴリの画像を取得
  const imagePath = `/images/archetypes/${
    CATEGORY_IMAGE_MAP[result.topCategory]
  }`;

  // barberMemoから各項目を取得（型安全性とコードの可読性向上）
  const memo = result.summary.barberMemo;
  const keywords = memo[BARBER_MEMO_INDEX.KEYWORDS]?.value || '';
  const length = memo[BARBER_MEMO_INDEX.LENGTH]?.value || '';
  const texture = memo[BARBER_MEMO_INDEX.TEXTURE]?.value || '';
  const volume = memo[BARBER_MEMO_INDEX.VOLUME]?.value || '';
  const bangs = memo[BARBER_MEMO_INDEX.BANGS]?.value || '';
  const styling = memo[BARBER_MEMO_INDEX.STYLING]?.value || '';
  const maintenance = memo[BARBER_MEMO_INDEX.MAINTENANCE]?.value || '';

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* LAYER 1: ATMOSPHERE - 画像とタイトル一体型 */}
      <div className="relative w-full">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={imagePath}
            alt={result.topCategory}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />

          {/* 画像上のテキスト */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-6 text-center">
            <p className="text-[10px] tracking-[0.15em] text-white/50 font-light mb-5">
              your world
            </p>
            <h1 className="text-[26px] font-bold text-white leading-tight tracking-tight mb-3">
              {result.summary.direction}
            </h1>
            <p className="text-xs text-white/60 font-light tracking-wide">
              {result.topCategory}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5">
        {/* LAYER 2: ESSENCE - 世界観の核心とキーワードの粒 */}
        <div className="pt-20 pb-16 text-center">
          <p className="text-[10px] tracking-[0.15em] text-neutral-400 font-light mb-6">
            essence
          </p>

          <p className="text-[17px] text-neutral-800 leading-relaxed font-medium mb-9">
            {result.summary.description}
          </p>

          {/* キーワード - 世界観の粒 */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {keywords.split(',').map((keyword, i) => (
              <span
                key={i}
                className="inline-block px-4 py-2 text-[14px] font-medium text-neutral-700 border border-neutral-300 rounded-full"
              >
                #{keyword.trim()}
              </span>
            ))}
          </div>

          {/* 区切り線 */}
          <div className="w-16 h-px bg-neutral-300 mx-auto mt-11"></div>
        </div>

        {/* LAYER 3: STRUCTURE - 技術情報グリッド */}
        <div className="pb-16">
          <p className="text-[10px] tracking-[0.15em] text-neutral-400 font-light mb-8 text-center">
            silhouette
          </p>

          {/* グリッドモジュール */}
          <div className="grid grid-cols-2 gap-3">
            {/* 長さ */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">長さ</p>
              <p className="text-[14px] text-neutral-800 leading-snug">{length}</p>
            </div>

            {/* 質感 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">質感</p>
              <p className="text-[14px] text-neutral-800 leading-snug">{texture}</p>
            </div>

            {/* ボリューム */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">ボリューム</p>
              <p className="text-[14px] text-neutral-800 leading-snug">{volume}</p>
            </div>

            {/* 前髪 */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">前髪</p>
              <p className="text-[14px] text-neutral-800 leading-snug">{bangs}</p>
            </div>

            {/* スタイリング */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">スタイリング</p>
              <p className="text-[14px] text-neutral-800 leading-snug">{styling}</p>
            </div>

            {/* メンテナンス */}
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <p className="text-xs text-neutral-500 mb-2 font-medium">メンテナンス</p>
              <p className="text-[14px] text-neutral-800 leading-snug">
                {maintenance}
              </p>
            </div>
          </div>
        </div>

        {/* アクション */}
        <div className="pb-12">
          <Button onClick={onRestart} className="w-full py-4 text-base">
            もう一度診断
          </Button>
        </div>

        {/* フッター */}
        <div className="text-center pb-8">
          <p className="text-[10px] text-neutral-400 tracking-[0.15em] font-light">
            KAMIGATA - Hair Style Diagnostic
          </p>
        </div>
      </div>
    </div>
  );
}
