import { useState, useEffect, type ComponentType } from "react";
import History from "./components/History";
import FederationTab  from "./factions/federation/FederationTab";
import KlingonTab     from "./factions/klingon/KlingonTab";
import RomulanTab     from "./factions/romulan/RomulanTab";
import CardassianTab  from "./factions/cardassian/CardassianTab";
import BorgTab        from "./factions/borg/BorgTab";
import DominionTab    from "./factions/dominion/DominionTab";
import EclipseTab     from "./factions/eclipse/EclipseTab";
import { LANGS, type Translation } from "./languages";
import type { Theme, Lang, SaveEntry } from "./factions/shared/types";
import "./App.css";

const VALID_THEMES: Theme[] = ["dark", "light"];
const VALID_LANGS: Lang[]   = ["de", "en"];

function isTheme(v: string): v is Theme { return VALID_THEMES.includes(v as Theme); }
function isLang(v: string): v is Lang   { return VALID_LANGS.includes(v as Lang);   }

type OuterTab  = "calc" | "saves";
type FactionTab = "Federation" | "Klingon" | "Romulan" | "Cardassian" | "Borg" | "Dominion" | "Eclipse";

const FACTION_TABS: FactionTab[] = ["Federation", "Klingon", "Romulan", "Cardassian", "Borg", "Dominion", "Eclipse"];

type FactionTabProps = {
  lang: Lang;
  t: Translation;
  onSave: (entry: SaveEntry) => void;
};

const FACTION_COMPONENTS: Record<FactionTab, ComponentType<FactionTabProps>> = {
  Federation: FederationTab,
  Klingon: KlingonTab,
  Romulan: RomulanTab,
  Cardassian: CardassianTab,
  Borg: BorgTab,
  Dominion: DominionTab,
  Eclipse: EclipseTab,
};

function migrateEntry(raw: unknown): SaveEntry {
  const r = raw as Record<string, unknown>;
  if (typeof r.faction === "string") return r as unknown as SaveEntry;
  return {
    date:    String(r.date ?? ""),
    faction: "Legacy",
    power:   Number(r.power ?? 0),
    result:  Number(r.result ?? 0),
    label:   [r.armada, r.crew, r.research].filter(Boolean).join(" · ") || "–",
  };
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const raw = localStorage.getItem("theme");
    return raw && isTheme(raw) ? raw : "dark";
  });
  const [lang, setLang] = useState<Lang>(() => {
    const raw = localStorage.getItem("lang");
    return raw && isLang(raw) ? raw : "de";
  });
  const [outerTab, setOuterTab]     = useState<OuterTab>("calc");
  const [factionTab, setFactionTab] = useState<FactionTab>("Federation");
  const [saves, setSaves]           = useState<SaveEntry[]>(() => {
      try {
        const raw = JSON.parse(localStorage.getItem("saves") ?? "[]");
        return (raw as unknown[]).map(migrateEntry);
      } catch {
        return [];
      }
  });

  const t = LANGS[lang];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function changeTheme(v: Theme) { setTheme(v); localStorage.setItem("theme", v); }
  function changeLang(v: Lang)   { setLang(v);  localStorage.setItem("lang", v);  }

  function addSave(entry: SaveEntry) {
    const updated = [...saves, entry];
    setSaves(updated);
    try { localStorage.setItem("saves", JSON.stringify(updated)); } catch { /* quota */ }
  }

  function deleteSave(i: number) {
    const updated = saves.filter((_, idx) => idx !== i);
    setSaves(updated);
    try { localStorage.setItem("saves", JSON.stringify(updated)); } catch { /* quota */ }
  }

  function clearSaves() {
    setSaves([]);
    try { localStorage.setItem("saves", "[]"); } catch { /* quota */ }
  }

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="app-title">{t.title}</span>
        <div className="top-controls">
          <select value={theme} onChange={(e) => changeTheme(e.target.value as Theme)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <select value={lang} onChange={(e) => changeLang(e.target.value as Lang)}>
            <option value="de">DE</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      <div className="divider" />

      {/* Outer Tabs */}
      <div className="tab-bar">
        <button className={`tab-btn${outerTab === "calc"  ? " active" : ""}`} onClick={() => setOuterTab("calc")}>
          {t.tab_calc}
        </button>
        <button className={`tab-btn${outerTab === "saves" ? " active" : ""}`} onClick={() => setOuterTab("saves")}>
          {t.tab_saves}
        </button>
      </div>

      {/* Faction Sub-Tabs (only in calc view) */}
      {outerTab === "calc" && (
        <div className="faction-tab-bar">
          {FACTION_TABS.map((f) => (
            <button
              key={f}
              className={`faction-tab-btn faction-${f.toLowerCase()}${factionTab === f ? " active" : ""}`}
              onClick={() => setFactionTab(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="tab-content">
        {outerTab === "saves" && (
          <History lang={lang} t={t} saves={saves} onDelete={deleteSave} onClearAll={clearSaves} />
        )}
        {outerTab === "calc" && (() => {
          const Component = FACTION_COMPONENTS[factionTab];
          return <Component lang={lang} t={t} onSave={addSave} />;
        })()}
      </div>
    </div>
  );
}
