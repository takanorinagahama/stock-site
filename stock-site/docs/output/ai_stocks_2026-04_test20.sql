-- ============================================================
-- AI銘柄データ投入 SQL
-- baseMonth: 2026-04  companies: 20社（テスト用）
-- generated: 2026-04-02
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('NVDA', 'NVIDIA Corporation', 'US', 'NASDAQ', 'ai accelerator/platform',
   'AI向けGPUの世界的トップ企業。データセンター向けGPUが主力製品で、AIトレーニング・推論の両分野を牽引する。',
   '生成AIモデルの学習・推論に不可欠なGPUを提供し、AI企業の設備投資増加が直接業績に反映される構造を持つ。CUDAエコシステムによる囲い込みで競合優位性が高い。',
   3, 3, '高い', true),

  ('MSFT', 'Microsoft Corporation', 'US', 'NASDAQ', 'ai cloud/platform',
   'AzureクラウドとOpenAI連携によりAI分野でトップクラスの地位を確立した巨大IT企業。Copilot製品群の展開が進む。',
   'OpenAIへの大規模投資を通じてGPT技術をAzureサービスとCopilotに組み込み、企業向けAIソリューションで急拡大している。',
   2, 2, '中程度', true),

  ('GOOGL', 'Alphabet Inc.', 'US', 'NASDAQ', 'ai cloud/platform',
   'Googleの親会社。検索・広告に加え、GeminiモデルとGoogle Cloudを軸にAI事業を急拡大している。',
   '独自のTPUチップとGeminiモデルを開発し、Google Cloud経由で企業向けAIサービスを提供。YouTube・検索へのAI統合も進んでいる。',
   2, 2, '中程度', true),

  ('AMZN', 'Amazon.com Inc.', 'US', 'NASDAQ', 'ai cloud',
   'AWSクラウドが世界最大シェアを持つECおよびクラウド企業。BedrockなどのAI基盤サービスを強化中。',
   'AWS上でBedrock（生成AI基盤）やSageMakerを提供し、法人向けAIクラウドで圧倒的な規模を誇る。独自Trainiumチップも開発している。',
   2, 2, '中程度', true),

  ('META', 'Meta Platforms Inc.', 'US', 'NASDAQ', 'ai application',
   'FacebookやInstagramを運営するSNS最大手。LlamaオープンソースLLMを公開しAI研究でも存在感を示す。',
   'Llamaシリーズの公開で開発者コミュニティを取り込み、広告配信AIの精度向上で収益に貢献。メタバース・ARへのAI統合も進む。',
   2, 2, '中程度', true),

  ('AMD', 'Advanced Micro Devices Inc.', 'US', 'NASDAQ', 'ai accelerator/platform',
   'CPUとGPUの両分野でNVIDIAに次ぐAIチップの有力メーカー。InstinctシリーズGPUをデータセンター向けに拡大中。',
   'MI300XなどのAIアクセラレータでHyperscalerからの受注を獲得。ROCmソフトウェアエコシステムの整備によりNVIDIA代替需要を取り込む戦略を進めている。',
   3, 3, '高い', true),

  ('AVGO', 'Broadcom Inc.', 'US', 'NASDAQ', 'ai network/custom semiconductors',
   'ネットワーク半導体とカスタムAIチップ（ASIC）設計で急成長中の半導体・インフラソフトウェア企業。',
   'Google・Metaなど超大手向けのカスタムAIチップ（XPU）設計と、AIデータセンター内ネットワーク用Ethernetチップで収益が急拡大している。',
   3, 3, '高い', true),

  ('TSM', 'Taiwan Semiconductor Manufacturing Co.', 'US', 'NYSE', 'ai foundry/advanced packaging',
   '世界最大の半導体受託製造企業。NVIDIAやAppleを始め主要AIチップの製造を一手に担う。',
   'CoWoSなど先端パッケージング技術でAI GPU需要に対応し、3nm・2nm世代プロセスの受注が急増。AI関連売上比率が全体の過半数を超えつつある。',
   3, 3, '高い', true),

  ('MU', 'Micron Technology Inc.', 'US', 'NASDAQ', 'ai memory',
   'DRAMおよびNAND型フラッシュメモリの世界大手。AI向けHBM（広帯域メモリ）の需要急増で業績が改善している。',
   'HBM3EなどAI GPU向け高帯域幅メモリで旺盛な需要を獲得。NVIDIAのH100・H200系GPUに搭載され、AI設備投資の恩恵を受けやすい構造にある。',
   3, 3, '高い', true),

  ('SMCI', 'Super Micro Computer Inc.', 'US', 'NASDAQ', 'ai servers/hpc',
   'AI・HPCサーバーの設計・製造を専門とする企業。NVIDIAのGPUクラスターを素早く顧客に届けることで急成長した。',
   'AIデータセンター向けGPUサーバーをフルラック単位で提供し、液冷技術でエネルギー効率を実現。ハイパースケーラーおよびエンタープライズ向けに急拡大している。',
   3, 3, '高い', true),

  ('ASML', 'ASML Holding N.V.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   'EUV（極紫外線）リソグラフィ装置で世界唯一の独占的メーカー。先端AI半導体の製造に不可欠な装置を供給する。',
   '先端ロジック半導体（TSMC・Samsung・Intel向け）のAI向け微細化に必須のEUV装置を独占供給。AI需要に伴う受注残が積み上がっている。',
   2, 2, '中程度', true),

  ('AMAT', 'Applied Materials Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '半導体製造プロセス装置の世界最大手。成膜・エッチング・検査装置でAIチップ製造の裾野を支える。',
   'AI向け先端パッケージングや3D NAND向け装置需要の増加で受注が拡大。ICAPS（IoT・通信・自動車）セグメントにも強みを持つ。',
   2, 2, '中程度', true),

  ('LRCX', 'Lam Research Corporation', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   'エッチング・成膜装置の大手半導体メーカー。3D NANDや先端ロジック向け装置でAI需要の恩恵を受ける。',
   'HBMや先端ロジックの製造に必要なエッチング・薄膜装置を提供し、AI投資サイクルの上流に位置する安定した需要構造を持つ。',
   2, 2, '中程度', true),

  ('KLAC', 'KLA Corporation', 'US', 'NASDAQ', 'semiconductor test',
   '半導体プロセス制御・検査装置の世界大手。チップ製造の歩留まり改善に不可欠な検査・計測システムを提供する。',
   'AI向け先端半導体の微細化が進むほど検査需要が増加する構造。顧客の設備投資が高水準を維持するなかで安定した受注を確保している。',
   2, 2, '中程度', true),

  ('INTC', 'Intel Corporation', 'US', 'NASDAQ', 'semiconductor',
   '半導体の老舗大手。ファウンドリ事業への転換を進めつつ、Gaudi AIアクセラレータで市場参入を図っている。',
   'Gaudi 3 AIアクセラレータとIDM 2.0ファウンドリ戦略でAI市場の取り込みを目指すが、NVIDIAとの差は大きく立て直しが課題。',
   1, 1, '低い', true),

  ('DELL', 'Dell Technologies Inc.', 'US', 'NYSE', 'ai servers/storage',
   'PCとエンタープライズITインフラの大手。PowerEdgeサーバーを軸にAIサーバー受注が急増している。',
   'NVIDIAのGPUを搭載したAIサーバーをエンタープライズ向けに拡販し、ISG（インフラソリューション）部門のAI関連売上が急伸している。',
   2, 2, '中程度', true),

  ('HPE', 'Hewlett Packard Enterprise Co.', 'US', 'NYSE', 'ai servers/hpc',
   'エンタープライズ向けサーバー・ストレージ・ネットワーク機器の大手。Cray HPCシステムでAIスーパーコンピュータ市場にも強い。',
   'GreenLakeクラウドサービスとAI対応サーバーの組み合わせで企業向けAIインフラを提供。NVIDIAパートナーとしてAIクラスター構築需要を取り込んでいる。',
   2, 2, '中程度', true),

  ('CRM', 'Salesforce Inc.', 'US', 'NYSE', 'enterprise ai software',
   'CRM（顧客管理）ソフトウェアの世界最大手。Agentforceと呼ばれるAIエージェント製品の展開を加速している。',
   'AgentforceはAIエージェントが顧客対応・営業支援を自律的に行うプラットフォームで、既存CRM顧客への横展開が進む。Data Cloud連携でデータ活用も強化。',
   2, 2, '中程度', true),

  ('ORCL', 'Oracle Corporation', 'US', 'NYSE', 'ai cloud',
   'データベースソフトウェアの老舗大手がクラウドへ転換中。OCI（Oracle Cloud Infrastructure）のAI需要が急増している。',
   'OCIのGPUクラスター需要がMicrosoft・Googleとの契約で急拡大。コプロセッサとして独自のAIチップ統合も推進しており、クラウドAIの重要プレイヤーとなっている。',
   2, 2, '中程度', true),

  ('QCOM', 'Qualcomm Incorporated', 'US', 'NASDAQ', 'semiconductor',
   'スマートフォン向けSoC（チップセット）の世界大手。オンデバイスAI（エッジAI）処理を推進するSnapdragonシリーズを展開する。',
   'Snapdragon 8 Eliteなど最新SoCに搭載されたNPU（AI演算ユニット）でスマホ・PC上のオンデバイスAI推論を実現。AI PC・IoT向けへの事業拡大を進めている。',
   2, 2, '中程度', true)

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
  'NVDA','MSFT','GOOGL','AMZN','META',
  'AMD','AVGO','TSM','MU','SMCI',
  'ASML','AMAT','LRCX','KLAC','INTC',
  'DELL','HPE','CRM','ORCL','QCOM'
);

