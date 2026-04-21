-- ============================================================
-- AI銘柄データ投入 SQL  Batch 5/5（銘柄 81〜100社）【最終バッチ】
-- baseMonth: 2026-04  このバッチ: 20社
-- generated: 2026-04-09
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('TSLA', 'Tesla Inc.', 'US', 'NASDAQ', 'ai application',
   'EVメーカーとして知られるが、FSD（完全自動運転）とDojo AIスーパーコンピュータでAI技術開発を積極的に推進している。',
   'FSD（完全自動運転）の実世界データをAI学習に活用し、Dojo AIクラスターでモデルを自社訓練。OptmusロボットにもAIを統合し、自動車を超えた「AI・ロボット企業」として展開中。',
   2, 2, '中程度', true),

  ('ACN', 'Accenture plc', 'US', 'NYSE', 'enterprise ai software',
   'IT戦略コンサルティング・デジタル変革支援の世界最大手。AIトランスフォーメーション支援で急成長しており、AIに特化した専門組織を設立している。',
   'AIセンターオブエクセレンスとAccenture AI Refinery（AI実装プラットフォーム）で企業のAI導入を全工程で支援。生成AI関連サービス売上が全体の1割超を占めるまで急拡大している。',
   2, 2, '中程度', true),

  ('INFY', 'Infosys Ltd.', 'US', 'NYSE', 'enterprise ai software',
   'インド最大級のITサービス・コンサルティング企業。Infosys Topazプラットフォームで企業のAI導入・業務自動化を支援している。',
   'Infosys TopazがLLMを活用したコード生成・ドキュメント処理・業務自動化を提供。大企業のAIトランスフォーメーション案件を多数受注し、ITサービス企業の中でもAI特化で差別化している。',
   2, 2, '中程度', true),

  ('IONQ', 'IonQ Inc.', 'US', 'NYSE', 'ai application',
   '量子コンピュータのハードウェア・ソフトウェアを開発・提供するパイオニア企業。量子AIと量子機械学習の実用化を目指している。',
   'トラップイオン方式の量子プロセッサをクラウド（AWS・Azure・Google Cloud）経由で提供。量子AIアルゴリズムの研究開発が進む中、長期的なAI計算基盤として期待されている。',
   3, 3, '高い', true),

  ('RGTI', 'Rigetti Computing Inc.', 'US', 'NASDAQ', 'ai application',
   '超伝導方式の量子コンピュータを開発するスタートアップ企業。量子クラウドサービスQCSを通じて研究機関・企業向けに提供している。',
   '超伝導量子ビットのプロセッサ開発と量子クラウドサービス（QCS）を提供。量子AIの実用化は中長期目標だが、量子コンピューティング先行投資の文脈でAI関連として注目されている。',
   3, 3, '高い', true),

  ('DUOL', 'Duolingo Inc.', 'US', 'NASDAQ', 'ai application',
   '言語学習アプリの世界最大手。生成AIを活用したパーソナライズ学習機能の強化でエンゲージメントと有料転換率を高めている。',
   '生成AIによる会話練習・文法解説・カスタム演習機能が学習体験を向上。Max（AI搭載プレミアム）プランの展開でARPUが改善しており、EdTech分野でのAI活用モデルとして評価が高い。',
   2, 2, '中程度', true),

  ('ASAN', 'Asana Inc.', 'US', 'NYSE', 'enterprise ai software',
   'プロジェクト管理・ワークフロー自動化のSaaS企業。Asana AIがタスク自動割り当て・進捗予測・ワークフロー提案を実現している。',
   'Asana AIがプロジェクトの遅延リスク予測・タスク自動化・ワークフロー最適化を提供。AIエージェントによる業務実行自動化へのロードマップも公表しており、企業生産性AIとして展開中。',
   2, 2, '中程度', true),

  ('FROG', 'JFrog Ltd.', 'US', 'NASDAQ', 'ai application',
   'ソフトウェアサプライチェーン・DevOpsプラットフォームのSaaS企業。AI/MLモデルの管理・配布にも対応した統合MLOps機能を展開している。',
   'JFrog MLopsがAIモデルの版管理・配布・セキュリティスキャンを一元化。AI時代のソフトウェアサプライチェーンセキュリティ需要で差別化し、CI/CDにAIモデル管理を統合している。',
   2, 2, '中程度', true),

  ('LMND', 'Lemonade Inc.', 'US', 'NYSE', 'ai application',
   'AI・チャットボット主導のインシュアテック企業。保険申込から保険金支払いまでをAIで完全自動化したビジネスモデルが特徴。',
   'AIが秒単位で保険申込審査・保険金支払い判断を自動処理し、人手を最小化した保険ビジネスモデルを実現。損害保険・生命保険分野でのAI自動化の先進事例として注目されている。',
   3, 3, '高い', true),

  ('BIDU', 'Baidu Inc.', 'US', 'NASDAQ', 'ai cloud/platform',
   '中国最大の検索エンジン企業。文心一言（ERNIE Bot）の開発でAI大規模言語モデル分野でも存在感を持つ。',
   '文心一言（ERNIE Bot）がBaidu Cloudを通じて企業向けに提供され、中国市場でのAIクラウドシェアを拡大。自動運転「Apollo」と生成AI「ERNIE」の二軸でAI投資を加速している。',
   2, 2, '中程度', true),

  ('BABA', 'Alibaba Group Holding Ltd.', 'US', 'NYSE', 'ai cloud',
   '中国最大のECおよびクラウドサービス（阿里雲/Alibaba Cloud）企業。通義千問（Qwen）LLMとAIクラウドでAI事業を強化している。',
   '通義千問（Qwen）がオープンソース公開されグローバルで採用拡大。Alibaba Cloudの生成AIサービス群でアジア・中東・欧州のクラウドAI市場を狙っており、AI関連収益が急増している。',
   2, 2, '中程度', true),

  ('SE', 'Sea Limited', 'US', 'NYSE', 'ai application',
   'シンガポール発のデジタルコングロマリット（EC・ゲーム・デジタル金融）。各事業へのAI統合でユーザー体験と不正検知を強化している。',
   'Shopee（EC）・SeaMoney（デジタル金融）でAIを活用した不正検知・パーソナライズ推薦を展開。東南アジア市場でのデジタルサービス普及を背景にAIによるユーザー体験改善を加速している。',
   1, 1, '低い', true),

  ('GRAB', 'Grab Holdings Ltd.', 'US', 'NASDAQ', 'ai application',
   '東南アジア最大のスーパーアプリ企業（配車・デリバリー・決済）。AI需要予測・ルート最適化・不正検知でサービス品質を高めている。',
   'AIによる需要予測・配車マッチング最適化・不正検知がコアオペレーションに統合されている。GrabMapsで独自地図AIも開発しており、東南アジアのAIプラットフォームとして存在感を持つ。',
   2, 2, '中程度', true),

  ('XPEV', 'XPeng Inc.', 'US', 'NYSE', 'ai application',
   '中国のAI特化型EV（電気自動車）メーカー。XNGPと呼ばれる高度な自動運転システムの開発でAI技術に多額の投資を続けている。',
   'XNGPが都市部を含む幅広いシナリオでの自動運転を実現しつつある。アイリスAIチップの自社開発とライダー非搭載の純視覚自動運転システム開発で、中国版テスラとして評価されている。',
   2, 2, '中程度', true),

  ('NIO', 'NIO Inc.', 'US', 'NYSE', 'ai application',
   '中国の高級EV（電気自動車）メーカー。NIOPilotとADAMスーパーコンピュータを用いた自動運転AI開発に注力している。',
   'NIOPilotとNAD（NIO Autonomous Driving）システムが自動運転機能を提供。バッテリー交換ネットワークとAIソフトウェアを組み合わせた独自エコシステムで差別化を図っている。',
   2, 2, '中程度', true),

  ('SOUN', 'SoundHound AI Inc.', 'US', 'NASDAQ', 'ai application',
   '音声AIプラットフォームを自動車・レストラン・IoTデバイスに提供するスタートアップ。Nvidiaとの提携でAI車載アシスタントを展開している。',
   'SoundHound Chat AIが自動車・ドライブスルー・コネクテッドデバイスに音声AIを提供。NVIDIA DRIVE統合で自動車メーカーへの採用が進み、エッジ音声AIのリーダーとして成長している。',
   3, 3, '高い', true),

  ('BOTZ', 'Global X Robotics & Artificial Intelligence ETF', 'US', 'NASDAQ', 'etf',
   'ロボティクスおよびAI関連企業に特化したETF。NVIDIA・キーエンス・ファナックなどAI・ロボット関連株に分散投資できる。',
   'AI・ロボット分野のグローバル上場企業に投資するETFで、個別銘柄リスクを分散しながらAI成長テーマへのエクスポージャーを得られる。ロボット自動化・AI半導体・産業AI分野を中心に組み入れる。',
   3, 3, '高い', true),

  ('AIQ', 'Global X Artificial Intelligence & Technology ETF', 'US', 'NASDAQ', 'etf',
   'AI技術・クラウド・ビッグデータ企業に投資するETF。AIエコシステム全体をカバーする幅広い銘柄で構成されている。',
   'AIソフトウェア・半導体・クラウドインフラを横断的にカバーするETFで、AI投資テーマへの分散エクスポージャーを提供。個別銘柄選定なしにAI成長全体を取り込める投資手段として活用される。',
   3, 3, '高い', true),

  ('QTUM', 'Defiance Quantum ETF', 'US', 'NYSE', 'etf',
   '量子コンピューティングとAI・機械学習関連企業に特化したETF。IonQ・IBMなど量子コンピュータ関連株を中心に組み入れる。',
   '量子コンピューティング・AIアルゴリズム関連企業を組み入れたテーマETFで、長期的な量子AI革命への投資機会を提供。ハイリスク・ハイリターンの量子テーマへの分散投資手段として活用される。',
   3, 3, '高い', true),

  ('ACMR', 'ACM Research Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '半導体洗浄装置の専業メーカー。SAPS・TANSなど独自技術でウェーハ洗浄の高精度化を実現し、中国・韓国・台湾に展開している。',
   '先端ノード向けウェーハ洗浄装置で歩留まり改善に貢献。AI向け先端半導体（HBM・ロジック）の製造プロセスにおける洗浄工程の重要性が高まるとともに採用が拡大している。',
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
  -- Batch 1
  'NVDA','MSFT','GOOGL','AMZN','META',
  'AMD','AVGO','TSM','MU','SMCI',
  'ASML','AMAT','LRCX','KLAC','INTC',
  'DELL','HPE','CRM','ORCL','QCOM',
  -- Batch 2
  'PLTR','SNOW','NOW','DDOG','NET',
  'PANW','CRWD','ANET','MDB','PATH',
  'AI','CFLT','WDAY','ZS','OKTA',
  'TWLO','DT','ESTC','S','IBM',
  -- Batch 3
  'ARM','MRVL','MPWR','TER','ENTG',
  'MKSI','ACLS','COHR','LITE','ONTO',
  'FORM','UCTT','CDNS','SNPS','MCHP',
  'SWKS','IPGP','WOLF','ALGM','SLAB',
  -- Batch 4
  'EQIX','DLR','VRT','VST','CEG',
  'ETN','PWR','ROK','HON','EMR',
  'GTLB','RBRK','NTNX','PEGA','NICE',
  'VRNT','UPST','HUBB','BBAI','RNG',
  -- Batch 5
  'TSLA','ACN','INFY','IONQ','RGTI',
  'DUOL','ASAN','FROG','LMND','BIDU',
  'BABA','SE','GRAB','XPEV','NIO',
  'SOUN','BOTZ','AIQ','QTUM','ACMR'
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
  -- TSLA: (72+85+75+78)/4 = 78
  ('TSLA', '2026-04', '2026-04', 'B',
   15000, 15000, 15000,
   72, 85, 75, 78, 78),

  -- ACN: (62+72+60+82)/4 = 69
  ('ACN', '2026-04', '2026-04', 'B',
   8000, 8000, 8000,
   62, 72, 60, 82, 69),

  -- INFY: (55+68+58+80)/4 = 65
  ('INFY', '2026-04', '2026-04', 'B',
   5500, 5500, 5500,
   55, 68, 58, 80, 65),

  -- IONQ: (20+75+85+55)/4 = 59
  ('IONQ', '2026-04', '2026-04', 'C',
   40, 40, 40,
   20, 75, 85, 55, 59),

  -- RGTI: (15+70+82+50)/4 = 54
  ('RGTI', '2026-04', '2026-04', 'C',
   15, 15, 15,
   15, 70, 82, 50, 54),

  -- DUOL: (45+78+65+75)/4 = 66
  ('DUOL', '2026-04', '2026-04', 'B',
   700, 700, 700,
   45, 78, 65, 75, 66),

  -- ASAN: (35+65+60+70)/4 = 58
  ('ASAN', '2026-04', '2026-04', 'B',
   700, 700, 700,
   35, 65, 60, 70, 58),

  -- FROG: (40+68+62+72)/4 = 61
  ('FROG', '2026-04', '2026-04', 'B',
   450, 450, 450,
   40, 68, 62, 72, 61),

  -- LMND: (30+65+72+62)/4 = 57
  ('LMND', '2026-04', '2026-04', 'C',
   250, 250, 250,
   30, 65, 72, 62, 57),

  -- BIDU: (65+72+75+78)/4 = 73
  ('BIDU', '2026-04', '2026-04', 'B',
   7000, 7000, 7000,
   65, 72, 75, 78, 73),

  -- BABA: (70+68+70+80)/4 = 72
  ('BABA', '2026-04', '2026-04', 'B',
   12000, 12000, 12000,
   70, 68, 70, 80, 72),

  -- SE: (38+62+50+68)/4 = 55
  ('SE', '2026-04', '2026-04', 'C',
   1200, 1200, 1200,
   38, 62, 50, 68, 55),

  -- GRAB: (32+60+55+65)/4 = 53
  ('GRAB', '2026-04', '2026-04', 'C',
   600, 600, 600,
   32, 60, 55, 65, 53),

  -- XPEV: (42+75+72+68)/4 = 64
  ('XPEV', '2026-04', '2026-04', 'C',
   800, 800, 800,
   42, 75, 72, 68, 64),

  -- NIO: (38+68+65+65)/4 = 59
  ('NIO', '2026-04', '2026-04', 'C',
   600, 600, 600,
   38, 68, 65, 65, 59),

  -- SOUN: (25+80+88+65)/4 = 65
  ('SOUN', '2026-04', '2026-04', 'C',
   100, 100, 100,
   25, 80, 88, 65, 65),

  -- BOTZ: (0+75+100+90)/4 = 66
  ('BOTZ', '2026-04', '2026-04', 'A',
   0, 0, 0,
   0, 75, 100, 90, 66),

  -- AIQ: (0+75+100+90)/4 = 66
  ('AIQ', '2026-04', '2026-04', 'A',
   0, 0, 0,
   0, 75, 100, 90, 66),

  -- QTUM: (0+70+100+82)/4 = 63
  ('QTUM', '2026-04', '2026-04', 'B',
   0, 0, 0,
   0, 70, 100, 82, 63),

  -- ACMR: (40+62+52+70)/4 = 56
  ('ACMR', '2026-04', '2026-04', 'B',
   500, 500, 500,
   40, 62, 52, 70, 56)

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

-- 4. 確認（active_stocks = 100 になっていることを確認）
SELECT
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = true)  AS active_stocks,
  (SELECT COUNT(*) FROM public.stocks WHERE is_active = false) AS inactive_stocks,
  (SELECT COUNT(*) FROM public.ai_metrics WHERE updated_month = '2026-04') AS metrics_this_month;

COMMIT;
