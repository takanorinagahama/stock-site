# AI Stock Data — 設計ドキュメント

> このファイルは仕様変更のたびに更新する。最終更新: 2026-04-21

---

## 概要

**AI Stock Data** は、AI関連銘柄を初心者でも比較しやすいよう整理した参考情報サイト。

- **URL**: https://ai-stock-data.com
- **開始**: 2026年3月ごろ
- **表示銘柄数**: 常時100社（`is_active = true`）
- **更新頻度**: 月1回（銘柄データをSQLで投入）
- **ローカル作業ディレクトリ**: `~/Development/stock-site`（iCloud Drive外に移動済み）

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 15 App Router |
| 言語 | TypeScript 5（strict mode） |
| DB | Supabase (PostgreSQL) |
| デプロイ | Vercel（main pushで自動デプロイ） |
| パッケージ管理 | pnpm |
| スタイリング | CSS Modules + インラインstyle |
| CI | GitHub Actions（型チェック + ビルド） |

---

## ディレクトリ構成

```
stock-site/
├── app/                    # Next.js App Router（ページ・APIルート）
├── components/             # Reactコンポーネント
│   ├── home-sandbox/       # ホームページ用コンポーネント群
│   ├── features/           # 特集記事カード
│   ├── shared/             # SiteHeader など共通
│   └── theme/              # テーマページ用
├── content/
│   └── features/           # 特集記事のTypeScriptデータファイル
├── lib/                    # ビジネスロジック・ユーティリティ
│   ├── features/           # 特集記事のindex・型定義
│   ├── filings/            # SEC EDGAR / EDINET連携
│   ├── categories.ts       # ai_categoryのスラッグ→日本語変換
│   ├── themes.ts           # テーマ定義（ハードコード）
│   └── fetch-stocks.ts     # APIから銘柄データ取得
├── supabase/
│   └── migrations/         # DBマイグレーションSQL
├── scripts/                # データ投入・更新スクリプト
├── public/                 # 静的ファイル（画像・OGP）
├── docs/                   # ローカル専用ドキュメント（このファイルなど）
└── .github/workflows/      # GitHub Actions CI設定
```

---

## ページ構成とルーティング

| ルート | 内容 |
|---|---|
| `/` | ホーム（ヒーロー・テーマグリッド・ランキング・特集） |
| `/stocks` | 銘柄一覧（フィルタ・ソート付き） |
| `/stocks/[ticker]` | 銘柄詳細（スコア・概要・IRリンク） |
| `/stocks/[ticker]/filings` | SEC/EDINET開示書類一覧 |
| `/features` | 特集記事一覧 |
| `/features/[slug]` | 特集記事詳細 |
| `/themes/[slug]` | テーマ別銘柄一覧（深掘り） |
| `/about`, `/contact`, `/privacy`, `/disclaimer` | 静的ページ |
| `/lab/filings` | 開示書類探索ツール（実験的） |

### APIルート

| エンドポイント | 役割 |
|---|---|
| `GET /api/stocks` | 全銘柄+最新メトリクス（5分キャッシュ） |
| `GET /api/stocks/[ticker]` | 個別銘柄詳細 |
| `GET /api/filings/edgar` | SEC EDGAR開示書類取得 |
| `GET /api/filings/edinet` | EDINET開示書類取得（日本） |
| `GET /api/cron/edgar` | EDGARスケジュール更新 |
| `POST /api/admin/filings/run` | 開示書類バッチジョブ起動 |
| `GET /api/health` | ヘルスチェック |

---

## データフロー

### 銘柄データの流れ

```
1. 月次: ChatGPTでSQLを生成（20社 × 5バッチ）
2. Supabase SQL Editorに貼り付けて実行
3. Batch 5実行後に active_stocks = 100 を確認
4. サイトに自動反映（Next.js 5分キャッシュ）
```

### ページ描画の流れ

```
ページコンポーネント（Server Component）
  → fetchStockItems() (lib/fetch-stocks.ts)
  → GET /api/stocks
  → Supabase: stocks JOIN ai_metrics (最新月)
  → フィルタ・ソートして表示
```

### 特集記事の流れ

```
content/features/*.ts  ←  TypeScriptオブジェクトとして定義
  → lib/features/index.ts に import して登録
  → getAllFeatures() / getFeatureBySlug() で取得
  → /features/[slug] で静的生成（DB不要）
```

---

## DBテーブル

### `public.stocks`（銘柄マスタ）

