-- ============================================================
-- AI銘柄データ投入 SQL  Batch 2/3（銘柄 21〜40社）
-- baseMonth: 2026-06  このバッチ: 20社
-- generated: 2026-06-13
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('PLTR', 'Palantir Technologies Inc.', 'US', 'NASDAQ', 'ai application',
   'ビッグデータ解析とAI意思決定プラットフォームを政府機関・民間企業向けに提供するソフトウェア企業。AIP（AI Platform）が主力製品で、米国防省や情報機関を主要顧客として持つ。',
   'AIP（AI Platform）が業務システムにLLMを組み込む基盤として企業・政府機関向けに採用されており、AI需要の拡大が直接的に売上に反映されやすい事業構造を持つ。政府・商業の両部門でAI活用案件が増えており、AI予算の拡大が同社の収益につながりやすい。',
   3, 3, '高い', true),

  ('SNOW', 'Snowflake Inc.', 'US', 'NYSE', 'ai data infrastructure',
   'クラウドネイティブなデータウェアハウスを提供するSaaS企業。複数のクラウド環境にまたがるデータを一元管理・分析できる基盤として、大企業を中心に採用されている。',
   'Snowflake Cortex AIがデータウェアハウス上でのLLM推論やベクトル埋め込み生成を可能にしており、企業データを活用したAIアプリケーション構築の基盤として採用が広がっている。AIアプリ開発の増加がSnowflakeの処理量（クレジット消費）に直結しやすい構造がある。',
   2, 2, '中程度', true),

  ('NOW', 'ServiceNow Inc.', 'US', 'NYSE', 'enterprise ai software',
   'IT・HR・顧客対応などの業務プロセスを自動化するクラウドプラットフォームを大企業・政府機関向けに提供する企業。ITサービス管理（ITSM）の分野で強い顧客基盤を持つ。',
   'Now AssistがITサービス管理・HR・顧客対応などの各ワークフローにAIを統合しており、既存顧客へのアップセル（上位プラン移行）でAI機能の収益化が進んでいる。AIエージェントの自律実行機能の強化で活用範囲が広がっている。',
   2, 2, '中程度', true),

  ('DDOG', 'Datadog Inc.', 'US', 'NASDAQ', 'ai infrastructure',
   'クラウドアプリケーションの監視・ログ分析・セキュリティを統合したプラットフォームを提供するSaaS企業。インフラ・アプリ・セキュリティのオブザーバビリティ分野で、クラウド移行企業を中心に採用が広がっている。',
   'LLMオブザーバビリティ機能がAIアプリケーションのパフォーマンスやコストを可視化するツールとして採用されている。企業がAIシステムを本番導入するほど監視・管理の需要が増えるため、AI活用の普及が同社の利用拡大につながりやすい。',
   2, 2, '中程度', true),

  ('NET', 'Cloudflare Inc.', 'US', 'NYSE', 'ai infrastructure',
   'グローバルにCDN・DDoS対策・ゼロトラストセキュリティ・クラウドネットワークを提供するIT企業。世界各地のエッジロケーションを持つネットワークインフラが事業基盤となっている。',
   'Workers AIプラットフォームがエッジロケーションでのAIモデル推論を可能にしており、低遅延が求められるAIアプリケーションの実行基盤として開発者向けに利用が広がっている。AIエージェントのインターネット上の通信セキュリティ需要でも存在感が高まっている。',
   2, 2, '中程度', true),

  ('PANW', 'Palo Alto Networks Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'クラウド・ネットワーク・エンドポイントの各分野にわたるサイバーセキュリティプラットフォームを提供する企業。Prisma CloudやCortex XDRなど複数製品ラインを持ち、大企業・政府機関向けに幅広く展開している。',
   'PrecisionAIが脅威の検出・対応を自動化しており、AI時代のサイバー攻撃対策として採用が広がっている。プラットフォーム統合戦略（platformization）が顧客の複数製品採用を促進し、ARR成長を支えている。',
   2, 2, '中程度', true),

  ('CRWD', 'CrowdStrike Holdings Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'エンドポイントおよびクラウドワークロード向けサイバーセキュリティプラットフォームを提供する企業。Falconプラットフォームが主力製品で、エンドポイント保護（EDR/XDR）市場で存在感を持つ。2024年のシステム障害からの顧客回復が続いている。',
   'Falcon AIが機械学習でゼロデイ脅威の検知・遮断を自律的に行い、セキュリティアナリストの作業効率向上に活用されている。クラウド移行企業やAI活用企業のセキュリティ需要が増えるほど、同社の潜在顧客が広がりやすい。',
   2, 2, '中程度', true),

  ('ANET', 'Arista Networks Inc.', 'US', 'NYSE', 'ai network/optical communications',
   'クラウドデータセンター向けイーサネットスイッチ・ルーターを設計・販売するネットワーク機器企業。Meta・Microsoft・Googleなどのハイパースケーラーを主要顧客として持ち、AIクラスター向けネットワーク需要が急拡大している。',
   'Ultra Ethernetコンソーシアムの主要メンバーとしてAI GPU間通信の標準規格策定を進めており、AIクラスターネットワークにおけるEthernet採用拡大が同社の需要増につながりやすい。ハイパースケーラーのAIデータセンター拡張が続く局面では高速スイッチ需要が増えやすい。',
   2, 2, '中程度', true),

  ('MDB', 'MongoDB Inc.', 'US', 'NASDAQ', 'ai data infrastructure',
   'NoSQLドキュメントデータベースMongoDBを提供するクラウドデータベース企業。マネージドサービスのMongoDB Atlasを軸に、スタートアップから大企業まで幅広く採用されている。',
   'MongoDB AtlasのベクトルSearch機能がRAG（検索拡張生成）アプリケーションのデータ基盤として採用が広がっており、生成AIアプリの開発・普及が同社の利用量増加につながりやすい。AIアプリのバックエンドとして選ばれるほど、Atlasの処理量と契約件数が増えやすい。',
   2, 2, '中程度', true),

  ('IBM', 'International Business Machines Corp.', 'US', 'NYSE', 'ai cloud/platform',
   'エンタープライズIT・コンサルティングの老舗大手。watsonxプラットフォームで企業向け生成AI基盤の構築を支援する。HashiCorpの買収でクラウドインフラ自動化の領域も強化している。',
   'watsonx.aiがオープンソースLLMをエンタープライズ環境に安全に展開する基盤を提供。ハイブリッドクラウド戦略とAIコンサルティングサービスで大企業の生成AI導入を主導しており、大型顧客の多さが安定収益につながりやすい。',
   2, 2, '中程度', true),

  ('ARM', 'Arm Holdings plc', 'US', 'NASDAQ', 'semiconductor',
   'スマートフォンからサーバーまで幅広く使われるCPUアーキテクチャ（ARM）の設計・ライセンス企業。AIチップ設計の基盤として地位を高めており、ロイヤルティ収入がAIチップの普及とともに拡大している。',
   'スマートフォン・IoT・データセンター向けCPUコア設計をライセンス提供し、AI推論チップの大部分がARMアーキテクチャを採用。Neoverse V3シリーズがAIデータセンター向けに急伸し、AIチップ1個売れるごとにロイヤルティが積み上がる構造を持つ。',
   3, 3, '高い', true),

  ('MRVL', 'Marvell Technology Inc.', 'US', 'NASDAQ', 'ai network/custom semiconductors',
   'AIデータセンター向けカスタムチップ（ASIC）とネットワーク半導体の大手メーカー。AmazonやMicrosoftなどクラウド大手のカスタムAI ASICを受託設計し、AI収益が急拡大している。',
   'クラウド大手のカスタムAI ASICを受託設計しており、顧客のAIインフラ拡大が同社の売上に直結しやすい構造を持つ。PAM4光インターコネクト用DSPで高速データセンター内通信需要を取り込んでおり、AI関連売上比率が全体の過半数を超えてきている。',
   3, 3, '高い', true),

  ('MPWR', 'Monolithic Power Systems Inc.', 'US', 'NASDAQ', 'data center power/cooling',
   '高効率電源管理IC（PMIC）の設計・製造を手掛ける半導体企業。AI GPU向け高電力密度電源ソリューションで急成長しており、NVIDIAの最新世代GPUとの協力関係が深い。',
   'NVIDIAのBlackwell GPU向け電源ICを供給し、AIサーバーの高電力化に伴うPMIC需要増を享受。48V電源アーキテクチャへの対応でデータセンター電力効率を改善しており、AIサーバー1台あたりの電源IC搭載量が増加傾向にある。',
   2, 2, '中程度', true),

  ('CDNS', 'Cadence Design Systems Inc.', 'US', 'NASDAQ', 'semiconductor',
   'EDA（電子設計自動化）ソフトウェアの世界2大メーカーの一角。AIチップの設計・検証ツールで不可欠なポジションを占めており、Cerebrus AIツールでチップ設計の自動化も推進している。',
   'Cerebrus（AI駆動チップ最適化）やVerifiusツールがAI向けSoC・ASIC設計の複雑化に対応。NVIDIA・クラウド大手のカスタムチップ設計にCadenceツールが採用されており、AIチップの複雑化・大型化がEDA需要を底上げしている。',
   2, 2, '中程度', true),

  ('SNPS', 'Synopsys Inc.', 'US', 'NASDAQ', 'semiconductor',
   'EDAソフトウェア・半導体IP・セキュリティテストのリーディングカンパニー。AIチップ設計の中核ツールとして業界標準の地位を持つ。ANSYSの買収によりシミュレーション領域でも存在感を強化している。',
   'DesignSpaceAI（AI活用設計最適化）でチップ設計サイクルを短縮。AI GPUやカスタムASICの設計が高度化するほどEDAツールの需要が増えやすく、設計ライセンス・IPロイヤルティの両面で恩恵を受けやすい。',
   2, 2, '中程度', true),

  ('COHR', 'Coherent Corp.', 'US', 'NYSE', 'ai data center optical communications',
   '光通信部品・レーザー技術・半導体材料を手掛ける企業。AIデータセンター間通信の急増で800G・1.6T光トランシーバー需要が急拡大しており、業績が大きく改善している。',
   '800G/1.6T光トランシーバーがAIデータセンター間の高速通信基盤として採用拡大。AI設備投資の増加とともにデータセンター間の帯域要求が急上昇しており、光インターコネクト売上が急伸している。',
   2, 2, '中程度', true),

  ('EQIX', 'Equinix Inc.', 'US', 'NASDAQ', 'data center/interconnect',
   '世界最大のコロケーションデータセンターREIT兼事業会社。AI時代に急増するデータセンター需要の恩恵を直接受けており、世界70都市以上で施設を展開している。',
   'AIトレーニング・推論に必要な大規模データセンター施設を世界主要都市で提供。ハイパースケーラーとのインターコネクト需要が増加し、AIインフラの物理基盤として不可欠な存在となっている。',
   2, 2, '中程度', true),

  ('DLR', 'Digital Realty Trust Inc.', 'US', 'NYSE', 'data center/interconnect',
   'グローバルデータセンターREITの大手。AI向けコンピューティング需要の拡大でデータセンター施設の賃貸需要が急増しており、超大型（ハイパースケール）施設への投資を加速している。',
   'ServiceFabricプラットフォームがデータセンター間の相互接続を提供し、AIワークロードのハイブリッドクラウド展開を支援。超大型施設への長期賃貸契約がAIインフラ投資増加とともに積み上がっている。',
   2, 2, '中程度', true),

  ('VRT', 'Vertiv Holdings Co.', 'US', 'NYSE', 'data center power/cooling',
   'データセンター向け電力・冷却・IT管理インフラのリーディングカンパニー。AIサーバーの高発熱に対応した液冷ソリューションで急成長しており、受注残が拡大している。',
   'AIデータセンターのGPUラック向け液冷システム（直接液冷/浸漬冷却）の需要が急増。UPS・PDU・熱管理システムでデータセンター電力インフラをトータルで提供しており、AI設備投資の拡大が受注増に直結しやすい構造がある。',
   2, 2, '中程度', true),

  ('ETN', 'Eaton Corporation plc', 'US', 'NYSE', 'data center power equipment',
   '電力管理・電気システムの大手産業コングロマリット。AIデータセンター向けUPS・電力分配ユニット・スイッチギアの需要増で恩恵を受けており、データセンター向け電気設備の主要サプライヤーとして位置づけられている。',
   'データセンター向け高電圧電力分配システム・UPSの需要がAI設備投資増加で急拡大。次世代480V電力アーキテクチャへの対応でAIデータセンター電力効率改善を支援しており、AI関連受注が事業全体の成長を牽引している。',
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

-- 2. ai_metrics UPSERT
-- スコア計算: ai_expectation_score = round((ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4)
-- tier: confidence_score 90以上→A / 70以上→B / 未満→C
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  -- PLTR: (78+87+90+83)/4 = 85
  ('PLTR', '2026-06', '2026-06', 'B',
   3200, 3200, 3200,
   78, 87, 90, 83, 85),

  -- SNOW: (62+80+70+78)/4 = 73
  ('SNOW', '2026-06', '2026-06', 'B',
   3800, 3800, 3800,
   62, 80, 70, 78, 73),

  -- NOW: (70+84+72+85)/4 = 78
  ('NOW', '2026-06', '2026-06', 'B',
   6000, 6000, 6000,
   70, 84, 72, 85, 78),

  -- DDOG: (66+82+75+80)/4 = 76
  ('DDOG', '2026-06', '2026-06', 'B',
   2700, 2700, 2700,
   66, 82, 75, 80, 76),

  -- NET: (46+86+60+78)/4 = 68
  ('NET', '2026-06', '2026-06', 'B',
   1800, 1800, 1800,
   46, 86, 60, 78, 68),

  -- PANW: (60+74+65+80)/4 = 70
  ('PANW', '2026-06', '2026-06', 'B',
   4500, 4500, 4500,
   60, 74, 65, 80, 70),

  -- CRWD: (63+79+68+82)/4 = 73
  ('CRWD', '2026-06', '2026-06', 'B',
   4200, 4200, 4200,
   63, 79, 68, 82, 73),

  -- ANET: (72+85+75+88)/4 = 80
  ('ANET', '2026-06', '2026-06', 'B',
   8000, 8000, 8000,
   72, 85, 75, 88, 80),

  -- MDB: (50+75+62+78)/4 = 66
  ('MDB', '2026-06', '2026-06', 'B',
   2100, 2100, 2100,
   50, 75, 62, 78, 66),

  -- IBM: (65+60+55+80)/4 = 65
  ('IBM', '2026-06', '2026-06', 'B',
   7000, 7000, 7000,
   65, 60, 55, 80, 65),

  -- ARM: (74+87+80+88)/4 = 82
  ('ARM', '2026-06', '2026-06', 'B',
   4500, 4500, 4500,
   74, 87, 80, 88, 82),

  -- MRVL: (70+88+82+86)/4 = 82
  ('MRVL', '2026-06', '2026-06', 'B',
   4200, 4200, 4200,
   70, 88, 82, 86, 82),

  -- MPWR: (64+76+70+80)/4 = 73
  ('MPWR', '2026-06', '2026-06', 'B',
   2400, 2400, 2400,
   64, 76, 70, 80, 73),

  -- CDNS: (72+79+72+85)/4 = 77
  ('CDNS', '2026-06', '2026-06', 'B',
   5000, 5000, 5000,
   72, 79, 72, 85, 77),

  -- SNPS: (73+76+72+85)/4 = 77
  ('SNPS', '2026-06', '2026-06', 'B',
   5200, 5200, 5200,
   73, 76, 72, 85, 77),

  -- COHR: (62+82+72+78)/4 = 74
  ('COHR', '2026-06', '2026-06', 'B',
   2200, 2200, 2200,
   62, 82, 72, 78, 74),

  -- EQIX: (66+73+70+82)/4 = 73
  ('EQIX', '2026-06', '2026-06', 'B',
   9000, 9000, 9000,
   66, 73, 70, 82, 73),

  -- DLR: (62+70+65+80)/4 = 69
  ('DLR', '2026-06', '2026-06', 'B',
   6000, 6000, 6000,
   62, 70, 65, 80, 69),

  -- VRT: (70+85+75+83)/4 = 78
  ('VRT', '2026-06', '2026-06', 'B',
   8500, 8500, 8500,
   70, 85, 75, 83, 78),

  -- ETN: (54+70+55+78)/4 = 64
  ('ETN', '2026-06', '2026-06', 'B',
   6500, 6500, 6500,
   54, 70, 55, 78, 64)

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
