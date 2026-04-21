-- ============================================================
-- AI銘柄データ投入 SQL  Batch 1/5（銘柄 1〜20社）
-- baseMonth: 2026-04  このバッチ: 20社
-- generated: 2026-04-09
-- ============================================================

BEGIN;

-- 1. stocks UPSERT
INSERT INTO public.stocks
  (ticker, name, country, market, ai_category, company_description, ai_summary,
   dependency_level, dependency_level_int, dependency_label, is_active)
VALUES
  ('NVDA', 'NVIDIA Corporation', 'US', 'NASDAQ', 'ai accelerator/platform',
   'AI向けGPUを設計・販売する半導体企業。H100・H200・Blackwell（B200）シリーズがデータセンター向けの主力製品で、AIサーバー投資の拡大が業績に反映されやすい構造にある。ソフトウェアプラットフォームCUDAと組み合わせた製品エコシステムが、AI開発インフラの標準として広く使われている。',
   '生成AIの学習と推論で広く使われるGPUを供給する中核企業。AIデータセンター投資が増えるほど同社製品への需要増につながりやすい。CUDAエコシステムにより開発者が他社製品へ切り替えるコストが高く、AI需要への関与度が業界内でも高い水準にある。',
   3, 3, '高い', true),

  ('MSFT', 'Microsoft Corporation', 'US', 'NASDAQ', 'ai cloud/platform',
   'WindowsやOffice 365などのソフトウェアに加え、AzureクラウドでITインフラを提供する大手IT企業。OpenAIへの出資を機に、CopilotブランドでAI機能を自社製品全体に組み込む取り組みを本格化している。クラウド・ソフトウェア両面で大きな売上規模を持ち、AI移行期の事業構造を持つ。',
   'OpenAIへの出資を通じてGPT技術をAzureおよびMicrosoft 365 Copilotに組み込み、企業のAI活用基盤として採用が広がっている。Azure AIサービスの収益成長がクラウド部門全体をけん引しており、企業向けAI需要の拡大がMicrosoft製品全体の利用拡大につながりやすい。',
   2, 2, '中程度', true),

  ('GOOGL', 'Alphabet Inc.', 'US', 'NASDAQ', 'ai cloud/platform',
   'Google検索・YouTube・広告事業を中核とするAlphabetの持株会社。独自のTPUチップとGeminiモデルを開発し、Google CloudではAIサービスの提供を拡充している。AndroidやChromeなどのプラットフォームにもAI機能の統合が進んでいる。',
   'Geminiモデルを通じてGoogle Cloud上での企業向けAIサービスを提供しており、既存クラウド顧客にAI機能が追加されるほど収益が積み上がりやすい。検索・広告へのAI統合も進んでおり、AI活用の広がりが複数事業に波及しやすい構造にある。',
   2, 2, '中程度', true),

  ('AMZN', 'Amazon.com Inc.', 'US', 'NASDAQ', 'ai cloud',
   'EC（電子商取引）事業とAWSクラウドを両輪とする大手IT企業。AWSは法人向けクラウドインフラで大きなシェアを持ち、Amazon BedrockやSageMakerなどのAI基盤サービスを提供している。広告・物流・デバイスなど多角的な事業基盤も持つ。',
   'AWS上でBedrock（生成AI基盤）やSageMakerなどのAIサービスを提供し、法人向けAIクラウド市場の重要プレイヤーとなっている。独自のTrainiumチップ開発も進めており、AI学習コストの削減とサービス競争力の強化につなげようとしている。',
   2, 2, '中程度', true),

  ('META', 'Meta Platforms Inc.', 'US', 'NASDAQ', 'ai application',
   'FacebookやInstagramなどのSNSを運営する広告収益主体のIT企業。月間利用者数が30億人超の規模を持ち、広告配信の精度向上にAIを積極活用している。Llamaシリーズのオープンソース公開でAI研究コミュニティへの貢献でも知られる。',
   '広告配信アルゴリズムへのAI活用が収益の中心にあり、AIによるターゲティング精度向上が広告単価の改善につながっている。Ray-Banスマートグラス向けAI機能や生成AIスタジオなど、AI活用範囲をユーザー向けにも拡大している。',
   2, 2, '中程度', true),

  ('AMD', 'Advanced Micro Devices Inc.', 'US', 'NASDAQ', 'ai accelerator/platform',
   'CPUとGPUの両分野を手がける半導体企業。データセンター向けにはInstinctシリーズのAIアクセラレータを展開し、EPYCシリーズCPUはサーバー市場でシェアを拡大している。FPGAも製品ポートフォリオに持つ。',
   'MI300X・MI350XなどのAIアクセラレータをHyperscalerや研究機関向けに提供し、GPU市場への参入実績を積み上げている。ROCmソフトウェア基盤の整備により、AIワークロードにおける選択肢として採用実績が増えている。',
   3, 3, '高い', true),

  ('AVGO', 'Broadcom Inc.', 'US', 'NASDAQ', 'ai network/custom semiconductors',
   'ネットワーク用半導体とカスタムAIチップ（ASIC）設計を手がける半導体・インフラソフトウェア企業。Google・Metaなど大手テクノロジー企業向けに専用AIプロセッサ（XPU）を受注設計している。VMwareを中心としたソフトウェア事業も収益の柱の一つとなっている。',
   'カスタムAIチップ（XPU）の受注設計事業が主要顧客のAIインフラ拡大と連動しやすく、顧客の設備投資増加が同社の収益につながる構造がある。AIデータセンター内のネットワーク接続用Ethernetチップも高い需要を維持しており、AIインフラの複数領域に関わっている。',
   3, 3, '高い', true),

  ('TSM', 'Taiwan Semiconductor Manufacturing Co.', 'US', 'NYSE', 'ai foundry/advanced packaging',
   '世界最大級の半導体受託製造企業。NVIDIAやAppleを始め主要チップ企業の先端半導体を受託製造し、3nm・2nm世代の最先端プロセスと先端パッケージング（CoWoS）に強みを持つ。AI関連の受注比率が事業全体の中で高まってきており、米国・日本・欧州への工場分散も進めている。',
   '先端GPUやAI向けASICの製造を通じてAI需要に深く関わっている。CoWoSなど先端パッケージング需要の拡大が受注増加につながりやすく、AIチップ顧客の設備投資が同社の製造量に直結しやすい構造にある。',
   3, 3, '高い', true),

  ('MU', 'Micron Technology Inc.', 'US', 'NASDAQ', 'ai memory',
   'DRAMおよびNAND型フラッシュメモリを設計・製造する半導体メモリ企業。データセンター向けDRAMと、AI GPU専用の高帯域幅メモリ（HBM）の両方を展開している。サムスン電子・SKハイニックスと並ぶメモリ大手の一社。',
   'HBM3EなどのAI GPU向け高帯域幅メモリをNVIDIAのGPUサーバー向けに供給しており、AIデータセンター投資の拡大が同社のHBM出荷増に直結しやすい。AI GPU向けメモリは通常のDRAMより単価が高く、HBMの販売比率が上がるほど収益性が改善しやすい構造がある。',
   3, 3, '高い', true),

  ('SMCI', 'Super Micro Computer Inc.', 'US', 'NASDAQ', 'ai servers/hpc',
   'AIサーバーおよびHPCシステムの設計・製造を主力とするサーバーメーカー。NVIDIAのGPUを搭載したフルラック型AIサーバーを顧客仕様に合わせて納品できる点に強みを持つ。液冷システムなどエネルギー効率を重視した設計にも力を入れている。',
   'AIデータセンター向けGPUサーバーをフルラック単位で提供し、納期の速さと液冷対応が評価されている。AIサーバーへの設備投資が増えるほど同社への発注が増えやすい構造にあり、ハイパースケーラーと中規模企業の両方を顧客に持つ。',
   3, 3, '高い', true),

  ('ASML', 'ASML Holding N.V.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   'EUV（極紫外線）リソグラフィ装置を世界で唯一製造する半導体装置企業。TSMC・Samsung・Intelなど先端ロジック半導体メーカー向けに、最小線幅のチップ製造に必要な露光装置を供給している。1台数百億円規模の高額機器で、年間生産台数が限られる。',
   'EUV装置は先端AIチップの微細化製造に必要であり、TSMCなどがAI需要に応じて生産能力を拡大する際に同社への発注が増えやすい。ただし装置の製造に長期間かかるため、AI設備投資の増減が売上に反映されるまでに時間差が生じる場合がある。',
   2, 2, '中程度', true),

  ('AMAT', 'Applied Materials Inc.', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   '成膜・エッチング・CMP（平坦化）・検査など幅広い半導体製造プロセス装置を手がける装置メーカー。ロジック・メモリ・先端パッケージングの各分野に製品を供給し、製造ライン全体の広い範囲をカバーする。ICAPS（IoT・通信・自動車・電力・センサ）向け装置も手がける。',
   'AI向けGPUや先端ロジックチップの製造プロセスに使われる成膜・エッチング装置を供給しており、AIチップ向け設備投資の増加が同社の受注増につながりやすい。HBMなどAIメモリの製造工程でも同社装置が使われており、AI関連の需要接点が幅広い。',
   2, 2, '中程度', true),

  ('LRCX', 'Lam Research Corporation', 'US', 'NASDAQ', 'semiconductor manufacturing equipment',
   'エッチングおよびCVD（化学気相成長）装置を中心とした半導体製造装置メーカー。3D NAND・HBMなどのメモリ製造と先端ロジックチップの微細加工の両方に装置を供給している。KLAやApplied Materialsと並ぶ半導体装置大手の一社。',
   'HBMや先端ロジックチップの製造ラインにエッチング・薄膜装置を供給しており、AIデータセンター向けメモリ・チップの生産増が同社の装置需要につながりやすい。半導体メーカーの設備投資サイクルに沿った受注動向を持つ。',
   2, 2, '中程度', true),

  ('KLAC', 'KLA Corporation', 'US', 'NASDAQ', 'semiconductor test',
   '半導体製造工程の品質管理に使われるプロセス制御・検査装置を手がける企業。ウェハー上の微細な欠陥検出や膜厚計測など、製造歩留まり向上に関わる装置を提供している。先端・成熟プロセスを問わず幅広い半導体メーカーに採用されている。',
   'AIチップの微細化が進むほどウェハー検査の精度要求と頻度が上がるため、先端半導体の製造増に伴って同社への需要が増えやすい。HBMや先端ロジックの製造拡大が続く局面では、プロセス制御装置の需要を支える要因になりやすい。',
   2, 2, '中程度', true),

  ('INTC', 'Intel Corporation', 'US', 'NASDAQ', 'semiconductor',
   'CPUの設計・製造を一体で行う半導体企業。データセンター・PC・IoT向けにXeonおよびCoreシリーズCPUを展開しており、ファウンドリ（受託製造）事業への本格参入を目指している。AIアクセラレータ「Gaudi」シリーズでGPU市場への参入も試みている。',
   'Gaudi 3 AIアクセラレータをデータセンター向けに提供しており、GPU市場でのシェア拡大を目指している。ファウンドリ事業（Intel Foundry）ではAI向け先端チップの受託製造需要の取り込みを進めている段階にある。',
   1, 1, '低い', true),

  ('DELL', 'Dell Technologies Inc.', 'US', 'NYSE', 'ai servers/storage',
   'PCからエンタープライズ向けサーバー・ストレージ・ネットワーク機器まで幅広いITインフラを提供するメーカー。PowerEdgeサーバーラインにNVIDIAのGPUを搭載したAIサーバーの販売に注力しており、エンタープライズ向けAIインフラの主要サプライヤーの一つとなっている。',
   'NVIDIAのGPUを搭載したAIサーバーをエンタープライズ企業向けに提供しており、企業のAIインフラ投資が増えるほどISG（インフラソリューション）部門の恩恵を受けやすい。AIサーバーのカスタム構成やサポートサービスも提供している。',
   2, 2, '中程度', true),

  ('HPE', 'Hewlett Packard Enterprise Co.', 'US', 'NYSE', 'ai servers/hpc',
   'エンタープライズ向けサーバー・ストレージ・ネットワーク機器を提供するITインフラメーカー。旧Crayブランドのスーパーコンピュータ（HPC）事業を持ち、研究機関・政府向けの大規模計算環境を手がけている。GreenLakeハイブリッドクラウドサービスも展開している。',
   'GreenLakeクラウドサービスとNVIDIA GPU搭載サーバーを組み合わせた企業向けAIインフラソリューションを提供している。HPCシステムの実績を持つことから、政府・研究機関の大規模AIシステム調達でも案件実績がある。',
   2, 2, '中程度', true),

  ('CRM', 'Salesforce Inc.', 'US', 'NYSE', 'enterprise ai software',
   '顧客管理（CRM）クラウドソフトウェアの大手企業。営業・マーケティング・カスタマーサービス向けのSaaSを大企業から中小企業まで幅広く提供している。Agentforceと呼ばれるAIエージェント製品を積極展開している。',
   'AgentforceはAIエージェントが顧客対応や営業タスクを自律的に処理するプラットフォームで、既存のCRM契約顧客へのアドオン販売として展開されている。Data Cloudとの連携により顧客データを活用したAI推論が可能になり、AI機能の付加価値が収益拡大につながりやすい構造がある。',
   2, 2, '中程度', true),

  ('ORCL', 'Oracle Corporation', 'US', 'NYSE', 'ai cloud',
   'データベースソフトウェアで業務基盤を支えてきたIT企業で、近年はOCI（Oracle Cloud Infrastructure）へのクラウド転換を進めている。ERPやHRなどの基幹業務アプリケーションも展開し、大企業・政府機関に幅広い顧客基盤を持つ。',
   'OCI（Oracle Cloud Infrastructure）のGPUクラスターがMicrosoftなどAI大手との大口契約で稼働しており、AIクラウドインフラの提供者として存在感を高めている。大規模なGPUクラスターを必要とするAI学習需要の取り込みが、クラウド部門の成長につながりやすい。',
   2, 2, '中程度', true),

  ('QCOM', 'Qualcomm Incorporated', 'US', 'NASDAQ', 'semiconductor',
   'スマートフォン向けSoC（チップセット）を中心に展開する半導体企業。SnapdragonシリーズはAndroid端末向けに広く採用されており、5G通信技術の特許収入も収益の柱となっている。AI PC・自動車・IoT分野への展開も進めている。',
   'Snapdragonシリーズに内蔵されたNPU（AI演算ユニット）がスマートフォン上でのオンデバイスAI推論を担っており、AI機能の普及がSnapdragon搭載端末の需要増につながりやすい。クラウド非依存のエッジAI処理は低遅延・プライバシーの観点から採用が広がっており、AI PC向けへの横展開も進んでいる。',
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

COMMIT;
