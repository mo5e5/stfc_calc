import { useState } from "react";
import Card from "../../components/Card";
import { calculateDominion } from "./calc";
import type { ShipSetup } from "./calc";
import { strings } from "./strings";
import { DIFFICULTY_FACTORS, CREW_FACTORS, RESEARCH_FACTORS, fmtPower, parsePower } from "../shared/utils";
import type { Difficulty, CrewKey, ResKey, Lang, SaveEntry } from "../shared/types";
import type { Translation } from "../../languages";

interface Props {
  lang:   Lang;
  t:      Translation;
  onSave: (entry: SaveEntry) => void;
}

function useShipInput() {
  const [power, setPower] = useState("");
  const [crew, setCrew]   = useState<CrewKey>("Optimal");
  return { power, setPower, crew, setCrew };
}

export default function DominionTab({ lang, t, onSave }: Props) {
  const s = strings[lang];

  const ship1 = useShipInput();
  const ship2 = useShipInput();
  const ship3 = useShipInput();

  const [difficulty, setDifficulty] = useState<Difficulty>("Uncommon");
  const [research, setResearch]     = useState<ResKey>("High");
  const [hasDefiant, setHasDefiant] = useState(true);
  const [justSaved, setJustSaved]   = useState(false);

  function parseShip(input: { power: string; crew: CrewKey }): ShipSetup | null {
    try { return { power: parsePower(input.power), crew: input.crew }; }
    catch { return null; }
  }

  const s1 = parseShip(ship1);
  const s2 = parseShip(ship2);
  const s3 = parseShip(ship3);
  const allReady = s1 && s2 && s3;

  const result = allReady
    ? calculateDominion(s1, s2, s3, difficulty, research, hasDefiant)
    : null;

  const tips = result
    ? [
        hasDefiant               && s.tip_defiant,
        s.tip_timer,
        s.tip_crews,
        result.research < 1.1   && t.tips_research,
      ].filter(Boolean).join("\n\n")
    : t.tips_start;

  function handleSave() {
    if (!result) return;
    onSave({
      date:    new Date().toLocaleString("de-DE"),
      faction: "Dominion",
      power:   result.totalPower,
      result:  result.maxArmadaPower,
      label:   `${difficulty} · ${hasDefiant ? "Defiant" : "No Defiant"} · ${research}`,
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

  function handleClear() {
    [ship1, ship2, ship3].forEach((sh) => { sh.setPower(""); sh.setCrew("Optimal"); });
    setDifficulty("Uncommon");
    setResearch("High");
    setHasDefiant(true);
  }

  function ShipCard({ n, sh }: { n: number; sh: ReturnType<typeof useShipInput> }) {
    return (
      <Card title={s.ship_label(n)}>
        <input
          className="power-input"
          value={sh.power}
          onChange={(e) => sh.setPower(e.target.value)}
          placeholder={s.ship_power_placeholder}
        />
        <select className="select-input" value={sh.crew} onChange={(e) => sh.setCrew(e.target.value as CrewKey)}>
          {(Object.keys(CREW_FACTORS) as CrewKey[]).map((k) => (
            <option key={k} value={k}>{t.crew_options[k]}</option>
          ))}
        </select>
      </Card>
    );
  }

  return (
    <div className="calc-layout">
      <div className="calc-left">
        <Card title={t.difficulty_title}>
          <p className="info-text">{s.armada_info}</p>
          <label className="field-label">{t.difficulty_label}</label>
          <select className="select-input" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
            {(Object.keys(DIFFICULTY_FACTORS) as Difficulty[]).map((k) => (
              <option key={k} value={k}>{t.difficulty_options[k]}</option>
            ))}
          </select>
        </Card>

        <ShipCard n={1} sh={ship1} />
        <ShipCard n={2} sh={ship2} />
        <ShipCard n={3} sh={ship3} />

        <Card title={s.defiant_label}>
          <p className="info-text">{s.defiant_info}</p>
          <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={hasDefiant}
              onChange={(e) => setHasDefiant(e.target.checked)}
              style={{ width: "14px", height: "14px", cursor: "pointer" }}
            />
            {s.defiant_label}  {hasDefiant ? "×1.15" : "×1.0"}
          </label>
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
          <p className="result-value" style={{ color: result ? "var(--dominion)" : "var(--bright)" }}>
            {result ? fmtPower(result.maxArmadaPower) : "–"}
          </p>
          <div className="divider" />
          <pre className="formula-text">
            {result
              ? [
                  `${s.label_total}  ${fmtPower(result.totalPower)}`,
                  `  Schiff 1:  ${fmtPower(result.ship1)}`,
                  `  Schiff 2:  ${fmtPower(result.ship2)}`,
                  `  Schiff 3:  ${fmtPower(result.ship3)}`,
                  "",
                  `× ${result.difficulty}  (${difficulty})`,
                  `× ${result.research}  (${research})`,
                  `× ${hasDefiant ? "1.15" : "1.0"}  (Defiant)`,
                  `= ${fmtPower(result.maxArmadaPower)}`,
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
