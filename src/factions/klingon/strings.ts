import type { FactionStrings, Lang } from "../shared/types";

export const strings: Record<Lang, FactionStrings> = {
  de: {
    tab_label:         "KLINGON",
    armada_info:       "Klingonische Armadas gelten als Interceptors. Stark gegen Schlachtschiffe, schwach gegen Explorer.",
    counter_tip:       "⚔️ Explorer bringt ×1.3 Vorteil — optimale Wahl!",
    disadvantage_warn: "⚠️ Schlachtschiffe sind im Nachteil (×0.75) gegen Klingonische Armadas!",
  },
  en: {
    tab_label:         "KLINGON",
    armada_info:       "Klingon armadas count as Interceptors. Strong against Battleships, weak against Explorers.",
    counter_tip:       "⚔️ Explorer gives ×1.3 advantage — optimal choice!",
    disadvantage_warn: "⚠️ Battleships are at a disadvantage (×0.75) against Klingon armadas!",
  },
};
