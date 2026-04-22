import { CREW_FACTORS, RESEARCH_FACTORS, DIFFICULTY_FACTORS } from "../shared/utils";
import type { CrewKey, Difficulty, ResKey } from "../shared/types";

export interface ShipSetup {
  power:    number;
  crew:     CrewKey;
}

export interface DominionResult {
  maxArmadaPower: number;
  totalPower:     number;
  ship1:          number;
  ship2:          number;
  ship3:          number;
  difficulty:     number;
  research:       number;
  defiantly:      boolean;
}

export function calculateDominion(
  ship1:      ShipSetup,
  ship2:      ShipSetup,
  ship3:      ShipSetup,
  difficulty: Difficulty,
  research:   ResKey,
  hasDefiant: boolean
): DominionResult {
  const r  = RESEARCH_FACTORS[research];
  const b  = DIFFICULTY_FACTORS[difficulty];
  // Defiant bonus: unique Edict Reward boosts total effective power
  const defiantly = hasDefiant ? 1.15 : 1.0;

  const s1 = Math.round(ship1.power * CREW_FACTORS[ship1.crew]);
  const s2 = Math.round(ship2.power * CREW_FACTORS[ship2.crew]);
  const s3 = Math.round(ship3.power * CREW_FACTORS[ship3.crew]);
  const totalPower = s1 + s2 + s3;

  return {
    maxArmadaPower: Math.round(totalPower * b * r * defiantly),
    totalPower,
    ship1: s1,
    ship2: s2,
    ship3: s3,
    difficulty: b,
    research:   r,
    defiantly:  hasDefiant,
  };
}
