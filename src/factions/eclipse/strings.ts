import type { Lang } from "../shared/types";
import type { SpockTier, HullBreachKey } from "./calc";

export interface EclipseStrings {
  tab_label: string;
  armada_info: string;
  armada_level_label: string;
  armada_level_info: string;
  spock_label: string;
  spock_info: string;
  spock_options: Record<SpockTier, string>;
  tip_no_spock: string;
  hull_breach_label: string;
  hull_breach_info: string;
  hull_breach_options: Record<HullBreachKey, string>;
  tip_spock5: string;
  tip_spock4: string;
  tip_spock3: string;
  tip_beverly: string;
  tip_hull: string;
  label_shield_regen: string;
  defense_label: string;
  defense_info: string;
  label_regen_hp: string;
}

export const strings: Record<Lang, EclipseStrings> = {
  de: {
    tab_label: "ECLIPSE",
    armada_info:
      "Eclipse-Armadas sind sehr langwierig — Shield-Regeneration ist entscheidend. Spock (mit Kelvin-Kirk) regeneriert Schilde jede Runde.",
    armada_level_label: "ARMADA-LEVEL",
    armada_level_info:
      "Eclipse-Armada-Level bestimmt die Stärke. Höhere Level sind exponentiell schwärer (verdoppelt sich pro Level).",
    spock_label: "REGEN-CREW",
    spock_info:
      "Spock (mit Kelvin-Kirk) regeneriert Schilde als % der Crew-Verteidigung pro Runde. Beverly (Rare) als Captain: 200% Crew-Health Shield-Regen, kein Morale nötig.",
    spock_options: {
      0: "Kein Spock  →  0% Shield-Regen  ×0.8",
      beverly: "Beverly (Rare)  →  200% Health-Regen  ×1.10",
      3: "Spock T3  →  100% Shield-Regen  ×0.95",
      4: "Spock T4  →  400% Shield-Regen  ×1.15",
      5: "Spock T5  →  750% Shield-Regen  ×1.30",
    },
    tip_no_spock:
      "⚠️ Ohne Regen-Crew kein Shield-Regen — deutlich kürzere Überlebensdauer (×0.8).\nBeverly (Rare) oder Spock T4+ empfohlen.",
    hull_breach_label: "HULL BREACH (STELLA)",
    hull_breach_info:
      "Hull Breach gibt +50% Crit-Schaden NACH allen anderen Boni (Outlaw-Forschungsbaum).",
    hull_breach_options: {
      yes: "Ja  — Hull Breach aktiv  (+50% Crit nach Boni)  ×1.15",
      no: "Nein  — Kein Hull Breach",
    },
    tip_spock5:
      "✅ Spock T5: 750% Shield-Regen — optimale Überlebensdauer!\nSisko/Kirk/Spock ist die sicherste Crew.",
    tip_spock4: "🔵 Spock T4: 400% Shield-Regen — solide Überlebensdauer.",
    tip_spock3:
      "⚠️ Spock T3: Nur 100% Shield-Regen — kaum effektiv.\nUpgrade auf T4+ oder Beverly empfohlen!",
    tip_beverly:
      "🟣 Beverly (Rare) als Captain: 200% Crew-Health Shield-Regen — kein Morale nötig.\nGute Alternative zu Spock T4, besonders ohne Kirk.",
    tip_hull:
      "💥 Hull Breach: Immer eine Stella mit Hull Breach dabei haben!\n+50% Crit-Schaden nach allen Boni — sehr effektiv.",
    label_shield_regen: "Shield-Regen/Runde:",
    defense_label: "LOWER DECK DEFENSE",
    defense_info:
      "Optionaler Crew-Defense-Stat (Lower Deck). Zeigt realen Shield-Regen/Runde. Beeinflusst nicht die Macht-Berechnung (nur Anzeige).",
    label_regen_hp: "Regen HP/Runde:",
  },
  en: {
    tab_label: "ECLIPSE",
    armada_info:
      "Eclipse armadas are very long fights — shield regeneration is critical. Spock (with Kelvin Kirk) regenerates shields each round.",
    armada_level_label: "ARMADA LEVEL",
    armada_level_info:
      "Eclipse armada level determines strength. Higher levels are exponentially harder (doubles per level).",
    spock_label: "REGEN CREW",
    spock_info:
      "Spock (with Kelvin Kirk) regenerates shields as % of crew defense per round. Beverly (Rare) as captain: 200% crew health shield regen, no morale required.",
    spock_options: {
      0: "No Spock  →  0% shield regen  ×0.8",
      beverly: "Beverly (Rare)  →  200% health regen  ×1.10",
      3: "Spock T3  →  100% shield regen  ×0.95",
      4: "Spock T4  →  400% shield regen  ×1.15",
      5: "Spock T5  →  750% shield regen  ×1.30",
    },
    tip_no_spock:
      "⚠️ Without a regen crew there is no shield regen — significantly shorter survivability (×0.8).\nBeverly (Rare) or Spock T4+ recommended.",
    hull_breach_label: "HULL BREACH (STELLA)",
    hull_breach_info:
      "Hull Breach gives +50% crit damage AFTER all other bonuses (Outlaw research tree).",
    hull_breach_options: {
      yes: "Yes  — Hull Breach active  (+50% crit after bonuses)  ×1.15",
      no: "No  — No Hull Breach",
    },
    tip_spock5:
      "✅ Spock T5: 750% shield regen — optimal survivability!\nSisko/Kirk/Spock is the safest crew.",
    tip_spock4: "🔵 Spock T4: 400% shield regen — solid survivability.",
    tip_spock3:
      "⚠️ Spock T3: Only 100% shield regen — barely effective.\nUpgrade to T4+ or use Beverly instead!",
    tip_beverly:
      "🟣 Beverly (Rare) as captain: 200% crew health shield regen — no morale required.\nGood alternative to Spock T4, especially without Kirk.",
    tip_hull:
      "💥 Hull Breach: Always bring a Stella with Hull Breach!\n+50% crit damage after all bonuses — very effective.",
    label_shield_regen: "Shield regen/round:",
    defense_label: "LOWER DECK DEFENSE",
    defense_info:
      "Optional crew defense stat (lower deck). Shows actual shield HP regen per round. Does not affect the power calculation (display only).",
    label_regen_hp: "Regen HP/round:",
  },
};
