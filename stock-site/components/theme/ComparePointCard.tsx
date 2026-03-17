type ComparePointCardProps = {
  point: string;
};

export default function ComparePointCard({ point }: ComparePointCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/10 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Compare</p>
      <p className="text-sm leading-7 text-white/82">{point}</p>
    </article>
  );
}
