import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて | AI Stock Data",
  description:
    "AI Stock Data の目的や使い方、情報整理の考え方を案内するページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-neutral-100">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">このサイトについて</h1>
        <p className="mb-4 leading-7 text-white/85">
          AI Stock Data は、AI関連銘柄を比較しやすく整理するための情報サイトです。AIとの関わり方や事業の特徴を、なるべく分かりやすい形で確認できるようにしています。
        </p>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">サイトの目的</h2>
          <p className="leading-7 text-white/80">
            AI関連企業の情報は散らばりやすいため、売上規模、成長、カテゴリ、関連性などを一覧で見比べやすく整理することを目的としています。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">どんな人向けか</h2>
          <p className="leading-7 text-white/80">
            AI関連銘柄を調べ始めた方や、複数企業の位置づけをまとめて確認したい方を主な対象としています。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">スコアや分類について</h2>
          <p className="leading-7 text-white/80">
            掲載しているスコアやカテゴリは、情報整理をしやすくするための目安です。最終的な判断の前に、各社の決算資料や公式開示などの一次情報もあわせて確認することをおすすめします。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">今後の更新</h2>
          <p className="leading-7 text-white/80">
            掲載内容は順次見直しながら更新しています。企業情報や分類、説明文なども今後の更新でより分かりやすく整えていく予定です。
          </p>
        </section>
      </section>
    </main>
  );
}
