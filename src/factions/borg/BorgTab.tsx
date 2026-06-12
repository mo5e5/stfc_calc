import { useState } from "react";
import Card from "../../components/Card";
import CrewSelect from "../shared/components/CrewSelect";
import ResearchSelect from "../shared/components/ResearchSelect";
import ResultCard from "../shared/components/ResultCard";
import ActionButtons from "../shared/components/ActionButtons";
import { useSaveHandler } from "../shared/useSaveHandler";
import { calculateBorg } from "./calc";
import type { BorgTarget, BorgCrewKey } from "./calc";
import { strings } from "./strings";
import { fmtPower, deriveResult } from "../shared/utils";
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

  const { power, result } = deriveResult(powerInput, (p) =>
    calculateBorg(p, target, borgCrew, crew, research),
  );

  const label = `${target} · ${borgCrew} · ${crew}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: "Borg",
    power,
    resultValue: result?.maxArmadaPower ?? null,
    label,
    lang,
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

        <Card title={s.target_title}>
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

        <CrewSelect value={crew} onChange={setCrew} t={t} />

        <ResearchSelect value={research} onChange={setResearch} t={t} />
      </div>

      <div className="calc-right">
        <ResultCard result={result?.maxArmadaPower ?? null} fmtPower={fmtPower} lang={lang} t={t} resultColor={result ? "var(--borg)" : "var(--bright)"}>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? `${fmtPower(power, lang)}  ×  Mitigation  ×  ${result.borgCrew}  ×  ${result.crew}  ×  ${result.research}\n= ${fmtPower(result.maxArmadaPower, lang)}\n\nZiel:         ${target}\nBorg-Crew:    × ${result.borgCrew}\nCrew:         × ${result.crew}\nForschung:    × ${result.research}`
              : t.result_start}
          </pre>
        </ResultCard>

        <ActionButtons onSave={handleSave} onClear={handleClear} justSaved={justSaved} disabled={!result} t={t} />

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
