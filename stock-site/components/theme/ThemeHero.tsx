import Link from "next/link";

type ThemeHeroProps = {
  title: string;
  description: string;
  tags?: string[];
  breadcrumbs?: Array<{ label: string; href?: string }>;
  meta?: string;
};

export default function ThemeHero({
  title,
  description,
  tags = [],
  breadcrumbs = [],
  meta,
}: ThemeHeroProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      {breadcrumbs.length > 0 ? (
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/55">
          {breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/78">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 ? <span className="text-white/30">/</span> : null}
            </span>
          ))}
        </nav>
      ) : null}
      {meta ? <p className="mb-2 text-sm text-white/55">{meta}</p> : null}
      <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">{description}</p>
      {tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
