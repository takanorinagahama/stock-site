import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項 | AI Stock Data",
  description:
    "AI Stock Data に掲載する投資関連情報の位置づけと、利用にあたっての免責事項を掲載しています。",
  alternates: {
    canonical: "https://ai-stock-data.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-neutral-100">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">免責事項</h1>
        <p className="mb-5 leading-7 text-white/85">
          当サイトは、AI関連企業や銘柄に関する情報を整理して提供することを目的としたものであり、投資助言を行うものではありません。
        </p>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">投資判断について</h2>
          <p className="leading-7 text-white/80">
            掲載情報は参考資料であり、最終的な投資判断は利用者ご自身の責任で行ってください。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">情報の正確性について</h2>
          <p className="leading-7 text-white/80">
            掲載内容の正確性、完全性、最新性には注意していますが、これらを保証するものではありません。情報は予告なく変更される場合があります。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">外部リンクについて</h2>
          <p className="leading-7 text-white/80">
            当サイトからリンクした外部サイトの内容やサービスについて、当サイトは責任を負いません。利用にあたってはリンク先の案内をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">損害等について</h2>
          <p className="leading-7 text-white/80">
            当サイトの情報を利用したことによって生じたいかなる損害についても、当サイトは責任を負いかねます。あらかじめご了承ください。
          </p>
        </section>
      </section>
    </main>
  );
}
