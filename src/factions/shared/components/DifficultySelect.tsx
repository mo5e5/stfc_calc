import Card from "../../../components/Card";
import { DIFFICULTY_FACTORS } from "../utils";
import type { Difficulty } from "../types";
import type { Translation } from "../../../languages";

interface Props {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
  t: Translation;
  infoText?: string;
}

export default function DifficultySelect({ value, onChange, t, infoText }: Props) {
  return (
    <Card title={t.difficulty_title}>
      {infoText && <p className="info-text">{infoText}</p>}
      <label className="field-label">{t.difficulty_label}</label>
      <select
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value as Difficulty)}
      >
        {(Object.keys(DIFFICULTY_FACTORS) as Difficulty[]).map((k) => (
          <option key={k} value={k}>{t.difficulty_options[k]}</option>
        ))}
      </select>
    </Card>
  );
}
