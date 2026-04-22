// Re-exports for backward compatibility — use factions/shared/* for new code
export type { Difficulty as ArmadaKey, CrewKey, ResKey, Theme, Lang, SaveEntry } from "./factions/shared/types";
export { fmtPower, parsePower, CREW_FACTORS, RESEARCH_FACTORS, DIFFICULTY_FACTORS as ARMADA_TYPES } from "./factions/shared/utils";
