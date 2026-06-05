import { useState } from "react";
import Card from "../../components/Card";
import CrewSelect from "./components/CrewSelect";
import ResearchSelect from "./components/ResearchSelect";
import DifficultySelect from "./components/DifficultySelect";
import ResultCard from "./components/ResultCard";
import ActionButtons from "./components/ActionButtons";
import { useSaveHandler } from "./useSaveHandler";
import {
  DIFFICULTY_FACTORS,
  CREW_FACTORS,
  RESEARCH_FACTORS,
  COUNTER_SHIP,
  getShipTypeFactor,
  fmtPower,
  parsePower,
} from "./utils";
import type { Difficulty, CrewKey, ResKey, ShipType, Lang, SaveEntry } from "./types";
import type { StandardFactionConfig, FactionStrings } from "./types";
import type { Translation } from "../../languages";

interface Props {
  config:         StandardFactionConfig;
  strings:        FactionStrings;
  lang:           Lang;
  t:              Translation;
  onSave:         (entry: SaveEntry) => void;
}

export default function StandardFactionCalc({ config, strings, lang, t, onSave }: Props) {
  const [powerInput, setPowerInput] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Uncommon");
  const [shipType, setShipType]     = useState<ShipType>(COUNTER_SHIP[config.armadaType]);
  const [crew, setCrew]             = useState<CrewKey>("Optimal");
  const [research, setResearch]     = useState<ResKey>("High");

  let power:  number | null = null;
  let result: { value: number; b: number; c: number; r: number; s: number; status: string } | null = null;

  if (powerInput.trim()) {
    try {
      power = parsePower(powerInput);
      const b = DIFFICULTY_FACTORS[difficulty];
      const c = CREW_FACTORS[crew];
      const r = RESEARCH_FACTORS[research];
      const { factor: s, status } = getShipTypeFactor(shipType, config.armadaType);
      result = { value: Math.round(power * b * c * r * s), b, c, r, s, status };
    } catch { /* ungültige Eingabe */ }
  }

  const label = `${difficulty} · ${crew} · ${research} · ${shipType}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: config.key,
    power,
    resultValue: result?.value ?? null,
    label,
    onSave,
  });

  const resultColor = result ? `var(--${config.key.toLowerCase()})` : "var(--bright)";

  function handleClear() {
    setPowerInput("");
    setDifficulty("Uncommon");
    setShipType(COUNTER_SHIP[config.armadaType]);
    setCrew("Optimal");
    setResearch("High");
  }

  const statusIcon = result
    ? result.status === "advantage"    ? "✅"
    : result.status === "disadvantage" ? "⚠️"
    : "➖"
    : "";

  const tips = result
    ? [
        result.status === "advantage"    && strings.counter_tip,
        result.status === "disadvantage" && strings.disadvantage_warn,
        result.c < 1.2                  && t.tips_crew,
        result.r < 1.1                  && t.tips_research,
        difficulty === "Epic" && result.c < 1.2 && t.tips_epic,
        result.status === "neutral" && result.c >= 1.2 && result.r >= 1.1 && t.tips_optimal,
      ].filter(Boolean).join("\n\n") || t.tips_optimal
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

        <DifficultySelect value={difficulty} onChange={setDifficulty} t={t} infoText={t.difficulty_info} />

        <Card title={t.ship_type_title}>
          <p className="info-text">{strings.armada_info}</p>
          <label className="field-label">{t.ship_type_label}</label>
          <select
            className="select-input"
            value={shipType}
            onChange={(e) => setShipType(e.target.value as ShipType)}
          >
            {(Object.keys(COUNTER_SHIP) as ShipType[]).map((k) => (
              <option key={k} value={k}>{t.ship_type_options[k]}</option>
            ))}
          </select>
        </Card>

        <CrewSelect value={crew} onChange={setCrew} t={t} />

        <ResearchSelect value={research} onChange={setResearch} t={t} />
      </div>

      {/* Rechte Spalte: Ergebnis */}
      <div className="calc-right">
        <ResultCard result={result?.value ?? null} fmtPower={fmtPower} lang={lang} t={t} resultColor={resultColor}>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? `${fmtPower(power, lang)}  ×  ${result.b}  ×  ${result.c}  ×  ${result.r}  ×  ${result.s}\n= ${fmtPower(result.value, lang)}\n\n${t.difficulty_title}:  × ${result.b}\n${t.crew_title}:      × ${result.c}\n${t.res_title}:  × ${result.r}\n${t.ship_type_title}:   × ${result.s}  ${statusIcon}`
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
