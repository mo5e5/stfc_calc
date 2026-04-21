import { useState } from "react";
import Card from "./Card";
import {
  ARMADA_TYPES,
  CREW_FACTORS,
  RESEARCH_FACTORS,
  calculate,
  fmtPower,
  parsePower,
} from "../data";
import type { ArmadaKey, CrewKey, ResKey, SaveEntry } from "../data";
import type { Translation } from "../languages";

interface Props {
  t: Translation;
  onSave: (entry: SaveEntry) => void;
}

export default function Calculator({ t, onSave }: Props) {
  const [powerInput, setPowerInput] = useState("");
  const [armada, setArmada] = useState<ArmadaKey>("Uncommon");
  const [crew, setCrew] = useState<CrewKey>("Optimal");
  const [research, setResearch] = useState<ResKey>("High");
  const [justSaved, setJustSaved] = useState(false);

  // Berechnung direkt aus State – kein useEffect nötig
  // (React rendert neu wenn State sich ändert, result wird neu berechnet)
  let power: number | null = null;
  let result = null;
  if (powerInput.trim()) {
    try {
      power = parsePower(powerInput);
      result = calculate(power, armada, crew, research);
    } catch {
      // ungültige Eingabe → result bleibt null
    }
  }

  const resultColor = result
    ? `var(--${armada.toLowerCase()})`
    : "var(--bright)";

  function handleSave() {
    if (!power || !result) return;
    onSave({
      date: new Date().toLocaleString("de-DE"),
      power,
      armada,
      crew,
      research,
      result: result.result,
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

  function handleClear() {
    setPowerInput("");
    setArmada("Uncommon");
    setCrew("Optimal");
    setResearch("High");
  }

  const tips = result
    ? [
        result.c < 1.2 && t.tips_crew,
        result.r < 1.1 && t.tips_research,
        armada === "Epic" && result.c < 1.2 && t.tips_epic,
      ]
        .filter(Boolean)
        .join("\n\n") || t.tips_optimal
    : t.tips_start;

  return (
    <div className="calc-layout">
      {/* Linke Spalte: Eingaben */}
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

        <Card title={t.armada_title}>
          <p className="info-text">{t.armada_info}</p>
          <label className="field-label">{t.armada_label}</label>
          <select
            className="select-input"
            value={armada}
            onChange={(e) => setArmada(e.target.value as ArmadaKey)}
          >
            {(Object.keys(ARMADA_TYPES) as ArmadaKey[]).map((k) => (
              <option key={k} value={k}>{t.armada_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={t.crew_title}>
          <p className="info-text">{t.crew_info}</p>
          <label className="field-label">{t.crew_label}</label>
          <select
            className="select-input"
            value={crew}
            onChange={(e) => setCrew(e.target.value as CrewKey)}
          >
            {(Object.keys(CREW_FACTORS) as CrewKey[]).map((k) => (
              <option key={k} value={k}>{t.crew_options[k]}</option>
            ))}
          </select>
        </Card>

        <Card title={t.res_title}>
          <p className="info-text">{t.res_info}</p>
          <label className="field-label">{t.res_label}</label>
          <select
            className="select-input"
            value={research}
            onChange={(e) => setResearch(e.target.value as ResKey)}
          >
            {(Object.keys(RESEARCH_FACTORS) as ResKey[]).map((k) => (
              <option key={k} value={k}>{t.res_options[k]}</option>
            ))}
          </select>
        </Card>
      </div>

      {/* Rechte Spalte: Ergebnis */}
      <div className="calc-right">
        <Card title={t.result_title}>
          <p className="result-label">{t.result_label}</p>
          <p className="result-value" style={{ color: resultColor }}>
            {result ? fmtPower(result.result) : "–"}
          </p>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? `${fmtPower(power)}  ×  ${result.b}  ×  ${result.c}  ×  ${result.r}\n= ${fmtPower(result.result)}\n\nArmada:    × ${result.b}\nCrew:      × ${result.c}\nResearch:  × ${result.r}`
              : t.result_start}
          </pre>
        </Card>

        <div className="btn-row">
          <button
            className={`stfc-btn${justSaved ? " saved" : ""}`}
            onClick={handleSave}
            disabled={!result}
          >
            {justSaved ? t.msg_saved : t.btn_calc}
          </button>
          <button className="stfc-btn" onClick={handleClear}>
            {t.btn_clear}
          </button>
        </div>

        <Card title={t.tips_title}>
          <p className="info-text" style={{ whiteSpace: "pre-line" }}>
            {tips}
          </p>
        </Card>

        <Card title={t.warn_title}>
          <p className="info-text" style={{ whiteSpace: "pre-line" }}>
            {t.warn_text}
          </p>
        </Card>
      </div>
    </div>
  );
}
