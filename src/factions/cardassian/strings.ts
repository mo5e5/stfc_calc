import type { Lang } from "../shared/types";

export interface CardassianStrings {
  tab_label:       string;
  armada_info:     string;
  gaila_label:     string;
  gaila_info:      string;
  gaila_options:   Record<"none" | "Gaila" | "GailaSynergy", string>;
  tip_uncommon:    string;
  tip_rare:        string;
  tip_epic:        string;
  tip_gaila:       string;
  label_crit_info: string;
}

export const strings: Record<Lang, CardassianStrings> = {
  de: {
    tab_label:   "CARDASSIAN",
    armada_info:
      "Cardassian-Armadas steigern ihre Crit-Chance jede Runde (Uncommon). Rare & Epic haben festen Crit, aber massiven Crit-Schaden.",
    gaila_label: "GAILA-EINSATZ",
    gaila_info:  "Gaila reduziert den Crit-Schaden der Armada erheblich.",
    gaila_options: {
      none:         "Kein Gaila",
      Gaila:        "Gaila  (−50% Crit-Schaden)",
      GailaSynergy: "Gaila + Picard/Beverly oder Pike/Moreau  (−110%)",
    },
    tip_uncommon:
      "⏱️ Uncommon: Crit-Chance startet bei 20% und steigt +10%/Runde.\nNach Runde 8 → 100% Crit. Nach Runde 8 macht die Armada KEINEN Schaden mehr!",
    tip_rare:
      "💥 Rare: Feste 20% Crit-Chance, aber 375% Crit-Schaden.\nGaila + Synergy reduziert auf 265% — sehr empfohlen!",
    tip_epic:
      "💥 Epic: Feste 20% Crit-Chance, 450% Crit-Schaden.\nGaila + Synergy reduziert auf 340% — Pflicht für Epic!",
    tip_gaila:
      "💡 Gaila ist bei Cardassian-Armadas die wichtigste Crew-Wahl!",
    label_crit_info: "Effektiver Crit-Schaden:",
  },
  en: {
    tab_label:   "CARDASSIAN",
    armada_info:
      "Cardassian armadas increase their crit chance every round (Uncommon). Rare & Epic have fixed crit but massive crit damage.",
    gaila_label: "GAILA SETUP",
    gaila_info:  "Gaila significantly reduces the armada's critical damage.",
    gaila_options: {
      none:         "No Gaila",
      Gaila:        "Gaila  (−50% crit damage)",
      GailaSynergy: "Gaila + Picard/Beverly or Pike/Moreau  (−110%)",
    },
    tip_uncommon:
      "⏱️ Uncommon: Crit chance starts at 20% and rises +10%/round.\nAfter round 8 → 100% crit. After round 8 the armada deals NO more damage!",
    tip_rare:
      "💥 Rare: Fixed 20% crit chance, but 375% crit damage.\nGaila + Synergy reduces it to 265% — highly recommended!",
    tip_epic:
      "💥 Epic: Fixed 20% crit chance, 450% crit damage.\nGaila + Synergy reduces to 340% — mandatory for Epic!",
    tip_gaila:
      "💡 Gaila is the most important crew choice for Cardassian armadas!",
    label_crit_info: "Effective crit damage:",
  },
};
