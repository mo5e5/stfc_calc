import { CREW_FACTORS, RESEARCH_FACTORS } from "../shared/utils";
import type { CrewKey, ResKey } from "../shared/types";

export type BorgTarget = "Sphere" | "Cube" | "MegaCube";
export type BorgCrewKey = "BorgSynergy" | "Optimal" | "Standard";

// Borg targets have high mitigation — this factor represents how much harder
// each target is relative to a standard armada of the same level
const BORG_MITIGATION_FACTOR: Record<BorgTarget, number> = {
  Sphere:   1.8,
  Cube:     1.2,
  MegaCube: 0.7,  // Extremely hard — only viable with full Borg crew synergy
};

const BORG_CREW_FACTOR: Record<BorgCrewKey, number> = {
  BorgSynergy: 1.35,  // Nine/Seven/Five of Eleven — full synergy crits negate MegaCube crits
  Optimal:     1.0,
  Standard:    0.75,
};

export interface BorgResult {
  maxArmadaPower: number;
  target:         BorgTarget;
  borgCrew:       number;
  crew:           number;
  research:       number;
  megaCubeWarning: boolean;
}

export function calculateBorg(
  power:    number,
  target:   BorgTarget,
  borgCrew: BorgCrewKey,
  crew:     CrewKey,
  research: ResKey
): BorgResult {
  const mf = BORG_MITIGATION_FACTOR[target];
  const bc = BORG_CREW_FACTOR[borgCrew];
  const c  = CREW_FACTORS[crew];
  const r  = RESEARCH_FACTORS[research];

  return {
    maxArmadaPower:  Math.round(power * mf * bc * c * r),
    target,
    borgCrew:        bc,
    crew:            c,
    research:        r,
    megaCubeWarning: target === "MegaCube" && borgCrew !== "BorgSynergy",
  };
}
