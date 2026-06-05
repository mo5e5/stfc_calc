import { useState } from "react";
import Card from "../../components/Card";
import ResearchSelect from "../shared/components/ResearchSelect";
import DifficultySelect from "../shared/components/DifficultySelect";
import ResultCard from "../shared/components/ResultCard";
import ActionButtons from "../shared/components/ActionButtons";
import { useSaveHandler } from "../shared/useSaveHandler";
import { calculateDominion } from "./calc";
import type { ShipSetup } from "./calc";
import { strings } from "./strings";
import { CREW_FACTORS, fmtPower, parsePower } from "../shared/utils";
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

  const label = `${difficulty} · ${hasDefiant ? "Defiant" : "No Defiant"} · ${research}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: "Dominion",
    power: result?.totalPower ?? null,
    resultValue: result?.maxArmadaPower ?? null,
    label,
    onSave,
  });

  const tips = result
    ? [
        hasDefiant               && s.tip_defiant,
        s.tip_timer,
        s.tip_crews,
        result.research < 1.1   && t.tips_research,
      ].filter(Boolean).join("\n\n")
    : t.tips_start;

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
        <DifficultySelect value={difficulty} onChange={setDifficulty} t={t} infoText={s.armada_info} />

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

        <ResearchSelect value={research} onChange={setResearch} t={t} />
      </div>

      <div className="calc-right">
        <ResultCard result={result?.maxArmadaPower ?? null} fmtPower={fmtPower} lang={lang} t={t} resultColor={result ? "var(--dominion)" : "var(--bright)"}>
          <div className="divider" />
          <pre className="formula-text">
            {result
              ? [
                  `${s.label_total}  ${fmtPower(result.totalPower, lang)}`,
                  `  Schiff 1:  ${fmtPower(result.ship1, lang)}`,
                  `  Schiff 2:  ${fmtPower(result.ship2, lang)}`,
                  `  Schiff 3:  ${fmtPower(result.ship3, lang)}`,
                  "",
                  `× ${result.difficulty}  (${difficulty})`,
                  `× ${result.research}  (${research})`,
                  `× ${hasDefiant ? "1.15" : "1.0"}  (Defiant)`,
                  `= ${fmtPower(result.maxArmadaPower, lang)}`,
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
