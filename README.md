# news-image-20261125-makefun

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/An401500/news-image-20261125-makefun/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/An401500/news-image-20261125-makefun/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

A newspaper front page that sums up the world's news of Wednesday 25 November 2026 in a single image — built for the make.fun bounty of the same name.

## What is on the page

- **Lead story:** a Houthi drone strikes Riyadh's PIF Tower, the Saudi capital's tallest skyscraper, for the second time in a week; 11 people are wounded.
- **Also covered:** Nvidia chief Jensen Huang says he is in therapy, a day after being reinstated as CEO; an Israeli strike in Gaza City kills a Hamas security chief; an unclassified CIA system is breached; three people are killed in overnight Russia–Ukraine strikes.
- **Sport and briefs:** Real Madrid beat PSV 5–1 in the Champions League, Arsenal draw 1–1 with Dortmund, Manchester City draw 2–2 with Napoli — plus five short items from the day.

Every fact and figure on the page comes from reporting published on 25 November 2026; nothing on it is invented.

## How to run it

```sh
node main.ts
```

`main.ts` checks that `entry.png` is a genuine PNG, copies it to `/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR/entry.png`), and verifies the copy byte for byte — same size, same SHA-256 — so two runs always produce identical output.

## Files

- `entry.png` — the front page itself, 1024×1024.
- `main.ts` — the entry program (Node 22, standard library only).
- `LICENSE` — MIT.

---

<sub>Entered on [make.fun](https://make.fun/?ref=e1ewnm5b&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards</sub>
