import type { Metadata } from "next";
import { SiteHeader } from "../../components/shared/SiteHeader";
import { ThemeListClient } from "../../components/themes-sandbox/ThemeListClient";

export const metadata: Metadata = {
  title: "テーマ別AI関連銘柄 | AI Stock Data",
  description:
    "AI半導体、AIインフラ、AIソフトウェア、電力インフラなど、テーマ別にAI関連銘柄を比較しやすく整理した一覧ページです。",
  alternates: {
    canonical: "https://ai-stock-data.com/themes",
  },
};

export default function ThemesPage() {
  return (
    <>
      <SiteHeader />
      <ThemeListClient />
    </>
  );
}
