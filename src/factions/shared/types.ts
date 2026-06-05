export type Difficulty  = "Uncommon" | "Rare" | "Epic";
export type CrewKey     = "Optimal" | "Standard" | "Weak";
export type ResKey      = "High" | "Base";
export type ShipType    = "Explorer" | "Battleship" | "Interceptor";
export type Theme       = "dark" | "light";
export type Lang        = "de" | "en";

export type FactionKey =
  | "Federation"
  | "Klingon"
  | "Romulan"
  | "Cardassian"
  | "Borg"
  | "Dominion"
  | "Eclipse"
  | "Legacy";

export interface SaveEntry {
  date:    string;
  faction: FactionKey;
  power:   number;
  result:  number;
  label:   string;
}

export interface StandardFactionConfig {
  key:         FactionKey;
  armadaType:  ShipType;
}

export interface FactionStrings {
  armada_info:      string;
  counter_tip:      string;
  disadvantage_warn: string;
}
