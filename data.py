"""
data.py  –  Spieldaten & Berechnungslogik
STFC Calc
"""

ARMADA_TYPES = {
    "Uncommon": {
        "factor": 3.0,
        "color": "uncommon",
        "symbol": "◆",
        "info": (
            "UNCOMMON  (grün im Spiel)  ×3.0\n"
            "─────────────────────────────\n"
            "Einfachste Stufe – Ziel 1:3\n"
            "Team kann Armada bis 3× der\n"
            "eigenen Stärke besiegen."
        ),
    },
    "Rare": {
        "factor": 1.8,
        "color": "rare",
        "symbol": "◈",
        "info": (
            "RARE  (blau im Spiel)  ×1.8\n"
            "─────────────────────────────\n"
            "Mittlere Stufe – Ziel ~1:2\n"
            "Armada darf ca. 1,8× stärker\n"
            "als die eigene Flotte sein."
        ),
    },
    "Epic": {
        "factor": 1.1,
        "color": "epic",
        "symbol": "★",
        "info": (
            "EPIC  (lila im Spiel)  ×1.1\n"
            "─────────────────────────────\n"
            "Schwerste Stufe – nahezu 1:1\n"
            "Optimale Crew ist PFLICHT!\n"
            "Sehr hoher eingehender Schaden."
        ),
    },
}

CREW_QUALITY = {
    "Optimal": {
        "factor": 1.2,
        "label": "Optimal  (z. B. Sisko, Kirk/Spock)",
        "info": (
            "OPTIMALE CREW  ×1.2  (+20%)\n"
            "─────────────────────────────\n"
            "Spezialisierte Armada-Crews:\n"
            "• Sisko / Odo / Dax  → Dominion\n"
            "• Kirk / Spock / Bones → allgemein\n"
            "• Khan / Joachim → Augur/Saladin"
        ),
    },
    "Standard": {
        "factor": 1.0,
        "label": "Standard  (normale Kampf-Crew)",
        "info": (
            "STANDARD CREW  ×1.0\n"
            "─────────────────────────────\n"
            "Kampf-Crews ohne speziellen\n"
            "Armada-Bonus. Solide Basis."
        ),
    },
    "Schwach": {
        "factor": 0.8,
        "label": "Schwach  (falsche / keine Crew)",
        "info": (
            "SCHWACHE CREW  ×0.8  (-20%)\n"
            "─────────────────────────────\n"
            "Keine Synergie, falsche Offiziere\n"
            "oder leere Crew-Slots.\n"
            "Unbedingt vermeiden!"
        ),
    },
}

RESEARCH_LEVEL = {
    "Hoch": {
        "factor": 1.1,
        "label": "Hoch  (Station & Kampf weit ausgebaut)",
        "info": (
            "HOHE FORSCHUNG  ×1.1  (+10%)\n"
            "─────────────────────────────\n"
            "Armada-Bäume in Station & Kampf\n"
            "weit erforscht.\n"
            "+10% auf Schaden & Überleben."
        ),
    },
    "Basis": {
        "factor": 1.0,
        "label": "Basis  (durchschnittlicher Stand)",
        "info": (
            "BASIS-FORSCHUNG  ×1.0\n"
            "─────────────────────────────\n"
            "Durchschnittlicher Stand\n"
            "für dein Level. Kein Bonus."
        ),
    },
}

SAVES_FILE = "stfc_saves.json"


def calculate(power: int, armada_key: str, crew_key: str, res_key: str):
    b = ARMADA_TYPES[armada_key]["factor"]
    c = CREW_QUALITY[crew_key]["factor"]
    r = RESEARCH_LEVEL[res_key]["factor"]
    return round(power * b * c * r), b, c, r


def fmt_power(value) -> str:
    try:
        return f"{int(value):,}".replace(",", ".")
    except Exception:
        return "–"


def parse_power(text: str) -> int:
    return int(text.replace(".", "").replace(",", "").replace(" ", ""))
