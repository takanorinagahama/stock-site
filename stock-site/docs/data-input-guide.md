# AI Stock Data — データ投入ガイド（Claude Chat連携用）

---

## このサイトについて

**AI Stock Data** は、AI関連銘柄を初心者でも比較しやすいよう整理した参考情報サイトです。

- **URL**: ai-stock-data.com
- **技術スタック**: Next.js 15 (App Router) + Supabase (PostgreSQL)
- **銘柄管理方針**: 毎月Claudeで銘柄データを調査し、SupabaseにSQLで投入
- **表示銘柄数**: 常時100社（`is_active = true`）
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

## SQLの生成ルール（Claudeへの依頼内容）

毎月Claudeに以下を依頼してSQLを生成してもらい、Supabase SQL Editorに貼り付けるだけで完了。

### バッチ分割ルール

Claudeのコンテキスト制限を避けるため、**100銘柄を20銘柄ずつ5バッチに分けて**SQLを生成する。

| バッチ | 銘柄番号 | ファイル名 |
|---|---|---|
| Batch 1 | 1〜20社 | `YYYY-MM_batch1.sql` |
| Batch 2 | 21〜40社 | `YYYY-MM_batch2.sql` |
| Batch 3 | 41〜60社 | `YYYY-MM_batch3.sql` |
| Batch 4 | 61〜80社 | `YYYY-MM_batch4.sql` |
| Batch 5 | 81〜100社 | `YYYY-MM_batch5.sql` |

- **Batch 1〜4**: `stocks` + `ai_metrics` のUPSERTのみ（BEGIN〜COMMITの完結形式）
- **Batch 5（最終）**: `stocks` + `ai_metrics` のUPSERT ＋ 旧銘柄の `is_active = false` 更新 ＋ 確認SELECT

### SQLの構成（各バッチ共通）

1. ヘッダーコメント（基準月・バッチ番号・銘柄範囲・生成日時）
2. `BEGIN;`
3. `stocks` UPSERT（20社、`is_active = true`）
4. `ai_metrics` UPSERT（同月分、20社）
5. 【Batch 5のみ】旧銘柄を `is_active = false` に更新
6. 【Batch 5のみ】確認用 SELECT（active件数・今月metrics件数）
7. `COMMIT;`

### SQLテンプレート（Batch 1〜4）

```sql
-- ============================================================
-- AI銘柄データ投入 SQL  Batch X/5（銘柄 N〜M社）
-- baseMonth: YYYY-MM  このバッチ: 20社
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
  -- 残り19銘柄...
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

-- 2. ai_metrics UPSERT
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  ('NVDA', 'YYYY-MM', 'YYYY-MM', 'A',
   190000, 190000, 190000,
   100, 100, 100, 100, 100),
  -- 残り19銘柄...
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

COMMIT;
```

### SQLテンプレート（Batch 5／最終バッチ）

```sql
-- ============================================================
-- AI銘柄データ投入 SQL  Batch 5/5（銘柄 81〜100社）【最終バッチ】
-- baseMonth: YYYY-MM  このバッチ: 20社
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('TICKER', '...', 'US', '...',  '...', '...', 2, 2, '中程度', true),
  -- 残り19銘柄...
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
WHERE ticker NOT IN ('NVDA', 'MSFT', ...今回の全100社のticker...);

-- 3. ai_metrics UPSERT
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  ('TICKER', 'YYYY-MM', 'YYYY-MM', 'B',
   5000, 5000, 5000,
   70, 65, 60, 75, 68),
  -- 残り19銘柄...
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
Claudeで銘柄調査・SQL生成（100銘柄 × 5バッチ）
      ↓
Batch 1〜5 を順にSupabase SQL Editorに貼り付け・実行
      ↓
Batch 5実行後に active_stocks = 100 を確認
      ↓
サイトに自動反映（Next.js ISR 5分キャッシュ）
```

---

## `company_description` / `ai_summary` の記述ルール

銘柄選定時には、数値やカテゴリだけでなく、各企業について以下の2カラムも必ず記述すること。

- `company_description`
- `ai_summary`

どちらも**初心者が読んで意味が伝わること**を重視し、**簡潔・客観的・比較しやすい表現**で書く。

---

### 1. `company_description` の役割

**その会社が何をしている会社か**を、日本語で短く説明する欄。

#### 仕様

- **日本語2〜3文。ただし上位20社は2〜3文に限らず手厚く書く**
- 1文目で「何の会社か」を明確に書く
- 必要に応じて2〜3文目で、主力製品・主要顧客・業界内での立ち位置を書く
- AIとの関係はここで無理に詳しく書かなくてよい
- ただし、会社理解に不可欠な範囲なら軽く触れてよい

#### 書き方ルール

- 難しい業界用語を並べすぎない
- IRをそのまま要約したような硬すぎる文にしない
- 誇張表現を避ける
- 「世界最強」「圧倒的」など主観的表現は禁止
- 事業内容がぱっと分かる具体語を優先する
  - 例: GPU、半導体受託製造、クラウド、ERP、データセンター冷却、電力設備 など
- 初心者が読んで「何を売っている会社か」が分かる文章にする

#### 良い例

- `AI向けGPUを設計・販売する半導体企業。データセンター向け製品の比重が大きく、AIサーバー投資の拡大が業績に影響しやすい。`
- `世界最大級の半導体受託製造企業。NVIDIAやAppleなどの先端チップ生産を担い、先端プロセスと先端パッケージングに強みを持つ。`

