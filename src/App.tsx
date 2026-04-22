import { useState, useEffect } from "react";
import History from "./components/History";
import FederationTab  from "./factions/federation/FederationTab";
import KlingonTab     from "./factions/klingon/KlingonTab";
import RomulanTab     from "./factions/romulan/RomulanTab";
import CardassianTab  from "./factions/cardassian/CardassianTab";
import BorgTab        from "./factions/borg/BorgTab";
import DominionTab    from "./factions/dominion/DominionTab";
import EclipseTab     from "./factions/eclipse/EclipseTab";
import { LANGS } from "./languages";
import type { Theme, Lang, SaveEntry } from "./factions/shared/types";
import "./App.css";

type OuterTab  = "calc" | "saves";
type FactionTab = "Federation" | "Klingon" | "Romulan" | "Cardassian" | "Borg" | "Dominion" | "Eclipse";

const FACTION_TABS: FactionTab[] = ["Federation", "Klingon", "Romulan", "Cardassian", "Borg", "Dominion", "Eclipse"];

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
  const [theme, setTheme]           = useState<Theme>(() => (localStorage.getItem("theme") as Theme) ?? "dark");
  const [lang, setLang]             = useState<Lang>(() => (localStorage.getItem("lang") as Lang) ?? "de");
  const [outerTab, setOuterTab]     = useState<OuterTab>("calc");
  const [factionTab, setFactionTab] = useState<FactionTab>("Federation");
  const [saves, setSaves]           = useState<SaveEntry[]>(() => {
    const raw = JSON.parse(localStorage.getItem("saves") ?? "[]");
    return (raw as unknown[]).map(migrateEntry);
  });

  const t = LANGS[lang];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme(v: Theme) { setTheme(v); localStorage.setItem("theme", v); }
  function changeLang(v: Lang)   { setLang(v);  localStorage.setItem("lang", v);  }

  function addSave(entry: SaveEntry) {
    const updated = [...saves, entry];
    setSaves(updated);
    localStorage.setItem("saves", JSON.stringify(updated));
  }

  function deleteSave(i: number) {
    const updated = saves.filter((_, idx) => idx !== i);
    setSaves(updated);
    localStorage.setItem("saves", JSON.stringify(updated));
  }

  function clearSaves() {
    setSaves([]);
    localStorage.setItem("saves", "[]");
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
          <History t={t} saves={saves} onDelete={deleteSave} onClearAll={clearSaves} />
        )}
        {outerTab === "calc" && factionTab === "Federation" && (
          <FederationTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Klingon" && (
          <KlingonTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Romulan" && (
          <RomulanTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Cardassian" && (
          <CardassianTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Borg" && (
          <BorgTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Dominion" && (
          <DominionTab lang={lang} t={t} onSave={addSave} />
        )}
        {outerTab === "calc" && factionTab === "Eclipse" && (
          <EclipseTab lang={lang} t={t} onSave={addSave} />
        )}
      </div>
    </div>
  );
}
