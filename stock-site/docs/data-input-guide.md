# AI Stock Data — データ投入ガイド（Claude Chat連携用）

---

## このサイトについて

**AI Stock Data** は、AI関連銘柄を初心者でも比較しやすいよう整理した参考情報サイトです。

- **URL**: ai-stock-data.com
- **技術スタック**: Next.js 15 (App Router) + Supabase (PostgreSQL)
- **銘柄管理方針**: 毎月ChatGPTで銘柄データを調査し、SupabaseにSQLで投入
- **表示銘柄数**: 常時50社（`is_active = true`）
- **過去銘柄**: DBには残す（テーマ・特集記事からのリンク切れを防ぐため）

---

## DBテーブル構造

### テーブル1: `public.stocks`（銘柄マスタ）

1銘柄につき1行。同一tickerはUPSERT。

| カラム名 | 型 | 役割 | 表示箇所 |
|---|---|---|---|
| `ticker` | text (PK) | ティッカーシンボル（大文字） | 全ページ |
| `name` | text | 企業の英語正式名称 | 銘柄一覧・詳細 |
| `country` | text | 上場国（基本 "US"） | 公開情報ボタン表示判定 |
| `market` | text | 市場（NYSE等） | 未表示（保持のみ） |
| `ai_category` | text | カテゴリスラッグ（英語） | 詳細ページのタグ |
| `company_description` | text | 会社概要（日本語2〜3文） | 詳細ページ「会社概要」 |
| `ai_summary` | text | AIとの関わり（日本語2〜3文） | 詳細ページ「AIとの関わり」 |
| `dependency_level` | int | `dependency_level_int`と同値 | — |
| `dependency_level_int` | int | AI依存度の数値 (0〜3) | 詳細ページのタグ |
| `dependency_label` | text | "高い" / "中程度" / "低い" | 詳細ページのタグ・スコア内訳 |
| `ir_url` | text | IRページURL | 詳細ページ「IRページ」ボタン |
| `company_url` | text | 公式サイトURL | 詳細ページ「公式サイト」ボタン |
| `is_active` | boolean | 今月の掲載対象か | 銘柄一覧の表示フィルタ |

**`dependency_level_int` の変換ルール（`ai_dependency_score`から算出）**:

```
ai_dependency_score 80以上 → 3 / "高い"
ai_dependency_score 50以上 → 2 / "中程度"
ai_dependency_score 20以上 → 1 / "低い"
それ以下               → 0 / "低い"
```

---

### テーブル2: `public.ai_metrics`（月次スコアデータ）

1銘柄×1ヶ月で1行。同一 `(ticker, updated_month)` はUPSERT。**過去データは消さない**（複数月分が蓄積される。画面には最新月だけ表示）。

| カラム名 | 型 | 役割 | 表示箇所 |
|---|---|---|---|
| `ticker` | text | stocksと同じティッカー | — |
| `updated_month` | text | 基準月 "YYYY-MM" | 詳細ページ「基準月」 |
| `fiscal_period` | text | `updated_month`と同値でOK | — |
| `tier` | text | 確度ランク A/B/C | 詳細ページ「確度」 |
| `ai_rev_mid` | int | AI関連売上推定（百万ドル） | 詳細ページ「AI売上（推定）」 |
| `ai_rev_low` | int | `ai_rev_mid`と同値でOK | — |
| `ai_rev_high` | int | `ai_rev_mid`と同値でOK | — |
| `ai_revenue_score` | int | AI売上スコア（0〜100） | スコアバー「AI売上スコア」 |
| `ai_growth_score` | int | AI成長スコア（0〜100） | スコアバー「AI成長スコア」 |
| `ai_dependency_score` | int | AI依存度スコア（0〜100） | スコアバー「AI依存度スコア」 |
| `confidence_score` | int | 確度スコア（0〜100） | スコアバー「確度スコア」 |
| `ai_expectation_score` | int | AI期待度スコア（0〜100） | 銘柄一覧のスコア列・バッジ |

---

## スコアの仕組み

```
ai_expectation_score = round((ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4)
```

- 4指標の単純平均。**100を超えてはいけない**
- `tier` は `confidence_score` から変換: 90以上→A、70以上→B、未満→C
- 銘柄一覧では `ai_expectation_score` を「AI期待度スコア」として表示
- 詳細ページでは4指標それぞれを横棒グラフで表示

**スコアの色分け（詳細ページ）**:

| スコア | 色 |
|---|---|
| 80以上 | 緑 |
| 65〜79 | 紫 |
| 64以下 | グレー |

---

## `ai_category` のスラッグ一覧

DBに入れる英語スラッグと、サイト上の日本語表示の対応（`lib/categories.ts` が変換元）:

