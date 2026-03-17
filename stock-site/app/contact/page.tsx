import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | AI Stock Data",
  description:
    "AI Stock Data への修正依頼、ご意見、ご要望などの連絡先を案内するページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-neutral-100">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-3 text-3xl font-semibold">お問い合わせ</h1>
        <p className="mb-5 leading-7 text-white/85">
          掲載内容の修正依頼、ご意見、ご要望などは、以下のメールアドレスまでご連絡ください。
        </p>

        <section className="mb-5 rounded-xl border border-white/10 bg-black/10 p-4">
          <p className="mb-2 text-sm text-white/70">問い合わせ先メールアドレス</p>
          <a className="text-lg font-semibold text-white underline decoration-white/30 underline-offset-4" href="mailto:contact@ai-stock-data.com">
            contact@ai-stock-data.com
          </a>
        </section>

        <section className="mb-5">
          <h2 className="mb-2 text-xl font-semibold">ご連絡について</h2>
          <p className="leading-7 text-white/80">
            内容を確認のうえ、必要に応じて対応いたします。返信までにお時間をいただく場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">返信できない場合について</h2>
          <p className="leading-7 text-white/80">
            内容によっては返信できない場合があります。また、誹謗中傷や営業目的のご連絡には対応を控えさせていただくことがあります。
          </p>
        </section>
      </section>
    </main>
  );
}
