import Card from "../../../components/Card";
import { RESEARCH_FACTORS } from "../utils";
import type { ResKey } from "../types";
import type { Translation } from "../../../languages";

interface Props {
  value: ResKey;
  onChange: (value: ResKey) => void;
  t: Translation;
}

export default function ResearchSelect({ value, onChange, t }: Props) {
  return (
    <Card title={t.res_title}>
      <p className="info-text">{t.res_info}</p>
      <label className="field-label">{t.res_label}</label>
      <select
        className="select-input"
        value={value}
        onChange={(e) => onChange(e.target.value as ResKey)}
      >
        {(Object.keys(RESEARCH_FACTORS) as ResKey[]).map((k) => (
          <option key={k} value={k}>{t.res_options[k]}</option>
        ))}
      </select>
    </Card>
  );
}