| DBに入れる値 | サイト表示 |
|---|---|
| `ai accelerator/platform` | AIアクセラレータ/プラットフォーム |
| `ai accelerator/data center cpu` | AIアクセラレータ/データセンターCPU |
| `ai application` | AIアプリケーション |
| `ai infrastructure` | AIインフラ |
| `ai cloud` | AIクラウド |
| `ai cloud/platform` | AIクラウド/プラットフォーム |
| `ai cloud foundation` | AIクラウド基盤 |
| `ai servers/hpc` | AIサーバー/HPC |
| `ai servers/storage` | AIサーバー/ストレージ |
| `ai servers/rack-scale` | AIサーバー/ラックスケール |
| `ai server manufacturing` | AIサーバー製造 |
| `ai data center optical communications` | AIデータセンター光通信 |
| `ai data infrastructure` | AIデータ基盤 |
| `ai foundry/advanced packaging` | AIファウンドリ/先端パッケージ |
| `ai memory` | AIメモリ |
| `ai optical communications/photonics` | AI光通信/フォトニクス |
| `ai automation/rpa` | AI自動化/RPA |
| `ai network/custom semiconductors` | AIネットワーク/カスタム半導体 |
| `ai network/optical communications` | AIネットワーク/光通信 |
| `ai platform` | AIプラットフォーム |
| `ai saas` | 企業向けAIソフト |
| `enterprise ai software` | 企業向けAIソフト |
| `semiconductor` | 半導体 |
| `semiconductor test` | 半導体テスト |
| `semiconductor manufacturing equipment` | 半導体製造装置 |
| `data center/interconnect` | データセンター/相互接続 |
| `data center power/cooling` | データセンター電力/冷却 |
| `data center power equipment` | データセンター電力設備 |
| `power/automation` | 電力/自動化 |
| `smart infrastructure/automation` | スマートインフラ/自動化 |
| `data infrastructure` | データ基盤 |
| `investment` | 投資 |
| `etf` | ETF |

---

## SQLの生成ルール（ChatGPTへの依頼内容）

毎月ChatGPTに以下を依頼してSQLを生成してもらい、Supabase SQL Editorに貼り付けるだけで完了。

**SQLの構成（この順番で出力）**:

1. ヘッダーコメント（基準月・銘柄数・生成日時）
2. `BEGIN;`
3. `stocks` UPSERT（50社、`is_active = true`）
4. 今回リストにない旧銘柄を `is_active = false` に更新
5. `ai_metrics` UPSERT（同月分）
6. 確認用 SELECT（active件数・今月metrics件数）
7. `COMMIT;`

**SQLテンプレート**:

```sql
-- ============================================================
-- AI銘柄データ投入 SQL
-- baseMonth: YYYY-MM  companies: 50社
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('NVDA', 'NVIDIA', 'US', 'ai accelerator/platform',
   'AI向けGPUの中心企業。AIサーバー投資の拡大が売上に直結しやすい。',
   '生成AIの学習と推論で広く使われるGPUを提供。AIデータセンター投資が増えるほど同社の売上に反映されやすい。',
   3, 3, '高い', true),
  -- 残りの銘柄...
ON CONFLICT (ticker) DO UPDATE SET
  name                 = EXCLUDED.name,
  country              = EXCLUDED.country,
  ai_category          = EXCLUDED.ai_category,
  company_description  = EXCLUDED.company_description,
  ai_summary           = EXCLUDED.ai_summary,
  dependency_level     = EXCLUDED.dependency_level,
  dependency_level_int = EXCLUDED.dependency_level_int,
  dependency_label     = EXCLUDED.dependency_label,
  is_active            = true;

-- 2. 今回リストにない旧銘柄を非アクティブに（行は残す）
UPDATE public.stocks
SET is_active = false
WHERE ticker NOT IN ('NVDA', 'MSFT', ...今回の全ticker...);

-- 3. ai_metrics UPSERT
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  ('NVDA', 'YYYY-MM', 'YYYY-MM', 'A',
   190000, 190000, 190000,
   100, 100, 100, 100, 100),
  -- 残りの銘柄...
ON CONFLICT (ticker, updated_month) DO UPDATE SET
  fiscal_period        = EXCLUDED.fiscal_period,
  tier                 = EXCLUDED.tier,
  ai_rev_low           = EXCLUDED.ai_rev_low,
  ai_rev_high          = EXCLUDED.ai_rev_high,
  ai_rev_mid           = EXCLUDED.ai_rev_mid,
  ai_revenue_score     = EXCLUDED.ai_revenue_score,
  ai_growth_score      = EXCLUDED.ai_growth_score,
  ai_dependency_score  = EXCLUDED.ai_dependency_score,
  confidence_score     = EXCLUDED.confidence_score,
  ai_expectation_score = EXCLUDED.ai_expectation_score;

-- 4. 確認
SELECT
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = true)  AS active_stocks,
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = false) AS inactive_stocks,
  (SELECT COUNT(*) FROM public.ai_metrics WHERE updated_month = 'YYYY-MM') AS metrics_this_month;

COMMIT;
```

---

## データの流れ

```
ChatGPTで銘柄調査（50社）
      ↓
SQL直接出力（JSON不要）
      ↓
Supabase SQL Editorに貼り付け・実行
      ↓
active_stocks = 50 を確認
      ↓
サイトに自動反映（Next.js ISR 5分キャッシュ）
```

---

## 注意事項

- 本サイトは**投資助言ではない**。スコアはあくまで参考指標
- `ir_url` / `company_url` は空でもOK。後から追加可能
- 同一tickerのデータは常にUPSERTで上書き
- `updated_month` が異なれば別行として蓄積される（履歴保持）
- 文字列中のシングルクォートは `''` にエスケープすること
