import Link from "next/link";
import type { ThemeDefinition, ThemeGroupDefinition } from "../../lib/themes";

type ThemeGroupCardProps = {
  group: ThemeGroupDefinition;
  themes: ThemeDefinition[];
};

export default function ThemeGroupCard({ group, themes }: ThemeGroupCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Theme Group</p>
        <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
        <p className="mt-3 text-sm leading-7 text-white/72">{group.description}</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {themes.map((theme) => (
          <Link
            key={`${group.key}-${theme.slug}-chip`}
            href={`/themes/${theme.slug}`}
            className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs text-white/75 transition hover:border-white/25 hover:text-white"
          >
            {theme.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        {themes.slice(0, 3).map((theme) => (
          <Link
            key={`${group.key}-${theme.slug}`}
            href={`/themes/${theme.slug}`}
            className="block rounded-xl border border-white/10 bg-black/10 px-4 py-3 transition hover:bg-white/10"
          >
            <span className="block font-semibold text-white">{theme.title}</span>
            <span className="mt-1 block text-sm leading-6 text-white/62">{theme.shortDescription}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}
