import { describe, it, expect } from "vitest";
import { calculateDominion } from "./calc";

const ship = (power: number) => ({ power, crew: "Optimal" as const });

describe("calculateDominion", () => {
  it("Defiant adds ~15% to result", () => {
    const noDefiant   = calculateDominion(ship(1_000_000), ship(1_000_000), ship(1_000_000), "Uncommon", "High", false);
    const withDefiant = calculateDominion(ship(1_000_000), ship(1_000_000), ship(1_000_000), "Uncommon", "High", true);
    expect(withDefiant.maxArmadaPower / noDefiant.maxArmadaPower).toBeCloseTo(1.15, 2);
  });

  it("three ships are summed before applying difficulty and research", () => {
    const r = calculateDominion(ship(1_000_000), ship(2_000_000), ship(3_000_000), "Uncommon", "High", false);
    const expectedTotal = Math.round(1_000_000 * 1.2) + Math.round(2_000_000 * 1.2) + Math.round(3_000_000 * 1.2);
    expect(r.totalPower).toBe(expectedTotal);
    expect(r.maxArmadaPower).toBe(Math.round(expectedTotal * 3.0 * 1.1));
  });

  it("Uncommon difficulty factor = 3.0", () => {
    const r     = calculateDominion(ship(1_000_000), ship(1_000_000), ship(1_000_000), "Uncommon", "Base", false);
    const total = Math.round(1_000_000 * 1.2) * 3;
    expect(r.maxArmadaPower).toBe(Math.round(total * 3.0));
  });

  it("Rare difficulty factor = 1.8", () => {
    const r     = calculateDominion(ship(1_000_000), ship(1_000_000), ship(1_000_000), "Rare", "Base", false);
    const total = Math.round(1_000_000 * 1.2) * 3;
    expect(r.maxArmadaPower).toBe(Math.round(total * 1.8));
  });

  it("defiantly flag reflects hasDefiant input", () => {
    const r = calculateDominion(ship(1_000_000), ship(1_000_000), ship(1_000_000), "Uncommon", "High", true);
    expect(r.defiantly).toBe(true);
  });
});
