import StandardFactionCalc from "../shared/StandardFactionCalc";
import { config } from "./config";
import { strings } from "./strings";
import type { Lang, SaveEntry } from "../shared/types";
import type { Translation } from "../../languages";

interface Props {
  lang:   Lang;
  t:      Translation;
  onSave: (entry: SaveEntry) => void;
}

export default function RomulanTab({ lang, t, onSave }: Props) {
  return <StandardFactionCalc config={config} strings={strings[lang]} t={t} onSave={onSave} />;
}
