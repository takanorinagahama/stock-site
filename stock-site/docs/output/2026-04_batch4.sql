-- ============================================================
-- AI銘柄データ投入 SQL  Batch 4/5（銘柄 61〜80社）
-- baseMonth: 2026-04  このバッチ: 20社
-- generated: 2026-04-09
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('EQIX', 'Equinix Inc.', 'US', 'NASDAQ', 'data center/interconnect',
   '世界最大のコロケーションデータセンターREIT兼事業会社。AI時代に急増するデータセンター需要の恩恵を直接受けている。',
   'AIトレーニング・推論に必要な大規模データセンター施設を世界70都市以上で提供。ハイパースケーラーとのインターコネクト需要が増加し、AIインフラの物理基盤として不可欠な存在。',
   2, 2, '中程度', true),

  ('DLR', 'Digital Realty Trust Inc.', 'US', 'NYSE', 'data center/interconnect',
   'グローバルデータセンターREITの大手。AI向けコンピューティング需要の拡大でデータセンター施設の賃貸需要が急増している。',
   'ServiceFabricプラットフォームがデータセンター間の相互接続を提供し、AIワークロードのハイブリッドクラウド展開を支援。超大型（ハイパースケール）施設への投資を加速している。',
   2, 2, '中程度', true),

  ('VRT', 'Vertiv Holdings Co.', 'US', 'NYSE', 'data center power/cooling',
   'データセンター向け電力・冷却・IT管理インフラのリーディングカンパニー。AIサーバーの高発熱に対応した液冷ソリューションで急成長している。',
   'AIデータセンターのGPUラック向け液冷システム（直接液冷/浸漬冷却）の需要が急増。UPS・PDU・熱管理システムでデータセンター電力インフラをトータルで提供している。',
   2, 2, '中程度', true),

  ('VST', 'Vistra Corp.', 'US', 'NYSE', 'data center power/cooling',
   'テキサス州を中心とした大手独立電力会社。原子力・天然ガスなど信頼性の高い電力をAIデータセンター向けに供給する。',
   'Luminant原子力発電所の再稼働検討やガス火力発電をAIデータセンターの安定電源として提供。ハイパースケーラーとの長期電力購買契約（PPA）の獲得が進んでいる。',
   1, 1, '低い', true),

  ('CEG', 'Constellation Energy Corporation', 'US', 'NASDAQ', 'data center power/cooling',
   '米国最大の原子力発電会社。カーボンフリーで安定した電力をAIデータセンター向けに供給する存在として注目されている。',
   'Microsoft・Googleなどとのデータセンター向け原子力PPA（電力購買契約）を締結。Three Mile Island原発の再稼働など脱炭素・安定電源ニーズでAI時代の重要プレイヤーとなっている。',
   1, 1, '低い', true),

  ('ETN', 'Eaton Corporation plc', 'US', 'NYSE', 'data center power equipment',
   '電力管理・電気システムの大手産業コングロマリット。AIデータセンター向けUPS・電力分配ユニット・スイッチギアの需要増で恩恵を受けている。',
   'データセンター向け高電圧電力分配システム・UPSの需要がAI設備投資増加で急拡大。次世代480V電力アーキテクチャへの対応でAIデータセンター電力効率改善を支援している。',
   2, 2, '中程度', true),

  ('PWR', 'Quanta Services Inc.', 'US', 'NYSE', 'smart infrastructure/automation',
   '電力・通信・パイプラインインフラの設計・施工・保守を手掛ける大手エンジニアリング企業。AIデータセンター向け電力網整備の恩恵を受けている。',
   'AIデータセンード増設に伴う送電線・変電所の新設・増強工事を受注。再生可能エネルギーの系統接続工事でも成長しており、インフラ整備需要の上流に位置する。',
   1, 1, '低い', true),

  ('ROK', 'Rockwell Automation Inc.', 'US', 'NYSE', 'ai automation/rpa',
   '産業用オートメーション・情報ソリューションの大手メーカー。製造業向けAI・デジタルツインソリューションで工場の知能化を支援する。',
   'Plex（製造実行システム）とFactoryTalk AI製品群で製造業のスマートファクトリー化を推進。産業用ロボット・PLC制御にAIを統合しOT（運用技術）のデジタル変革を主導している。',
   2, 2, '中程度', true),

  ('HON', 'Honeywell International Inc.', 'US', 'NASDAQ', 'smart infrastructure/automation',
   'ビル管理・産業オートメーション・航空宇宙・セキュリティの大手コングロマリット。Honeywell Forge AIで各分野の自動化・最適化を推進している。',
   'Honeywell Forge AIがビル設備・プラント・倉庫の運用最適化をAIで実現。AI向けデータセンターの建物管理システム（BMS）やプロセス制御自動化で需要が拡大している。',
   2, 2, '中程度', true),

  ('EMR', 'Emerson Electric Co.', 'US', 'NYSE', 'power/automation',
   'プロセス制御・産業オートメーション・暖冷房設備の大手メーカー。DeltaVプラットフォームにAIを統合し化学・石油ガスプラントの自動化を推進する。',
   'DeltaV AIがプロセス制御の異常検知・予測保全を自律化し、AI化が進む石油精製・LNG・化学工場向けに採用が拡大。Aspentech連携でデジタルツイン・AIシミュレーションも強化している。',
   2, 2, '中程度', true),

  ('GTLB', 'GitLab Inc.', 'US', 'NASDAQ', 'ai application',
   'DevSecOps（開発・セキュリティ・運用の統合）プラットフォームを提供するSaaS企業。GitLab Duo AIがコーディングを支援する。',
   'GitLab Duo（AI コーディングアシスタント）がコード補完・セキュリティスキャン・テスト生成を自動化。AI時代の開発効率向上ニーズにより企業向けDevOps採用が加速している。',
   2, 2, '中程度', true),

  ('RBRK', 'Rubrik Inc.', 'US', 'NYSE', 'enterprise ai software',
   'クラウドデータセキュリティ・バックアップ・ランサムウェア対策プラットフォームのSaaS企業。AI時代のデータ保護需要で急成長している。',
   'Ruby AI（AIアシスタント）がランサムウェア攻撃の検知・データ復元を自動化。AIシステムのデータ保護・コンプライアンス対応需要で新規顧客の獲得が加速している。',
   2, 2, '中程度', true),

  ('NTNX', 'Nutanix Inc.', 'US', 'NASDAQ', 'ai cloud',
   'ハイパーコンバージドインフラ（HCI）・クラウドソフトウェアの大手。オンプレミスとクラウドを統合したAIワークロード基盤を提供する。',
   'GPT-in-a-Box（オンプレAI推論基盤）でNVIDIA GPUとの統合を提供。ハイブリッドクラウド環境でのAIワークロード管理ニーズに対応し、エンタープライズのAI基盤構築を支援している。',
   2, 2, '中程度', true),

  ('PEGA', 'Pegasystems Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   '業務プロセス管理（BPM）・低コードアプリ開発・CRMの大手SaaS企業。Pega GenAIによりビジネスプロセスに生成AIを統合している。',
   'Pega GenAIが顧客対応・クレーム処理・ローン審査などの業務プロセスにAIエージェントを組み込み自動化。低コードプラットフォームとAIの統合でエンタープライズのDXを推進している。',
   2, 2, '中程度', true),

  ('NICE', 'NICE Ltd.', 'US', 'NASDAQ', 'enterprise ai software',
   'コンタクトセンターAIおよびコンプライアンス向けクラウドソリューションを提供するイスラエル系SaaS企業。CXoneがコール対応のAI化を主導している。',
   'CXone AIがコンタクトセンターの音声認識・感情分析・自動応答を提供し、カスタマーサービスのAI化需要で急拡大。金融機関向けコンプライアンス監視AIでも高いシェアを持つ。',
   2, 2, '中程度', true),

  ('VRNT', 'Verint Systems Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'カスタマーエンゲージメントAIおよびセキュリティインテリジェンスソリューションを提供するSaaS企業。コンタクトセンターAIの分野で競合する。',
   'Verint Open Platform上のAIボットがコンタクトセンターの通話・テキスト対応を自動化。顧客体験分析・品質管理のAI化ソリューションで金融・通信・小売業に展開している。',
   2, 2, '中程度', true),

  ('UPST', 'Upstart Holdings Inc.', 'US', 'NASDAQ', 'ai application',
   'AIを活用したオルタナティブ信用評価・個人ローンプラットフォームの企業。従来のFICOスコアに代わるAI審査モデルを金融機関に提供する。',
   'AIによる信用審査モデルが従来の審査より高精度な貸し倒れ予測を実現し、銀行・信用組合に組み込みAPIで提供。金利サイクルの影響を受けながらもAI審査精度の高さで差別化している。',
   3, 3, '高い', true),

  ('HUBB', 'Hubbell Incorporated', 'US', 'NYSE', 'data center power equipment',
   '電気・通信インフラ向け電気製品・配電機器の大手メーカー。データセンター向け電力分配製品でAI設備投資の恩恵を受けている。',
   'AIデータセンター向け高電圧配電盤・PDU（電力分配ユニット）・接続器の需要が増加。送電網のAI化・スマートグリッド向け製品でもインフラデジタル化の波を受けている。',
   1, 1, '低い', true),

  ('BBAI', 'BigBear.ai Holdings Inc.', 'US', 'NYSE', 'ai application',
   '政府・防衛・重要インフラ向けのAI意思決定支援システムを提供する企業。サプライチェーン最適化・予測分析を専門とする。',
   '米国防省・情報機関向けにサプライチェーン視覚化・脅威分析AIを提供。政府のAI予算増加とともに受注が拡大しており、防衛AIの専業企業として存在感を高めている。',
   3, 3, '高い', true),

  ('RNG', 'RingCentral Inc.', 'US', 'NYSE', 'ai application',
   'クラウドベースのユニファイドコミュニケーション（UCaaS）プラットフォームの大手。RingCX AIがコンタクトセンター対応を自動化している。',
   'RingCX（AIコンタクトセンター）がリアルタイム文字起こし・要約・AI応答を提供。企業のコミュニケーション基盤としてAI機能統合を加速し、既存顧客のアップグレード需要を取り込んでいる。',
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
  -- EQIX: (65+72+70+82)/4 = 72
  ('EQIX', '2026-04', '2026-04', 'B',
   8500, 8500, 8500,
   65, 72, 70, 82, 72),

  -- DLR: (60+68+65+80)/4 = 68
  ('DLR', '2026-04', '2026-04', 'B',
   5500, 5500, 5500,
   60, 68, 65, 80, 68),

  -- VRT: (68+82+75+82)/4 = 77
  ('VRT', '2026-04', '2026-04', 'B',
   7500, 7500, 7500,
   68, 82, 75, 82, 77),

  -- VST: (42+72+50+72)/4 = 59
  ('VST', '2026-04', '2026-04', 'B',
   4500, 4500, 4500,
   42, 72, 50, 72, 59),

  -- CEG: (38+68+45+70)/4 = 55
  ('CEG', '2026-04', '2026-04', 'B',
   3200, 3200, 3200,
   38, 68, 45, 70, 55),

  -- ETN: (52+68+55+78)/4 = 63
  ('ETN', '2026-04', '2026-04', 'B',
   6000, 6000, 6000,
   52, 68, 55, 78, 63),

  -- PWR: (45+65+48+75)/4 = 58
  ('PWR', '2026-04', '2026-04', 'B',
   3000, 3000, 3000,
   45, 65, 48, 75, 58),

  -- ROK: (50+65+60+75)/4 = 63
  ('ROK', '2026-04', '2026-04', 'B',
   2000, 2000, 2000,
   50, 65, 60, 75, 63),

  -- HON: (48+62+52+78)/4 = 60
  ('HON', '2026-04', '2026-04', 'B',
   4000, 4000, 4000,
   48, 62, 52, 78, 60),

  -- EMR: (45+60+50+75)/4 = 58
  ('EMR', '2026-04', '2026-04', 'B',
   2500, 2500, 2500,
   45, 60, 50, 75, 58),

  -- GTLB: (42+72+68+75)/4 = 64
  ('GTLB', '2026-04', '2026-04', 'B',
   750, 750, 750,
   42, 72, 68, 75, 64),

  -- RBRK: (50+80+72+75)/4 = 69
  ('RBRK', '2026-04', '2026-04', 'B',
   900, 900, 900,
   50, 80, 72, 75, 69),

  -- NTNX: (48+68+60+75)/4 = 63
  ('NTNX', '2026-04', '2026-04', 'B',
   1800, 1800, 1800,
   48, 68, 60, 75, 63),

  -- PEGA: (45+62+65+72)/4 = 61
  ('PEGA', '2026-04', '2026-04', 'B',
   1200, 1200, 1200,
   45, 62, 65, 72, 61),

  -- NICE: (50+65+62+75)/4 = 63
  ('NICE', '2026-04', '2026-04', 'B',
   2400, 2400, 2400,
   50, 65, 62, 75, 63),

  -- VRNT: (42+58+55+68)/4 = 56
  ('VRNT', '2026-04', '2026-04', 'C',
   1300, 1300, 1300,
   42, 58, 55, 68, 56),

  -- UPST: (35+70+80+65)/4 = 63
  ('UPST', '2026-04', '2026-04', 'C',
   500, 500, 500,
   35, 70, 80, 65, 63),

  -- HUBB: (38+55+40+68)/4 = 50
  ('HUBB', '2026-04', '2026-04', 'C',
   1500, 1500, 1500,
   38, 55, 40, 68, 50),

  -- BBAI: (25+65+82+60)/4 = 58
  ('BBAI', '2026-04', '2026-04', 'C',
   200, 200, 200,
   25, 65, 82, 60, 58),

  -- RNG: (38+58+50+68)/4 = 54
  ('RNG', '2026-04', '2026-04', 'C',
   600, 600, 600,
   38, 58, 50, 68, 54)

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
