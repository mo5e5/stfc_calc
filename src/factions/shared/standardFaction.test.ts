import { describe, it, expect } from "vitest";
import { calculateStandardFaction } from "./utils";

describe("calculateStandardFaction", () => {
  it("should return advantage status and factor 1.3 when shipType beats armadaType", () => {
    // Romulan-like: armadaType "Battleship", shipType "Interceptor" → Interceptor beats Battleship
    const result = calculateStandardFaction(
      1_000_000,
      "Uncommon",
      "Optimal",
      "High",
      "Interceptor",
      "Battleship"
    );
    expect(result.status).toBe("advantage");
    expect(result.s).toBe(1.3);
  });

  it("should return disadvantage status and factor 0.75 when shipType loses to armadaType", () => {
    // shipType "Explorer" loses to armadaType "Battleship" (Battleship beats Explorer)
    const result = calculateStandardFaction(
      1_000_000,
      "Uncommon",
      "Optimal",
      "High",
      "Explorer",
      "Battleship"
    );
    expect(result.status).toBe("disadvantage");
    expect(result.s).toBe(0.75);
  });

  it("should return neutral status and factor 1.0 when shipType === armadaType", () => {
    // shipType and armadaType are the same
    const result = calculateStandardFaction(
      1_000_000,
      "Uncommon",
      "Optimal",
      "High",
      "Explorer",
      "Explorer"
    );
    expect(result.status).toBe("neutral");
    expect(result.s).toBe(1.0);
  });

  it("should calculate correct value with all factors: power=2M, Uncommon, Optimal, High, advantage", () => {
    // DIFFICULTY: Uncommon = 3.0
    // CREW: Optimal = 1.2
    // RESEARCH: High = 1.1
    // SHIP: advantage = 1.3
    // Expected: 2_000_000 * 3.0 * 1.2 * 1.1 * 1.3 = 10_296_000
    const result = calculateStandardFaction(
      2_000_000,
      "Uncommon",
      "Optimal",
      "High",
      "Interceptor",
      "Battleship"
    );
    expect(result.value).toBe(Math.round(2_000_000 * 3.0 * 1.2 * 1.1 * 1.3));
    expect(result.value).toBe(10_296_000);
  });

  it("should return correct individual factors", () => {
    const result = calculateStandardFaction(
      1_000_000,
      "Rare",
      "Standard",
      "Base",
      "Interceptor",
      "Explorer"
    );
    expect(result.b).toBe(1.8); // Rare
    expect(result.c).toBe(1.0); // Standard
    expect(result.r).toBe(1.0); // Base
    expect(result.s).toBe(0.75); // disadvantage (Interceptor loses to Explorer)
  });

  it("should handle Epic difficulty", () => {
    const result = calculateStandardFaction(
      1_000_000,
      "Epic",
      "Optimal",
      "High",
      "Explorer",
      "Explorer"
    );
    expect(result.b).toBe(1.1); // Epic
  });

  it("should handle Weak crew", () => {
    const result = calculateStandardFaction(
      1_000_000,
      "Uncommon",
      "Weak",
      "High",
      "Explorer",
      "Explorer"
    );
    expect(result.c).toBe(0.8); // Weak
  });

  it("should round the final value correctly", () => {
    // Test rounding: 1_000_000 * 3.0 * 1.2 * 1.1 * 1.3 = 5_148_000 (exact)
    const result = calculateStandardFaction(
      1_000_000,
      "Uncommon",
      "Optimal",
      "High",
      "Interceptor",
      "Battleship"
    );
    expect(typeof result.value).toBe("number");
    expect(Number.isInteger(result.value)).toBe(true);
  });
});
