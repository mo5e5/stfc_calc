import { useState, useEffect } from "react";
import Calculator from "./components/Calculator";
import History from "./components/History";
import { LANGS } from "./languages";
import type { Theme, Lang, SaveEntry } from "./data";
import "./App.css";

export default function App() {
  // useState ist wie @State in SwiftUI / remember { mutableStateOf() } in Compose
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "dark"
  );
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) ?? "de"
  );
  const [tab, setTab] = useState(0);
  const [saves, setSaves] = useState<SaveEntry[]>(
    () => JSON.parse(localStorage.getItem("saves") ?? "[]")
  );

  const t = LANGS[lang];

  // useEffect läuft wenn sich `theme` ändert – setzt data-theme auf <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function changeLang(newLang: Lang) {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }

  function addSave(entry: SaveEntry) {
    const updated = [...saves, entry];
    setSaves(updated);
    localStorage.setItem("saves", JSON.stringify(updated));
  }

  function deleteSave(index: number) {
    const updated = saves.filter((_, i) => i !== index);
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

      {/* Tab Bar */}
      <div className="tab-bar">
        <button className={`tab-btn${tab === 0 ? " active" : ""}`} onClick={() => setTab(0)}>
          {t.tab_calc}
        </button>
        <button className={`tab-btn${tab === 1 ? " active" : ""}`} onClick={() => setTab(1)}>
          {t.tab_saves}
        </button>
      </div>

      {/* Tab Inhalt */}
      <div className="tab-content">
        {tab === 0 && <Calculator t={t} onSave={addSave} />}
        {tab === 1 && <History t={t} saves={saves} onDelete={deleteSave} onClearAll={clearSaves} />}
      </div>
    </div>
  );
}
