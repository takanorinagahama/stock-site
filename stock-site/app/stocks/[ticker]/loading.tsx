function Spinner() {
  return (
    <div
      className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white/80"
      aria-hidden="true"
    />
  );
}

export default function StockDetailLoading() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-180px)] max-w-[920px] items-center justify-center px-6 py-14 text-neutral-100">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-8 py-8">
        <Spinner />
        <div className="text-center">
          <p className="text-base font-medium text-white/90">銘柄詳細を読み込んでいます</p>
          <p className="mt-1 text-sm text-white/60">最新のデータを表示しています</p>
        </div>
      </div>
    </main>
  );
}