| カラム | 型 | 役割 |
|---|---|---|
| `ticker` | text (PK) | ティッカーシンボル（大文字） |
| `name` | text | 企業の英語正式名称 |
| `country` | text | 上場国（基本 "US"） |
| `market` | text | 市場（NYSE等） |
| `ai_category` | text | カテゴリスラッグ（英語） |
| `company_description` | text | 会社概要（日本語2〜3文） |
| `ai_summary` | text | AIとの関わり（日本語2〜3文） |
| `dependency_level` | int | `dependency_level_int`と同値 |
| `dependency_level_int` | int | AI依存度の数値 (0〜3) |
| `dependency_label` | text | "高い" / "中程度" / "低い" |
| `ir_url` | text | IRページURL |
| `company_url` | text | 公式サイトURL |
| `is_active` | boolean | 今月の掲載対象か |

### `public.ai_metrics`（月次スコアデータ）

1銘柄×1ヶ月で1行。UPSERT方式で過去データを残す。

| カラム | 型 | 役割 |
|---|---|---|
| `ticker` | text | stocksと同じティッカー |
| `updated_month` | text | 基準月 "YYYY-MM" |
| `fiscal_period` | text | `updated_month`と同値でOK |
| `tier` | text | 確度ランク A/B/C |
| `ai_rev_mid` | int | AI関連売上推定（百万ドル） |
| `ai_rev_low` / `ai_rev_high` | int | `ai_rev_mid`と同値でOK |
| `ai_revenue_score` | int | AI売上スコア（0〜100） |
| `ai_growth_score` | int | AI成長スコア（0〜100） |
| `ai_dependency_score` | int | AI依存度スコア（0〜100） |
| `confidence_score` | int | 確度スコア（0〜100） |
| `ai_expectation_score` | int | AI期待度スコア（0〜100） |

### `public.filings`（開示書類）

| カラム | 型 | 役割 |
|---|---|---|
| `source` | text | "edgar" or "edinet" |
| `ticker` | text | ティッカー |
| `document_type` | text | 書類種別（10-K等） |
| `filed_at` | timestamp | 提出日時 |
| `document_url` | text | 書類URL |
| `raw_payload` | jsonb | 生データ |

---

## スコア設計

```
ai_expectation_score = round(
  (ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4
)
```

- 4指標の単純平均、最大100
- `tier`: confidence_score 90以上→A、70以上→B、未満→C
- `dependency_level_int`: ai_dependency_score 80以上→3、50以上→2、20以上→1、未満→0

**スコアの色分け（詳細ページ）**

| スコア | 色 |
|---|---|
| 80以上 | 緑 |
| 65〜79 | 紫 |
| 64以下 | グレー |

---

## テーマ設計

テーマはDBではなく `lib/themes.ts` にハードコードで定義。

**有効なテーマスラッグ一覧**

| スラッグ | 表示名 |
|---|---|
| `ai-related-stocks` | AI関連株 |
| `ai-semiconductor-stocks` | AI半導体株 |
| `ai-infrastructure-stocks` | AIインフラ株 |
| `nvidia-related-stocks` | NVIDIA関連株 |
| `data-center-stocks` | データセンター株 |
| `ai-energy-stocks-japan` | AI電力株（日本） |
| `data-center-power-stocks-japan` | データセンター電力株（日本） |

---

## 特集記事の追加手順

1. `content/features/{slug}.ts` を作成（`FeatureArticle` 型に合わせて）
2. `lib/features/index.ts` に import して `ALL_FEATURES` 配列に追加
3. `pnpm exec tsc --noEmit` で型チェック
4. `git add` → `git commit` → `git push` → Vercel自動デプロイ

### `relatedStocks` に入れる銘柄の確認（必須）

`relatedStocks` に指定したtickerがDBに存在しない場合、該当ページが404になる。
記事を作る前に以下のSQLでSupabase SQL Editorから存在確認をすること。

```sql
SELECT ticker FROM public.stocks
WHERE ticker IN ('TICKER1', 'TICKER2', ...)
ORDER BY ticker;
```

件数が一致しないものはDBに未登録 → `relatedStocks` から除外する。

**`FeatureArticle` の主なフィールド**

```typescript
{
  slug: string              // URL: /features/{slug}
  title: string
  summary: string
  category: "テーマ深掘り" | "買い方ガイド" | "決算ベース"
  updatedAt: "YYYY-MM-DD"
  featured: boolean         // trueでホームページに表示
  relatedThemes: string[]   // テーマスラッグ
  relatedStocks: string[]   // ティッカーシンボル
  sections: { heading: string, paragraphs: string[] }[]
  sources: { label: string, url: string, publisher: string }[]
}
```