-- 3. ai_metrics UPSERT
-- スコア計算ルール:
--   ai_expectation_score = round((ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4)
--   tier: confidence_score 90以上→A / 70以上→B / 未満→C
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  -- NVDA: (100+95+98+95)/4 = 97
  ('NVDA', '2026-04', '2026-04', 'A',
   130000, 130000, 130000,
   100, 95, 98, 95, 97),

  -- MSFT: (82+85+72+90)/4 = 82
  ('MSFT', '2026-04', '2026-04', 'A',
   38000, 38000, 38000,
   82, 85, 72, 90, 82),

  -- GOOGL: (85+80+75+88)/4 = 82
  ('GOOGL', '2026-04', '2026-04', 'B',
   45000, 45000, 45000,
   85, 80, 75, 88, 82),

  -- AMZN: (83+82+68+88)/4 = 80
  ('AMZN', '2026-04', '2026-04', 'B',
   40000, 40000, 40000,
   83, 82, 68, 88, 80),

  -- META: (72+85+65+80)/4 = 76
  ('META', '2026-04', '2026-04', 'B',
   10000, 10000, 10000,
   72, 85, 65, 80, 76),

  -- AMD: (75+80+82+85)/4 = 81
  ('AMD', '2026-04', '2026-04', 'B',
   5000, 5000, 5000,
   75, 80, 82, 85, 81),

  -- AVGO: (82+85+85+88)/4 = 85
  ('AVGO', '2026-04', '2026-04', 'B',
   15000, 15000, 15000,
   82, 85, 85, 88, 85),

  -- TSM: (88+90+90+92)/4 = 90
  ('TSM', '2026-04', '2026-04', 'A',
   35000, 35000, 35000,
   88, 90, 90, 92, 90),

  -- MU: (78+80+82+85)/4 = 81
  ('MU', '2026-04', '2026-04', 'B',
   12000, 12000, 12000,
   78, 80, 82, 85, 81),

  -- SMCI: (80+82+92+72)/4 = 82
  ('SMCI', '2026-04', '2026-04', 'B',
   15000, 15000, 15000,
   80, 82, 92, 72, 82),

  -- ASML: (75+72+65+82)/4 = 74
  ('ASML', '2026-04', '2026-04', 'B',
   8000, 8000, 8000,
   75, 72, 65, 82, 74),

  -- AMAT: (72+70+60+80)/4 = 71
  ('AMAT', '2026-04', '2026-04', 'B',
   7000, 7000, 7000,
   72, 70, 60, 80, 71),

  -- LRCX: (68+65+58+78)/4 = 67
  ('LRCX', '2026-04', '2026-04', 'B',
   4000, 4000, 4000,
   68, 65, 58, 78, 67),

  -- KLAC: (65+62+55+75)/4 = 64
  ('KLAC', '2026-04', '2026-04', 'B',
   2500, 2500, 2500,
   65, 62, 55, 75, 64),

  -- INTC: (45+50+45+65)/4 = 51
  ('INTC', '2026-04', '2026-04', 'C',
   2000, 2000, 2000,
   45, 50, 45, 65, 51),

  -- DELL: (65+70+50+75)/4 = 65
  ('DELL', '2026-04', '2026-04', 'B',
   10000, 10000, 10000,
   65, 70, 50, 75, 65),

  -- HPE: (58+62+52+72)/4 = 61
  ('HPE', '2026-04', '2026-04', 'B',
   3000, 3000, 3000,
   58, 62, 52, 72, 61),

  -- CRM: (65+72+68+78)/4 = 71
  ('CRM', '2026-04', '2026-04', 'B',
   5000, 5000, 5000,
   65, 72, 68, 78, 71),

  -- ORCL: (68+75+62+80)/4 = 71
  ('ORCL', '2026-04', '2026-04', 'B',
   10000, 10000, 10000,
   68, 75, 62, 80, 71),

  -- QCOM: (55+62+55+72)/4 = 61
  ('QCOM', '2026-04', '2026-04', 'B',
   1500, 1500, 1500,
   55, 62, 55, 72, 61)

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
  (SELECT COUNT(*) FROM public.ai_metrics WHERE updated_month = '2026-04') AS metrics_this_month;

COMMIT;
