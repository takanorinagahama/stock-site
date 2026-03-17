const CATEGORY_JA_MAP: Record<string, string> = {
  semiconductor: "半導体",
  investment: "投資",
  "data infrastructure": "データ基盤",
  "power/automation": "電力/自動化",
  "smart infrastructure/automation": "スマートインフラ/自動化",
  "enterprise ai software": "企業向けAIソフト",
  "semiconductor test": "半導体テスト",
  "semiconductor manufacturing equipment": "半導体製造装置",
  "data center/interconnect": "データセンター/相互接続",
  "data center power/cooling": "データセンター電力/冷却",
  "data center power equipment": "データセンター電力設備",
  "ai memory": "AIメモリ",
  "ai automation/rpa": "AI自動化/RPA",
  "ai optical communications/photonics": "AI光通信/フォトニクス",
  "ai foundry/advanced packaging": "AIファウンドリ/先端パッケージ",
  etf: "ETF",
  "ai infrastructure": "AIインフラ",
  "ai platform": "AIプラットフォーム",
  "ai cloud": "AIクラウド",
  "ai application": "AIアプリケーション",
  "ai saas": "企業向けAIソフト",
  "ai accelerator/data center cpu": "AIアクセラレータ/データセンターCPU",
  "ai accelerator/platform": "AIアクセラレータ/プラットフォーム",
  "ai cloud/platform": "AIクラウド/プラットフォーム",
  "ai cloud foundation": "AIクラウド基盤",
  "ai servers/hpc": "AIサーバー/HPC",
  "ai servers/storage": "AIサーバー/ストレージ",
  "ai servers/rack-scale": "AIサーバー/ラックスケール",
  "ai server manufacturing": "AIサーバー製造",
  "ai data center optical communications": "AIデータセンター光通信",
  "ai data infrastructure": "AIデータ基盤",
  "ai network/custom semiconductors": "AIネットワーク/カスタム半導体",
  "ai network/optical communications": "AIネットワーク/光通信",
};

