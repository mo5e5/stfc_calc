import { describe, it, expect } from "vitest";
import { calculateCardassian, GAILA_REDUCTION, critChanceAtRound } from "./calc";

describe("calculateCardassian", () => {
  it("Uncommon base crit damage = 300%", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "none");
    expect(r.critDamage).toBe(300);
  });

  it("Gaila alone reduces Uncommon crit by 50% → 250%", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "Gaila");
    expect(r.critDamage).toBe(250);
  });

  it("GailaSynergy reduces Uncommon crit by 110% → 190%", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "GailaSynergy");
    expect(r.critDamage).toBe(190);
  });

  it("LeaderSynergy reduces Uncommon crit by 120% → 180%", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "LeaderSynergy");
    expect(r.critDamage).toBe(180);
  });

  it("Rare base crit damage = 375%", () => {
    const r = calculateCardassian(1_000_000, "Rare", "Optimal", "High", "none");
    expect(r.critDamage).toBe(375);
  });

  it("Epic base crit damage = 450%", () => {
    const r = calculateCardassian(1_000_000, "Epic", "Optimal", "High", "none");
    expect(r.critDamage).toBe(450);
  });

  it("GailaSynergy on Rare → 265%", () => {
    const r = calculateCardassian(1_000_000, "Rare", "Optimal", "High", "GailaSynergy");
    expect(r.critDamage).toBe(265);
  });

  it("LeaderSynergy on Rare → 255%", () => {
    const r = calculateCardassian(1_000_000, "Rare", "Optimal", "High", "LeaderSynergy");
    expect(r.critDamage).toBe(255);
  });

  it("crit damage never goes below 0", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "LeaderSynergy");
    expect(r.critDamage).toBeGreaterThanOrEqual(0);
  });

  it("Uncommon survivalRounds = 8", () => {
    const r = calculateCardassian(1_000_000, "Uncommon", "Optimal", "High", "none");
    expect(r.survivalRounds).toBe(8);
  });

  it("crit chance escalates: round 1 = 30%, round 8 = 100%", () => {
    expect(critChanceAtRound(1)).toBe(30);
    expect(critChanceAtRound(8)).toBe(100);
  });

  it("crit chance clamped at 100%", () => {
    expect(critChanceAtRound(20)).toBe(100);
  });

  it("GAILA_REDUCTION values: none=0, Gaila=50, GailaSynergy=110, LeaderSynergy=120", () => {
    expect(GAILA_REDUCTION.none).toBe(0);
    expect(GAILA_REDUCTION.Gaila).toBe(50);
    expect(GAILA_REDUCTION.GailaSynergy).toBe(110);
    expect(GAILA_REDUCTION.LeaderSynergy).toBe(120);
  });
});
