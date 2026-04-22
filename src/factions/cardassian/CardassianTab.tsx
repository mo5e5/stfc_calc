import { useState } from "react";
import Card from "../../components/Card";
import { calculateCardassian, critChanceAtRound, GAILA_REDUCTION } from "./calc";
import type { GailaKey } from "./calc";
import { strings } from "./strings";
import { DIFFICULTY_FACTORS, CREW_FACTORS, RESEARCH_FACTORS, fmtPower, parsePower } from "../shared/utils";
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
  const [justSaved, setJustSaved]   = useState(false);

  let power:  number | null = null;
  let result: ReturnType<typeof calculateCardassian> | null = null;

  if (powerInput.trim()) {
    try {
      power  = parsePower(powerInput);
      result = calculateCardassian(power, difficulty, crew, research, gaila);
    } catch { /* invalid */ }
  }

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

  function handleSave() {
    if (!power || !result) return;
    onSave({
      date:    new Date().toLocaleString("de-DE"),
      faction: "Cardassian",
      power,
      result:  result.maxArmadaPower,
      label:   `${difficulty} · ${crew} · ${gaila}`,
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

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

        <Card title={t.difficulty_title}>
          <p className="info-text">{s.armada_info}</p>
          <label className="field-label">{t.difficulty_label}</label>
          <select className="select-input" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
            {(Object.keys(DIFFICULTY_FACTORS) as Difficulty[]).map((k) => (
              <option key={k} value={k}>{t.difficulty_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={s.gaila_label}>
          <p className="info-text">{s.gaila_info}</p>
          <label className="field-label">{s.gaila_label}:</label>
          <select className="select-input" value={gaila} onChange={(e) => setGaila(e.target.value as GailaKey)}>
            {(Object.keys(GAILA_REDUCTION) as GailaKey[]).map((k) => (
              <option key={k} value={k}>{s.gaila_options[k]}</option>
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
          <p className="result-value" style={{ color: result ? "var(--cardassian)" : "var(--bright)" }}>
            {result ? fmtPower(result.maxArmadaPower) : "–"}
          </p>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? [
                  `${fmtPower(power)}  ×  ${DIFFICULTY_FACTORS[difficulty]}  ×  ${result.crew}  ×  ${result.research}`,
                  `= ${fmtPower(result.maxArmadaPower)}`,
                  "",
                  `${s.label_crit_info}  ${result.critDamage}%`,
                  difficulty === "Uncommon"
                    ? `Crit  Rd.1: ${critChanceAtRound(1)}%  →  Rd.8: 100%`
                    : `Crit-Chance: 20% (fest)`,
                ].join("\n")
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
