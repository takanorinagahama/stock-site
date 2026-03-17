import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AI Stock Data",
  description:
    "AI Stock Data におけるアクセス解析、Cookie 利用、広告配信、個人情報の取り扱い方針を掲載しています。",
  alternates: {
    canonical: "https://ai-stock-data.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-neutral-100">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">プライバシーポリシー</h1>
        <p className="mb-5 leading-7 text-white/85">
          当サイトでは、利用状況の把握や内容改善のために、アクセス情報を収集することがあります。以下に、主な取り扱い方針を記載します。
        </p>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">アクセス解析ツールについて</h2>
          <p className="leading-7 text-white/80">
            当サイトでは Google Analytics を利用しています。サイトの利用状況を把握し、改善に役立てるために、Cookie などを通じてアクセス情報が収集される場合があります。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">Cookie の利用について</h2>
          <p className="leading-7 text-white/80">
            当サイトでは、利便性向上や利用状況の把握のために Cookie を利用する場合があります。Cookie の利用は、ブラウザの設定で制限または無効化できます。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">広告配信について</h2>
          <p className="leading-7 text-white/80">
            当サイトでは、今後第三者配信の広告サービス（Google AdSense 等）を利用する場合があります。広告配信事業者が、利用者の興味に応じた広告表示のために Cookie を使用することがあります。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">取得する情報と利用目的</h2>
          <p className="leading-7 text-white/80">
            取得した情報は、サイトの利用状況の把握、内容改善、表示品質の確認、不正利用の防止などの目的で利用します。
          </p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">外部リンクについて</h2>
          <p className="leading-7 text-white/80">
            当サイトでは外部サイトへのリンクを掲載することがあります。リンク先での個人情報の取り扱いについては、各サイトの方針をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">ポリシーの変更について</h2>
          <p className="leading-7 text-white/80">
            本ポリシーの内容は、必要に応じて見直し・変更することがあります。変更後の内容は、このページに掲載した時点から適用します。
          </p>
        </section>
      </section>
    </main>
  );
}
