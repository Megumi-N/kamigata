'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * エラーバウンダリコンポーネント
 * 子コンポーネントでエラーが発生した際のフォールバックUIを提供
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // エラーログをコンソールに出力（本番環境では監視サービスに送信することも可能）
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // ページをリロードして初期状態に戻す
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] tracking-[0.15em] text-neutral-400 font-light">
                ERROR
              </p>
              <h1 className="text-2xl font-bold text-neutral-800 leading-tight">
                エラーが発生しました
              </h1>
            </div>

            <p className="text-[15px] text-neutral-600 leading-relaxed">
              申し訳ございません。予期しないエラーが発生しました。
              <br />
              ページを再読み込みして、もう一度お試しください。
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-xs text-red-800 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <Button onClick={this.handleReset} className="w-full">
              ページを再読み込み
            </Button>

            <div className="pt-8 border-t border-neutral-200">
              <p className="text-xs text-neutral-400 tracking-[0.15em] font-light">
                KAMIGATA - Hair Style Diagnostic
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
