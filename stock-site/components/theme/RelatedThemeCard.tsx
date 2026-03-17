import Link from "next/link";
import type { ThemeDefinition } from "../../lib/themes";

type RelatedThemeCardProps = {
  theme: ThemeDefinition;
};

export default function RelatedThemeCard({ theme }: RelatedThemeCardProps) {
  return (
    <Link
      href={`/themes/${theme.slug}`}
      className="block rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:bg-white/10"
    >
      <p className="mb-2 font-semibold text-white">{theme.title}</p>
      <p className="text-sm leading-7 text-white/65">{theme.shortDescription}</p>
    </Link>
  );
}
