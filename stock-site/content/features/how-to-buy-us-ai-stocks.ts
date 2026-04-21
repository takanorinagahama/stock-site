import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "how-to-buy-us-ai-stocks",
  title: "米国AI株を日本から買う方法",
  summary:
    "日本から米国AI株を買うハードルは高くない。実際に差が出るのは、どの証券会社を使うか、NISAを使うか、円貨決済と外貨決済をどう使い分けるかという点だ。最初の1口座を選ぶ前に押さえたいポイントを整理する。",
  category: "買い方ガイド",
  updatedAt: "2026-03-23",
  featured: false,
  relatedThemes: [
    "ai-semiconductor-stocks",
    "ai-infrastructure-stocks",
    "ai-software-platform-stocks",
  ],
  relatedStocks: ["NVDA", "MSFT", "AVGO", "AMD"],
  sections: [
    {
      heading: "米国AI株は、国内証券口座から普通に買える",
      paragraphs: [
        "日本から米国AI株を買う方法は意外とシンプルで、基本は国内証券会社で米国株対応口座を使うだけだ。難しく感じやすいのは、銘柄そのものより、口座、手数料、為替、NISAの扱いのほうにある。",
        "SBI証券、楽天証券、マネックス証券はいずれも米国株の取扱いがあり、NVIDIAやMicrosoftのような代表的なAI関連株を国内口座から売買できる。",
      ],
    },
    {
      heading: "最初に決めるべきは、口座とNISAの使い方",
      paragraphs: [
        "初心者が最初に決めるべきことは多くない。どの証券会社を使うか、NISAを使うか、円貨決済で入るか外貨決済を使うか。この3つで十分だ。",
        "SBI証券は公式ページで米国株式取扱銘柄数5,190銘柄超を案内しており、円貨決済にも対応している。楽天証券もNISAで米国株取引手数料無料を案内しており、マネックス証券もNISAで米国株の売買手数料無料を打ち出している。",
      ],
    },
    {
      heading: "通常手数料の水準は近いが、使い勝手は少し違う",
      paragraphs: [
        "通常の米国株現物手数料は、3社とも大きな方向性は似ている。SBI証券は約定代金の0.495%・上限22米ドル、楽天証券も約定代金の0.495%・上限22米ドル、マネックス証券も約定代金の0.495%・上限22米ドルという案内だ。",
        "差が出やすいのは、円貨決済のしやすさ、NISA時の導線、情報画面や分析機能だ。スペック表だけで選ぶより、自分が迷わず使えるかで見るほうが実務的だ。",
      ],
    },
    {
      heading: "円貨決済と外貨決済は、目的で分ければいい",
      paragraphs: [
        "米国株では、円貨決済で簡単に買う方法と、米ドルに両替して外貨決済で買う方法がある。最初から為替まで細かく管理したい人は外貨決済向きだが、まず始めたいだけなら円貨決済のほうが入りやすい。",
        "楽天証券は、米国株の外貨決済と円貨決済の比較ページを用意しており、積立では円貨決済を使う人が多いことも紹介している。最初の1口目は、手数料最適化よりも、続けられる導線を作るほうが重要だ。",
      ],
    },
    {
      heading: "最初の銘柄は、代表的な大型株からで十分",
      paragraphs: [
        "口座を作った直後にやることは、銘柄を増やすことではない。まずはNVIDIA、Microsoft、Broadcom、AMDのような代表的なAI株を1銘柄か2銘柄に絞り、注文方法と値動きに慣れるほうが失敗しにくい。",
        "AI関連株は話題が大きく、次々にテーマ株が出てくる。だが、最初の段階では、どの口座で、どの通貨で、どう買うかが定まっていれば十分だ。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "日本から米国AI株を買う方法は難しくない。違いが出るのは、どの証券会社を使うか、NISAを使うか、円貨決済と外貨決済をどう使い分けるかの部分だ。",
        "最初の1口座としては、SBI証券・楽天証券・マネックス証券の3社を比べれば出発点として十分だ。そこから、自分にとって一番迷わず使える導線を選ぶのがいちばん現実的だ。",
      ],
    },
  ],
  sources: [
    {
      label: "SBI証券 外国株式・海外ETF",
      url: "https://www.sbisec.co.jp/visitor/foreign",
      publisher: "SBI証券",
    },
    {
      label: "SBI証券 外国株式委託手数料",
      url: "https://search.sbisec.co.jp/v2/popwin/attention/trading/stock_gai_23.html",
      publisher: "SBI証券",
    },
    {
      label: "SBI証券 NISA",
      url: "https://www.sbisec.co.jp/visitor/nisa",
      publisher: "SBI証券",
    },
    {
      label: "楽天証券 米国株式・海外ETF 手数料",
      url: "https://www.rakuten-sec.co.jp/web/us/stock/commission.html",
      publisher: "楽天証券",
    },
    {
      label: "楽天証券 NISA/新NISA",
      url: "https://www.rakuten-sec.co.jp/web/nisa/",
      publisher: "楽天証券",
    },
    {
      label: "楽天証券 米ドルと日本円のどちらで購入するのがおすすめ？",
      url: "https://www.rakuten-sec.co.jp/web/us/special/payment_currency_pros_cons/",
      publisher: "楽天証券",
    },
    {
      label: "マネックス証券 米国株",
      url: "https://info.monex.co.jp/us-stock/index.html",
      publisher: "マネックス証券",
    },
    {
      label: "マネックス証券のNISAは売買手数料がすべて無料",
      url: "https://info.monex.co.jp/nisa/feefree.html",
      publisher: "マネックス証券",
    },
  ],
};
