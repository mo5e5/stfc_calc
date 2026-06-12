import { useState } from "react";
import Card from "../../components/Card";
import CrewSelect from "../shared/components/CrewSelect";
import ResearchSelect from "../shared/components/ResearchSelect";
import DifficultySelect from "../shared/components/DifficultySelect";
import ResultCard from "../shared/components/ResultCard";
import ActionButtons from "../shared/components/ActionButtons";
import { useSaveHandler } from "../shared/useSaveHandler";
import { calculateEclipse } from "./calc";
import type { SpockTier, HullBreachKey } from "./calc";
import { strings } from "./strings";
import {
  DIFFICULTY_FACTORS,
  fmtPower,
  deriveResult,
} from "../shared/utils";
import type {
  Difficulty,
  CrewKey,
  ResKey,
  Lang,
  SaveEntry,
} from "../shared/types";
import type { Translation } from "../../languages";

interface Props {
  lang: Lang;
  t: Translation;
  onSave: (entry: SaveEntry) => void;
}

const SPOCK_TIERS: SpockTier[] = [0, "beverly", 3, 4, 5];

export default function EclipseTab({ lang, t, onSave }: Props) {
  const s = strings[lang];

  const [powerInput, setPowerInput] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Uncommon");
  const [armadaLevel, setArmadaLevel] = useState(1);
  const [crew, setCrew] = useState<CrewKey>("Optimal");
  const [research, setResearch] = useState<ResKey>("High");
  const [spockTier, setSpockTier] = useState<SpockTier>(0);
  const [hullBreach, setHullBreach] = useState<HullBreachKey>("yes");
  const [defenseStat, setDefenseStat] = useState(0);

  const { power, result } = deriveResult(powerInput, (p) =>
    calculateEclipse(
      p,
      difficulty,
      crew,
      research,
      spockTier,
      hullBreach,
      armadaLevel,
      defenseStat,
    ),
  );

  const tierLabel = spockTier === "beverly" ? "Beverly" : `Spock T${spockTier}`;
  const label = `${difficulty} · Level ${armadaLevel} · ${tierLabel} · ${hullBreach === "yes" ? "Hull Breach" : "No HB"}`;
  const { handleSave, justSaved } = useSaveHandler({
    faction: "Eclipse",
    power,
    resultValue: result?.maxArmadaPower ?? null,
    label,
    lang,
    onSave,
  });

  const tips = result
    ? [
        spockTier === 0 && s.tip_no_spock,
        spockTier === 5 && s.tip_spock5,
        spockTier === 4 && s.tip_spock4,
        spockTier === 3 && s.tip_spock3,
        spockTier === "beverly" && s.tip_beverly,
        hullBreach === "yes" && s.tip_hull,
        result.crew < 1.2 && t.tips_crew,
        result.research < 1.1 && t.tips_research,
      ]
        .filter(Boolean)
        .join("\n\n") || t.tips_optimal
    : t.tips_start;

  function handleClear() {
    setPowerInput("");
    setDifficulty("Uncommon");
    setArmadaLevel(1);
    setCrew("Optimal");
    setResearch("High");
    setSpockTier(0);
    setHullBreach("yes");
    setDefenseStat(0);
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

        <Card title={s.armada_level_label}>
          <p className="info-text">{s.armada_level_info}</p>
          <label className="field-label">{s.armada_level_label}:</label>
          <input
            type="number"
            className="power-input"
            value={armadaLevel}
            onChange={(e) =>
              setArmadaLevel(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
            max="99"
          />
        </Card>

        <Card title={s.spock_label}>
          <p className="info-text">{s.spock_info}</p>
          <label className="field-label">{s.spock_label}:</label>
          <select
            className="select-input"
            value={spockTier}
            onChange={(e) => {
              const v = e.target.value;
              setSpockTier(v === "beverly" ? "beverly" : (Number(v) as SpockTier));
            }}
          >
            {SPOCK_TIERS.map((tier) => (
              <option key={tier} value={tier}>
                {s.spock_options[tier]}
              </option>
            ))}
          </select>
        </Card>

        <Card title={s.defense_label}>
          <p className="info-text">{s.defense_info}</p>
          <label className="field-label">{s.defense_label}:</label>
          <input
            type="number"
            className="power-input"
            value={defenseStat || ""}
            onChange={(e) =>
              setDefenseStat(Math.max(0, parseInt(e.target.value) || 0))
            }
            min="0"
            placeholder="0"
          />
        </Card>

        <Card title={s.hull_breach_label}>
          <p className="info-text">{s.hull_breach_info}</p>
          <label className="field-label">{s.hull_breach_label}:</label>
          <select
            className="select-input"
            value={hullBreach}
            onChange={(e) => setHullBreach(e.target.value as HullBreachKey)}
          >
            {(["yes", "no"] as HullBreachKey[]).map((k) => (
              <option key={k} value={k}>
                {s.hull_breach_options[k]}
              </option>
            ))}
          </select>
        </Card>

        <CrewSelect value={crew} onChange={setCrew} t={t} />

        <ResearchSelect value={research} onChange={setResearch} t={t} />
      </div>

      <div className="calc-right">
        <ResultCard result={result?.maxArmadaPower ?? null} fmtPower={fmtPower} lang={lang} t={t} resultColor={result ? "var(--eclipse)" : "var(--bright)"}>
          <div className="divider" />
          <pre className="formula-text">
            {result && power
              ? [
                  `${fmtPower(power, lang)}  ×  ${DIFFICULTY_FACTORS[difficulty]}  ×  ${result.crew}  ×  ${result.research}`,
                  `= ${fmtPower(result.maxArmadaPower, lang)}`,
                  "",
                  `${s.label_shield_regen}  ${result.shieldRegenPct}%${result.actualShieldRegenHp > 0 ? `  (${s.label_regen_hp} ${result.actualShieldRegenHp.toLocaleString(lang)})` : ""}`,
                  `Hull Breach:  ${result.hullBreach ? "+50% Crit (nach Boni)" : "–"}`,
                  `Überlebensdauer:  ${result.survivability}`,
                ].join("\n")
              : t.result_start}
          </pre>
        </ResultCard>

        <ActionButtons onSave={handleSave} onClear={handleClear} justSaved={justSaved} disabled={!result} t={t} />

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
