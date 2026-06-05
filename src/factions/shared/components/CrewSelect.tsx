import Card from "../../../components/Card";
import { CREW_FACTORS } from "../utils";
import type { CrewKey } from "../types";
import type { Translation } from "../../../languages";

interface Props {
  value: CrewKey;
  onChange: (value: CrewKey) => void;
  t: Translation;
}

export default function CrewSelect({ value, onChange, t }: Props) {
  return (
    <Card title={t.crew_title}>
      <p className="info-text">{t.crew_info}</p>
      <label className="field-label">{t.crew_label}</label>
      <select
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value as CrewKey)}
      >
        {(Object.keys(CREW_FACTORS) as CrewKey[]).map((k) => (
          <option key={k} value={k}>{t.crew_options[k]}</option>
        ))}
      </select>
    </Card>
  );
}
