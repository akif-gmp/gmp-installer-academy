# GMP Installer Academy — Integration & Backend Contract

This document defines (1) the API the Academy's admin console expects from the
**ExpressLane go-live tracker** (the colleague's tool), and (2) the backend
endpoints the Academy itself needs for production auth, invites, results sync,
and true exam-session enforcement.

Everything in the Academy front-end already codes against these shapes — the
admin console's "Sync from tracker API" button calls the go-live endpoint
below, and JSON import accepts the identical payload.

---

## 1. Go-live tracker → Academy (colleague's tool exposes)

### `GET {baseUrl}/api/v1/golives`
Auth: `Authorization: Bearer <token>` · CORS: allow the Academy's origin.

Response: JSON array (or `{ "golives": [...] }`):

```json
[
  {
    "id": "GL-1024",                      // stable unique id (string)
    "site": "Garage A — 5th & Main",
    "installerEmail": "tech@partner.com", // the installer who took it live
    "date": "2026-07-01",                 // go-live date, ISO
    "status": "live",                     // live | delayed | scheduled | rolled-back
    "issues": [
      {
        "id": "ISS-88",
        "summary": "LPR misreads at night",
        "severity": "medium",             // low | medium | high
        "installerRelated": true          // key flag — drives the scorecard
      }
    ]
  }
]
```

Notes:
- `installerEmail` is the join key between the two systems. Use the same
  email the installer was invited with.
- `installerRelated` is decided in the tracker (issue triage). The Academy
  surfaces these on the go-live row and in the rating panel.
- Optional query params the Academy may send later: `?since=<ISO date>`.

### Optional: Academy → tracker (webhook, phase 2)
`POST {baseUrl}/api/v1/ratings` — pushed when an admin saves a rating:

```json
{
  "goLiveId": "GL-1024",
  "installerEmail": "tech@partner.com",
  "score": 8,
  "metrics": { "siteWalk": true, "wiring": true, "lpr": false, "lighting": true,
               "network": true, "pos": true, "testing": true, "handoff": true,
               "timeliness": false, "communication": true },
  "note": "Night lighting fixed on-site; two return visits.",
  "badLaunch": false,
  "ratedAt": "2026-07-19T10:30:00Z"
}
```

---

## 2. Academy backend (tech team builds; front-end is ready for it)

The static front-end currently persists to `localStorage`. To make the
following real, stand up a small API and swap the storage layer:

| Capability | Endpoint sketch | Why backend is required |
|---|---|---|
| Login / SSO | `POST /auth/login` → session JWT | Real identity; the current admin passcode is a per-device placeholder |
| Invites | `POST /invites {email, role}` → emailed magic link | A static page cannot create accounts or send email |
| Results sync | `POST /results` (quiz/exam + integrity blob) | Analytics across all devices, not just the admin's browser |
| Scorecard | `GET /installers/:email/scorecard` | Aggregation across results + ratings + go-lives |
| **Single-session exam** | `POST /exam/session` → one active token per user; heartbeat `PUT /exam/session/:id` | **The only way to block a second tab in incognito/another browser/device.** Client-side can only lock same-profile tabs |

### Exam integrity payload (already produced by the front-end)
Attached to every exam attempt (`state.exam.integrity` / results records):

```json
{
  "outcome": "finished",        // finished | abandoned
  "durationSec": 1260,
  "tabSwitches": 2,             // visibilitychange → hidden
  "windowBlurs": 3,             // focus left the window (alt-tab, other screen)
  "awaySeconds": 41,            // total time the tab was hidden
  "navAttempts": 1,             // tried to open another page of the app mid-exam
  "secondTabs": 0,              // app opened in another tab of the same browser
  "fullscreenExits": 0,
  "events": [ { "t": 1784291488833, "type": "hidden" } ]
}
```

### Scorecard formula (implemented in the admin console)
- Each go-live rating: **10 metrics × 1 point** (site walk, wiring, LPR,
  lighting, network, POS, testing, handoff, timeliness, communication).
- **Live score = 30% × best exam % + 70% × (average launch rating × 10)**;
  falls back to whichever component exists.
- Integrity flags (tab switches + nav attempts + second tabs across exam
  attempts) are displayed beside the score, never silently mixed into it —
  the admin decides what they mean.

---

## 3. Honest limits of the current client-side build

- Same-browser second tab: **blocked + logged** (BroadcastChannel lock).
- Tab switches, window blur, time away, nav attempts, fullscreen exits:
  **logged silently**, attached to the attempt, shown only in the admin console.
- Incognito window / different browser / different device: **cannot be
  detected or blocked without the single-session backend above.**
- A hard page reload mid-exam ends the attempt without a record (no server
  to persist in-flight sessions).
