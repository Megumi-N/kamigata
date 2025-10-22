# KAMIGATA - メンズ髪型診断アプリ

2択×6回の直感選択で「気持ち良い世界観の傾向」を抽出し、その世界観に存在しがちな髪型を提示するメンズ向け髪型提案アプリです。

## 技術スタック

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: next/image

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ（セッション管理）
│   ├── layout.tsx         # ルートレイアウト
│   ├── globals.css        # グローバルスタイル
│   └── api/
│       └── result/        # 将来の共有機能用API（スケルトン）
│
├── components/            # UIコンポーネント
│   ├── Button.tsx         # 共通ボタン
│   ├── Card.tsx           # クイズカード
│   ├── Calculating.tsx    # 計算中画面
│   ├── ErrorBoundary.tsx  # エラーハンドリング
│   ├── MobileOnly.tsx     # モバイル専用ガード
│   ├── Onboarding.tsx     # オンボーディング
│   ├── Quiz.tsx           # クイズ画面
│   └── Result.tsx         # 結果表示
│
├── lib/                   # ビジネスロジック
│   ├── pairGenerator.ts   # カードペア生成
│   ├── resultGenerator.ts # 結果生成
│   └── scoring.ts         # スコアリングロジック
│
├── data/                  # 設定データ（JSON）
│   ├── archetypes.json    # アーキタイプ定義
│   ├── cards.json         # カードデータ
│   └── scoring.json       # スコアリング設定
│
├── constants/             # 定数定義
│   └── index.ts          # アプリ全体の定数
│
└── types/                 # TypeScript型定義
    └── index.ts          # 全型定義
```

## 主要機能

### 1. クイズフロー
- **Onboarding**: アプリの説明
- **Quiz**: 6つの2択質問（キーボード操作対応）
- **Calculating**: 結果計算中のローディング
- **Result**: 診断結果とヘアスタイル提案

### 2. スコアリングシステム
- 8つのアーキタイプ（髪型カテゴリ）
- 重み付けスコアリング
- タイブレイク機能（最終質問ボーナス + 優先順位）

### 3. レスポンシブ対応
- モバイルファースト設計
- 640px未満でのみ利用可能
- デスクトップでは案内画面を表示

## 開発

### セットアップ

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

### 本番環境実行

```bash
npm start
```

## コード品質

### リファクタリング履歴

このプロジェクトはテックリードの視点で以下の改善を実施しました：

#### 1. 定数の一元管理
- `src/constants/index.ts`にマジックナンバーを集約
- `BARBER_MEMO_INDEX`: 配列インデックスを型安全に管理
- `TIMING`: アニメーション遅延の一元管理
- `BREAKPOINTS`: レスポンシブブレークポイント
- `STYLES`: 共通スタイルクラス

#### 2. データドリブン設計
- アーキタイプ情報を`archetypes.json`に外部化
- 画像拡張子を`cards.json`に移行（ハードコード削除）
- JSONからの読み込みで保守性向上

#### 3. コードの可読性向上
- 全コンポーネントにJSDocコメント追加
- 型定義に詳細な説明を追加
- 未使用パラメータの削除
- ESLint警告の解消

#### 4. エラーハンドリング
- `ErrorBoundary`コンポーネントの追加
- ユーザーフレンドリーなエラー画面
- 開発環境ではエラー詳細を表示

#### 5. 型安全性の強化
- 全インターフェースにコメント追加
- 定数を`as const`で不変化
- 型推論の改善

### コーディング規約

- **命名規則**:
  - コンポーネント: PascalCase
  - 関数・変数: camelCase
  - 定数: UPPER_SNAKE_CASE
- **スタイル**: シングルクォート、セミコロンあり
- **コメント**: 主要関数とコンポーネントにJSDoc
- **型**: `interface`を優先、`type`は必要な場合のみ

### パフォーマンス最適化

- `next/image`による画像最適化
- Static Generation（SSG）でビルド
- 必要最小限の依存関係
- Tree-shaking対応

## ライセンス

MIT

