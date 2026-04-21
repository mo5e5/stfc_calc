# STFC Calc

Desktop calculator for **Star Trek Fleet Command** – estimates which armada strength your fleet can defeat.

STFC has no official in-game calculator. Battle outcome depends heavily on crew, research, and armada type. This calculator is based on established community guidelines.

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

## Getting Started

Requires Python 3.8+ (tkinter included).

```bash
python3 main.py
```

## About this Project

This is a **vibe coding** project — built for fun and learning. Python is a new language for me, so the code may not follow every best practice. Feedback and suggestions are very welcome!

## Contributing

Improvements, new armada types, or updated factors are welcome – just open a pull request!
