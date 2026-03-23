export type FeatureCategory = "テーマ深掘り" | "買い方ガイド" | "決算ベース";

export type FeatureSection = {
  heading: string;
  paragraphs: string[];
};

export type FeatureSource = {
  label: string;
  url: string;
  publisher?: string;
};

export type FeatureArticle = {
  slug: string;
  title: string;
  summary: string;
  category: FeatureCategory;
  updatedAt: string; // "YYYY-MM-DD"
  featured: boolean;
  relatedThemes: string[]; // theme slugs from lib/themes
  relatedStocks: string[]; // ticker strings
  sections: FeatureSection[];
  sources: FeatureSource[];
};
