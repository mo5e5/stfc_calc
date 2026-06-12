import { describe, it, expect } from "vitest";
import { migrateEntry } from "./App";

describe("migrateEntry", () => {
  it("should pass through a valid modern entry unchanged", () => {
    const validEntry = {
      date: "2026-06-12",
      faction: "Federation",
      power: 1000,
      result: 2500,
      label: "Test Entry",
    };

    const result = migrateEntry(validEntry);

    expect(result).toEqual(validEntry);
    expect(result.faction).toBe("Federation");
    expect(result.date).toBe("2026-06-12");
    expect(result.power).toBe(1000);
    expect(result.result).toBe(2500);
    expect(result.label).toBe("Test Entry");
  });

  it("should handle legacy entry without faction and assemble label from armada/crew/research", () => {
    const legacyEntry = {
      date: "2026-06-11",
      armada: "Armada1",
      crew: "Crew1",
      research: "Research1",
    };

    const result = migrateEntry(legacyEntry);

    expect(result.faction).toBe("Legacy");
    expect(result.date).toBe("2026-06-11");
    expect(result.power).toBe(0);
    expect(result.result).toBe(0);
    expect(result.label).toBe("Armada1 · Crew1 · Research1");
  });

  it("should handle null/undefined with safe defaults", () => {
    const result = migrateEntry(null);

    expect(result.date).toBe("");
    expect(result.faction).toBe("Legacy");
    expect(result.power).toBe(0);
    expect(result.result).toBe(0);
    expect(result.label).toBe("–");
  });

  it("should handle undefined with safe defaults", () => {
    const result = migrateEntry(undefined);

    expect(result.date).toBe("");
    expect(result.faction).toBe("Legacy");
    expect(result.power).toBe(0);
    expect(result.result).toBe(0);
    expect(result.label).toBe("–");
  });

  it("should coerce power from string to number", () => {
    const entry = {
      date: "2026-06-12",
      faction: "Borg",
      power: "5",
      result: 1500,
      label: "Test",
    };

    const result = migrateEntry(entry);

    expect(result.power).toBe(5);
    expect(typeof result.power).toBe("number");
  });

  it("should coerce result from string to number", () => {
    const entry = {
      date: "2026-06-12",
      faction: "Dominion",
      power: 800,
      result: "2000",
      label: "Test",
    };

    const result = migrateEntry(entry);

    expect(result.result).toBe(2000);
    expect(typeof result.result).toBe("number");
  });

  it("should fall back to label when armada/crew/research are missing", () => {
    const entry = {
      date: "2026-06-12",
      label: "Custom Label",
    };

    const result = migrateEntry(entry);

    expect(result.label).toBe("Custom Label");
  });

  it("should use default dash when label and legacy fields are missing", () => {
    const entry = {
      date: "2026-06-12",
    };

    const result = migrateEntry(entry);

    expect(result.label).toBe("–");
  });

  it("should handle partial valid entry with some fields correctly typed", () => {
    const entry = {
      faction: "Klingon",
      power: 1200,
      date: "2026-06-10",
      result: 3000,
      label: "Partial Entry",
    };

    const result = migrateEntry(entry);

    expect(result.faction).toBe("Klingon");
    expect(result.power).toBe(1200);
    expect(result.result).toBe(3000);
    expect(result.label).toBe("Partial Entry");
  });

  it("should handle invalid faction and set it to Legacy", () => {
    const entry = {
      date: "2026-06-12",
      faction: 123, // not a string
      power: 500,
      result: 1500,
      label: "Invalid Faction",
    };

    const result = migrateEntry(entry);

    expect(result.faction).toBe("Legacy");
  });
});
