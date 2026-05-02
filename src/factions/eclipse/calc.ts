import {
  CREW_FACTORS,
  RESEARCH_FACTORS,
  DIFFICULTY_FACTORS,
} from "../shared/utils";
import type { CrewKey, Difficulty, ResKey } from "../shared/types";

export type SpockTier = 0 | 3 | 4 | 5 | "beverly";

// Shield regen per round: Spock = % crew defense, Beverly = % crew health
const SPOCK_SHIELD_REGEN: Record<SpockTier, number> = {
  0: 0,
  3: 100,
  4: 400,
  5: 750,
  beverly: 200,
};

// Hull Breach: flat +50% crit damage after all other bonuses (Stella crew)
export type HullBreachKey = "yes" | "no";

export interface EclipseResult {
  maxArmadaPower: number;
  shieldRegenPct: number;
  actualShieldRegenHp: number;  // 0 if no defenseStat provided; N/A for Beverly
  spockTier: SpockTier;
  hullBreach: boolean;
  crew: number;
  research: number;
  survivability: "low" | "medium" | "high";
}

export function calculateEclipse(
  power: number,
  difficulty: Difficulty,
  crew: CrewKey,
  research: ResKey,
  spockTier: SpockTier,
  hullBreach: HullBreachKey,
  armadaLevel: number,
  defenseStat: number = 0,
): EclipseResult {
  const b = DIFFICULTY_FACTORS[difficulty];
  const c = CREW_FACTORS[crew];
  const r = RESEARCH_FACTORS[research];
  const sr = SPOCK_SHIELD_REGEN[spockTier];
  const hb = hullBreach === "yes";

  const armadaLevelFactor = 2 ** (armadaLevel - 1);
  const spockFactor =
    spockTier === 5
      ? 1.30
      : spockTier === 4
        ? 1.15
        : spockTier === "beverly"
          ? 1.10
          : spockTier === 3
            ? 0.95
            : 0.80;
  const hullFactor = hb ? 1.15 : 1.0;

  const survivability: EclipseResult["survivability"] =
    spockTier === 5
      ? "high"
      : spockTier === 4 || spockTier === "beverly"
        ? "medium"
        : "low";

  // Actual HP regen per round: spockPct/100 × defenseStat (Spock only; Beverly uses crew health, different stat)
  const actualShieldRegenHp =
    defenseStat > 0 && spockTier !== "beverly"
      ? Math.round((sr / 100) * defenseStat)
      : 0;

  return {
    maxArmadaPower: Math.round(
      power * b * armadaLevelFactor * c * r * spockFactor * hullFactor,
    ),
    shieldRegenPct: sr,
    actualShieldRegenHp,
    spockTier,
    hullBreach: hb,
    crew: c,
    research: r,
    survivability,
  };
}
