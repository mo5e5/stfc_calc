import { useState } from "react";
import Card from "../../components/Card";
import CrewSelect from "../shared/components/CrewSelect";
import ResearchSelect from "../shared/components/ResearchSelect";
import DifficultySelect from "../shared/components/DifficultySelect";
import ResultCard from "../shared/components/ResultCard";
import ActionButtons from "../shared/components/ActionButtons";
import { useSaveHandler } from "../shared/useSaveHandler";
import { calculateCardassian, critChanceAtRound, GAILA_REDUCTION } from "./calc";
import type { GailaKey } from "./calc";
import { strings } from "./strings";
import { DIFFICULTY_FACTORS, fmtPower, deriveResult } from "../shared/utils";
import type { Difficulty, CrewKey, ResKey, Lang, SaveEntry } from "../shared/types";
import type { Translation } from "../../languages";

interface Props {
  lang:   Lang;
  t:      Translation;
  onSave: (entry: SaveEntry) => void;
}

export default function CardassianTab({ lang, t, onSave }: Props) {
  const s = strings[lang];

  const [powerInput, setPowerInput] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Uncommon");
  const [crew, setCrew]             = useState<CrewKey>("Optimal");
  const [research, setResearch]     = useState<ResKey>("High");
  const [gaila, setGaila]           = useState<GailaKey>("GailaSynergy");

  const { power, result } = deriveResult(powerInput, (p) =>
    calculateCardassian(p, difficulty, crew, research, gaila),
  );

  const label = `${difficulty} · ${crew} · ${gaila}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: "Cardassian",
    power,
    resultValue: result?.maxArmadaPower ?? null,
    label,
    lang,
    onSave,
  });

  const tips = result
    ? [
        difficulty === "Uncommon" && s.tip_uncommon,
        difficulty === "Rare"     && s.tip_rare,
        difficulty === "Epic"     && s.tip_epic,
        gaila === "none"          && s.tip_gaila,
        result.crew < 1.2         && t.tips_crew,
        result.research < 1.1     && t.tips_research,
      ].filter(Boolean).join("\n\n") || t.tips_optimal
    : t.tips_start;

  function handleClear() {
    setPowerInput("");
    setDifficulty("Uncommon");
    setCrew("Optimal");
    setResearch("High");
    setGaila("GailaSynergy");
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

        <DifficultySelect value={difficulty} onChange={setDifficulty} t={t} infoText={s.armada_info} />

        <Card title={s.gaila_label}>
          <p className="info-text">{s.gaila_info}</p>
          <label className="field-label">{s.gaila_label}:</label>
          <select className="select-input" value={gaila} onChange={(e) => setGaila(e.target.value as GailaKey)}>
            {(Object.keys(GAILA_REDUCTION) as GailaKey[]).map((k) => (
              <option key={k} value={k}>{s.gaila_options[k]}</option>
            ))}
          </select>
        </Card>

        <CrewSelect value={crew} onChange={setCrew} t={t} />

        <ResearchSelect value={research} onChange={setResearch} t={t} />
      </div>

      <div className="calc-right">
        <ResultCard result={result?.maxArmadaPower ?? null} fmtPower={fmtPower} lang={lang} t={t} resultColor={result ? "var(--cardassian)" : "var(--bright)"}>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? [
                  `${fmtPower(power, lang)}  ×  ${DIFFICULTY_FACTORS[difficulty]}  ×  ${result.crew}  ×  ${result.research}`,
                  `= ${fmtPower(result.maxArmadaPower, lang)}`,
                  "",
                  `${s.label_crit_info}  ${result.critDamage}%`,
                  difficulty === "Uncommon"
                    ? `Crit  Rd.1: ${critChanceAtRound(1)}%  →  Rd.8: 100%`
                    : `Crit-Chance: 20% (fest)`,
                ].join("\n")
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
