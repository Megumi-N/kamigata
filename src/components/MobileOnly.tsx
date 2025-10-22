'use client';

import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '@/constants';

interface MobileOnlyProps {
  children: React.ReactNode;
}

/**
 * モバイル専用ガードコンポーネント
 * デスクトップではメッセージを表示し、モバイルでのみ子要素を表示
 */
export default function MobileOnly({ children }: MobileOnlyProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // 画面幅がモバイル最大幅未満の場合はモバイルとみなす
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE_MAX);
    };

    // 初回チェック
    checkDevice();

    // リサイズ時にチェック
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] tracking-[0.15em] text-neutral-400 font-light">
              MOBILE ONLY
            </p>
            <h1 className="text-2xl font-bold text-neutral-800 leading-tight">
              スマートフォンで
              <br />
              ご利用ください
            </h1>
          </div>

          <p className="text-[15px] text-neutral-600 leading-relaxed">
            このアプリはスマートフォン専用です。
            <br />
            美容師に見せる体験に最適化されているため、
            <br />
            モバイル端末からアクセスしてください。
          </p>

          <div className="pt-4">
            <div className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-full">
              <p className="text-sm font-medium">📱 スマホからアクセス</p>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200">
            <p className="text-xs text-neutral-400 tracking-[0.15em] font-light">
              KAMIGATA - Hair Style Diagnostic
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
