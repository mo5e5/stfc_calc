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

export function getShipTypeFactor(myShip: ShipType, armadaType: ShipType): { factor: number; status: ShipTypeStatus } {
  if (myShip === armadaType) return { factor: 1.0, status: "neutral" };
  return BEATS[myShip] === armadaType
    ? { factor: 1.3, status: "advantage" }
    : { factor: 0.75, status: "disadvantage" };
}

export function fmtPower(value: number): string {
  return value.toLocaleString("de-DE");
}

export function parsePower(text: string): number {
  const num = parseInt(text.replace(/[.,\s]/g, ""), 10);
  if (isNaN(num) || num <= 0) throw new Error("invalid");
  return num;
}
