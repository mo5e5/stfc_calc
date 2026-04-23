import { useState } from "react";
import Card from "../../components/Card";
import { useSaveHandler } from "../shared/useSaveHandler";
import { calculateBorg } from "./calc";
import type { BorgTarget, BorgCrewKey } from "./calc";
import { strings } from "./strings";
import { CREW_FACTORS, RESEARCH_FACTORS, fmtPower, parsePower } from "../shared/utils";
import type { CrewKey, ResKey, Lang, SaveEntry } from "../shared/types";
import type { Translation } from "../../languages";

interface Props {
  lang:   Lang;
  t:      Translation;
  onSave: (entry: SaveEntry) => void;
}

const BORG_TARGETS: BorgTarget[]   = ["Sphere", "Cube", "MegaCube"];
const BORG_CREWS:   BorgCrewKey[]  = ["BorgSynergy", "Optimal", "Standard"];

export default function BorgTab({ lang, t, onSave }: Props) {
  const s = strings[lang];

  const [powerInput, setPowerInput] = useState("");
  const [target, setTarget]         = useState<BorgTarget>("Sphere");
  const [borgCrew, setBorgCrew]     = useState<BorgCrewKey>("BorgSynergy");
  const [crew, setCrew]             = useState<CrewKey>("Optimal");
  const [research, setResearch]     = useState<ResKey>("High");

  let power:  number | null = null;
  let result: ReturnType<typeof calculateBorg> | null = null;

  if (powerInput.trim()) {
    try {
      power  = parsePower(powerInput);
      result = calculateBorg(power, target, borgCrew, crew, research);
    } catch { /* invalid */ }
  }

  const label = `${target} · ${borgCrew} · ${crew}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: "Borg",
    power,
    resultValue: result?.maxArmadaPower ?? null,
    label,
    onSave,
  });

  const tips = result
    ? [
        target === "Sphere"   && s.tip_sphere,
        target === "Cube"     && s.tip_cube,
        target === "MegaCube" && s.tip_megacube,
        result.megaCubeWarning && s.tip_no_synergy,
        result.crew < 1.0      && t.tips_crew,
        result.research < 1.1  && t.tips_research,
      ].filter(Boolean).join("\n\n") || t.tips_optimal
    : t.tips_start;

  function handleClear() {
    setPowerInput("");
    setTarget("Sphere");
    setBorgCrew("BorgSynergy");
    setCrew("Optimal");
    setResearch("High");
  }

  return (
    <div className="calc-layout">
      <div className="calc-left">
        <Card title={t.power_title}>
          <p className="info-text">{t.power_info}</p>
          <label className="field-label">{t.power_label}</label>
          <input
            className="power-input"
            value={powerInput}
            onChange={(e) => setPowerInput(e.target.value)}
            placeholder="2000000"
            autoFocus
          />
        </Card>

        <Card title="BORG-ZIEL">
          <p className="info-text">{s.armada_info}</p>
          <label className="field-label">{s.target_label}</label>
          <select className="select-input" value={target} onChange={(e) => setTarget(e.target.value as BorgTarget)}>
            {BORG_TARGETS.map((k) => (
              <option key={k} value={k}>{s.target_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={s.borg_crew_label}>
          <p className="info-text">{s.borg_crew_info}</p>
          <label className="field-label">{s.borg_crew_label}:</label>
          <select className="select-input" value={borgCrew} onChange={(e) => setBorgCrew(e.target.value as BorgCrewKey)}>
            {BORG_CREWS.map((k) => (
              <option key={k} value={k}>{s.borg_crew_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={t.crew_title}>
          <p className="info-text">{t.crew_info}</p>
          <label className="field-label">{t.crew_label}</label>
          <select className="select-input" value={crew} onChange={(e) => setCrew(e.target.value as CrewKey)}>
            {(Object.keys(CREW_FACTORS) as CrewKey[]).map((k) => (
              <option key={k} value={k}>{t.crew_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={t.res_title}>
          <p className="info-text">{t.res_info}</p>
          <label className="field-label">{t.res_label}</label>
          <select className="select-input" value={research} onChange={(e) => setResearch(e.target.value as ResKey)}>
            {(Object.keys(RESEARCH_FACTORS) as ResKey[]).map((k) => (
              <option key={k} value={k}>{t.res_options[k]}</option>
            ))}
          </select>
        </Card>
      </div>

      <div className="calc-right">
        <Card title={t.result_title}>
          <p className="result-label">{t.result_label}</p>
          <p className="result-value" style={{ color: result ? "var(--borg)" : "var(--bright)" }}>
            {result ? fmtPower(result.maxArmadaPower) : "–"}
          </p>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? `${fmtPower(power)}  ×  Mitigation  ×  ${result.borgCrew}  ×  ${result.crew}  ×  ${result.research}\n= ${fmtPower(result.maxArmadaPower)}\n\nZiel:         ${target}\nBorg-Crew:    × ${result.borgCrew}\nCrew:         × ${result.crew}\nForschung:    × ${result.research}`
              : t.result_start}
          </pre>
        </Card>

        <div className="btn-row">
          <button className={`stfc-btn${justSaved ? " saved" : ""}`} onClick={handleSave} disabled={!result}>
            {justSaved ? t.msg_saved : t.btn_calc}
          </button>
          <button className="stfc-btn" onClick={handleClear}>{t.btn_clear}</button>
        </div>

        <Card title={t.tips_title}>
          <p className="info-text" style={{ whiteSpace: "pre-line" }}>{tips}</p>
        </Card>

        <Card title={t.warn_title}>
          <p className="info-text" style={{ whiteSpace: "pre-line" }}>{t.warn_text}</p>
        </Card>
      </div>
    </div>
  );
}
