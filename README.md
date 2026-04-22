# STFC Calc

Desktop calculator for **Star Trek Fleet Command** – estimates which armada strength your fleet can defeat.

Built with **Tauri + React + TypeScript** for macOS and Windows.

STFC has no official in-game calculator. Battle outcome depends heavily on crew, research, and armada type. This calculator is based on established community guidelines.

## Features

- ⚡ Live calculation as you type
- 🎨 Dark / Light mode toggle
- 🌍 Deutsch & English
- 💾 Save calculation history
- 📊 Export results as CSV
- 🖥️ Native Mac + Windows apps

## Formula

```
Max. Armada = Your Power × Armada Factor × Crew Factor × Research Factor
```

| Armada Type | Factor | Crew (Optimal / Standard / Weak) | Research (High / Base) |
|---|---|---|---|
| Uncommon (green) | × 3.0 | × 1.2 / × 1.0 / × 0.8 | × 1.1 / × 1.0 |
| Rare (blue) | × 1.8 | | |
| Epic (purple) | × 1.1 | | |

Sources: [1](https://www.reddit.com/r/startrekfleetcommand/comments/148hy52/armada_strength_ratios/) [2](https://www.youtube.com/watch?v=Ygh5tD7Ik38&t=49) [3](https://www.youtube.com/watch?v=0HOWcSZnOGs) [4](https://www.youtube.com/watch?v=OfM8ZgP6IVE&t=5) [5](https://www.reddit.com/r/startrekfleetcommand/comments/dw2xx9/whats_the_minimum_ship_strength_required_for/) [6](https://www.reddit.com/r/startrekfleetcommand/comments/18uu5bd/armada_tips_and_guide_for_newbies/)

> Community estimates – may vary with game updates.

---

## Installation

### macOS

1. Go to [Releases](../../releases) and download the latest `.dmg` file
2. Open the `.dmg` and drag **STFC Calc** to the Applications folder
3. Open Applications folder, right-click **STFC Calc**, select "Open"

**If you get "App is damaged" error:**

Open Terminal and run:
```bash
xattr -cr "/Applications/STFC Calc.app"
```

Then try opening the app again. (This removes the security quarantine for unsigned apps.)

### Windows

1. Go to [Releases](../../releases) and download the latest `.msi` file
2. Run the installer and follow the steps
3. STFC Calc appears in your Start menu

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Rust](https://rustup.rs/)

### Build from Source

```bash
npm install
npm run tauri dev      # Development mode (hot reload)
npm run tauri build    # Build release binaries
```

After `npm run tauri build`, find your app in `src-tauri/target/release/bundle/`:
- **macOS**: `STFC Calc.app` (run `xattr -cr` if needed)
- **Windows**: `STFC Calc.msi`

---

## About this Project

This is a **vibe coding** project — built for fun and learning. React, TypeScript, and Tauri are relatively new to me, so the code may not follow every best practice. Feedback and suggestions are very welcome!

The project started as a Python/tkinter prototype (`py_build` branch) before being rewritten as a modern cross-platform desktop app.

## Contributing

Improvements, new armada types, updated factors, or bug fixes are welcome – just open a pull request!