#### 避けたい例

- `最先端技術を持つ世界的な優良企業。今後も高成長が期待される。`
- `幅広いソリューションをグローバルに展開。多角的に事業を拡大している。`
  - 抽象的すぎて何の会社か分かりにくい

---

### 2. `ai_summary` の役割

**その会社がAIとどう関わっているか**を、日本語で短く説明する欄。

#### 仕様

- **日本語2〜3文。上位20社は2〜3文に限定せず手厚く書く**
- 「AIのどの層で関わるか」を明確に書く
- 可能なら、AI需要がどう売上や受注につながるかまで書く
- 単なる「AIを使っています」ではなく、**事業とのつながり**を書く

#### 書き方ルール

- まず関わり方を明示する
  - 例: AI半導体、AIインフラ、クラウド、業務ソフト、データセンター、電力、冷却、受託開発 など
- 次に、AI需要とのつながりを書く
  - 例: GPU需要増、データセンター投資増、企業のAI導入増 など
- 最後に、必要なら依存度や性質を補足する
  - 例: AIそのものを作る企業ではないが、インフラ需要の恩恵を受けやすい
- AIとの関係が弱い企業は、無理に強く見せない
- 期待先行の表現ではなく、**現時点で確認しやすい事業上の接点**を書く
- 株価目線の煽りは禁止
  - 例: 「今後爆発的に伸びる可能性」などは禁止

#### 良い例

- `生成AIの学習と推論で使われるGPUを供給する中核企業。AIデータセンター投資が増えるほど、同社製品の需要増につながりやすい。`
- `CoWoSなどの先端パッケージングを通じてAI向け半導体需要に関わる。NVIDIAなど先端チップ顧客の生産拡大が、受注増加の追い風になりやすい。`
- `AIソフトそのものの企業ではないが、データセンター向け電力設備や冷却需要の増加から恩恵を受けやすい。AIインフラ拡大の周辺銘柄として位置づけられる。`

#### 避けたい例

- `AI関連企業として注目されている。AI市場の拡大で恩恵が期待される。`
  - 何をしているのか、どう恩恵を受けるのかが不明
- `自社でもAIを活用しており、将来性がある。`
  - 事業とのつながりが弱く、投資判断材料として薄い

---

### 3. 2カラムの役割分担

`company_description` と `ai_summary` は役割を分けること。

#### 原則

- `company_description` = **会社そのものの説明**
- `ai_summary` = **AIとの関わりの説明**

#### 注意

- 同じ内容をほぼ繰り返さない
- ただし完全に別の話にしすぎず、自然につながるように書く
- 両方読むことで
  1. 何の会社か
  2. AIとどうつながるか
  が順に分かる構成にする

#### 望ましい流れ

- `company_description` で事業の全体像をつかむ
- `ai_summary` でAIテーマ上の位置づけを理解できる

---

### 4. トーンの統一ルール

全銘柄で、以下のトーンを守ること。

- **簡潔**
- **客観的**
- **初心者にも読める**
- **比較しやすい**
- **投資助言っぽくしすぎない**

#### 禁止事項

- 煽り表現
- 断定的な株価予想
- 根拠の薄い最上級表現
- 抽象語ばかりの説明
- 会社概要とAI説明の重複コピペ

---

### 5. 文章テンプレート

迷った場合は以下の型を使うこと。

#### `company_description` テンプレート

- `〇〇を手がける企業。△△向けの比重が大きく、□□に強みを持つ。`
- `〇〇を提供する企業。主力は△△で、□□分野で存在感がある。`

#### `ai_summary` テンプレート

- `〇〇を通じてAI需要に関わる。△△の増加が、同社の売上・受注の追い風になりやすい。`
- `AIそのものを開発する企業ではないが、〇〇インフラ需要の拡大から恩恵を受けやすい。`

---

### 6. NVIDIA の記述例（基準サンプル）

- `company_description`
  - `AI向けGPUを中心に展開する半導体企業。データセンター向け製品の比重が大きく、AIサーバー投資の拡大が業績に反映されやすい。`
- `ai_summary`
  - `生成AIの学習と推論で広く使われるGPUを供給する中核企業。AIデータセンター投資が増えるほど、同社製品の需要増につながりやすい。`

---

### 7. TSM の記述例

- `company_description`
  - `世界最大級の半導体受託製造企業。NVIDIAやAppleなど主要チップ企業の製造を担い、先端プロセスと先端パッケージングに強みを持つ。`
- `ai_summary`
  - `先端GPUやAI向け半導体の製造を通じてAI需要に深く関わる。CoWoSなど先端パッケージング需要の拡大が、同社の受注増加につながりやすい。`

---

### 8. 最終チェック項目

出力前に、各銘柄について以下を確認すること。

- 会社説明だけ読んで、何の会社か分かるか
- AI説明だけ読んで、AIとのつながり方が分かるか
- 2つのカラムで同じ内容を繰り返していないか
- 主観的・煽り気味の表現になっていないか
- 初心者が読んでも意味が取れるか

---

## 注意事項

- 本サイトは**投資助言ではない**。スコアはあくまで参考指標
- `ir_url` / `company_url` は空でもOK。後から追加可能
- 同一tickerのデータは常にUPSERTで上書き
- `updated_month` が異なれば別行として蓄積される（履歴保持）
- 文字列中のシングルクォートは `''` にエスケープすること
