-- ============================================================
-- AI銘柄データ投入 SQL  Batch 3/5（銘柄 41〜60社）
-- baseMonth: 2026-04  このバッチ: 20社
-- generated: 2026-04-09
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('ARM', 'Arm Holdings plc', 'US', 'NASDAQ', 'semiconductor',
   'スマートフォンからサーバーまで幅広く使われるCPUアーキテクチャ（ARM）の設計・ライセンス企業。AIチップ設計の基盤として地位を高めている。',
   'スマートフォン・IoT・データセンター向けCPUコア設計をライセンス提供し、AI推論チップの大部分がARMアーキテクチャを採用。Neoverse V3シリーズがAIデータセンター向けに急伸している。',
   3, 3, '高い', true),

  ('MRVL', 'Marvell Technology Inc.', 'US', 'NASDAQ', 'ai network/custom semiconductors',
   'AIデータセンター向けカスタムチップ（ASIC）とネットワーク半導体の大手メーカー。Coherent DSP・光インターコネクト分野でも強みを持つ。',
   'AmazonやMicrosoftなどクラウド大手のカスタムAI ASICを受託設計しAI収益が急拡大。PAM4光インターコネクト用DSPで高速データセンター内通信需要を取り込んでいる。',
   3, 3, '高い', true),

  ('MPWR', 'Monolithic Power Systems Inc.', 'US', 'NASDAQ', 'data center power/cooling',
   '高効率電源管理IC（PMIC）の設計・製造を手掛ける半導体企業。AI GPU向け高電力密度電源ソリューションで急成長している。',
   'NVIDIAのBlackwell GPU向け電源ICを供給し、AIサーバーの高電力化に伴うPMIC需要増を享受。48V電源アーキテクチャへの対応でデータセンター電力効率を改善している。',
   2, 2, '中程度', true),

  ('TER', 'Teradyne Inc.', 'US', 'NASDAQ', 'semiconductor test',
   '半導体テスト装置（ATE）および産業用ロボットの大手メーカー。AI向け高帯域幅メモリ・先端SoCのテスト需要が増加している。',
   'HBMやAI推論チップの複雑な電気特性テストに対応した装置を提供。AIデータセンター投資の拡大とともに先端半導体のテスト工程への需要が高まっている。',
   2, 2, '中程度', true),

  ('ENTG', 'Entegris Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '半導体製造向け高純度化学品・フィルター・材料の大手サプライヤー。先端ノード向け材料でAIチップ製造工程を支える。',
   '3nm以降の先端半導体プロセスに必要な超高純度化学品・CMP材料・フォトマスクを供給。AI需要を受けた先端ノード増産に伴い、製造材料の需要も拡大している。',
   2, 2, '中程度', true),

  ('MKSI', 'MKS Instruments Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '半導体製造プロセスに使用されるガス制御・電源・計測システムの大手サプライヤー。先端ロジック・メモリ製造工程を支える。',
   'プラズマエッチング・CVD・ALD工程のプロセス制御機器を提供し、先端AIチップ製造の需要増で受注が拡大。Atotech（PCB材料）との統合でAIサーバー基板材料もカバーする。',
   2, 2, '中程度', true),

  ('ACLS', 'Axcelis Technologies Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   'イオン注入装置の専業メーカー。パワー半導体向け需要のほか、先端ロジック向けでもシェアを伸ばしている。',
   'SiC（炭化ケイ素）パワー半導体向けイオン注入装置でEV・電力インフラ需要を取り込みつつ、AIデータセンター向け先端ロジック半導体の製造にも装置を供給している。',
   2, 2, '中程度', true),

  ('COHR', 'Coherent Corp.', 'US', 'NYSE', 'ai data center optical communications',
   '光通信部品・レーザー技術・半導体材料を手掛ける企業。AIデータセンター間通信の急増で光トランシーバー需要が急拡大している。',
   '800G/1.6T光トランシーバーがAIデータセンター間の高速通信基盤として採用拡大。CrowdStrikeやNVIDIAのネットワーク拡張需要に対応し光インターコネクト売上が急伸している。',
   2, 2, '中程度', true),

  ('LITE', 'Lumentum Holdings Inc.', 'US', 'NASDAQ', 'ai optical communications/photonics',
   '光通信・レーザー・フォトニクス製品の大手メーカー。AIデータセンター向け高速光トランシーバーとLiDARレーザーを提供する。',
   '400G/800G光トランシーバー向けチップ（EML/DFBレーザー）の供給でデータセンター間光通信需要を取り込む。3D Sensing・LiDARレーザーでAR/自動運転分野にも展開している。',
   2, 2, '中程度', true),

  ('ONTO', 'Onto Innovation Inc.', 'US', 'NYSE', 'semiconductor test',
   '半導体ウェーハの光学検査・計測装置を手掛けるメーカー。HBMや先端パッケージング検査需要で成長が加速している。',
   'HBMスタック・高密度ファンアウトパッケージのウェーハ検査に対応した光学計測装置を提供。AI向け先端パッケージングの複雑化に伴い検査工程の需要が増加している。',
   2, 2, '中程度', true),

  ('FORM', 'FormFactor Inc.', 'US', 'NASDAQ', 'semiconductor test',
   'ウェーハプローブカードの大手メーカー。AI向けHBM・先端ロジックのウェーハレベルテストに使用される検査部材を供給する。',
   'HBM・DDR5など高帯域幅メモリのプローブカード需要がAI GPU需要とともに拡大。Cascade Microtech子会社の高周波テストソリューションも先端半導体テストに活用されている。',
   2, 2, '中程度', true),

  ('UCTT', 'Ultra Clean Holdings Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '半導体製造装置向けのサブシステム・部品・洗浄サービスを提供するサプライヤー。主要装置メーカーへのOEM供給が主力。',
   'AMAT・LRCX・TELなど主要半導体装置メーカーへのガスパネル・化学品供給ライン部品を納入し、AI需要に伴う装置増産で受注が拡大している。',
   2, 2, '中程度', true),

  ('CDNS', 'Cadence Design Systems Inc.', 'US', 'NASDAQ', 'semiconductor',
   'EDA（電子設計自動化）ソフトウェアの世界2大メーカーの一角。AIチップの設計・検証ツールで不可欠なポジションを占める。',
   'Cerebrus（AI駆動チップ最適化）やVerifiusツールがAI向けSoC・ASIC設計の複雑化に対応。NVIDIA・クラウド大手のカスタムチップ設計にCadenceツールが採用されている。',
   2, 2, '中程度', true),

  ('SNPS', 'Synopsys Inc.', 'US', 'NASDAQ', 'semiconductor',
   'EDAソフトウェア・半導体IP・セキュリティテストのリーディングカンパニー。AIチップ設計の中核ツールとして業界標準の地位を持つ。',
   'DesignSpaceAI（AI活用設計最適化）でチップ設計サイクルを短縮。Synopsys Silicon LifecycleManagementがAI GPU・ASICの設計品質向上に貢献し、設計ツール需要が旺盛。',
   2, 2, '中程度', true),

  ('MCHP', 'Microchip Technology Inc.', 'US', 'NASDAQ', 'semiconductor',
   'マイコン・FPGA・アナログICの大手半導体メーカー。エッジAI・産業用IoTへの応用で小型AI推論デバイス向け製品を展開する。',
   'PolarFire SoC FPGAがエッジAI推論の低消費電力プラットフォームとして産業・防衛・通信向けに採用拡大。マイコンへのNPU内蔵でエッジデバイスのAI処理を支援している。',
   1, 1, '低い', true),

  ('SWKS', 'Skyworks Solutions Inc.', 'US', 'NASDAQ', 'semiconductor',
   'スマートフォン向けRFチップ（無線通信用半導体）の大手。AI機能を搭載したスマートフォン・IoTデバイスの通信需要を支える。',
   'AI搭載スマートフォンの高度な通信機能（5G・Wi-Fi 7）に対応したRF半導体を供給。IoT・スマートホームデバイスのAI化に伴い接続性需要が底堅く推移している。',
   1, 1, '低い', true),

  ('IPGP', 'IPG Photonics Corporation', 'US', 'NASDAQ', 'ai optical communications/photonics',
   'ファイバーレーザーと光増幅器の世界的大手メーカー。AIデータセンター向け光インターコネクト用レーザーの需要増加で注目されている。',
   '高出力ファイバーレーザー・光増幅器がデータセンター光ネットワークの増幅器として採用。AIデータセンターの光通信インフラ拡大に伴い、通信用レーザーの需要が高まっている。',
   2, 2, '中程度', true),

  ('WOLF', 'Wolfspeed Inc.', 'US', 'NYSE', 'semiconductor',
   'SiC（炭化ケイ素）パワー半導体の大手メーカー。EV・再生可能エネルギー・AIデータセンター電源向けに高効率パワーデバイスを供給する。',
   'SiCパワーデバイスがAIデータセンターの電源変換効率改善に貢献。EV・太陽光インバーター向け需要が主力だが、データセンター電力インフラ向けの展開も拡大している。',
   1, 1, '低い', true),

  ('ALGM', 'Allegro MicroSystems Inc.', 'US', 'NASDAQ', 'semiconductor',
   '電流・位置センサーICおよびモータードライバーICの大手メーカー。自動車・産業用途のセンシングでAI応用が拡大している。',
   '自動運転向け電流・磁気センサーICがADAS（先進運転支援）システムに採用。産業ロボット・EV向けのモータードライバーICでAI化が進む製造・輸送分野の需要を取り込んでいる。',
   1, 1, '低い', true),

  ('SLAB', 'Silicon Laboratories Inc.', 'US', 'NASDAQ', 'semiconductor',
   'IoT・スマートホーム・産業向け無線接続チップの大手。エッジAIデバイスの無線通信基盤を支えるWi-Fi・Bluetooth・Zigbeeチップを提供する。',
   'Matter規格対応のスマートホームIoTチップがAIアシスタント連携デバイスの通信基盤に採用。産業用IoTのAI化に伴い低消費電力のエッジ接続需要が底堅く推移している。',
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

-- 2. ai_metrics UPSERT
-- スコア計算: ai_expectation_score = round((ai_revenue_score + ai_growth_score + ai_dependency_score + confidence_score) / 4)
-- tier: confidence_score 90以上→A / 70以上→B / 未満→C
INSERT INTO public.ai_metrics
  (ticker, updated_month, fiscal_period, tier,
   ai_rev_low, ai_rev_high, ai_rev_mid,
   ai_revenue_score, ai_growth_score, ai_dependency_score,
   confidence_score, ai_expectation_score)
VALUES
  -- ARM: (72+85+80+88)/4 = 81
  ('ARM', '2026-04', '2026-04', 'B',
   4000, 4000, 4000,
   72, 85, 80, 88, 81),

  -- MRVL: (68+85+80+85)/4 = 80
  ('MRVL', '2026-04', '2026-04', 'B',
   3500, 3500, 3500,
   68, 85, 80, 85, 80),

  -- MPWR: (62+75+70+80)/4 = 72
  ('MPWR', '2026-04', '2026-04', 'B',
   2200, 2200, 2200,
   62, 75, 70, 80, 72),

  -- TER: (55+60+55+75)/4 = 61
  ('TER', '2026-04', '2026-04', 'B',
   1800, 1800, 1800,
   55, 60, 55, 75, 61),

  -- ENTG: (50+62+52+72)/4 = 59
  ('ENTG', '2026-04', '2026-04', 'B',
   1500, 1500, 1500,
   50, 62, 52, 72, 59),

  -- MKSI: (48+58+50+70)/4 = 57
  ('MKSI', '2026-04', '2026-04', 'B',
   1200, 1200, 1200,
   48, 58, 50, 70, 57),

  -- ACLS: (45+55+50+68)/4 = 55
  ('ACLS', '2026-04', '2026-04', 'C',
   900, 900, 900,
   45, 55, 50, 68, 55),

  -- COHR: (60+80+72+78)/4 = 73
  ('COHR', '2026-04', '2026-04', 'B',
   1800, 1800, 1800,
   60, 80, 72, 78, 73),

  -- LITE: (55+78+68+75)/4 = 69
  ('LITE', '2026-04', '2026-04', 'B',
   1200, 1200, 1200,
   55, 78, 68, 75, 69),

  -- ONTO: (45+58+52+70)/4 = 56
  ('ONTO', '2026-04', '2026-04', 'B',
   700, 700, 700,
   45, 58, 52, 70, 56),

  -- FORM: (40+52+48+68)/4 = 52
  ('FORM', '2026-04', '2026-04', 'C',
   400, 400, 400,
   40, 52, 48, 68, 52),

  -- UCTT: (42+55+50+65)/4 = 53
  ('UCTT', '2026-04', '2026-04', 'C',
   550, 550, 550,
   42, 55, 50, 65, 53),

  -- CDNS: (70+78+72+85)/4 = 76
  ('CDNS', '2026-04', '2026-04', 'B',
   4500, 4500, 4500,
   70, 78, 72, 85, 76),

  -- SNPS: (72+75+72+85)/4 = 76
  ('SNPS', '2026-04', '2026-04', 'B',
   4800, 4800, 4800,
   72, 75, 72, 85, 76),

  -- MCHP: (42+50+45+72)/4 = 52
  ('MCHP', '2026-04', '2026-04', 'B',
   1000, 1000, 1000,
   42, 50, 45, 72, 52),

  -- SWKS: (38+50+42+68)/4 = 50
  ('SWKS', '2026-04', '2026-04', 'C',
   800, 800, 800,
   38, 50, 42, 68, 50),

  -- IPGP: (45+65+60+72)/4 = 61
  ('IPGP', '2026-04', '2026-04', 'B',
   600, 600, 600,
   45, 65, 60, 72, 61),

  -- WOLF: (30+55+45+60)/4 = 48
  ('WOLF', '2026-04', '2026-04', 'C',
   350, 350, 350,
   30, 55, 45, 60, 48),

  -- ALGM: (40+58+50+68)/4 = 54
  ('ALGM', '2026-04', '2026-04', 'C',
   450, 450, 450,
   40, 58, 50, 68, 54),

  -- SLAB: (35+52+45+68)/4 = 50
  ('SLAB', '2026-04', '2026-04', 'C',
   380, 380, 380,
   35, 52, 45, 68, 50)

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
