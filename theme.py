"""
theme.py  –  Farben, Fonts & UI-Bausteine
STFC Calc
"""

import tkinter as tk
from tkinter import ttk

# ── Farben ─────────────────────────────────────────────────────

DARK_COLORS = {
    # Hintergründe
    "bg": "#06090f",  # Fenster – tief dunkel
    "card": "#0d1825",  # Boxen – dunkles Navy
    "input": "#d8e8f8",  # Eingabefeld – HELL (macOS-kompatibel)
    "border": "#1e3a5c",  # Rahmen
    # Text auf dunklen Hintergründen (bg, card)
    "bright": "#ddeeff",  # Normaler heller Text
    "label": "#7fb3d3",  # Labels/Beschriftungen
    "dim": "#3d5a72",  # Gedimmter Hilfstext
    # Text auf hellem Input-Hintergrund
    "input_fg": "#0d1a2e",  # Dunkler Text – gut lesbar auf #d8e8f8
    "input_gold": "#8a5000",  # Gold auf hellem Hintergrund
    # Card-Header
    "header_bg": "#ddeeff",  # Heller Hintergrund für Titelzeile
    "header_fg": "#06090f",  # Dunkler Text auf hellem Header
    # Spielfarben
    "uncommon": "#2ecc82",
    "rare": "#4da6ff",
    "epic": "#c455ff",
    "solo": "#ff8c1a",
}

LIGHT_COLORS = {
    # Hintergründe
    "bg": "#f0f2f5",  # Heller Hintergrund
    "card": "#ffffff",  # Weiße Boxen
    "input": "#ffffff",  # Weiße Eingabefelder
    "border": "#cccccc",  # Grauer Rahmen
    # Text auf hellen Hintergründen
    "bright": "#111111",  # Dunkler Text
    "label": "#444444",  # Dunkle Labels
    "dim": "#888888",  # Gedimmter Text
    # Text auf weißen Eingabefeldern
    "input_fg": "#111111",  # Dunkler Text
    "input_gold": "#8a5000",  # Gold
    # Card-Header
    "header_bg": "#1a2d45",  # Dunkler Navy-Header
    "header_fg": "#ffffff",  # Weißer Text auf dunklem Header
    # Spielfarben (etwas gesättigter für hellen Hintergrund)
    "uncommon": "#1a9e5c",
    "rare": "#2277cc",
    "epic": "#9933cc",
    "solo": "#cc6600",
}


def get_colors(mode):
    return DARK_COLORS if mode == "dark" else LIGHT_COLORS


C = dict(DARK_COLORS)  # Mutierbares Dict – importierte Referenz bleibt bei set_mode gültig


def set_mode(mode):
    colors = get_colors(mode)
    C.clear()
    C.update(colors)


# ── Fonts ──────────────────────────────────────────────────────
F = {
    "title": ("Courier New", 13, "bold"),
    "head": ("Courier New", 10, "bold"),
    "body": ("Courier New", 10),
    "small": ("Courier New", 9),
    "input": ("Courier New", 11),
    "result": ("Courier New", 28, "bold"),
    "sub": ("Courier New", 13, "bold"),
}


# ── ttk-Styles ─────────────────────────────────────────────────
def apply_styles():
    s = ttk.Style()
    s.theme_use("clam")

    # Notebook / Tabs
    s.configure("TNotebook", background=C["bg"], borderwidth=0)
    s.configure(
        "TNotebook.Tab",
        background=C["card"],
        foreground=C["label"],
        font=F["body"],
        padding=[12, 5],
    )
    s.map(
        "TNotebook.Tab",
        background=[("selected", C["card"])],
        foreground=[("selected", C["bright"])],
    )

    # Entry (ttk) – heller Hintergrund, dunkler Text → macOS-sicher
    s.configure(
        "STFC.TEntry",
        background=C["input"],
        fieldbackground=C["input"],
        foreground=C["input_fg"],
        insertbackground="black",
        borderwidth=0,
        relief="flat",
        padding=6,
        font=F["input"],
    )
    s.map(
        "STFC.TEntry",
        foreground=[("disabled", C["dim"]), ("!disabled", C["input_fg"])],
        fieldbackground=[("disabled", C["input"]), ("!disabled", C["input"])],
    )

    # Entry gold variant
    s.configure(
        "STFCGold.TEntry",
        background=C["input"],
        fieldbackground=C["input"],
        foreground=C["input_gold"],
        insertbackground="black",
        borderwidth=0,
        relief="flat",
        padding=6,
        font=F["input"],
    )
    s.map(
        "STFCGold.TEntry",
        foreground=[("disabled", C["dim"]), ("!disabled", C["input_gold"])],
        fieldbackground=[("disabled", C["input"]), ("!disabled", C["input"])],
    )

    # Treeview
    s.configure(
        "Treeview",
        background=C["card"],
        foreground=C["bright"],
        fieldbackground=C["card"],
        font=F["small"],
        rowheight=22,
    )
    s.configure(
        "Treeview.Heading", background=C["bg"], foreground=C["bright"], font=F["body"]
    )
    s.map(
        "Treeview",
        background=[("selected", C["bright"])],
        foreground=[("selected", C["bg"])],
    )

    # Combobox
    s.configure(
        "STFC.TCombobox",
        fieldbackground=C["input"],
        background=C["input"],
        foreground=C["input_fg"],
        selectbackground=C["bright"],
        selectforeground=C["bg"],
        arrowcolor=C["bright"],
        borderwidth=1,
        relief="flat",
        padding=6,
        font=F["input"],
    )
    s.map(
        "STFC.TCombobox",
        fieldbackground=[("readonly", C["input"])],
        foreground=[("readonly", C["input_fg"])],
    )

    s.configure(
        "TCombobox",
        fieldbackground=C["input"],
        background=C["input"],
        foreground=C["input_fg"],
        selectbackground=C["bright"],
        selectforeground=C["bg"],
        arrowcolor=C["bright"],
    )
    s.map(
        "TCombobox",
        fieldbackground=[("readonly", C["input"])],
        foreground=[("readonly", C["input_fg"])],
    )

    # Scrollbar
    s.configure(
        "Vertical.TScrollbar",
        background=C["card"],
        troughcolor=C["bg"],
        arrowcolor=C["bright"],
        borderwidth=0,
    )

    # Buttons
    s.configure(
        "STFC.TButton",
        background=C["card"],
        foreground=C["bright"],
        borderwidth=1,
        relief="flat",
        padding=(12, 6),
        font=F["body"],
    )
    s.map(
        "STFC.TButton",
        background=[
            ("active", C["border"]),
            ("pressed", C["border"]),
            ("disabled", C["card"]),
        ],
        foreground=[("disabled", C["dim"]), ("!disabled", C["bright"])],
    )


