-- ============================================================
-- AI銘柄データ投入 SQL  Batch 3/3（銘柄 41〜50社）【最終バッチ】
-- baseMonth: 2026-06  このバッチ: 10社
-- generated: 2026-06-13
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('WDAY', 'Workday Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'HR・財務管理クラウドソフトウェアの大手。大企業の人事・給与・採用・財務計画を一元管理するSaaSとして幅広く採用されており、AI機能の統合で既存顧客へのアップセルが進んでいる。',
   'Workday AIが採用適合度予測・スキルギャップ分析・財務シナリオ生成などを自動化。大企業の基幹SaaSとして安定した顧客基盤にAI機能を組み込み、契約単価の引き上げにつなげている。',
   2, 2, '中程度', true),

  ('ZS', 'Zscaler Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'ゼロトラストセキュリティのクラウドプラットフォームを提供するSaaS企業。インターネットを経由するすべての通信をクラウド上で検査・制御するアーキテクチャが特徴。',
   'Zero Trust Exchange上でAIを活用したリスクスコアリング・脅威検出を提供。AI時代にAIエージェントや生成AIシステムのセキュアなアクセス管理需要が高まっており、クラウドファーストなセキュリティ基盤として需要が続く。',
   2, 2, '中程度', true),

  ('GTLB', 'GitLab Inc.', 'US', 'NASDAQ', 'ai application',
   'DevSecOps（開発・セキュリティ・運用の統合）プラットフォームを提供するSaaS企業。ソフトウェア開発のライフサイクル全体を単一プラットフォームで管理できる点が強み。',
   'GitLab Duo（AIコーディングアシスタント）がコード補完・セキュリティスキャン・テスト生成を自動化。AI時代の開発効率向上ニーズにより企業向けDevOps採用が加速しており、AI開発チームの増加が同社の潜在顧客を広げやすい。',
   2, 2, '中程度', true),

  ('RBRK', 'Rubrik Inc.', 'US', 'NYSE', 'enterprise ai software',
   'クラウドデータセキュリティ・バックアップ・ランサムウェア対策プラットフォームのSaaS企業。AI時代のデータ保護需要で急成長しており、上場後も顧客獲得ペースが加速している。',
   'Ruby AI（AIアシスタント）がランサムウェア攻撃の検知・データ復元を自動化。AIシステムのデータ保護・コンプライアンス対応需要で新規顧客の獲得が加速しており、AI関連のサイバーリスクが高まるほど需要が増えやすい。',
   2, 2, '中程度', true),

  ('NTNX', 'Nutanix Inc.', 'US', 'NASDAQ', 'ai cloud',
   'ハイパーコンバージドインフラ（HCI）・クラウドソフトウェアの大手。オンプレミスとクラウドを統合したハイブリッド環境でAIワークロードを管理するプラットフォームを提供している。',
   'GPT-in-a-Box（オンプレAI推論基盤）でNVIDIA GPUとの統合を提供。ハイブリッドクラウド環境でのAIワークロード管理ニーズに対応し、データセンター内でのAI基盤構築を支援している。',
   2, 2, '中程度', true),

  ('PATH', 'UiPath Inc.', 'US', 'NYSE', 'ai automation/rpa',
   'RPA（ロボティック・プロセス・オートメーション）を主力とする業務自動化プラットフォームを大企業向けに提供する企業。反復的なデジタル業務を自動化するツールとして、金融・製造・ヘルスケアなど幅広い業界に導入されている。',
   '生成AIとRPAを統合したAgentプラットフォームにより、定型的な反復作業に加えて判断を要する業務プロセスも自動化の対象になりつつある。企業のAI導入が進むほど既存のRPA基盤にAI機能を追加する需要が生まれやすく、同社製品の活用範囲が広がりやすい。',
   2, 2, '中程度', true),

  ('TSLA', 'Tesla Inc.', 'US', 'NASDAQ', 'ai application',
   'EVメーカーとして知られるが、FSD（完全自動運転）とDojo AIスーパーコンピュータでAI技術開発を積極的に推進している。OptimusヒューマノイドロボットのAI統合も進めており、「AIロボット企業」としての側面を強調している。',
   'FSD（完全自動運転）の実世界データをAI学習に活用し、Dojo AIクラスターでモデルを自社訓練している。Optimusロボットの量産化に向けたAI統合が進んでおり、自動車を超えた「AI・ロボット企業」としての評価が市場で議論されている。',
   2, 2, '中程度', true),

  ('ACN', 'Accenture plc', 'US', 'NYSE', 'enterprise ai software',
   'IT戦略コンサルティング・デジタル変革支援の世界最大手。AIトランスフォーメーション支援で急成長しており、AIに特化した専門組織を設立して企業のAI導入をエンドツーエンドで支援している。',
   'AIセンターオブエクセレンスとAccenture AI Refinery（AI実装プラットフォーム）で企業のAI導入を全工程で支援。生成AI関連サービス売上が全体の1割超を占めるまで急拡大しており、AIコンサルティング需要の増加が同社の収益に反映されやすい。',
   2, 2, '中程度', true),

  ('VST', 'Vistra Corp.', 'US', 'NYSE', 'data center power/cooling',
   'テキサス州を中心とした大手独立電力会社。原子力・天然ガスなど信頼性の高い電力をAIデータセンター向けに供給する存在として注目されており、ハイパースケーラーとの電力購買契約（PPA）の獲得が進んでいる。',
   'Luminant原子力発電所の再稼働や天然ガス火力発電をAIデータセンターの安定電源として提供。ハイパースケーラーとの長期PPAを通じて安定的な収益を確保しており、AI設備投資の拡大が電力需要増加につながる恩恵を受けやすい。',
   1, 1, '低い', true),

  ('CEG', 'Constellation Energy Corporation', 'US', 'NASDAQ', 'data center power/cooling',
   '米国最大の原子力発電会社。カーボンフリーで安定した電力をAIデータセンター向けに供給する存在として注目されており、Microsoft・Googleなどとの電力購買契約を締結している。',
   'Microsoft・Googleなどとのデータセンター向け原子力PPA（電力購買契約）を締結。Three Mile Island原発の再稼働など脱炭素・安定電源ニーズでAI時代の重要な電力プレイヤーとなっており、AI投資増加が電力需要・収益増につながりやすい。',
   1, 1, '低い', true)

