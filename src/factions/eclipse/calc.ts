import { CREW_FACTORS, RESEARCH_FACTORS, DIFFICULTY_FACTORS } from "../shared/utils";
import type { CrewKey, Difficulty, ResKey } from "../shared/types";

export type SpockTier = 0 | 3 | 4 | 5;

// Shield regen as % of crew defense per round (0 = no Spock)
const SPOCK_SHIELD_REGEN: Record<SpockTier, number> = {
  0: 0,
  3: 100,
  4: 400,
  5: 750,
};

// Hull Breach: flat +50% crit damage after all other bonuses (Stella crew)
export type HullBreachKey = "yes" | "no";

export interface EclipseResult {
  maxArmadaPower: number;
  shieldRegenPct: number;
  spockTier:      SpockTier;
  hullBreach:     boolean;
  crew:           number;
  research:       number;
  survivability:  "low" | "medium" | "high";
}

export function calculateEclipse(
  power:      number,
  difficulty: Difficulty,
  crew:       CrewKey,
  research:   ResKey,
  spockTier:  SpockTier,
  hullBreach: HullBreachKey
): EclipseResult {
  const b  = DIFFICULTY_FACTORS[difficulty];
  const c  = CREW_FACTORS[crew];
  const r  = RESEARCH_FACTORS[research];
  const sr = SPOCK_SHIELD_REGEN[spockTier];
  const hb = hullBreach === "yes";

  const spockFactor = spockTier === 5 ? 1.25 : spockTier === 4 ? 1.1 : spockTier === 3 ? 1.0 : 0.8;
  const hullFactor  = hb ? 1.15 : 1.0;

  const survivability: EclipseResult["survivability"] =
    spockTier >= 5 ? "high" : spockTier >= 4 ? "medium" : "low";

  return {
    maxArmadaPower: Math.round(power * b * c * r * spockFactor * hullFactor),
    shieldRegenPct: sr,
    spockTier,
    hullBreach:     hb,
    crew:           c,
    research:       r,
    survivability,
  };
}
