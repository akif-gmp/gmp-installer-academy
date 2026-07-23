/* ============================================================
   Admin console — people, test analytics, go-lives, scorecard.
   Front-end complete; persistence is local (this browser) until
   wired to a backend. External data arrives via the colleague's
   go-live tracker API (see docs/API-CONTRACT.md) or JSON import.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* ---------- store ---------- */
  const KEY = 'gmpAdminV1';
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { db = {}; }
  db.pin = db.pin || null;
  db.users = db.users || [];
  db.golives = db.golives || [];
  db.ratings = db.ratings || [];
  db.results = db.results || [];
  db.api = db.api || { baseUrl: '', token: '', lastSync: null };
  db.platformUrl = db.platformUrl || '';
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} };

  let unlocked = true; // access control deferred to backend auth (per request: no restriction for now)

  /* the 10 rating metrics — one point each */
  A.METRICS = [
    ['siteWalk', 'Site walk & pre-install survey quality'],
    ['wiring', 'Gate/IO wiring quality'],
    ['lpr', 'LPR placement & read accuracy'],
    ['lighting', 'Lighting to spec (lux/geometry)'],
    ['network', 'Network readiness (whitelist/ports done early)'],
    ['pos', 'POS/kiosk setup correctness'],
    ['testing', 'Loop & gate-arm validation rigor'],
    ['handoff', 'Documentation & handoff (MAC ledger, credentials)'],
    ['timeliness', 'On-schedule delivery'],
    ['communication', 'Communication with GMP & operator']
  ];

  /* hook for the learner app to feed results into analytics */
  A.adminHooks = {
    recordResult(r) { db.results.push(r); save(); }
  };

  /* ---------- helpers ---------- */
  function input(name, ph, val, type) {
    return `<input class="ad-in" name="${name}" placeholder="${esc(ph)}" value="${esc(val || '')}" type="${type || 'text'}">`;
  }
  function installerScore(email) {
    const exams = db.results.filter(r => r.kind === 'exam' && r.email === email);
    const initial = exams.length ? Math.max(...exams.map(r => r.pct)) : null;
    const ratings = db.ratings.filter(r => r.installerEmail === email);
    const avgLaunch = ratings.length ? ratings.reduce((s, r) => s + r.score, 0) / ratings.length : null;
    let live = null;
    if (initial !== null && avgLaunch !== null) live = Math.round(0.3 * initial + 0.7 * (avgLaunch * 10));
    else if (initial !== null) live = Math.round(initial);
    else if (avgLaunch !== null) live = Math.round(avgLaunch * 10);
    const flags = exams.reduce((s, r) => s + (r.integrity ? (r.integrity.tabSwitches + r.integrity.navAttempts + r.integrity.secondTabs) : 0), 0);
    return { initial, avgLaunch, live, launches: ratings.length, flags };
  }
  function allInstallerEmails() {
    const set = new Set();
    db.users.filter(u => u.role === 'installer').forEach(u => set.add(u.email));
    db.results.forEach(r => r.email && set.add(r.email));
    db.golives.forEach(g => g.installerEmail && set.add(g.installerEmail));
    return [...set];
  }

  /* ---------- views ---------- */
  const TABS = [
    ['scorecard', 'chart', 'Scorecard'],
    ['people', 'users', 'People'],
    ['analytics', 'doc', 'Test analytics'],
    ['golives', 'rocket', 'Go-lives'],
    ['settings', 'gear', 'Settings']
  ];

  A.viewAdmin = function (parts) {
    const tab = parts[0] || 'scorecard';
    let body = '';
    if (tab === 'people') body = tabPeople();
    else if (tab === 'analytics') body = tabAnalytics();
    else if (tab === 'golives') body = tabGolives(parts[1]);
    else if (tab === 'settings') body = tabSettings();
    else body = tabScorecard();
    const h = `
<span class="kicker">Admin console</span><h2 class="page-title">Operations & Installer Performance</h2>
<div class="callout warn" style="margin-top:4px"><span class="co-label">Deployment note</span><p style="font-size:.85rem;margin:0">This console is fully functional but stores data in <b>this browser</b> until your tech team wires the backend. Invites generate mailable links (no accounts are created), and integrity data syncs across devices only once a server exists. The API shape for your colleague's go-live tracker is in <code>docs/API-CONTRACT.md</code>.${db.sample ? ' <b>Currently showing sample data</b> (10 test installers) — clear it under Settings.' : ''}</p></div>
<div class="ad-tabs">${TABS.map(t => `<a class="ad-tab${t[0] === tab ? ' on' : ''}" href="#/admin/${t[0]}">${UI(t[1], 14)} ${t[2]}</a>`).join('')}</div>
${body}`;
    return { crumb: `Admin · <b>${esc(TABS.find(t => t[0] === tab)[2])}</b>`, html: h };
  };

  function tabScorecard() {
    const emails = allInstallerEmails();
    let rows = emails.map(email => {
      const u = db.users.find(x => x.email === email);
      const s = installerScore(email);
      return `<tr>
        <td>${esc(u ? u.name || email : email)}<br><span style="font-weight:400;color:var(--muted);font-size:.76rem">${esc(email)}</span></td>
        <td>${s.initial !== null ? Math.round(s.initial) + '%' : '<span style="color:var(--muted)">no exam yet</span>'}</td>
        <td>${s.avgLaunch !== null ? s.avgLaunch.toFixed(1) + ' / 10' : '<span style="color:var(--muted)">—</span>'} <span style="color:var(--muted);font-size:.76rem">(${s.launches} rated)</span></td>
        <td>${s.live !== null ? `<b class="score-pill ${s.live >= 80 ? 'ok' : s.live >= 60 ? 'mid' : 'low'}">${s.live}</b>` : '—'}</td>
        <td>${s.flags ? `<span class="score-pill low" title="tab switches + navigation attempts + second tabs during exams">${UI('flag', 11)} ${s.flags}</span>` : '<span style="color:var(--good)">clean</span>'}</td>
      </tr>`;
    }).join('');
    if (!rows) rows = '<tr><td colspan="5" style="color:var(--muted)">No installers yet — invite people, or have someone take the readiness exam on this device.</td></tr>';
    return `
<p class="lede" style="font-size:.92rem">Live score = 30% initial exam + 70% rolling launch-rating average (each launch rated 0–10, one point per metric). Integrity flags come from exam focused-session monitoring.</p>
<div class="tablewrap"><table class="spec">
<tr><th>Installer</th><th>Initial (exam)</th><th>Launch avg</th><th>Live score</th><th>Exam integrity</th></tr>${rows}</table></div>
<h3 style="font-size:1.05rem;margin-top:1.6em">The 10 rating metrics</h3>
<div class="tablewrap"><table class="spec wraprow"><tr><th>#</th><th>Metric (1 point each)</th></tr>
${A.METRICS.map((m, i) => `<tr><td>${i + 1}</td><td>${esc(m[1])}</td></tr>`).join('')}</table></div>`;
  }

  function tabPeople() {
    const inviteUrl = db.platformUrl || '(set the platform URL in Settings)';
    const rows = db.users.map((u, i) => `<tr>
      <td>${esc(u.name || '—')}</td><td>${esc(u.email)}</td><td><span class="badge ${u.role === 'admin' ? 'progress' : 'todo'}">${u.role}</span></td>
      <td>${esc(new Date(u.invitedAt).toLocaleDateString())}</td>
      <td><a href="mailto:${encodeURIComponent(u.email)}?subject=${encodeURIComponent('Your GMP Access Installer Academy invite')}&body=${encodeURIComponent('Hi ' + (u.name || '') + ',\n\nYou\'ve been invited to the GMP Access Installer Academy (' + u.role + ').\n\nOpen the platform here: ' + inviteUrl + '\n\nWork through the 14 modules, then take the readiness exam. See you in the field!')}" class="btn small secondary">${UI('mail', 13)} Send invite</a>
      <button class="btn small ghost" data-ad="deluser" data-i="${i}">remove</button></td>
    </tr>`).join('') || '<tr><td colspan="5" style="color:var(--muted)">No one invited yet.</td></tr>';
    return `
<h3 style="font-size:1.05rem">Invite someone</h3>
<form data-ad="invite" class="ad-form">
  ${input('name', 'Full name')} ${input('email', 'email@company.com', '', 'email')}
  <select class="ad-in" name="role"><option value="installer">Installer</option><option value="admin">Admin</option></select>
  <button class="btn accent">Add & prepare invite</button>
</form>
<p style="font-size:.8rem;color:var(--muted)">“Send invite” opens a pre-written email with the platform link. Actual account creation/login needs the backend (see deployment note above).</p>
<div class="tablewrap"><table class="spec"><tr><th>Name</th><th>Email</th><th>Role</th><th>Invited</th><th></th></tr>${rows}</table></div>`;
  }

  function tabAnalytics() {
    const rows = db.results.slice().reverse().map(r => `<tr>
      <td>${esc(r.name || r.email || 'anonymous')}</td>
      <td>${r.kind === 'exam' ? '<b>Readiness exam</b>' : 'Check · ' + esc(r.module || '')}</td>
      <td>${r.score}/${r.total} (${Math.round(r.pct)}%)</td>
      <td>${esc(new Date(r.ts).toLocaleString())}</td>
      <td>${r.integrity ? integrityChip(r.integrity) : '<span style="color:var(--muted)">n/a</span>'}</td>
    </tr>`).join('') || '<tr><td colspan="5" style="color:var(--muted)">No results recorded on this device yet. Results appear here when learners take checks/exams (and, once the backend exists, from every device).</td></tr>';
    return `
<p class="lede" style="font-size:.92rem">Every knowledge check and exam attempt, newest first. Exam rows carry the focused-session integrity summary.</p>
<div class="tablewrap"><table class="spec"><tr><th>Person</th><th>Assessment</th><th>Score</th><th>When</th><th>Integrity</th></tr>${rows}</table></div>`;
  }
  function integrityChip(i) {
    const flags = i.tabSwitches + i.navAttempts + i.secondTabs + (i.fullscreenExits || 0);
    if (!flags && i.awaySeconds < 5) return '<span style="color:var(--good);font-weight:700">clean</span>';
    return `<span class="score-pill ${flags > 3 ? 'low' : 'mid'}" title="details below">${UI('flag', 11)} ${flags} · ${i.awaySeconds}s away</span>
    <div style="font-size:.72rem;color:var(--muted)">${i.tabSwitches} tab-switch · ${i.windowBlurs} blur · ${i.navAttempts} nav · ${i.secondTabs} 2nd-tab${i.outcome !== 'finished' ? ' · ' + esc(i.outcome) : ''}</div>`;
  }

  function tabGolives(rateId) {
    if (rateId) return ratePanel(rateId);
    const rows = db.golives.slice().reverse().map(g => {
      const rating = db.ratings.find(r => r.goLiveId === g.id);
      const issues = (g.issues || []).filter(x => x.installerRelated);
      return `<tr>
        <td>${esc(g.site)}<br><span style="font-weight:400;color:var(--muted);font-size:.76rem">${esc(g.id)}</span></td>
        <td>${esc(g.installerEmail || '—')}</td>
        <td>${esc(g.date || '—')}</td>
        <td><span class="badge ${g.status === 'live' ? 'done' : g.status === 'delayed' ? 'progress' : 'todo'}">${esc(g.status || '?')}</span></td>
        <td>${issues.length ? `<span class="score-pill low">${issues.length} installer issue${issues.length > 1 ? 's' : ''}</span>` : '<span style="color:var(--good)">none</span>'}</td>
        <td>${rating ? `<b class="score-pill ${rating.score >= 8 ? 'ok' : rating.score >= 6 ? 'mid' : 'low'}">${rating.score}/10</b>${rating.badLaunch ? ' ' + UI('flag', 12, 'flag-bad') : ''}` : `<a class="btn small accent" href="#/admin/golives/${encodeURIComponent(g.id)}">Rate</a>`}
        ${rating ? `<a class="btn small ghost" href="#/admin/golives/${encodeURIComponent(g.id)}">edit</a>` : ''}</td>
      </tr>`;
    }).join('') || '<tr><td colspan="6" style="color:var(--muted)">No go-lives yet — sync from the tracker API, paste JSON, or add one manually.</td></tr>';
    return `
<div class="ad-form" style="align-items:center">
  <button class="btn accent" data-ad="sync">${UI('refresh', 14)} Sync from tracker API</button>
  <span id="syncMsg" style="font-size:.8rem;color:var(--muted)">${db.api.lastSync ? 'Last sync: ' + new Date(db.api.lastSync).toLocaleString() : 'API not synced yet (configure in Settings)'}</span>
</div>
<details style="margin:10px 0"><summary style="cursor:pointer;font-size:.85rem;color:var(--accent);font-weight:600">Paste JSON from the tracker instead</summary>
  <form data-ad="import" style="margin-top:8px">
    <textarea class="ad-in" name="json" rows="4" style="width:100%;font-family:var(--mono);font-size:.75rem" placeholder='[{"id":"GL-1024","site":"Garage A","installerEmail":"tech@partner.com","date":"2026-07-01","status":"live","issues":[{"summary":"LPR misreads at night","installerRelated":true}]}]'></textarea>
    <button class="btn small" style="margin-top:6px">Import</button>
  </form>
</details>
<details style="margin:10px 0"><summary style="cursor:pointer;font-size:.85rem;color:var(--accent);font-weight:600">Add a go-live manually</summary>
  <form data-ad="addgl" class="ad-form" style="margin-top:8px">
    ${input('site', 'Site name')} ${input('installerEmail', 'installer@partner.com', '', 'email')} ${input('date', '', '', 'date')}
    <select class="ad-in" name="status"><option>live</option><option>delayed</option><option>scheduled</option></select>
    <button class="btn small accent">Add</button>
  </form>
</details>
<div class="tablewrap"><table class="spec"><tr><th>Site</th><th>Installer</th><th>Go-live</th><th>Status</th><th>Installer issues</th><th>Rating</th></tr>${rows}</table></div>`;
  }

  function ratePanel(id) {
    const g = db.golives.find(x => x.id === decodeURIComponent(id));
    if (!g) return `<p>Go-live not found.</p>`;
    const existing = db.ratings.find(r => r.goLiveId === g.id) || { metrics: {}, note: '', badLaunch: false };
    const issues = (g.issues || []);
    return `
<a href="#/admin/golives" style="font-size:.82rem">← All go-lives</a>
<h3 style="margin:.6em 0 .2em">${esc(g.site)} — ${esc(g.installerEmail || 'unassigned')}</h3>
<p style="color:var(--muted);font-size:.85rem">${esc(g.id)} · ${esc(g.date || '')} · status: ${esc(g.status || '?')}</p>
${issues.length ? `<div class="callout ${issues.some(i => i.installerRelated) ? 'danger' : 'field'}"><span class="co-label">Issues from the tracker</span><ul style="margin:0">${issues.map(i => `<li>${esc(i.summary)}${i.installerRelated ? ' <b>(installer-related)</b>' : ''}${i.severity ? ' · ' + esc(i.severity) : ''}</li>`).join('')}</ul></div>` : ''}
<form data-ad="rate" data-gl="${esc(g.id)}">
  <h4 style="margin:1.2em 0 .4em">Rate this install — 1 point per metric</h4>
  ${A.METRICS.map(m => `<label class="rate-row"><input type="checkbox" name="${m[0]}"${existing.metrics[m[0]] ? ' checked' : ''}> ${esc(m[1])}</label>`).join('')}
  <h4 style="margin:1.2em 0 .4em">Launch notes</h4>
  <textarea class="ad-in" name="note" rows="3" style="width:100%" placeholder="What went well / what went bad at this launch…">${esc(existing.note)}</textarea>
  <label class="rate-row" style="margin-top:8px"><input type="checkbox" name="badLaunch"${existing.badLaunch ? ' checked' : ''}> ${UI('flag', 13, 'flag-bad')} Flag as a launch that went bad</label>
  <p><button class="btn accent">Save rating</button> <span id="rateScore" style="font-size:.85rem;color:var(--muted)"></span></p>
</form>`;
  }

  function tabSettings() {
    return `
<h3 style="font-size:1.05rem">Go-live tracker API (your colleague's tool)</h3>
<form data-ad="api" class="ad-form" style="flex-wrap:wrap">
  ${input('baseUrl', 'https://tracker.example.com', db.api.baseUrl, 'url')}
  ${input('token', 'API token', db.api.token, 'password')}
  <button class="btn accent">Save</button>
</form>
<p style="font-size:.8rem;color:var(--muted)">Expected endpoint: <code>GET {baseUrl}/api/v1/golives</code> with <code>Authorization: Bearer &lt;token&gt;</code> — full shape in <code>docs/API-CONTRACT.md</code>. If the tracker isn't ready, use JSON import on the Go-lives tab.</p>
<h3 style="font-size:1.05rem;margin-top:1.6em">Platform URL (used in invite emails)</h3>
<form data-ad="url" class="ad-form">
  ${input('platformUrl', 'https://…link where the academy is hosted', db.platformUrl, 'url')}
  <button class="btn accent">Save</button>
</form>
<h3 style="font-size:1.05rem;margin-top:1.6em">Data</h3>
<p><button class="btn secondary small" data-ad="export">${UI('download', 13)} Export admin data (JSON)</button>
${db.sample ? `<button class="btn secondary small" data-ad="clearseed" style="margin-left:8px">${UI('close', 12)} Clear sample data</button>` : ''}</p>
${db.sample ? '<p style="font-size:.78rem;color:var(--muted)">This console is currently populated with 10 sample installers so stakeholders can see how scores, integrity flags, and ratings will look. Clearing removes all sample records and starts fresh.</p>' : ''}`;
  }

  /* ---------- events ---------- */
  document.addEventListener('submit', e => {
    const f = e.target.closest('form[data-ad]');
    if (!f) return;
    e.preventDefault();
    const kind = f.dataset.ad;
    const val = n => (f.elements[n] ? f.elements[n].value.trim() : '');
    if (kind === 'invite') {
      if (!val('email')) return;
      db.users.push({ name: val('name'), email: val('email'), role: val('role'), invitedAt: Date.now(), status: 'invited' });
      save(); A.appHooks.rerender();
    }
    else if (kind === 'addgl') {
      db.golives.push({ id: 'GL-' + Math.floor(1000 + (db.golives.length + 1) * 7 + (Date.now() % 89)), site: val('site'), installerEmail: val('installerEmail'), date: val('date'), status: val('status'), issues: [], source: 'manual' });
      save(); A.appHooks.rerender();
    }
    else if (kind === 'import') {
      try {
        const arr = JSON.parse(val('json'));
        if (!Array.isArray(arr)) throw 0;
        arr.forEach(g => {
          const i = db.golives.findIndex(x => x.id === g.id);
          if (i >= 0) db.golives[i] = Object.assign(db.golives[i], g, { source: 'import' });
          else db.golives.push(Object.assign({ issues: [] }, g, { source: 'import' }));
        });
        save(); A.appHooks.rerender();
      } catch (err) { alert('Could not parse that JSON — expected an array of go-live objects.'); }
    }
    else if (kind === 'rate') {
      const glId = f.dataset.gl;
      const g = db.golives.find(x => x.id === glId);
      const metrics = {}; let score = 0;
      A.METRICS.forEach(m => { metrics[m[0]] = !!f.elements[m[0]].checked; if (metrics[m[0]]) score++; });
      const idx = db.ratings.findIndex(r => r.goLiveId === glId);
      const rec = { goLiveId: glId, installerEmail: g ? g.installerEmail : '', metrics, score, note: val('note'), badLaunch: !!f.elements.badLaunch.checked, ratedAt: Date.now() };
      if (idx >= 0) db.ratings[idx] = rec; else db.ratings.push(rec);
      save(); location.hash = '#/admin/golives';
    }
    else if (kind === 'api') { db.api.baseUrl = val('baseUrl').replace(/\/$/, ''); db.api.token = val('token'); save(); A.appHooks.rerender(); }
    else if (kind === 'url') { db.platformUrl = val('platformUrl'); save(); A.appHooks.rerender(); }
  });

  document.addEventListener('click', e => {
    const del = e.target.closest('[data-ad="deluser"]');
    if (del) { db.users.splice(+del.dataset.i, 1); save(); A.appHooks.rerender(); return; }
    const clearSeed = e.target.closest('[data-ad="clearseed"]');
    if (clearSeed) {
      db = { pin: null, users: [], golives: [], ratings: [], results: [], api: { baseUrl: '', token: '', lastSync: null }, platformUrl: db.platformUrl, sampleCleared: true };
      save(); A.appHooks.rerender();
      return;
    }
    const exp = e.target.closest('[data-ad="export"]');
    if (exp) {
      const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'gmp-admin-data.json'; a.click();
      return;
    }
    const sync = e.target.closest('[data-ad="sync"]');
    if (sync) {
      const msg = document.getElementById('syncMsg');
      if (!db.api.baseUrl) { msg.textContent = 'Set the tracker API base URL in Settings first.'; return; }
      msg.textContent = 'Syncing…';
      fetch(db.api.baseUrl + '/api/v1/golives', { headers: db.api.token ? { Authorization: 'Bearer ' + db.api.token } : {} })
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(data => {
          const arr = Array.isArray(data) ? data : (data.golives || []);
          arr.forEach(g => {
            const i = db.golives.findIndex(x => x.id === g.id);
            if (i >= 0) db.golives[i] = Object.assign(db.golives[i], g, { source: 'api' });
            else db.golives.push(Object.assign({ issues: [] }, g, { source: 'api' }));
          });
          db.api.lastSync = Date.now(); save(); A.appHooks.rerender();
        })
        .catch(err => { msg.textContent = 'Sync failed: ' + err.message + ' (CORS/network? — JSON import always works)'; });
      return;
    }
  });

  /* live score preview while rating */
  document.addEventListener('change', e => {
    const f = e.target.closest('form[data-ad="rate"]');
    if (!f) return;
    let score = 0;
    A.METRICS.forEach(m => { if (f.elements[m[0]].checked) score++; });
    const el = document.getElementById('rateScore');
    if (el) el.textContent = 'Current score: ' + score + '/10';
  });
})();
