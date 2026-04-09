import type { FeatureArticle } from "./types";
import { article as aiBeneficiaries } from "../../content/features/ai-beneficiaries-beyond-semiconductors";
import { article as howToBuy } from "../../content/features/how-to-buy-us-ai-stocks";
import { article as aiEarningsProof } from "../../content/features/ai-earnings-proof";
import { article as aiDataCenter } from "../../content/features/ai-data-center-stocks";
import { article as bestBrokerages } from "../../content/features/best-brokerages-for-us-ai-stocks";
import { article as japanAiCompanies } from "../../content/features/japan-ai-companies";
import { article as openaiAnthropicDifferences } from "../../content/features/openai-anthropic-google-deepmind-differences";
import { article as aiModelsBeyondLlm } from "../../content/features/ai-models-beyond-llm";
import { article as spaceSolarPower } from "../../content/features/space-based-solar-power-ai-energy";

const ALL_FEATURES: FeatureArticle[] = [
  aiBeneficiaries,
  howToBuy,
  aiEarningsProof,
  aiDataCenter,
  bestBrokerages,
  japanAiCompanies,
  openaiAnthropicDifferences,
  aiModelsBeyondLlm,
  spaceSolarPower,
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
