"""
main.py  –  STFC Calc
Starten:  python3 main.py

Projektstruktur:
    main.py   ← App & UI
    theme.py  ← Farben, Fonts, UI-Bausteine
    data.py   ← Spieldaten & Berechnungslogik
    languages.py ← Sprachdefinitionen
"""

import os
import locale

os.environ["TK_SILENCE_DEPRECATION"] = "1"

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json
from datetime import datetime

from theme import C, F, apply_styles, Tooltip, set_mode
from theme import make_card, make_label, make_entry, make_button
from theme import make_divider, make_info, make_radio, make_dropdown
from data import (
    ARMADA_TYPES,
    CREW_QUALITY,
    RESEARCH_LEVEL,
    SAVES_FILE,
    calculate,
    fmt_power,
    parse_power,
)
from languages import LANGS


class STFCCalc:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("STFC Calc")
        self.root.geometry("1000x700")
        self.root.minsize(920, 650)
        self.root.configure(bg=C["bg"])

        # Sprache laden oder Standard setzen
        self.lang = self._load_language()
        # Modus laden oder Standard setzen
        self.mode = self._load_mode()

        self.saves = self._load(SAVES_FILE, [])
        set_mode(self.mode)
        apply_styles()
        self._build()

    def _load_language(self):
        """Lade gespeicherte Sprache oder erkenne Systemsprache"""
        try:
            with open(".language", "r") as f:
                lang = f.read().strip()
                if lang in LANGS:
                    return lang
        except FileNotFoundError:
            pass
        # Standard: Deutsch
        return "de"

    def _save_language(self):
        """Speichere die aktuelle Sprache"""
        with open(".language", "w") as f:
            f.write(self.lang)

    def _load_mode(self):
        """Lade gespeicherten Modus oder Standard"""
        try:
            with open(".mode", "r") as f:
                mode = f.read().strip()
                if mode in ["dark", "light"]:
                    return mode
        except FileNotFoundError:
            pass
        # Standard: Dark
        return "dark"

    def _save_mode(self):
        """Speichere den aktuellen Modus"""
        with open(".mode", "w") as f:
            f.write(self.mode)

    def _t(self, key):
        """Übersetze einen Text"""
        return LANGS[self.lang].get(key, key)

    # ── Persistenz ──────────────────────────────────────────────
    def _load(self, path, default):
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return default

    def _persist(self):
        with open(SAVES_FILE, "w", encoding="utf-8") as f:
            json.dump(self.saves, f, ensure_ascii=False, indent=2)

    # ── Layout ───────────────────────────────────────────────────
    def _build(self):
        self.root.configure(bg=C["bg"])
        # Titelzeile mit Sprachmenü
        top_bar = tk.Frame(self.root, bg=C["bg"])
        top_bar.pack(fill="x", padx=14, pady=(10, 4))

        tk.Label(
            top_bar, text=self._t("title"), font=F["title"], bg=C["bg"], fg=C["bright"]
        ).pack(side="left")

        # Sprachmenü rechts
        lang_var = tk.StringVar(value=self.lang.upper())
        lang_menu = ttk.Combobox(
            top_bar,
            textvariable=lang_var,
            values=["DE", "EN"],
            state="readonly",
            width=3,
        )
        lang_menu.pack(side="right", padx=(10, 0))
        lang_menu.bind(
            "<<ComboboxSelected>>", lambda e: self._change_language(lang_var.get())
        )

        # Modus-Menü
        mode_var = tk.StringVar(value=self.mode.capitalize())
        mode_menu = ttk.Combobox(
            top_bar,
            textvariable=mode_var,
            values=["Dark", "Light"],
            state="readonly",
            width=5,
        )
        mode_menu.pack(side="right", padx=(10, 0))
        mode_menu.bind(
            "<<ComboboxSelected>>", lambda e: self._change_mode(mode_var.get())
        )

        tk.Frame(self.root, bg=C["border"], height=1).pack(fill="x", padx=14)

        # Tabs
        nb = ttk.Notebook(self.root)
        nb.pack(fill="both", expand=True, padx=12, pady=8)

        t1 = tk.Frame(nb, bg=C["bg"])
        t2 = tk.Frame(nb, bg=C["bg"])
        nb.add(t1, text=self._t("tab_calc"))
        nb.add(t2, text=self._t("tab_saves"))

        self._build_calc(t1)
        self._build_saves(t2)

        # Statusleiste
        self.status = tk.StringVar(value=self._t("status_ready"))
        tk.Label(
            self.root,
            textvariable=self.status,
            font=F["small"],
            bg=C["bg"],
            fg=C["dim"],
            anchor="w",
            padx=14,
        ).pack(fill="x", pady=(0, 6))

    def _change_language(self, new_lang):
        """Wechsle die Sprache und aktualisiere die UI"""
        self.lang = new_lang.lower()
        self._save_language()
        # Fenster neuladen
        for widget in self.root.winfo_children():
            widget.destroy()
        set_mode(self.mode)
        apply_styles()
        self._build()

    def _change_mode(self, new_mode):
        """Wechsle den Modus und aktualisiere die UI"""
        self.mode = new_mode.lower()
        self._save_mode()
        # Fenster neuladen
        for widget in self.root.winfo_children():
            widget.destroy()
        set_mode(self.mode)
        apply_styles()
        self._build()

    # ══════════════════════════════════════════════════════════
    #  TAB 1 – KALKULATION
    # ══════════════════════════════════════════════════════════
    def _build_calc(self, p):
        outer = tk.Frame(p, bg=C["bg"])
        outer.pack(fill="both", expand=True, padx=12, pady=8)

        # ── Linke Spalte: Eingaben ──────────────────────────────
        left = tk.Frame(outer, bg=C["bg"], width=350)
        left.pack(side="left", fill="y", expand=False, padx=(0, 8))
        left.pack_propagate(False)

        # Schiffsstärke
        inp_box = make_card(left, self._t("power_title"))
        inp_box.pack(fill="x", pady=(0, 4))
        make_info(inp_box, self._t("power_info"))
        make_label(inp_box, self._t("power_label"))
        self.power_entry = make_entry(inp_box, "", gold=True)
        self.power_entry.bind("<KeyRelease>", lambda e: self._live_calc())

        # Armada-Typ
        arm_box = make_card(left, self._t("armada_title"))
        arm_box.pack(fill="x", pady=(0, 4))
        make_info(arm_box, self._t("armada_info"))
        armada_options = list(ARMADA_TYPES.keys())
        self.armada_var = tk.StringVar(value="Uncommon")
        self.armada_var.trace_add("write", lambda *_: self._live_calc())
        make_dropdown(
            arm_box,
            self._t("armada_label"),
            self.armada_var,
            armada_options,
            tooltip_text=self._t("armada_tooltip"),
        )

        # Crew
        crew_box = make_card(left, self._t("crew_title"))
        crew_box.pack(fill="x", pady=(0, 4))
        make_info(crew_box, self._t("crew_info"))
        crew_options = list(CREW_QUALITY.keys())
        self.crew_var = tk.StringVar(value="Optimal")
        self.crew_var.trace_add("write", lambda *_: self._live_calc())
        make_dropdown(
            crew_box,
            self._t("crew_label"),
            self.crew_var,
            crew_options,
            tooltip_text=self._t("crew_tooltip"),
        )

        # Forschung
        res_box = make_card(left, self._t("res_title"))
        res_box.pack(fill="x", pady=(0, 4))
        make_info(res_box, self._t("res_info"))
        res_options = list(RESEARCH_LEVEL.keys())
        self.res_var = tk.StringVar(value="Hoch")
        self.res_var.trace_add("write", lambda *_: self._live_calc())
        make_dropdown(
            res_box,
            self._t("res_label"),
            self.res_var,
            res_options,
            tooltip_text=self._t("res_tooltip"),
        )

        # ── Rechte Spalte: Ergebnis ────────────────────────────
        right = tk.Frame(outer, bg=C["bg"])
        right.pack(side="right", fill="both", expand=True)

        # Ergebnis
        res_card = make_card(right, self._t("result_title"))
        res_card.pack(fill="x", pady=(0, 4))

        tk.Label(
            res_card,
            text=self._t("result_label"),
            font=F["small"],
            bg=C["card"],
            fg=C["label"],
        ).pack(pady=(10, 2))

        self.result_var = tk.StringVar(value="–")
        self.result_lbl = tk.Label(
            res_card,
            textvariable=self.result_var,
            font=F["result"],
            bg=C["card"],
            fg=C["bright"],
        )
        self.result_lbl.pack(pady=(0, 6))

        make_divider(res_card)

        self.formula_var = tk.StringVar(value=self._t("result_start"))
        tk.Label(
            res_card,
            textvariable=self.formula_var,
            font=F["small"],
            bg=C["card"],
            fg=C["bright"],
            justify="left",
        ).pack(padx=10, pady=(4, 10))

        # Speichern / Leeren
        btn_row = tk.Frame(right, bg=C["bg"])
        btn_row.pack(fill="x", pady=(0, 4))
        make_button(btn_row, self._t("btn_calc"), self._save_result).pack(
            side="left", padx=(0, 6)
        )
        make_button(btn_row, self._t("btn_clear"), self._clear).pack(
            side="left"
        )

        # Tipps
        tip_card = make_card(right, self._t("tips_title"))
        tip_card.pack(fill="x", pady=(0, 4))
        self.tip_var = tk.StringVar(value=self._t("tips_start"))
        tk.Label(
            tip_card,
            textvariable=self.tip_var,
            font=F["small"],
            bg=C["card"],
            fg=C["bright"],
            justify="left",
            wraplength=250,
        ).pack(padx=8, pady=8)

        # Hinweise
        warn_card = make_card(right, self._t("warn_title"))
        warn_card.pack(fill="x")
        tk.Label(
            warn_card,
            text=self._t("warn_text"),
            font=F["small"],
            bg=C["card"],
            fg=C["bright"],
            justify="left",
        ).pack(padx=8, pady=8)

    # ── Live-Berechnung ────────────────────────────────────────
    def _live_calc(self):
        raw = self.power_entry.get().strip()
        if not raw:
            self.result_var.set("–")
            self.result_lbl.configure(fg=C["bright"])
            self.formula_var.set(self._t("result_start"))
            self.tip_var.set(self._t("tips_start"))
            self.status.set(self._t("status_ready"))
            return

        try:
            power = parse_power(raw)
            if power <= 0:
                raise ValueError
        except Exception:
            self.result_var.set("?")
            self.result_lbl.configure(fg=C["bright"])
            self.formula_var.set(self._t("formula_invalid"))
            return

        armada = self.armada_var.get()
        crew = self.crew_var.get()
        res = self.res_var.get()
        result, b, c, r = calculate(power, armada, crew, res)

        # Ergebnis anzeigen
        color = C[ARMADA_TYPES[armada]["color"]]
        self.result_var.set(fmt_power(result))
        self.result_lbl.configure(fg=color)
        self.formula_var.set(
            f"{fmt_power(power)}  ×  {b}  ×  {c}  ×  {r}\n"
            f"= {fmt_power(result)}\n\n"
            f"Armada:  × {b}\n"
            f"Crew:    × {c}\n"
            f"Research: × {r}"
        )

        # Tipps
        tips = []
        if c < 1.2:
            tips.append(self._t("tips_crew"))
        if r < 1.1:
            tips.append(self._t("tips_research"))
        if armada == "Epic" and c < 1.2:
            tips.append(self._t("tips_epic"))
        if not tips:
            tips.append(self._t("tips_optimal"))
        self.tip_var.set("\n\n".join(tips))
        self.status.set(self._t("status_result").format(result=fmt_power(result)))

        # Ergebnis für Speichern merken
        self._last = {
            "power": power,
            "armada": armada,
            "crew": crew,
            "res": res,
            "result": result,
        }

    # ── Speichern ───────────────────────────────────────────────
    def _save_result(self):
        if not hasattr(self, "_last") or self.result_var.get() in ("–", "?"):
            messagebox.showwarning(self._t("msg_hint"), self._t("msg_enter_power"))
            return
        d = self._last
        self.saves.append(
            {
                "datum": datetime.now().strftime("%d.%m.%Y %H:%M"),
                "staerke": d["power"],
                "armada": d["armada"],
                "crew": d["crew"],
                "forschung": d["res"],
                "ergebnis": d["result"],
            }
        )
        self._persist()
        self._refresh_saves()
        self.status.set(self._t("status_saved").format(result=fmt_power(d["result"])))
        messagebox.showinfo(
            self._t("msg_saved"),
            self._t("msg_saved_text").format(result=fmt_power(d["result"])),
        )

    # ── Leeren ──────────────────────────────────────────────────
    def _clear(self):
        self.power_entry.delete(0, "end")
        self.armada_var.set("Uncommon")
        self.crew_var.set("Optimal")
        self.res_var.set("Hoch")
        self.result_var.set("–")
        self.result_lbl.configure(fg=C["dim"])
        self.formula_var.set(self._t("result_start"))
        self.tip_var.set(self._t("tips_start"))
        self.status.set(self._t("msg_cleared"))
        if hasattr(self, "_last"):
            del self._last

    # ══════════════════════════════════════════════════════════
    #  TAB 2 – VERLAUF
    # ══════════════════════════════════════════════════════════
    def _build_saves(self, p):
        outer = tk.Frame(p, bg=C["bg"])
        outer.pack(fill="both", expand=True, padx=12, pady=10)

        box = make_card(outer, self._t("saves_title"))
        box.pack(fill="both", expand=True, pady=(0, 8))
        make_info(box, self._t("saves_info"))

        tree_frame = tk.Frame(box, bg=C["card"])
        tree_frame.pack(fill="both", expand=True, padx=10, pady=(0, 8))

        cols = self._t("saves_cols")
        widths = [120, 100, 90, 160, 120, 110]
        self.saves_tree = ttk.Treeview(
            tree_frame, columns=cols, show="headings", height=14
        )
        for col, w in zip(cols, widths):
            self.saves_tree.heading(col, text=col)
            self.saves_tree.column(col, width=w, anchor="center")
        self.saves_tree.pack(side="left", fill="both", expand=True)

        sb = ttk.Scrollbar(tree_frame, orient="vertical", command=self.saves_tree.yview)
        sb.pack(side="right", fill="y")
        self.saves_tree.configure(yscrollcommand=sb.set)

        btn_row = tk.Frame(outer, bg=C["bg"])
        btn_row.pack(fill="x")
        make_button(btn_row, self._t("btn_export"), self._export_csv).pack(
            side="left", padx=(0, 6)
        )
        make_button(btn_row, self._t("btn_delete"), self._delete_save).pack(
            side="left", padx=(0, 6)
        )
        make_button(btn_row, self._t("btn_clear_all"), self._clear_saves).pack(
            side="left"
        )

        self._refresh_saves()

    def _refresh_saves(self):
        for i in self.saves_tree.get_children():
            self.saves_tree.delete(i)
        for e in self.saves:
            self.saves_tree.insert(
                "",
                "end",
                values=(
                    e.get("datum", "–"),
                    fmt_power(e.get("staerke", 0)),
                    e.get("armada", "–"),
                    e.get("crew", "–"),
                    e.get("forschung", "–"),
                    fmt_power(e.get("ergebnis", 0)),
                ),
            )

    def _export_csv(self):
        if not self.saves:
            messagebox.showwarning(self._t("msg_empty"), self._t("msg_no_entries"))
            return
        path = filedialog.asksaveasfilename(
            defaultextension=".csv",
            filetypes=[("CSV", "*.csv")],
            initialfile="stfc_ergebnisse.csv",
        )
        if not path:
            return
        with open(path, "w", encoding="utf-8") as f:
            header = ";".join(self._t("saves_cols"))
            f.write(f"{header}\n")
            for e in self.saves:
                f.write(
                    f"{e['datum']};{e.get('staerke',0)};{e.get('armada','–')};"
                    f"{e.get('crew','–')};{e.get('forschung','–')};{e.get('ergebnis',0)}\n"
                )
        messagebox.showinfo(
            self._t("msg_exported"), self._t("msg_exported_text").format(path=path)
        )

    def _delete_save(self):
        sel = self.saves_tree.selection()
        if not sel:
            return
        idx = self.saves_tree.index(sel[0])
        self.saves.pop(idx)
        self._persist()
        self._refresh_saves()

    def _clear_saves(self):
        if messagebox.askyesno(self._t("msg_clear_all"), self._t("msg_clear_all_text")):
            self.saves.clear()
            self._persist()
            self._refresh_saves()


# ── Start ──────────────────────────────────────────────────────
if __name__ == "__main__":
    root = tk.Tk()
    STFCCalc(root)
    root.mainloop()