---

## 現在の特集記事一覧

表示順は `updatedAt` 降順（新しい順）。注目特集（TOPページ）は `featured: true` の上位3件。
**新記事を追加するたびに `featured` を見直し、トレンドに合った3本を選ぶこと。**

| スラッグ | カテゴリ | featured | updatedAt |
|---|---|---|---|
| `agi-organization-startup` | テーマ深掘り | **true** | 2026-04-16 |
| `space-based-solar-power-ai-energy` | テーマ深掘り | **true** | 2026-04-09 |
| `openai-anthropic-google-deepmind-differences` | テーマ深掘り | **true** | 2026-04-02 |
| `ai-models-beyond-llm` | テーマ深掘り | false | 2026-04-03 |
| `japan-ai-companies` | テーマ深掘り | false | 2026-04-02 |
| `ai-beneficiaries-beyond-semiconductors` | テーマ深掘り | false | 2026-03-23 |
| `ai-earnings-proof` | 決算ベース | false | 2026-03-23 |
| `ai-data-center-stocks` | テーマ深掘り | false | 2026-03-23 |
| `best-brokerages-for-us-ai-stocks` | 買い方ガイド | false | 2026-03-23 |
| `how-to-buy-us-ai-stocks` | 買い方ガイド | false | 2026-03-23 |

---

## sitemap の管理方針

`app/sitemap.ts` は以下の方針で自動/手動を使い分ける。

| ページ種別 | 更新方法 |
|---|---|
| `/stocks/[ticker]` | Supabaseから動的取得（`is_active=true`の銘柄を自動列挙） |
| `/themes/[slug]` | `lib/themes.ts` から自動取得 |
| `/features/[slug]` | `lib/features/index.ts` から自動取得 |
| `/about` `/contact` 等の静的ページ | **手動で `sitemap.ts` に追記が必要** |

→ 静的ページを新規追加するときだけ `app/sitemap.ts` を忘れず更新すること。

---

## CI / デプロイ

- **GitHub Actions** (`.github/workflows/ci.yml`): PRとmainへのpushで実行
  - `pnpm install` → `tsc --noEmit` → `pnpm build`
  - 環境変数: GitHub Secretsに `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` を登録済み
- **Vercel**: mainブランチへのpushで自動デプロイ

---

## 環境変数

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトURL（公開） |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase匿名キー（公開、RLSで制御） |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabaseサービスキー（APIルート・バッチ用、非公開） |

---

## 銘柄詳細ページ（/stocks/[ticker]）

### 構成

- **左カラム**: 銘柄概要枠（概要テキスト・外部リンク・シェアボタン）、AI関連売上、開示書類
- **右カラム**: AI期待度スコアゲージ、4指標スコア、関連テーマ・記事

### シェアボタン

銘柄概要枠の外部リンク行にX・Facebook SVGアイコンボタンを配置。

```typescript
const SITE_URL = "https://ai-stock-data.com";
function buildShareUrls(ticker: string, name: string) {
  const pageUrl = `${SITE_URL}/stocks/${ticker}`;
  const text = encodeURIComponent(`${ticker}（${name}）のAI期待度スコアと事業概要`);
  const encodedUrl = encodeURIComponent(pageUrl);
  return {
    x: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}
```

### generateMetadata

