import type { ArmadaKey, CrewKey, ResKey } from "./data";

export interface Translation {
  title: string;
  tab_calc: string;
  tab_saves: string;
  power_title: string;
  power_info: string;
  power_label: string;
  armada_title: string;
  armada_info: string;
  armada_label: string;
  crew_title: string;
  crew_info: string;
  crew_label: string;
  res_title: string;
  res_info: string;
  res_label: string;
  result_title: string;
  result_label: string;
  result_start: string;
  btn_calc: string;
  btn_clear: string;
  tips_title: string;
  tips_start: string;
  tips_crew: string;
  tips_research: string;
  tips_epic: string;
  tips_optimal: string;
  warn_title: string;
  warn_text: string;
  saves_title: string;
  saves_info: string;
  saves_cols: string[];
  btn_export: string;
  btn_delete: string;
  btn_clear_all: string;
  msg_saved: string;
  msg_no_entries: string;
  msg_clear_all_confirm: string;
  armada_options: Record<ArmadaKey, string>;
  crew_options: Record<CrewKey, string>;
  res_options: Record<ResKey, string>;
}

export const LANGS: Record<"de" | "en", Translation> = {
  de: {
    title: "⬡  STFC CALC  ⬡",
    tab_calc: "◆  Berechnung",
    tab_saves: "◈  Verlauf",
    power_title: "SCHIFFSSTÄRKE",
    power_info: "Deine gesamte Flottenstärke (alle teilnehmenden Schiffe summiert).",
    power_label: "Stärke eingeben  (z. B. 2.000.000)",
    armada_title: "ARMADA-TYP",
    armada_info: "Welche Armada wollt ihr angreifen?",
    armada_label: "Armada-Typ auswählen:",
    crew_title: "CREW-QUALITÄT",
    crew_info: "Welche Offiziere sind auf deinem Schiff?",
    crew_label: "Crew-Qualität auswählen:",
    res_title: "FORSCHUNGSSTAND",
    res_info: "Armada-Forschung in den Bäumen Station & Kampf.",
    res_label: "Forschungsstand auswählen:",
    result_title: "ERGEBNIS",
    result_label: "Max. besiegbare Armada-Stärke:",
    result_start: "Stärke eingeben um zu beginnen.",
    btn_calc: "💾  SPEICHERN",
    btn_clear: "✖  LEEREN",
    tips_title: "TIPPS",
    tips_start: "Stärke eingeben für Tipps.",
    tips_crew: "💡 Optimale Crew gibt +20% mehr Kapazität.",
    tips_research: "🔬 Armada-Forschung gibt +10% Bonus.",
    tips_epic: "⚠️ Epic BRAUCHT optimale Crew!",
    tips_optimal: "✅ Optimale Einstellungen!",
    warn_title: "⚠  HINWEISE",
    warn_text:
      "• 100-Runden-Limit: Nicht gewonnen = Niederlage.\n\n• One-Shot: Schiff zu klein = sofort vernichtet.\n\n• Solo: Kein Allianz-Schadensbonus.",
    saves_title: "GESPEICHERTE BERECHNUNGEN",
    saves_info: "Alle gespeicherten Kalkulationen – exportierbar als CSV.",
    saves_cols: ["Datum", "Stärke", "Armada", "Crew", "Forschung", "Max. Armada"],
    btn_export: "📤  CSV EXPORTIEREN",
    btn_delete: "✖  AUSWAHL LÖSCHEN",
    btn_clear_all: "🗑  ALLES LÖSCHEN",
    msg_saved: "✔  Gespeichert",
    msg_no_entries: "Keine Einträge vorhanden.",
    msg_clear_all_confirm: "Wirklich alle Einträge löschen?",
    armada_options: {
      Uncommon: "Uncommon  (grün)  ×3.0",
      Rare:     "Rare  (blau)  ×1.8",
      Epic:     "Epic  (lila)  ×1.1",
    },
    crew_options: {
      Optimal:  "Optimal  (Sisko, Kirk/Spock …)  ×1.2",
      Standard: "Standard  (normale Kampf-Crew)  ×1.0",
      Weak:     "Schwach  (falsche / keine Crew)  ×0.8",
    },
    res_options: {
      High: "Hoch  (weit ausgebaut)  ×1.1",
      Base: "Basis  (durchschnittlich)  ×1.0",
    },
  },
  en: {
    title: "⬡  STFC CALC  ⬡",
    tab_calc: "◆  Calculation",
    tab_saves: "◈  History",
    power_title: "FLEET POWER",
    power_info: "Your total fleet power (sum of all participating ships).",
    power_label: "Enter power  (e.g. 2,000,000)",
    armada_title: "ARMADA TYPE",
    armada_info: "Which armada do you want to attack?",
    armada_label: "Select armada type:",
    crew_title: "CREW QUALITY",
    crew_info: "Which officers are on your ship?",
    crew_label: "Select crew quality:",
    res_title: "RESEARCH LEVEL",
    res_info: "Armada research in the Station & Combat trees.",
    res_label: "Select research level:",
    result_title: "RESULT",
    result_label: "Max. armada power you can defeat:",
    result_start: "Enter power to get started.",
    btn_calc: "💾  SAVE",
    btn_clear: "✖  CLEAR",
    tips_title: "TIPS",
    tips_start: "Enter power for tips.",
    tips_crew: "💡 Optimal crew gives +20% more capacity.",
    tips_research: "🔬 Armada research gives +10% bonus.",
    tips_epic: "⚠️ Epic REQUIRES optimal crew!",
    tips_optimal: "✅ Optimal settings!",
    warn_title: "⚠  NOTES",
    warn_text:
      "• 100-Round Limit: Not won = Defeat.\n\n• One-Shot: Ship too small = instantly destroyed.\n\n• Solo: No alliance damage bonus.",
    saves_title: "SAVED CALCULATIONS",
    saves_info: "All saved calculations – exportable as CSV.",
    saves_cols: ["Date", "Power", "Armada", "Crew", "Research", "Max Armada"],
    btn_export: "📤  EXPORT CSV",
    btn_delete: "✖  DELETE SELECTION",
    btn_clear_all: "🗑  DELETE ALL",
    msg_saved: "✔  Saved",
    msg_no_entries: "No entries available.",
    msg_clear_all_confirm: "Really delete all entries?",
    armada_options: {
      Uncommon: "Uncommon  (green)  ×3.0",
      Rare:     "Rare  (blue)  ×1.8",
      Epic:     "Epic  (purple)  ×1.1",
    },
    crew_options: {
      Optimal:  "Optimal  (Sisko, Kirk/Spock …)  ×1.2",
      Standard: "Standard  (normal combat crew)  ×1.0",
      Weak:     "Weak  (wrong / no crew)  ×0.8",
    },
    res_options: {
      High: "High  (well researched)  ×1.1",
      Base: "Base  (average level)  ×1.0",
    },
  },
};
