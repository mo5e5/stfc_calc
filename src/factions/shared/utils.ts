import type { CrewKey, Difficulty, ResKey, ShipType } from "./types";

export const DIFFICULTY_FACTORS: Record<Difficulty, number> = {
  Uncommon: 3.0,
  Rare:     1.8,
  Epic:     1.1,
};

export const CREW_FACTORS: Record<CrewKey, number> = {
  Optimal:  1.2,
  Standard: 1.0,
  Weak:     0.8,
};

export const RESEARCH_FACTORS: Record<ResKey, number> = {
  High: 1.1,
  Base: 1.0,
};

// X beats Y
const BEATS: Record<ShipType, ShipType> = {
  Explorer:    "Interceptor",
  Interceptor: "Battleship",
  Battleship:  "Explorer",
};

// What ship type counters the given armada type
export const COUNTER_SHIP: Record<ShipType, ShipType> = {
  Explorer:    "Battleship",   // Battleship beats Explorer
  Interceptor: "Explorer",     // Explorer beats Interceptor
  Battleship:  "Interceptor",  // Interceptor beats Battleship
};

export type ShipTypeStatus = "advantage" | "neutral" | "disadvantage";

const ADVANTAGE_FACTOR = 1.3;
const DISADVANTAGE_FACTOR = 0.75;

export function getShipTypeFactor(myShip: ShipType, armadaType: ShipType): { factor: number; status: ShipTypeStatus } {
  if (myShip === armadaType) return { factor: 1.0, status: "neutral" };
  return BEATS[myShip] === armadaType
    ? { factor: ADVANTAGE_FACTOR, status: "advantage" }
    : { factor: DISADVANTAGE_FACTOR, status: "disadvantage" };
}

export function calculateStandardFaction(
  power: number,
  difficulty: Difficulty,
  crew: CrewKey,
  research: ResKey,
  shipType: ShipType,
  armadaType: ShipType,
): { value: number; b: number; c: number; r: number; s: number; status: ShipTypeStatus } {
  const b = DIFFICULTY_FACTORS[difficulty];
  const c = CREW_FACTORS[crew];
  const r = RESEARCH_FACTORS[research];
  const { factor: s, status } = getShipTypeFactor(shipType, armadaType);
  return { value: Math.round(power * b * c * r * s), b, c, r, s, status };
}

export function fmtPower(value: number, lang: string): string {
  return value.toLocaleString(lang);
}

export function parsePower(text: string): number {
  let cleaned = text.replace(/\s/g, "");

  // Remove thousand separators: dot before 3 digits followed by dot or end (DE)
  cleaned = cleaned.replace(/\.(?=\d{3}(\.|$))/g, "");
  // Remove thousand separators: comma before 3 digits followed by comma or end (EN)
  cleaned = cleaned.replace(/,(?=\d{3}(,|$))/g, "");

  // Replace remaining comma with dot (DE decimal comma)
  cleaned = cleaned.replace(/,/g, ".");

  const num = parseFloat(cleaned);
  if (!isFinite(num) || num <= 0) throw new Error("invalid");
  return Math.round(num);
}

// Derive { power, result } from a raw power input string. Returns nulls for an
// empty or invalid input. Mirrors the per-tab pattern (power may be set even if
// `compute` throws). Pure helper — computed during render, no React state.
export function deriveResult<R>(
  powerInput: string,
  compute: (power: number) => R,
): { power: number | null; result: R | null } {
  let power: number | null = null;
  let result: R | null = null;
  if (powerInput.trim()) {
    try {
      power = parsePower(powerInput);
      result = compute(power);
    } catch { /* invalid */ }
  }
  return { power, result };
}
