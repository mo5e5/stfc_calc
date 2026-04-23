import type { Lang } from "../shared/types";
import type { SpockTier, HullBreachKey } from "./calc";

export interface EclipseStrings {
  tab_label:          string;
  armada_info:        string;
  spock_label:        string;
  spock_info:         string;
  spock_options:      Record<SpockTier, string>;
  tip_no_spock:       string;
  hull_breach_label:  string;
  hull_breach_info:   string;
  hull_breach_options: Record<HullBreachKey, string>;
  tip_spock5:         string;
  tip_spock4:         string;
  tip_spock3:         string;
  tip_hull:           string;
  label_shield_regen: string;
}

export const strings: Record<Lang, EclipseStrings> = {
  de: {
    tab_label:   "ECLIPSE",
    armada_info:
      "Eclipse-Armadas sind sehr langwierig — Shield-Regeneration ist entscheidend. Spock (mit Kelvin-Kirk) regeneriert Schilde jede Runde.",
    spock_label: "SPOCK TIER",
    spock_info:  "Spock regeneriert Schilde als % der Crew-Verteidigung pro Runde.",
    spock_options: {
      0: "Kein Spock  →  0% Shield-Regen  ×0.8",
      3: "Tier 3  →  100% Shield-Regen",
      4: "Tier 4  →  400% Shield-Regen",
      5: "Tier 5  →  750% Shield-Regen",
    },
    tip_no_spock:
      "⚠️ Ohne Spock kein Shield-Regen — deutlich kürzere Überlebensdauer (×0.8).\nSpock + Kelvin-Kirk oder Beverly (Rare) als Alternative.",
    hull_breach_label:  "HULL BREACH (STELLA)",
    hull_breach_info:   "Hull Breach gibt +50% Crit-Schaden NACH allen anderen Boni (Outlaw-Forschungsbaum).",
    hull_breach_options: {
      yes: "Ja  — Hull Breach aktiv  (+50% Crit nach Boni)  ×1.15",
      no:  "Nein  — Kein Hull Breach",
    },
    tip_spock5:
      "✅ Spock Tier 5: 750% Shield-Regen — optimale Überlebensdauer!\nSisko/Kirk/Spock ist die sicherste Crew.",
    tip_spock4:
      "🔵 Spock Tier 4: 400% Shield-Regen — solide Überlebensdauer.",
    tip_spock3:
      "⚠️ Spock Tier 3: Nur 100% Shield-Regen — kaum besser als Beverly allein.\nUpgrade auf Tier 4+ empfohlen!",
    tip_hull:
      "💥 Hull Breach: Immer eine Stella mit Hull Breach dabei haben!\n+50% Crit-Schaden nach allen Boni — sehr effektiv.",
    label_shield_regen: "Shield-Regen/Runde:",
  },
  en: {
    tab_label:   "ECLIPSE",
    armada_info:
      "Eclipse armadas are very long fights — shield regeneration is critical. Spock (with Kelvin Kirk) regenerates shields each round.",
    spock_label: "SPOCK TIER",
    spock_info:  "Spock regenerates shields as % of crew defense per round.",
    spock_options: {
      0: "No Spock  →  0% shield regen  ×0.8",
      3: "Tier 3  →  100% shield regen",
      4: "Tier 4  →  400% shield regen",
      5: "Tier 5  →  750% shield regen",
    },
    tip_no_spock:
      "⚠️ Without Spock there is no shield regen — significantly shorter survivability (×0.8).\nSpock + Kelvin Kirk or Beverly (Rare) as an alternative.",
    hull_breach_label:  "HULL BREACH (STELLA)",
    hull_breach_info:   "Hull Breach gives +50% crit damage AFTER all other bonuses (Outlaw research tree).",
    hull_breach_options: {
      yes: "Yes  — Hull Breach active  (+50% crit after bonuses)  ×1.15",
      no:  "No  — No Hull Breach",
    },
    tip_spock5:
      "✅ Spock Tier 5: 750% shield regen — optimal survivability!\nSisko/Kirk/Spock is the safest crew.",
    tip_spock4:
      "🔵 Spock Tier 4: 400% shield regen — solid survivability.",
    tip_spock3:
      "⚠️ Spock Tier 3: Only 100% shield regen — barely better than Beverly alone.\nUpgrade to Tier 4+ recommended!",
    tip_hull:
      "💥 Hull Breach: Always bring a Stella with Hull Breach!\n+50% crit damage after all bonuses — very effective.",
    label_shield_regen: "Shield regen/round:",
  },
};
