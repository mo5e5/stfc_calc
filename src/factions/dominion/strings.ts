import type { Lang } from "../shared/types";

export interface DominionStrings {
  tab_label:      string;
  armada_info:    string;
  ship_label:     (n: number) => string;
  ship_power_placeholder: string;
  defiant_label:  string;
  defiant_info:   string;
  tip_defiant:    string;
  tip_timer:      string;
  tip_crews:      string;
  label_total:    string;
}

export const strings: Record<Lang, DominionStrings> = {
  de: {
    tab_label:   "DOMINION",
    armada_info:
      "Dominion Solo-Armadas: Du kämpfst alleine mit 3 eigenen Schiffen. Jedes Schiff hat seine eigene Crew. Kein Allianz-Bonus.",
    ship_label:  (n) => `SCHIFF ${n}`,
    ship_power_placeholder: "Schiffsstärke",
    defiant_label: "DEFIANT VORHANDEN",
    defiant_info:  "Die Defiant bringt den Edict-Bonus (+15% effektive Stärke).",
    tip_defiant: "⚔️ Defiant als eines der 3 Schiffe für den Edict-Bonus empfohlen!",
    tip_timer:   "⏱️ Launch-Timer: Nur 1:30 Min — alle 3 Schiffe müssen vorher bereit sein!",
    tip_crews:   "💡 Mitigation + Shield-Regen auf möglichst vielen Schiffen = mehr Runden überleben.",
    label_total: "Kombinierte Stärke:",
  },
  en: {
    tab_label:   "DOMINION",
    armada_info:
      "Dominion Solo Armadas: You fight alone with 3 of your own ships. Each ship has its own crew. No alliance bonus.",
    ship_label:  (n) => `SHIP ${n}`,
    ship_power_placeholder: "Ship power",
    defiant_label: "DEFIANT AVAILABLE",
    defiant_info:  "The Defiant provides the Edict Reward bonus (+15% effective power).",
    tip_defiant: "⚔️ Defiant as one of 3 ships recommended for the Edict bonus!",
    tip_timer:   "⏱️ Launch timer: Only 1:30 min — all 3 ships must be ready before launching!",
    tip_crews:   "💡 Mitigation + shield regen on as many ships as possible = more survival rounds.",
    label_total: "Combined power:",
  },
};