# ── Tooltip ────────────────────────────────────────────────────
class Tooltip:
    def __init__(self, widget, text):
        self.widget = widget
        self.text = text
        self.tip = None
        widget.bind("<Enter>", self.show)
        widget.bind("<Leave>", self.hide)

    def show(self, event=None):
        x = self.widget.winfo_rootx() + 24
        y = self.widget.winfo_rooty() + self.widget.winfo_height() + 6
        self.tip = tk.Toplevel(self.widget)
        self.tip.wm_overrideredirect(True)
        self.tip.wm_geometry(f"+{x}+{y}")
        tk.Label(
            self.tip,
            text=self.text,
            font=F["small"],
            bg=C["card"],
            fg=C["bright"],
            relief="flat",
            bd=0,
            padx=12,
            pady=8,
            justify="left",
            highlightbackground=C["border"],
            highlightthickness=1,
        ).pack()

    def hide(self, event=None):
        if self.tip:
            self.tip.destroy()
            self.tip = None


# ── UI-Bausteine ───────────────────────────────────────────────


def make_card(parent, title):
    """Box mit blauer Titelzeile. Gibt inneren Frame zurück."""
    wrapper = tk.Frame(parent, bg=C["bg"])
    wrapper.pack(fill="x")
    tk.Label(
        wrapper,
        text=f"  {title}",
        font=F["head"],
        bg=C["header_bg"],
        fg=C["header_fg"],
        anchor="w",
        padx=6,
        pady=4,
    ).pack(fill="x")
    inner = tk.Frame(
        wrapper, bg=C["card"], highlightbackground=C["border"], highlightthickness=1
    )
    inner.pack(fill="both", expand=True)
    return inner


def make_label(parent, text):
    """Label über einem Eingabefeld – heller Text auf dunkler Card."""
    tk.Label(
        parent, text=text, font=F["small"], bg=C["card"], fg=C["bright"], anchor="w"
    ).pack(fill="x", padx=10, pady=(6, 0))


def make_entry(parent, placeholder="", gold=False):
    """
    ttk.Entry mit hellem Hintergrund + dunklem Text.
    Funktioniert zuverlässig auf macOS (tk.Entry ignoriert dort oft bg/fg).
    gold=True  → dunkelgoldene Textfarbe für Stärke-Felder.
    """
    style = "STFCGold.TEntry" if gold else "STFC.TEntry"
    # Dünner farbiger Rahmen via Frame-Wrapper
    frame = tk.Frame(parent, bg=C["border"], padx=1, pady=1)
    frame.pack(fill="x", padx=10, pady=(3, 6))
    e = ttk.Entry(frame, style=style, width=32)
    e.pack(fill="x")
    if placeholder:
        e.insert(0, placeholder)
    return e


def make_button(parent, text, command):
    return ttk.Button(parent, text=text, command=command, style="STFC.TButton", cursor="hand2")


def make_divider(parent):
    tk.Frame(parent, bg=C["border"], height=1).pack(fill="x", padx=10, pady=4)


def make_info(parent, text):
    """Kleiner Erklärungstext – sichtbar auf dunklem Card-Hintergrund."""
    tk.Label(
        parent,
        text=text,
        font=F["small"],
        bg=C["card"],
        fg=C["label"],
        justify="left",
        anchor="w",
        wraplength=360,
    ).pack(anchor="w", padx=10, pady=(2, 6))


def make_radio(parent, text, variable, value, fg, tooltip_text=None):
    row = tk.Frame(parent, bg=C["card"])
    row.pack(fill="x", padx=6, pady=1)
    rb = tk.Radiobutton(
        row,
        text=f"  {text}",
        variable=variable,
        value=value,
        font=F["body"],
        bg=C["card"],
        fg=fg,
        selectcolor=C["bg"],
        activebackground=C["card"],
        activeforeground=fg,
        relief="flat",
    )
    rb.pack(side="left")
    if tooltip_text:
        Tooltip(rb, tooltip_text)
        tk.Label(row, text=" ⓘ", font=F["small"], bg=C["card"], fg=C["dim"]).pack(
            side="left"
        )
    return rb


def make_dropdown(parent, label_text, variable, options, tooltip_text=None):
    """Dropdown-Menü (Combobox) mit Label."""
    make_label(parent, label_text)
    frame = tk.Frame(parent, bg=C["border"], padx=1, pady=1)
    frame.pack(fill="x", padx=10, pady=(3, 6))
    combo = ttk.Combobox(
        frame,
        textvariable=variable,
        values=options,
        state="readonly",
        font=F["input"],
        style="STFC.TCombobox",
        width=28,
    )
    combo.pack(fill="x")
    if tooltip_text:
        Tooltip(combo, tooltip_text)
    return combo
