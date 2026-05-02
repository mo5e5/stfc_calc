import { describe, it, expect } from "vitest";
import { calculateEclipse } from "./calc";

describe("calculateEclipse", () => {
  it("sanity check: Level 4 / Uncommon / No Spock / Optimal / High / ~1.87M power → ~47.4M", () => {
    const result = calculateEclipse(1_870_265, "Uncommon", "Optimal", "High", 0, "no", 4);
    expect(result.maxArmadaPower).toBeCloseTo(47_400_000, -4);
  });

  it("spockFactor T5 = 1.30", () => {
    const base = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0, "no", 1);
    const t5   = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 5, "no", 1);
    expect(t5.maxArmadaPower / base.maxArmadaPower).toBeCloseTo(1.30 / 0.80, 2);
  });

  it("spockFactor T4 = 1.15", () => {
    const base = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0, "no", 1);
    const t4   = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 4, "no", 1);
    expect(t4.maxArmadaPower / base.maxArmadaPower).toBeCloseTo(1.15 / 0.80, 2);
  });

  it("spockFactor T3 = 0.95", () => {
    const base = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0, "no", 1);
    const t3   = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 3, "no", 1);
    expect(t3.maxArmadaPower / base.maxArmadaPower).toBeCloseTo(0.95 / 0.80, 2);
  });

  it("beverlyFactor = 1.10", () => {
    const base    = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0,         "no", 1);
    const beverly = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", "beverly", "no", 1);
    expect(beverly.maxArmadaPower / base.maxArmadaPower).toBeCloseTo(1.10 / 0.80, 2);
  });

  it("Beverly shieldRegenPct = 200", () => {
    const r = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", "beverly", "no", 1);
    expect(r.shieldRegenPct).toBe(200);
  });

  it("hull breach adds ~15% to result", () => {
    const noHb = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 5, "no",  1);
    const hb   = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 5, "yes", 1);
    expect(hb.maxArmadaPower / noHb.maxArmadaPower).toBeCloseTo(1.15, 2);
  });

  it("armada level doubles power each level", () => {
    const l1 = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0, "no", 1);
    const l2 = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 0, "no", 2);
    expect(l2.maxArmadaPower / l1.maxArmadaPower).toBeCloseTo(2, 2);
  });

  it("defense stat computes actualShieldRegenHp for Spock T5", () => {
    const r = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", 5, "no", 1, 10_000);
    expect(r.actualShieldRegenHp).toBe(75_000); // 750% of 10000
  });

  it("actualShieldRegenHp is 0 for Beverly (uses crew health, not defense)", () => {
    const r = calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", "beverly", "no", 1, 10_000);
    expect(r.actualShieldRegenHp).toBe(0);
  });

  it("survivability: T5=high, T4=medium, Beverly=medium, T3=low, none=low", () => {
    const run = (t: Parameters<typeof calculateEclipse>[4]) =>
      calculateEclipse(1_000_000, "Uncommon", "Optimal", "High", t, "no", 1).survivability;
    expect(run(5)).toBe("high");
    expect(run(4)).toBe("medium");
    expect(run("beverly")).toBe("medium");
    expect(run(3)).toBe("low");
    expect(run(0)).toBe("low");
  });
});
