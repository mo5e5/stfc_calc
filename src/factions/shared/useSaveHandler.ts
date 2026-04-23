import { useState } from "react";
import type { FactionKey, SaveEntry } from "./types";

interface UseSaveHandlerParams {
  faction: FactionKey;
  power: number | null;
  resultValue: number | null;
  label: string;
  onSave: (entry: SaveEntry) => void;
}

export function useSaveHandler({ faction, power, resultValue, label, onSave }: UseSaveHandlerParams) {
  const [justSaved, setJustSaved] = useState(false);

  function handleSave() {
    if (!power || resultValue === null) return;
    onSave({
      date:    new Date().toLocaleString("de-DE"),
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
