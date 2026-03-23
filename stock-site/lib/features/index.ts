import type { FeatureArticle } from "./types";
import { article as aiBeneficiaries } from "../../content/features/ai-beneficiaries-beyond-semiconductors";
import { article as howToBuy } from "../../content/features/how-to-buy-us-ai-stocks";
import { article as aiEarningsProof } from "../../content/features/ai-earnings-proof";

const ALL_FEATURES: FeatureArticle[] = [
  aiBeneficiaries,
  howToBuy,
  aiEarningsProof,
];

export function getAllFeatures(): FeatureArticle[] {
  return ALL_FEATURES;
}

export function getFeaturedFeatures(): FeatureArticle[] {
  return ALL_FEATURES.filter((a) => a.featured);
}

export function getFeatureBySlug(slug: string): FeatureArticle | undefined {
  return ALL_FEATURES.find((a) => a.slug === slug);
}

export function getAllFeatureSlugs(): string[] {
  return ALL_FEATURES.map((a) => a.slug);
}
