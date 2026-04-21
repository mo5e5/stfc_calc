export type ArmadaKey = "Uncommon" | "Rare" | "Epic";
export type CrewKey = "Optimal" | "Standard" | "Weak";
export type ResKey = "High" | "Base";
export type Theme = "dark" | "light";
export type Lang = "de" | "en";

export const ARMADA_TYPES: Record<ArmadaKey, { factor: number }> = {
  Uncommon: { factor: 3.0 },
  Rare:     { factor: 1.8 },
  Epic:     { factor: 1.1 },
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

export interface CalcResult {
  result: number;
  b: number;
  c: number;
  r: number;
}

export function calculate(
  power: number,
  armada: ArmadaKey,
  crew: CrewKey,
  res: ResKey
): CalcResult {
  const b = ARMADA_TYPES[armada].factor;
  const c = CREW_FACTORS[crew];
  const r = RESEARCH_FACTORS[res];
  return { result: Math.round(power * b * c * r), b, c, r };
}

export function fmtPower(value: number): string {
  return value.toLocaleString("de-DE");
}

export function parsePower(text: string): number {
  const num = parseInt(text.replace(/[.,\s]/g, ""), 10);
  if (isNaN(num) || num <= 0) throw new Error("invalid");
  return num;
}

export interface SaveEntry {
  date: string;
  power: number;
  armada: ArmadaKey;
  crew: CrewKey;
  research: ResKey;
  result: number;
}
