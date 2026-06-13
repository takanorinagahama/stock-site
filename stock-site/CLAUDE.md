# AI Stock Data — CLAUDE.md

## プロジェクト概要

AI関連株の情報を初心者向けにわかりやすく整理した日本語の投資情報サイト。
スコアリング・ランキング・テーマ分類・特集記事を提供する。

**本番URL**: https://ai-stock-data.com  
**想定ユーザー**: AIや米国株に関心がある日本の個人投資家（初心者〜中級者）

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router) + TypeScript
- **DB**: Supabase (PostgreSQL)
- **スタイリング**: inline styles（Tailwind不使用）
- **デプロイ**: Vercel（mainブランチ push で自動デプロイ）
- **パッケージマネージャ**: pnpm

## 主要ディレクトリ

```
app/                    ページ・APIルート
  page.tsx             TOPページ
  stocks/              銘柄一覧・詳細
  features/            特集記事
  themes/              テーマ別ページ
components/            共通UIコンポーネント
content/features/      特集記事データ（.tsファイル）
lib/                   ビジネスロジック
  themes.ts            テーマ定義
  themes/featured-stocks.ts  テーマ別代表銘柄
  features/            特集記事インデックス
  fetch-stocks.ts      銘柄データ型定義・取得
docs/output/           データ投入SQL（Supabase用）
public/                静的ファイル（ogp.png等）
```

## 実装ルール

- **小さな差分で実装する**。1PRで多くを変えすぎない
- 仕様変更時は**影響範囲を先に説明**してから実装する
- スタイルはinline stylesを使う（Tailwindクラスを追加しない）
- デザイントークン（色・フォント）は既存の定数から参照する
- **本番データ・秘密鍵・APIキー・認証情報は扱わない**
- 変更時は必ず「変更概要・影響範囲・テスト観点・人間が確認すべき点」を出す
- 不確かなことは不確かと書く。実行できない外部作業を「完了」と言わない

## コンテンツルール

- このサイトは**投資情報の参考提供であり、投資助言ではない**
- スコア・ランキングは参考値であり、売買推奨ではない
- 特集記事は日本語・論考調・事実ベースで書く
- 法的・規制・コンプライアンスの最終判断はAIがしない

## 特集記事の追加方法

1. `content/features/[slug].ts` を作成（`FeatureArticle` 型に準拠）
2. `lib/features/index.ts` にimport・ALL_FEATURESに追加
3. `featured: true` にすると注目特集に掲載（常時3本を上限とする）
4. `relatedStocks` には必ずAPIに存在する銘柄ティッカーのみ入れる

## 銘柄データ更新

- データは `docs/output/*.sql` でSupabaseに投入する
- 毎月 `baseMonth` を更新してSQLを生成・適用する
- テーマ別代表銘柄は `lib/themes/featured-stocks.ts` で管理する

## デプロイフロー

```
ローカル修正 → pnpm build（確認）→ git push origin main → Vercel自動デプロイ
```

## 禁止事項

- 本番DBの直接変更
- `main` ブランチへの直接push（緊急時はPM承認後のみ）
- 個人情報・実ユーザーデータをAIに入力すること
- 投資助言・法的助言に見える断定的表現を追加すること
