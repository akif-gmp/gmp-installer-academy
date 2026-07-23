/* ============================================================
   Sample data seed — 10 test installers with exam results,
   integrity summaries, go-lives, ratings, and notes, so the
   scorecard and analytics are populated for demos.
   Seeds once (first load); Admin → Settings can clear it.
   Must load BEFORE admin.js (which reads the store at parse time).
   ============================================================ */
(function () {
  'use strict';
  const KEY = 'gmpAdminV1';
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return; }
  if (db.seeded || db.sampleCleared) return;
  if ((db.results || []).length || (db.golives || []).length) return; // never overwrite real data

  const now = Date.now(), day = 86400000;
  const integ = (o) => Object.assign({
    outcome: 'finished', startedAt: 0, endedAt: 0, durationSec: 1500,
    tabSwitches: 0, windowBlurs: 0, awaySeconds: 0, navAttempts: 0,
    secondTabs: 0, fullscreenExits: 0, events: []
  }, o);

  // ---- 10 test installers ----
  const people = [
    ['Marcus Webb', 'marcus.webb@apexinstalls.com'],
    ['Dana Ruiz', 'dana.ruiz@apexinstalls.com'],
    ['Chris Okafor', 'chris.okafor@laneworks.co'],
    ['Sam Patel', 'sam.patel@laneworks.co'],
    ['Jordan Lee', 'jordan.lee@gatecrew.io'],
    ['Alex Kim', 'alex.kim@gatecrew.io'],
    ['Riley Chen', 'riley.chen@parkfit.us'],
    ['Taylor Brooks', 'taylor.brooks@parkfit.us'],
    ['Morgan Diaz', 'morgan.diaz@voltlane.com'],
    ['Casey Nguyen', 'casey.nguyen@voltlane.com']
  ];
  db.users = people.map((p, i) => ({
    name: p[0], email: p[1], role: 'installer',
    invitedAt: now - (40 - i * 2) * day, status: 'invited', sample: true
  }));
  db.users.push({ name: 'Ops Admin (sample)', email: 'ops@getmyparking.com', role: 'admin', invitedAt: now - 45 * day, status: 'invited', sample: true });

  // ---- exam results (kind:'exam') with varied scores & integrity ----
  const exams = [
    // [idx, score/30, days ago, integrity overrides]
    [0, 28, 30, {}],                                                     // 93% clean
    [1, 27, 29, {}],                                                     // 90% clean
    [2, 26, 27, { tabSwitches: 2, awaySeconds: 38, windowBlurs: 2 }],    // 87% flagged
    [3, 30, 26, {}],                                                     // 100% clean
    [4, 25, 24, {}],                                                     // 83% clean
    [5, 23, 22, { tabSwitches: 3, awaySeconds: 71, navAttempts: 1, windowBlurs: 4 }], // 77% flagged
    [6, 22, 20, {}],                                                     // 73% clean
    [7, 20, 18, { navAttempts: 1, windowBlurs: 1 }],                     // 67% flagged
    [8, 18, 15, {}],                                                     // 60% clean (below pass)
    [9, 16, 12, { tabSwitches: 4, awaySeconds: 130, secondTabs: 1, windowBlurs: 5 }]  // 53% flagged (below pass)
  ];
  db.results = [];
  // Casey also has an earlier abandoned attempt
  db.results.push({
    kind: 'exam', name: people[9][0], email: people[9][1], score: 0, total: 30, pct: 0,
    integrity: integ({ outcome: 'abandoned', durationSec: 240, tabSwitches: 2, awaySeconds: 95 }),
    ts: now - 14 * day, sample: true
  });
  exams.forEach(e => {
    db.results.push({
      kind: 'exam', name: people[e[0]][0], email: people[e[0]][1],
      score: e[1], total: 30, pct: e[1] / 30 * 100,
      integrity: integ(e[3]), ts: now - e[2] * day, sample: true
    });
  });
  // a few module knowledge checks for texture
  [[0, 'M08', 9], [0, 'M14', 10], [1, 'M09', 8], [2, 'M08', 7], [3, 'M11', 10], [4, 'M07', 8], [6, 'M02', 9]].forEach(q => {
    db.results.push({
      kind: 'quiz', module: q[1], name: people[q[0]][0], email: people[q[0]][1],
      score: q[2], total: 10, pct: q[2] * 10, ts: now - (35 - q[0]) * day, sample: true
    });
  });

  // ---- go-lives (as the tracker API would send them) ----
  const gl = (id, site, who, daysAgo, status, issues) => ({
    id, site, installerEmail: people[who][1],
    date: new Date(now - daysAgo * day).toISOString().slice(0, 10),
    status, issues: issues || [], source: 'sample'
  });
  db.golives = [
    gl('GL-1017', 'Harbor Point Garage — Level P1', 0, 21, 'live', []),
    gl('GL-1018', 'Midtown Medical Plaza Parking', 1, 19, 'live', []),
    gl('GL-1019', '5th & Main Municipal Garage', 2, 17, 'live', [
      { id: 'ISS-201', summary: 'LPR misreads at night — floodlight aimed into lens', severity: 'medium', installerRelated: true }
    ]),
    gl('GL-1020', 'Lakeside Mall — East Deck', 3, 14, 'live', []),
    gl('GL-1021', 'Union Square Underground', 4, 12, 'live', [
      { id: 'ISS-207', summary: 'Port 1883 blocked on device VLAN at handoff', severity: 'high', installerRelated: true }
    ]),
    gl('GL-1022', 'Airport Economy Lot C', 5, 10, 'delayed', [
      { id: 'ISS-211', summary: 'Safety loop wired to DI0 — gate closed on a vehicle in testing', severity: 'high', installerRelated: true },
      { id: 'ISS-212', summary: 'NUC missing HDMI emulator — blank TeamViewer on first support call', severity: 'medium', installerRelated: true }
    ]),
    gl('GL-1023', 'Riverwalk Hotel Valet Garage', 0, 8, 'live', []),
    gl('GL-1024', 'Tech Park Tower B', 1, 6, 'live', []),
    gl('GL-1025', 'Stadium West Structure', 2, 4, 'live', []),
    gl('GL-1026', 'Old Town Parking Deck', 4, 2, 'scheduled', [])
  ];

  // ---- ratings (metrics keyed to js/admin.js A.METRICS) ----
  const M = ['siteWalk', 'wiring', 'lpr', 'lighting', 'network', 'pos', 'testing', 'handoff', 'timeliness', 'communication'];
  const rate = (glId, who, misses, note, bad, daysAgo) => {
    const metrics = {}; M.forEach(k => metrics[k] = !misses.includes(k));
    return {
      goLiveId: glId, installerEmail: people[who][1], metrics,
      score: 10 - misses.length, note, badLaunch: !!bad,
      ratedAt: now - daysAgo * day, sample: true
    };
  };
  db.ratings = [
    rate('GL-1017', 0, [], 'Textbook install. MAC ledger and credentials handed over same day.', false, 20),
    rate('GL-1018', 1, ['timeliness'], 'One-day slip waiting on conduit work that the site walk had already flagged.', false, 18),
    rate('GL-1019', 2, ['lighting', 'lpr'], 'Night reads failed until the floodlight was re-aimed parallel to the lens; fixed on return visit.', false, 16),
    rate('GL-1020', 3, [], 'Clean go-live; operator IT had whitelist done a week early thanks to installer follow-up.', false, 13),
    rate('GL-1021', 4, ['network', 'handoff'], 'Loops tested fine locally but 1883 was blocked on the device VLAN — missed at handoff.', false, 11),
    rate('GL-1022', 5, ['wiring', 'testing', 'handoff', 'timeliness'], 'Safety/presence inputs swapped and gate-arm test skipped. Emulator plug missing. Two return visits.', true, 9),
    rate('GL-1023', 0, [], 'Second flawless launch for Marcus. Auto-vend exit validated at night.', false, 7),
    rate('GL-1024', 1, ['pos'], 'PAX ordered without Datacap Android Forms — reflashed by reseller, one week delay on payments.', false, 5),
    rate('GL-1025', 2, ['timeliness'], 'Solid recovery from GL-1019 — lighting validated through the camera this time.', false, 3)
  ];

  db.seeded = true;
  db.sample = true;
  try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {}
})();
