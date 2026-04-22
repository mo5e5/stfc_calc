import type { Lang } from "../shared/types";
import type { BorgTarget, BorgCrewKey } from "./calc";

export interface BorgStrings {
  tab_label:        string;
  armada_info:      string;
  target_label:     string;
  target_options:   Record<BorgTarget, string>;
  borg_crew_label:  string;
  borg_crew_info:   string;
  borg_crew_options: Record<BorgCrewKey, string>;
  tip_sphere:       string;
  tip_cube:         string;
  tip_megacube:     string;
  tip_no_synergy:   string;
}

export const strings: Record<Lang, BorgStrings> = {
  de: {
    tab_label:    "BORG",
    armada_info:
      "Borg-Armadas haben extrem hohe Mitigation. Eigene Mitigation + Crits sind entscheidend. Borg-Crew-Synergie negiert MegaCube-Crits vollständig.",
    target_label:  "Borg-Ziel auswählen:",
    target_options: {
      Sphere:   "Sphere  (Standard-Armada)",
      Cube:     "Cube  (Gruppenarmada)",
      MegaCube: "MegaCube  (Extrem schwer)",
    },
    borg_crew_label:  "BORG-CREW",
    borg_crew_info:   "Borg-Offiziere haben spezielle Synergien gegen Borg-Ziele.",
    borg_crew_options: {
      BorgSynergy: "Volle Synergie  (Nine/Seven/Five of Eleven)  ×1.35",
      Optimal:     "Optimale Nicht-Borg-Crew  ×1.0",
      Standard:    "Standard-Crew  ×0.75",
    },
    tip_sphere:
      "🟢 Sphere: Hohe Mitigation, aber machbar mit guter Crew.\nFokus auf Crit-Schaden und eigene Mitigation.",
    tip_cube:
      "🔵 Cube: Koordination wichtig. Stärkste Crew auf dem Hauptschiff.",
    tip_megacube:
      "🔴 MegaCube: Nur mit voller Borg-Synergie!\nNine/Seven/Five of Eleven → Crit-Schaden des MegaCubes = 0.",
    tip_no_synergy:
      "⚠️ MegaCube ohne Borg-Synergie ist extrem schwierig!\nNine of Eleven + Seven of Eleven + weiterer Borg-Offizier empfohlen.",
  },
  en: {
    tab_label:    "BORG",
    armada_info:
      "Borg armadas have extremely high mitigation. Your own mitigation + crits are key. Borg crew synergy fully negates MegaCube crits.",
    target_label:  "Select Borg target:",
    target_options: {
      Sphere:   "Sphere  (standard armada)",
      Cube:     "Cube  (group armada)",
      MegaCube: "MegaCube  (extremely hard)",
    },
    borg_crew_label:  "BORG CREW",
    borg_crew_info:   "Borg officers have special synergies against Borg targets.",
    borg_crew_options: {
      BorgSynergy: "Full Synergy  (Nine/Seven/Five of Eleven)  ×1.35",
      Optimal:     "Optimal non-Borg crew  ×1.0",
      Standard:    "Standard crew  ×0.75",
    },
    tip_sphere:
      "🟢 Sphere: High mitigation but manageable with good crew.\nFocus on crit damage and your own mitigation.",
    tip_cube:
      "🔵 Cube: Coordination matters. Best crew on the lead ship.",
    tip_megacube:
      "🔴 MegaCube: Full Borg synergy only!\nNine/Seven/Five of Eleven → MegaCube crit damage = 0.",
    tip_no_synergy:
      "⚠️ MegaCube without Borg synergy is extremely difficult!\nNine of Eleven + Seven of Eleven + another Borg officer recommended.",
  },
};
