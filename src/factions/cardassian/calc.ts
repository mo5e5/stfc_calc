import { CREW_FACTORS, RESEARCH_FACTORS } from "../shared/utils";
import type { CrewKey, Difficulty, ResKey } from "../shared/types";

export interface CardassianResult {
  maxArmadaPower: number;
  survivalRounds:  number;   // Uncommon only: rounds until 100% crit
  critChanceAtEnd: number;   // Uncommon: crit% after survivalRounds rounds
  critDamage:      number;   // % critical damage for Rare/Epic
  crew:            number;
  research:        number;
  difficulty:      Difficulty;
}

// Gaila reduces critical damage — key crew choice for Cardassian
export const GAILA_REDUCTION: Record<"none" | "Gaila" | "GailaSynergy", number> = {
  none:        0,
  Gaila:       50,
  GailaSynergy: 110,
};

export type GailaKey = keyof typeof GAILA_REDUCTION;

const BASE_FACTORS: Record<Difficulty, number> = {
  Uncommon: 2.8,
  Rare:     1.7,
  Epic:     1.0,
};

// Critical damage multiplier the armada deals, per difficulty
const CRIT_DAMAGE: Record<Difficulty, number> = {
  Uncommon: 250, // escalating — starting value
  Rare:     375,
  Epic:     450,
};

// Starting crit chance (Uncommon escalates +10%/round, Rare/Epic fixed)
const BASE_CRIT_CHANCE: Record<Difficulty, number> = {
  Uncommon: 20,
  Rare:     20,
  Epic:     20,
};

export function roundsUntilMaxCrit(difficulty: Difficulty): number {
  if (difficulty !== "Uncommon") return Infinity;
  // Starts at 20%, +10%/round → reaches 100% after 8 rounds
  return 8;
}

export function critChanceAtRound(round: number): number {
  // Uncommon only — clamped to 100
  return Math.min(100, BASE_CRIT_CHANCE.Uncommon + round * 10);
}

export function calculateCardassian(
  power: number,
  difficulty: Difficulty,
  crew: CrewKey,
  research: ResKey,
  gaila: GailaKey
): CardassianResult {
  const c = CREW_FACTORS[crew];
  const r = RESEARCH_FACTORS[research];
  const b = BASE_FACTORS[difficulty];

  // Gaila reduces effective crit damage the armada deals
  const gailaReduction = GAILA_REDUCTION[gaila];
  const effectiveCritDamage = Math.max(0, CRIT_DAMAGE[difficulty] - gailaReduction);

  // Crit damage factor: higher armada crit damage = harder = lower multiplier
  // 250% crit → factor 1.0 baseline; each 100% extra = ~0.1 reduction
  const critPenalty = 1 - (effectiveCritDamage - 250) / 2500;

  const maxArmadaPower = Math.round(power * b * c * r * Math.max(0.6, critPenalty));

  return {
    maxArmadaPower,
    survivalRounds:  difficulty === "Uncommon" ? 8 : Infinity,
    critChanceAtEnd: difficulty === "Uncommon" ? 100 : BASE_CRIT_CHANCE[difficulty],
    critDamage:      effectiveCritDamage,
    crew:            c,
    research:        r,
    difficulty,
  };
}
