# GMP Access — Installer Academy

A self-contained training web app for partner installers of GMP Access (the GMP IoT GateKit),
built end-to-end from the **GMP Access Install V3** guide.

## Run it

No build step, no dependencies. Either:

- **Open `index.html` directly** in any modern browser, or
- Serve the folder: `python3 -m http.server 8080` → http://localhost:8080

Progress, quiz scores, and field checklists persist in the browser's localStorage.

## What's inside

| Surface | Route | Purpose |
|---|---|---|
| Dashboard | `#/` | Progression across 6 phases / 14 modules |
| Modules | `#/module/<id>` | 59 long-form lessons + 14 knowledge checks (70% to complete) |
| Final exam | `#/exam` | 30-question readiness exam, 80% pass mark |
| Field Mode | `#/field` | Dark, high-contrast on-site reference: checklists, pinouts, credentials, ports, BOMs, lane diagrams |
| Printable guide | `#/guide` | Full curriculum + field cards, print-optimized (browser "Save as PDF" for a downloadable copy) |
| Coverage map | `#/coverage` | Every source section → where it lives here, plus all flagged source ambiguities |

## Structure

```
index.html          app shell
css/app.css         design system (desktop-first, responsive, print styles)
js/app.js           router, progress, quiz engine, search, field mode
js/diagrams.js      SVG library: 8 lane diagrams, LPR geometry, WISE wiring, system overview
js/data/data-1..5   curriculum content (M01–M14) with inline quizzes
js/data/reference   field cards, coverage map, final exam
```

## Content fidelity

The source PDF is the single source of truth. All numbers, terminals, credentials,
distances, ports, and step sequences are preserved verbatim; where the source is
ambiguous or self-contradictory (7 known cases), lessons flag it explicitly instead
of silently resolving it — see the Coverage Map page. Purchase URLs are embedded
hyperlinks in the source PDF and are referenced (not reproduced) here.

*For authorized use only.*
