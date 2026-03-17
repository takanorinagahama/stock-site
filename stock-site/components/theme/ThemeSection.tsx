import type { ReactNode } from "react";

type ThemeSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function ThemeSection({ title, description, children }: ThemeSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-7 text-white/65">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
