import { useState } from "react";
import Card from "./Card";
import { fmtPower } from "../factions/shared/utils";
import type { SaveEntry } from "../factions/shared/types";
import type { Translation } from "../languages";

interface Props {
  t:          Translation;
  saves:      SaveEntry[];
  onDelete:   (index: number) => void;
  onClearAll: () => void;
}

export default function History({ t, saves, onDelete, onClearAll }: Props) {
  const [selected, setSelected]   = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);

  function handleRowClick(i: number) {
    setSelected(i === selected ? null : i);
  }

  function handleDelete() {
    if (selected === null) return;
    onDelete(selected);
    setSelected(null);
  }

  function handleClearAll() {
    if (!confirming) { setConfirming(true); return; }
    onClearAll();
    setSelected(null);
    setConfirming(false);
  }

  function exportCSV() {
    if (!saves.length) return;
    const rows = saves.map(
      (e) => `${e.date};${e.faction};${e.power};${e.label};${e.result}`
    );
    const csv = [t.saves_cols.join(";"), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = "stfc_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Card title={t.saves_title}>
        <p className="info-text">{t.saves_info}</p>
        <table className="saves-table">
          <thead>
            <tr>{t.saves_cols.map((col) => <th key={col}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {saves.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "20px", color: "var(--dim)" }}>
                  {t.msg_no_entries}
                </td>
              </tr>
            ) : (
              saves.map((e, i) => (
                <tr
                  key={i}
                  className={selected === i ? "row-selected" : ""}
                  onClick={() => handleRowClick(i)}
                >
                  <td>{e.date}</td>
                  <td style={{ color: `var(--${e.faction.toLowerCase()})` }}>{e.faction}</td>
                  <td>{fmtPower(e.power)}</td>
                  <td style={{ color: "var(--label)", fontSize: "10px" }}>{e.label}</td>
                  <td>{fmtPower(e.result)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <div className="btn-row">
        <button className="stfc-btn" onClick={exportCSV} disabled={!saves.length}>
          {t.btn_export}
        </button>
        <button className="stfc-btn" onClick={handleDelete} disabled={selected === null}>
          {t.btn_delete}
        </button>
        {confirming ? (
          <>
            <button className="stfc-btn saved" onClick={handleClearAll}>✔ Ja, alles löschen</button>
            <button className="stfc-btn" onClick={() => setConfirming(false)}>✖ Abbrechen</button>
          </>
        ) : (
          <button className="stfc-btn" onClick={handleClearAll} disabled={!saves.length}>
            {t.btn_clear_all}
          </button>
        )}
      </div>
    </div>
  );
}
