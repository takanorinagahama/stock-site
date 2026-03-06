export type ScoreBreakdown = {
  total: number;
  parts: {
    ai: number;
    growth: number;
    dependency: number;
    tier: number;
  };
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTierBonus(tier: string | null | undefined): number {
  if (tier === "A") return 10;
  if (tier === "B") return 5;
  return 0;
}

export function calcScoreBreakdown(
  aiRevMid: number,
  growthDiff: number,
  dependencyLevel: number,
  tier?: string | null
): ScoreBreakdown {
  const aiScore = clamp(aiRevMid * 0.8, 0, 40);
  const growthScore = clamp(growthDiff * 1.2, 0, 40);
  const dependencyScore = dependencyLevel * 5;
  const tierScore = getTierBonus(tier);
  const total = aiScore + growthScore + dependencyScore + tierScore;

  return {
    total,
    parts: {
      ai: aiScore,
      growth: growthScore,
      dependency: dependencyScore,
      tier: tierScore,
    },
  };
}

export function calcTotalScore(
  aiRevMid: number,
  growthDiff: number,
  dependencyLevel: number,
  tier?: string | null
) {
  return calcScoreBreakdown(aiRevMid, growthDiff, dependencyLevel, tier).total;
}
