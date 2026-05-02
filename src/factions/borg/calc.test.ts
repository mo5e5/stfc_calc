import { describe, it, expect } from "vitest";
import { calculateBorg } from "./calc";

describe("calculateBorg", () => {
  it("Sphere has higher factor than Cube", () => {
    const sphere = calculateBorg(1_000_000, "Sphere",   "Optimal", "Optimal", "High");
    const cube   = calculateBorg(1_000_000, "Cube",     "Optimal", "Optimal", "High");
    expect(sphere.maxArmadaPower).toBeGreaterThan(cube.maxArmadaPower);
  });

  it("MegaCube is hardest (lowest power)", () => {
    const cube     = calculateBorg(1_000_000, "Cube",     "Optimal", "Optimal", "High");
    const megaCube = calculateBorg(1_000_000, "MegaCube", "Optimal", "Optimal", "High");
    expect(megaCube.maxArmadaPower).toBeLessThan(cube.maxArmadaPower);
  });

  it("BorgSynergy crew gives highest result", () => {
    const synergy  = calculateBorg(1_000_000, "MegaCube", "BorgSynergy", "Optimal", "High");
    const optimal  = calculateBorg(1_000_000, "MegaCube", "Optimal",     "Optimal", "High");
    const standard = calculateBorg(1_000_000, "MegaCube", "Standard",    "Optimal", "High");
    expect(synergy.maxArmadaPower).toBeGreaterThan(optimal.maxArmadaPower);
    expect(optimal.maxArmadaPower).toBeGreaterThan(standard.maxArmadaPower);
  });

  it("megaCubeWarning only when MegaCube without BorgSynergy", () => {
    const withSynergy    = calculateBorg(1_000_000, "MegaCube", "BorgSynergy", "Optimal", "High");
    const withoutSynergy = calculateBorg(1_000_000, "MegaCube", "Optimal",     "Optimal", "High");
    const sphere         = calculateBorg(1_000_000, "Sphere",   "Optimal",     "Optimal", "High");
    expect(withSynergy.megaCubeWarning).toBe(false);
    expect(withoutSynergy.megaCubeWarning).toBe(true);
    expect(sphere.megaCubeWarning).toBe(false);
  });

  it("formula: power × mitigationFactor × borgCrewFactor × crewFactor × researchFactor", () => {
    const r = calculateBorg(2_000_000, "Sphere", "BorgSynergy", "Optimal", "High");
    // Sphere=1.8, BorgSynergy=1.35, Optimal=1.2, High=1.1
    expect(r.maxArmadaPower).toBe(Math.round(2_000_000 * 1.8 * 1.35 * 1.2 * 1.1));
  });
});