ページごとに `<title>` と `<description>` を動的生成。

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const item = await fetchStockByTicker(ticker);
  if (!item) return {};
  const title = `${item.ticker} (${item.name}) のAIスコア・事業概要 | AI Stock Data`;
  const description = item.aiSummary ?? `${item.name}（${item.ticker}）のAI期待度スコアと事業概要。`;
  return { title, description, openGraph: { title, description }, twitter: { card: "summary", title, description } };
}
```

### soft 404 対策

存在しない ticker は `notFound()` で Next.js 標準の 404 を返す（200 を返さない）。

---

## 特集記事詳細ページ（/features/[slug]）

### シェアボタン

カテゴリチップの右隣にX・Facebook SVGアイコンボタンを配置（銘柄詳細と同スタイル）。

```typescript
function buildShareUrls(slug: string, title: string) {
  const pageUrl = `${SITE_URL}/features/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(pageUrl);
  return {
    x: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };
}
```

### レンダリング

`sections[].paragraphs` は `<p>` タグで素直に出力。Markdownは非対応。

---

## SEC EDGAR バッチ

`/api/cron/edgar` で定期実行。`lib/filings/save-edgar.ts` の `saveEdgarFilingsForTickers` が実体。

**並列化設計**（SECのレート制限: 10 req/sec に合わせた設計）

```typescript
const CONCURRENCY = 10;
for (let i = 0; i < tickers.length; i += CONCURRENCY) {
  const chunk = tickers.slice(i, i + CONCURRENCY);
  const chunkResults = await Promise.all(chunk.map((t) => saveEdgarFilingsForTicker(t, count)));
  results.push(...chunkResults);
  if (i + CONCURRENCY < tickers.length) {
    await new Promise((res) => setTimeout(res, 1000)); // 1秒待機してから次のチャンク
  }
}
```

- 1チャンク = 10社を並列処理 → 1秒待機 → 次のチャンク
- 100社なら10チャンク、合計で約9秒 + API処理時間
- `maxDuration = 60`（Vercel Serverless Function の上限）に対応するため並列化必須

---

## AI成長スコアの表示

`Math.round` で四捨五入（以前は `Math.trunc` だったが修正済み）。

```typescript
function formatGrowthDiff(value: number | null): string {
  if (value == null) return "—";
  const rounded = Math.round(value);
  return value > 0 ? `+${rounded}` : String(rounded);
}
```

---

## 銘柄一覧ページ（/stocks）・ランキング（TOP5）の説明文表示

### 方針
「数値を比較するサイト」から「説明を読みながら比較できるサイト」に寄せるため、
`company_description` と `ai_summary` を一覧段階で表示する。

### TOPページ ランキング（RankingList.tsx）
- 各エントリをブロック構造に変更: `ticker + name + score` の下に説明エリアを追加
- `company_description` → グレーテキスト（フォントサイズ 13px）
- `ai_summary` → 「AIとの関わり」紫ラベル + テキスト（13px）
- テキストは全文表示（line-clamp なし）

### 銘柄一覧 デスクトップテーブル（stocks-filtered-view.tsx）
- **上位10件のみ**: データ行の直下に description サブ行 `<tr>` を追加
- `company_description` を上段、`ai_summary`（ラベル付き）を下段に縦並び表示
- **11件目以降**: 従来通りの1行構成

### 銘柄一覧 モバイルカード
- **上位10件のみ**: スタッツ行の下に `company_description` + `ai_summary` を縦並びで追加
- **11件目以降**: 従来通り

### テーブルレイアウトの実装詳細
横スクロール問題を防ぐため `table-layout: fixed` + `<colgroup>` で全列幅を固定。

```
# : 40px | ticker : 82px | 企業名 : 残り幅（flex）
AIカテゴリ : 148px | AI期待度 : 148px | AI売上 : 110px
AI成長力 : 80px | AI依存度 : 82px | 確度 : 60px
minWidth: 1020px
```

`<colgroup>` 内にはコメント（`{/* */}`）を書かない。hydration エラーになる。

### フォントサイズ基準
注目特集カード（本文 13px）を上限として統一。

| 要素 | サイズ |
|---|---|
| ticker・スコア・本文説明 | 13px |
| テーブルヘッダー・DepBadge | 12px |
| 「AIとの関わり」ラベル | 11px |

---

## 注目特集（featured）の運用ルール

TOPページの注目特集は `featured: true` の記事を最大3件表示する。

**新記事を追加するたびに `featured` を見直し、トレンドに合った3本を選ぶこと。**

選定基準:
- 直近のAIトレンドと合っているか
- 検索需要が高いテーマか
- 古くなった記事は外す

---

## 既知の設計上の注意点

- CSS Gridのアイテムには `minWidth: 0` が必要（テーブル等の子要素がoverflow対象の場合）
- バッジ等の短いテキストが折り返す場合は `whiteSpace: "nowrap"` を付ける
- ISRキャッシュは5分なので、DB更新後すぐには反映されない
- 特集記事はDBなしの静的TypeScriptデータ。多くなってきたらCMSへの移行を検討
- `is_active = false` の銘柄はDBに残す（特集記事・テーマページからのリンク切れ防止）
- 開示書類（filings）機能は現在実験的（`/lab/filings`）
- `country = "US"` 以外の銘柄もEDGARに登録されている場合がある（バッチは全is_activeを対象）
- ローカル開発は `~/Development/stock-site` で行う（iCloud Driveは node_modules が壊れるため不可）
- `.env.local` は `.gitignore` に含まれるため、新環境セットアップ時は手動でコピーが必要
