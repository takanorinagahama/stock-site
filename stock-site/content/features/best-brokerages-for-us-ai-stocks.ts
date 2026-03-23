import type { FeatureArticle } from "../../lib/features/types";

export const article: FeatureArticle = {
  slug: "best-brokerages-for-us-ai-stocks",
  title: "米国AI株に強い証券会社はどこ？SBI・楽天・マネックス比較",
  summary:
    "米国AI株を買う口座は、手数料だけで選ぶと差が見えにくい。実際には、取扱銘柄数、NISA、円貨決済、ポイント、分析ツールの違いが使い勝手を分ける。SBI・楽天・マネックスの3社を、AI株目的で整理する。",
  category: "買い方ガイド",
  updatedAt: "2026-03-23",
  featured: false,
  relatedThemes: ["ai-semiconductor-stocks", "ai-infrastructure-stocks"],
  relatedStocks: ["NVDA", "MSFT", "AVGO"],
  sections: [
    {
      heading: "米国AI株向けの口座は、手数料以外で差が出る",
      paragraphs: [
        "SBI証券、楽天証券、マネックス証券は、いずれも米国株に対応しており、通常手数料の水準も大きくは離れていない。そのため、表面上の手数料だけを見ても、どれを選ぶべきかは分かりにくい。",
        "実際に使い勝手を分けるのは、取扱銘柄数、NISA時の導線、円貨決済のしやすさ、ポイント投資、分析ツールの差だ。AI株は話題も値動きも大きいテーマなので、この違いが意外と効く。",
      ],
    },
    {
      heading: "SBI証券は、銘柄数と総合力で選びやすい",
      paragraphs: [
        "SBI証券は、米国株式取扱銘柄数5,190銘柄超を案内しており、円貨決済にも対応している。通常の米国株現物手数料は約定代金の0.495%、上限22米ドルで、NISAでは米国株式・海外ETF売買手数料0円を打ち出している。",
        "AI本命株だけでなく、周辺の中堅株やETFまで広く見ていきたい人には、ラインナップの厚さが一つの安心材料になる。最初の1口座として、総合力で選びやすいタイプだ。",
      ],
    },
    {
      heading: "楽天証券は、NISA・円貨決済・ポイントの導線が強い",
      paragraphs: [
        "楽天証券は、米国株の通常手数料を約定代金の0.495%、上限22米ドルと案内しつつ、NISAでは米国株式の取引手数料無料を前面に出している。",
        "さらに、NISAページでは米ドルリアルタイム為替手数料0銭を案内しており、別ページでは定時為替取引の米ドル/円に±25銭の為替手数料があることも明示している。米国株式の円貨決済ポイント投資にも対応しており、楽天経済圏との相性を重視する人には分かりやすい。",
      ],
    },
    {
      heading: "マネックス証券は、分析ツールの相性がいい",
      paragraphs: [
        "マネックス証券も通常の米国株現物手数料は約定代金の0.495%、上限22米ドルで、NISAでは米国株の売買手数料無料を案内している。スペックだけなら3社はかなり近い。",
        "違いが出るのは情報面で、マネックスは「銘柄スカウター米国株」や米国株専用スマホアプリを用意している。公式ページでも、スクリーニング、ランキング、銘柄比較、過去業績の確認などを打ち出しており、AI株を調べながら買いたい人には相性がいい。",
      ],
    },
    {
      heading: "どの口座が向いているかは、投資スタイルで変わる",
      paragraphs: [
        "SBI証券は、米国株のラインナップを広く見たい人や、最初の1口座を総合力で選びたい人向き。楽天証券は、NISA、円貨決済、ポイント投資まで含めて始めやすさを重視する人向き。マネックス証券は、情報画面や分析ツールを使いながら銘柄選びをしたい人向きだ。",
        "どれが絶対に上というより、どの入口が自分のスタイルに合うかで選ぶほうが自然だ。米国AI株は継続して見るテーマなので、使いやすさの差は思っている以上に大きい。",
      ],
    },
    {
      heading: "まとめ",
      paragraphs: [
        "米国AI株向けの証券会社比較では、手数料の僅差より、取扱銘柄数、NISA、為替、ポイント、分析ツールを見るほうが実感に近い。",
        "SBIは総合力、楽天は始めやすさ、マネックスは分析のしやすさという整理が分かりやすい。最終的には、どの口座なら迷わず続けられるかで決めるのがよい。",
        "なお、手数料や対象サービスは改定されることがあるため、口座開設前には各社の公式ページで最終確認する前提で構成している。",
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
      label: "楽天証券 外国為替の手数料",
      url: "https://www.rakuten-sec.co.jp/web/currency/forex/commission.html",
      publisher: "楽天証券",
    },
    {
      label: "楽天証券 米国株式の取引で楽天ポイントが使える！貯まる！",
      url: "https://www.rakuten-sec.co.jp/web/lp/us-rakutenkeizaiken/",
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
    {
      label: "銘柄スカウター米国株",
      url: "https://info.monex.co.jp/market-information/tool/us-expectation.html",
      publisher: "マネックス証券",
    },
    {
      label: "スマートフォンアプリ - 米国株取引",
      url: "https://info.monex.co.jp/us-stock/tool/sp-app.html",
      publisher: "マネックス証券",
    },
  ],
};
