-- ============================================================
-- AI銘柄データ投入 SQL  Batch 2/5（銘柄 21〜40社）
-- baseMonth: 2026-04  このバッチ: 20社
-- generated: 2026-04-09
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('PLTR', 'Palantir Technologies Inc.', 'US', 'NASDAQ', 'ai application',
   'ビッグデータ解析とAI意思決定プラットフォームを政府機関・民間企業向けに提供するソフトウェア企業。AIP（AI Platform）が主力製品で、米国防省や情報機関を主要顧客として持つ。',
   'AIP（AI Platform）が業務システムにLLMを組み込む基盤として企業・政府機関向けに採用されており、AI需要の拡大が直接的に売上に反映されやすい事業構造を持つ。政府向けと商業向けの両部門でAI活用の案件が増えており、AI予算の拡大が同社の収益につながりやすい。',
   3, 3, '高い', true),

  ('SNOW', 'Snowflake Inc.', 'US', 'NYSE', 'ai data infrastructure',
   'クラウドネイティブなデータウェアハウスを提供するSaaS企業。複数のクラウド環境にまたがるデータを一元管理・分析できる基盤として、大企業を中心に採用されている。',
   'Snowflake Cortex AIがデータウェアハウス上でのLLM推論やベクトル埋め込み生成を可能にしており、企業データを活用したAIアプリケーション構築の基盤として採用が広がっている。AIアプリ開発の増加がSnowflakeの処理量（クレジット消費）に直結しやすく、AI活用の普及が収益につながりやすい構造がある。',
   2, 2, '中程度', true),

  ('NOW', 'ServiceNow Inc.', 'US', 'NYSE', 'enterprise ai software',
   'IT・HR・顧客対応などの業務プロセスを自動化するクラウドプラットフォームを大企業・政府機関向けに提供する企業。ITサービス管理（ITSM）の分野で強い顧客基盤を持つ。',
   'Now AssistがITサービス管理・HR・顧客対応などの各ワークフローにAIを統合しており、既存顧客へのアップセル（上位プラン移行）でAI機能の収益化が進んでいる。契約顧客がAI機能を追加導入するほど同社の単価が上昇しやすい構造がある。',
   2, 2, '中程度', true),

  ('DDOG', 'Datadog Inc.', 'US', 'NASDAQ', 'ai infrastructure',
   'クラウドアプリケーションの監視・ログ分析・セキュリティを統合したプラットフォームを提供するSaaS企業。インフラ・アプリ・セキュリティのオブザーバビリティ分野で、クラウド移行企業を中心に採用が広がっている。',
   'LLMオブザーバビリティ機能がAIアプリケーションのパフォーマンスやコストを可視化するツールとして採用されている。企業がAIシステムを本番導入するほど監視・管理の需要が増えるため、AI活用の普及が同社の利用拡大につながりやすい。',
   2, 2, '中程度', true),

  ('NET', 'Cloudflare Inc.', 'US', 'NYSE', 'ai infrastructure',
   'グローバルにCDN・DDoS対策・ゼロトラストセキュリティ・クラウドネットワークを提供するIT企業。世界各地のエッジロケーションを持つネットワークインフラが事業基盤となっている。',
   'Workers AIプラットフォームがエッジロケーションでのAIモデル推論を可能にしており、低遅延が求められるAIアプリケーションの実行基盤として開発者向けに利用が広がっている。AIアプリの普及に伴ってエッジネットワーク需要が増えると、同社のトラフィック処理量増加につながりやすい。',
   2, 2, '中程度', true),

  ('PANW', 'Palo Alto Networks Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'クラウド・ネットワーク・エンドポイントの各分野にわたるサイバーセキュリティプラットフォームを提供する企業。Prisma CloudやCortex XDRなど複数製品ラインを持ち、大企業・政府機関向けに幅広く展開している。',
   'PrecisionAIが脅威の検出・対応を自動化しており、AI時代のサイバー攻撃対策として採用が広がっている。AI活用企業が増えるほどセキュリティ需要も増えやすく、同社製品の潜在的な市場が拡大しやすい構造がある。',
   2, 2, '中程度', true),

  ('CRWD', 'CrowdStrike Holdings Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'エンドポイントおよびクラウドワークロード向けサイバーセキュリティプラットフォームを提供する企業。Falconプラットフォームが主力製品で、エンドポイント保護（EDR/XDR）市場で存在感を持つ。',
   'Falcon AIが機械学習でゼロデイ脅威の検知・遮断を自律的に行い、セキュリティアナリストの作業効率向上に活用されている。クラウド移行企業やAI活用企業のセキュリティ需要が増えるほど、同社の潜在顧客が広がりやすい。',
   2, 2, '中程度', true),

  ('ANET', 'Arista Networks Inc.', 'US', 'NYSE', 'ai network/optical communications',
   'クラウドデータセンター向けイーサネットスイッチ・ルーターを設計・販売するネットワーク機器企業。Meta・Microsoft・Googleなどのハイパースケーラーを主要顧客として持つ。',
   'Ultra Ethernetコンソーシアムの主要メンバーとしてAI GPU間通信の標準規格策定を進めており、AIクラスターネットワークにおけるEthernet採用拡大が同社の需要増につながりやすい。ハイパースケーラーのAIデータセンター拡張が続く局面では、同社の高速スイッチ需要が増えやすい。',
   2, 2, '中程度', true),

  ('MDB', 'MongoDB Inc.', 'US', 'NASDAQ', 'ai data infrastructure',
   'NoSQLドキュメントデータベースMongoDBを提供するクラウドデータベース企業。マネージドサービスのMongoDB Atlasを軸に、スタートアップから大企業まで幅広く採用されている。',
   'MongoDB AtlasのベクトルSearch機能がRAG（検索拡張生成）アプリケーションのデータ基盤として採用が広がっており、生成AIアプリの開発・普及が同社の利用量増加につながりやすい。AIアプリのバックエンドとして選ばれるほど、Atlas上の処理量と契約件数が増えやすい構造がある。',
   2, 2, '中程度', true),

  ('PATH', 'UiPath Inc.', 'US', 'NYSE', 'ai automation/rpa',
   'RPA（ロボティック・プロセス・オートメーション）を主力とする業務自動化プラットフォームを大企業向けに提供する企業。反復的なデジタル業務を自動化するツールとして、金融・製造・ヘルスケアなど幅広い業界に導入されている。',
   '生成AIとRPAを統合したAgentプラットフォームにより、定型的な反復作業に加えて判断を要する業務プロセスも自動化の対象になりつつある。企業のAI導入が進むほど既存のRPA基盤にAI機能を追加する需要が生まれやすく、同社製品の活用範囲が広がりやすい。',
   2, 2, '中程度', true),

  ('AI', 'C3.ai Inc.', 'US', 'NYSE', 'enterprise ai software',
   'エンタープライズ向けAIソフトウェアアプリケーションを専業で提供するパイオニア企業。製造・エネルギー・政府機関向けに展開する。',
   'C3 AI Suiteが予測保全・不正検知・サプライチェーン最適化などの業界特化型AIアプリを提供。生成AI機能の追加により既存顧客へのアップセルを推進している。',
   3, 3, '高い', true),

  ('CFLT', 'Confluent Inc.', 'US', 'NASDAQ', 'ai data infrastructure',
   'Apache Kafkaを基盤にしたリアルタイムデータストリーミングプラットフォームを提供するSaaS企業。AIパイプラインの基盤として採用が増える。',
   'リアルタイムデータストリームをAIモデルへ供給するパイプラインとして採用が拡大。Tableflow機能でデータレイクとの連携を強化し、AI基盤データ処理の中核を担う。',
   2, 2, '中程度', true),

  ('WDAY', 'Workday Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'HR・財務管理クラウドソフトウェアの大手。Workday AIにより人材管理・採用・財務予測に生成AIを統合している。',
   'Workday AIが採用適合度予測・スキルギャップ分析・財務シナリオ生成などを自動化。大企業の基幹SaaSとして安定した顧客基盤にAI機能を組み込み収益を拡大している。',
   2, 2, '中程度', true),

  ('ZS', 'Zscaler Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'ゼロトラストセキュリティのクラウドプラットフォームを提供するSaaS企業。AIによる脅威インテリジェンスでセキュリティを強化している。',
   'Zero Trust Exchange上でAIを活用したリスクスコアリング・脅威検出を提供。AI時代のクラウドファーストなセキュリティ基盤として企業のデジタル移行に対応する。',
   2, 2, '中程度', true),

  ('OKTA', 'Okta Inc.', 'US', 'NASDAQ', 'enterprise ai software',
   'クラウド時代のIDおよびアクセス管理（IAM）プラットフォームの大手企業。AI時代の認証セキュリティ需要が高まっている。',
   'Okta AIがユーザー行動の異常検知・適応型認証を実現し、AIシステムへの安全なアクセス管理基盤として需要が拡大。非人間ID（AIエージェント）管理への対応も進む。',
   2, 2, '中程度', true),

  ('TWLO', 'Twilio Inc.', 'US', 'NYSE', 'ai application',
   'コミュニケーションAPIプラットフォームを提供するクラウド企業。AI Customer Engagement機能でコンタクトセンターのAI化を支援する。',
   'Twilio Segment（CDPプラットフォーム）とAIの統合により、パーソナライズされた顧客コミュニケーションを自動化。AIエージェントによる顧客対応自動化の基盤として活用される。',
   2, 2, '中程度', true),

  ('DT', 'Dynatrace Inc.', 'US', 'NYSE', 'ai infrastructure',
   'AIを活用したクラウドオブザーバビリティ・セキュリティプラットフォームの大手。Davis AIエンジンが自動的に根本原因を特定する。',
   'Davis AI（因果推論AI）がクラウド環境の障害を自律的に検知・診断し、AIシステムを含む複雑なマイクロサービスの監視需要に対応している。',
   2, 2, '中程度', true),

  ('ESTC', 'Elastic N.V.', 'US', 'NYSE', 'ai data infrastructure',
   'Elasticsearchを中核にした検索・分析プラットフォームを提供するオープンソース系企業。Elastic AI Assistantでベクトル検索とLLMを統合する。',
   'Elasticsearch Vector Databaseがセマンティック検索・RAGアプリ構築の基盤として採用拡大。企業のAIアプリケーション開発における検索・データ基盤としての存在感を高めている。',
   2, 2, '中程度', true),

  ('S', 'SentinelOne Inc.', 'US', 'NYSE', 'enterprise ai software',
   'AI主導のエンドポイントセキュリティプラットフォームを提供するサイバーセキュリティ企業。Purple AIで脅威ハンティングを自動化する。',
   'Purple AIが自然言語でのセキュリティ調査・脅威ハンティングを可能にし、SOCの作業効率を大幅に改善。AI時代のサイバー脅威拡大とともに需要が高まっている。',
   2, 2, '中程度', true),

  ('IBM', 'International Business Machines Corp.', 'US', 'NYSE', 'ai cloud/platform',
   'エンタープライズIT・コンサルティングの老舗大手。watsonxプラットフォームで企業向け生成AI基盤の構築を支援する。',
   'watsonx.aiがオープンソースLLMをエンタープライズ環境に安全に展開する基盤を提供。ハイブリッドクラウド戦略とAIコンサルティングサービスで大企業の生成AI導入を主導している。',
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
  -- PLTR: (75+85+90+82)/4 = 83
  ('PLTR', '2026-04', '2026-04', 'B',
   2800, 2800, 2800,
   75, 85, 90, 82, 83),

  -- SNOW: (60+80+70+78)/4 = 72
  ('SNOW', '2026-04', '2026-04', 'B',
   3500, 3500, 3500,
   60, 80, 70, 78, 72),

  -- NOW: (68+82+72+85)/4 = 77
  ('NOW', '2026-04', '2026-04', 'B',
   5500, 5500, 5500,
   68, 82, 72, 85, 77),

  -- DDOG: (65+80+75+80)/4 = 75
  ('DDOG', '2026-04', '2026-04', 'B',
   2400, 2400, 2400,
   65, 80, 75, 80, 75),

  -- NET: (45+85+60+78)/4 = 67
  ('NET', '2026-04', '2026-04', 'B',
   1600, 1600, 1600,
   45, 85, 60, 78, 67),

  -- PANW: (58+72+65+80)/4 = 69
  ('PANW', '2026-04', '2026-04', 'B',
   4200, 4200, 4200,
   58, 72, 65, 80, 69),

  -- CRWD: (62+78+68+82)/4 = 73
  ('CRWD', '2026-04', '2026-04', 'B',
   3800, 3800, 3800,
   62, 78, 68, 82, 73),

  -- ANET: (70+82+75+85)/4 = 78
  ('ANET', '2026-04', '2026-04', 'B',
   7000, 7000, 7000,
   70, 82, 75, 85, 78),

  -- MDB: (50+75+62+78)/4 = 66
  ('MDB', '2026-04', '2026-04', 'B',
   2000, 2000, 2000,
   50, 75, 62, 78, 66),

  -- PATH: (55+65+78+72)/4 = 68
  ('PATH', '2026-04', '2026-04', 'B',
   1400, 1400, 1400,
   55, 65, 78, 72, 68),

  -- AI: (35+60+82+62)/4 = 60
  ('AI', '2026-04', '2026-04', 'C',
   380, 380, 380,
   35, 60, 82, 62, 60),

  -- CFLT: (45+75+65+75)/4 = 65
  ('CFLT', '2026-04', '2026-04', 'B',
   900, 900, 900,
   45, 75, 65, 75, 65),

  -- WDAY: (55+68+60+80)/4 = 66
  ('WDAY', '2026-04', '2026-04', 'B',
   3200, 3200, 3200,
   55, 68, 60, 80, 66),

  -- ZS: (52+70+60+78)/4 = 65
  ('ZS', '2026-04', '2026-04', 'B',
   2400, 2400, 2400,
   52, 70, 60, 78, 65),

  -- OKTA: (45+65+55+75)/4 = 60
  ('OKTA', '2026-04', '2026-04', 'B',
   2200, 2200, 2200,
   45, 65, 55, 75, 60),

  -- TWLO: (40+60+55+72)/4 = 57
  ('TWLO', '2026-04', '2026-04', 'B',
   1100, 1100, 1100,
   40, 60, 55, 72, 57),

  -- DT: (50+72+65+78)/4 = 66
  ('DT', '2026-04', '2026-04', 'B',
   1400, 1400, 1400,
   50, 72, 65, 78, 66),

  -- ESTC: (45+68+65+75)/4 = 63
  ('ESTC', '2026-04', '2026-04', 'B',
   1200, 1200, 1200,
   45, 68, 65, 75, 63),

  -- S: (55+72+65+78)/4 = 68
  ('S', '2026-04', '2026-04', 'B',
   800, 800, 800,
   55, 72, 65, 78, 68),

  -- IBM: (65+60+55+82)/4 = 66
  ('IBM', '2026-04', '2026-04', 'B',
   6500, 6500, 6500,
   65, 60, 55, 82, 66)

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
