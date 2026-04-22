import type { FactionStrings, Lang } from "../shared/types";

export const strings: Record<Lang, FactionStrings> = {
  de: {
    tab_label:         "FEDERATION",
    armada_info:       "Föderations-Armadas gelten als Explorer. Stark gegen Interceptors, schwach gegen Schlachtschiffe.",
    counter_tip:       "⚔️ Schlachtschiff bringt ×1.3 Vorteil — optimale Wahl!",
    disadvantage_warn: "⚠️ Explorer sind im Nachteil (×0.75) gegen Föderations-Armadas!",
  },
  en: {
    tab_label:         "FEDERATION",
    armada_info:       "Federation armadas count as Explorers. Strong against Interceptors, weak against Battleships.",
    counter_tip:       "⚔️ Battleship gives ×1.3 advantage — optimal choice!",
    disadvantage_warn: "⚠️ Explorers are at a disadvantage (×0.75) against Federation armadas!",
  },
};