const CATEGORY_DESCRIPTION_MAP: Record<string, string> = {
  企業向けAIソフト:
    "企業の業務にAI機能を組み込むソフトウェア領域です。導入しやすさや運用のしやすさが価値になります。",
  "AIアクセラレータ/データセンターCPU": "AI計算を支えるチップ領域です。データセンターで大量のAI処理を実行するための中核部品を担います。",
  "AIアクセラレータ/プラットフォーム": "AI向けアクセラレータと関連ソフトを一体で提供する領域です。開発者がAIを実運用しやすくする土台になります。",
  "AIアプリケーション": "AIを使った最終製品・サービスを提供する領域です。ユーザーが直接触れるAI体験に近いポジションです。",
  "AIインフラ": "GPU・サーバー・データセンターなど、AIを動かす土台を支える領域です。AI産業全体の基礎体力にあたります。",
  "AIクラウド": "クラウド上でAIモデルを動かす計算基盤を提供する領域です。企業がAIを素早く導入する入口になりやすいです。",
  "AIクラウド/プラットフォーム": "クラウド基盤とAI開発プラットフォームをあわせて提供する領域です。学習から運用まで一気通貫で支えます。",
  "AIクラウド基盤": "AIワークロード向けのクラウド基盤そのものを支える領域です。計算資源・運用基盤・拡張性が価値の中心です。",
  "AIサーバー/HPC": "高性能なAIサーバーやHPC環境を担う領域です。大規模学習や高負荷推論など重い処理に強みがあります。",
  "AIサーバー/ストレージ": "AIで使う大量データを高速に保存・供給する領域です。学習効率や推論の安定性を下支えします。",
  "AIサーバー/ラックスケール": "ラック単位でAI計算資源を最適化する領域です。データセンター全体の効率と拡張性に直結します。",
  "AIサーバー製造": "AI用途のサーバーを設計・製造する領域です。需要拡大に応じて実機を供給する役割を担います。",
  "AIデータセンター光通信": "AIデータセンター内外を高速につなぐ光通信領域です。大規模AIのボトルネックを減らす重要な部分です。",
  "AIデータ基盤": "AI活用の前提となるデータの収集・管理・活用を支える領域です。モデル性能の土台づくりを担います。",
  "AIファウンドリ/先端パッケージ":
    "AIチップを実際に製造し、高性能化に必要な先端パッケージ技術も担う領域です。量産と性能実現の要になります。",
  AIメモリ:
    "AI学習や推論で大量データを高速処理するために必要なメモリ領域です。GPUやアクセラレータの性能を支える重要部品です。",
  "AI光通信/フォトニクス":
    "AIデータセンター内外で大量データを高速にやり取りするための光通信領域です。計算資源同士を低遅延でつなぐ役割があります。",
  "AI自動化/RPA":
    "AIを使って定型業務や社内オペレーションを自動化する領域です。人手で行っていた作業の効率化を支えます。",
  "AIネットワーク/カスタム半導体": "AI向けネットワーク機器と専用半導体を担う領域です。通信効率や消費電力の最適化に寄与します。",
  "AIネットワーク/光通信": "AIデータセンターをつなぐ高速通信を支える領域です。計算資源同士の連携速度を高めます。",
  "スマートインフラ/自動化":
    "工場・設備・社会インフラの運用を自動化する領域です。AIを使って監視や制御の効率を高める役割を担います。",
  "データセンター/相互接続":
    "データセンター同士や内部機器を高速につなぐ領域です。AI計算資源をまとめて使うための接続基盤になります。",
  "データセンター電力/冷却":
    "高負荷なAI計算を安定して動かすための電力供給や冷却を支える領域です。稼働率と効率の維持に欠かせません。",
  "データセンター電力設備":
    "AIデータセンター向けの受電・配電・変電設備を担う領域です。大規模計算を安全に支える基盤部分です。",
  半導体テスト:
    "AI半導体や高速メモリが設計通りに動くか検査する領域です。高性能化が進むほど、品質確認の重要性が高まります。",
  半導体製造装置:
    "AI半導体を製造するための装置を提供する領域です。微細化や高性能化を支える工程面の中核です。",
  "電力/自動化":
    "電力設備や産業機器の制御を自動化する領域です。AI需要で増える電力負荷や設備運用の効率化を支えます。",
  半導体: "AI向けチップや製造装置など、AIの土台を担う領域です。性能向上の中心となるハードウェアです。",
  投資: "AI企業への出資やポートフォリオ運用を通じて成長を取り込む領域です。事業会社とは異なる形でAI市場に関与します。",
  データ基盤: "データ処理基盤・ネットワーク・保管基盤などを提供する領域です。AIモデル運用の前提条件を整えます。",
  ETF: "複数銘柄に分散投資できる上場投資信託です。個別企業よりも分散重視でAIテーマに参加しやすくなります。",
  AIプラットフォーム: "AIモデルや開発基盤を提供し、他サービスの土台になる領域です。幅広い企業が活用しやすいのが特徴です。",
  未分類: "分類情報を整理中のカテゴリです。企業の位置づけは今後の更新で補足します。",
};

export function normalizeCategoryLabel(value: string | null | undefined): string {
  if (!value || value.trim() === "") return "未分類";
  const normalized = value.trim().toLowerCase().replace(/\s+/g, " ");
  return CATEGORY_JA_MAP[normalized] ?? value.trim();
}

export function toCategoryJa(value: string | null | undefined): string {
  return normalizeCategoryLabel(value);
}

export function getCategoryDescription(value: string | null | undefined): string {
  const categoryJa = normalizeCategoryLabel(value);
  return CATEGORY_DESCRIPTION_MAP[categoryJa] ?? "分類情報を整理中のカテゴリです。企業の位置づけは今後の更新で補足します。";
}