ON CONFLICT (ticker) DO UPDATE SET
  name                 = EXCLUDED.name,
  country              = EXCLUDED.country,
  market               = EXCLUDED.market,
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
WHERE ticker NOT IN (
  'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'AMD', 'AVGO', 'TSM', 'MU', 'SMCI',
  'ASML', 'AMAT', 'LRCX', 'KLAC', 'INTC', 'DELL', 'HPE', 'CRM', 'ORCL', 'QCOM',
  'PLTR', 'SNOW', 'NOW', 'DDOG', 'NET', 'PANW', 'CRWD', 'ANET', 'MDB', 'IBM',
  'ARM', 'MRVL', 'MPWR', 'CDNS', 'SNPS', 'COHR', 'EQIX', 'DLR', 'VRT', 'ETN',
  'WDAY', 'ZS', 'GTLB', 'RBRK', 'NTNX', 'PATH', 'TSLA', 'ACN', 'VST', 'CEG'
);

-- 3. ai_metrics UPSERT
-- スコア計算: ai_expectation_score = round((ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4)
-- tier: confidence_score 90以上→A / 70以上→B / 未満→C
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  -- WDAY: (56+68+60+80)/4 = 66
  ('WDAY', '2026-06', '2026-06', 'B',
   3500, 3500, 3500,
   56, 68, 60, 80, 66),

  -- ZS: (52+70+60+78)/4 = 65
  ('ZS', '2026-06', '2026-06', 'B',
   2600, 2600, 2600,
   52, 70, 60, 78, 65),

  -- GTLB: (44+74+68+75)/4 = 65
  ('GTLB', '2026-06', '2026-06', 'B',
   850, 850, 850,
   44, 74, 68, 75, 65),

  -- RBRK: (52+82+72+76)/4 = 71
  ('RBRK', '2026-06', '2026-06', 'B',
   1100, 1100, 1100,
   52, 82, 72, 76, 71),

  -- NTNX: (48+68+60+75)/4 = 63
  ('NTNX', '2026-06', '2026-06', 'B',
   2000, 2000, 2000,
   48, 68, 60, 75, 63),

  -- PATH: (54+64+78+72)/4 = 67
  ('PATH', '2026-06', '2026-06', 'B',
   1500, 1500, 1500,
   54, 64, 78, 72, 67),

  -- TSLA: (50+72+62+65)/4 = 62
  ('TSLA', '2026-06', '2026-06', 'C',
   5000, 5000, 5000,
   50, 72, 62, 65, 62),

  -- ACN: (60+62+60+76)/4 = 65
  ('ACN', '2026-06', '2026-06', 'B',
   18000, 18000, 18000,
   60, 62, 60, 76, 65),

  -- VST: (44+73+50+73)/4 = 60
  ('VST', '2026-06', '2026-06', 'B',
   5000, 5000, 5000,
   44, 73, 50, 73, 60),

  -- CEG: (40+70+45+72)/4 = 57
  ('CEG', '2026-06', '2026-06', 'B',
   3500, 3500, 3500,
   40, 70, 45, 72, 57)

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
  (SELECT COUNT(*) FROM public.ai_metrics WHERE updated_month = '2026-06') AS metrics_this_month;

COMMIT;
