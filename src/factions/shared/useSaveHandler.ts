import { useState } from "react";
import type { FactionKey, Lang, SaveEntry } from "./types";

interface UseSaveHandlerParams {
  faction: FactionKey;
  power: number | null;
  resultValue: number | null;
  label: string;
  lang: Lang;
  onSave: (entry: SaveEntry) => void;
}

export function useSaveHandler({ faction, power, resultValue, label, lang, onSave }: UseSaveHandlerParams) {
  const [justSaved, setJustSaved] = useState(false);

  function handleSave() {
    if (!power || resultValue === null) return;
    onSave({
      date:    new Date().toLocaleString(lang),
      faction,
      power,
      result:  resultValue,
      label,
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

  return { handleSave, justSaved };
}
