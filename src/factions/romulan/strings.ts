import type { FactionStrings, Lang } from "../shared/types";

export const strings: Record<Lang, FactionStrings> = {
  de: {
    tab_label:         "ROMULAN",
    armada_info:       "Romulanische Armadas gelten als Schlachtschiffe. Stark gegen Explorer, schwach gegen Interceptors.",
    counter_tip:       "⚔️ Interceptor bringt ×1.3 Vorteil — optimale Wahl!",
    disadvantage_warn: "⚠️ Explorer sind im Nachteil (×0.75) gegen Romulanische Armadas!",
  },
  en: {
    tab_label:         "ROMULAN",
    armada_info:       "Romulan armadas count as Battleships. Strong against Explorers, weak against Interceptors.",
    counter_tip:       "⚔️ Interceptor gives ×1.3 advantage — optimal choice!",
    disadvantage_warn: "⚠️ Explorers are at a disadvantage (×0.75) against Romulan armadas!",
  },
};
