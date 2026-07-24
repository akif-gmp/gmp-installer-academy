/* ============================================================
   GMP Access Installer Academy — application engine v3
   Icon rail + standalone pages. Home = progress dashboard.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const D = window.DIAGRAMS;
  const $ = sel => document.querySelector(sel);

  /* Official Get My Parking brand mark (green "p" pin + car). */
  const LOGO_MARK = `<svg viewBox="0 0 228.98 229.44" role="img" aria-label="Get My Parking"><path fill="#24ae5f" d="M80.07,200.16h0ZM136.16,161.66s2.66,6.75,3.07,6.77,9.59,4.3,9.59,4.3l3.86.42c-2.74-9.51-16.52-11.49-16.52-11.49ZM139.7,120.17c.5-.71.95-1.44,1.36-2.2-.41.75-.88,1.48-1.36,2.2ZM76.56,222.41v.13h0v-.18.05Z"/><path fill="#fff" d="M76.56,222.41v.22-.27.05ZM80.07,200.16h0Z"/><path fill="#fff" d="M117.94,47c-27.91,0-51.9,19.8-57.17,47.21h0c-.19.78-5.42,24.16-1.17,99.4v.07c.14,12.94-7.65,16-7.65,16,0,0-.56.25-.62.32h0s.08.05.12.08c.06.03.11.07.16.11l.53.34.35.23c.06.05.13.09.2.12,3.58,2.35,13.65,8.56,23.79,11.7v-.22h0s0-.09,0-.13c.27-.69,1.27-3.22,1.71-4.72h0c.26-.58.48-1.19.65-1.8-1.5-.62-1.76-4.11-1.76-4.11-.19-3.65,0-7.31.56-10.92.29-.95,1.04-1.69,2-1.95-.54-7.31-1-16.75-.16-24.06.43-3.55,2.54-6.29,5.35-8.44-.03-.54.04-1.08.2-1.6,0,0,3.25-1.78,3.75-1.9.45.02.88.15,1.26.39,6.49-3.09,13.55-4.36,13.66-5.54.21-2.12,15.39-2,15.39-2,0,0,15.2-.1,15.38,2,0,.56,1.67,1.15,4.06,1.95,30.01-11.49,45.02-45.14,33.53-75.15-8.59-22.44-30.09-37.28-54.12-37.38ZM144.33,106.79c0,.38-.04.76-.09,1.13,0,.44-.1.9-.17,1.35-.13.88-.32,1.76-.55,2.62-.24.94-.54,1.87-.9,2.78-.11.32-.24.64-.38,1s-.39.88-.61,1.31-.35.69-.55,1c-.41.76-.86,1.49-1.36,2.2-.25.36-.49.7-.75,1h0c-.39.51-.81,1-1.24,1.47-.2.26-.41.5-.65.72-.22.23-.44.47-.68.68-.02.04-.05.07-.08.1-5,5.6-17.58,20.16-18.17,21h0c-.12-.29-.27-.57-.45-.83-6.07-7.39-14.22-16.14-17.51-19.68-.08-.06-.16-.14-.22-.22h0l-.77-.75c-.14-.15-.28-.29-.41-.44s-.43-.45-.62-.68-.46-.53-.69-.79l-.41-.54c-.17-.22-.33-.43-.48-.65l-.22-.29c-.19-.27-.38-.54-.55-.82s-.38-.6-.56-.91l-.34-.59c-.12-.2-.23-.4-.33-.61-.15-.26-.28-.53-.4-.8-.17-.33-.32-.68-.47-1s-.3-.7-.43-1.07-.22-.6-.32-.9-.23-.7-.33-1.05-.15-.49-.21-.73c-3.67-14.14,4.81-28.58,18.95-32.25,14.14-3.67,28.58,4.81,32.25,18.95.56,2.16.85,4.37.85,6.6-.11.62-.12,1.15-.17,1.69h.02Z"/><path fill="#24ae5f" d="M114.42,0C51.19.04-.04,51.34,0,114.58c.03,38.4,19.3,74.24,51.33,95.42h0c.06-.07.62-.29.62-.32s7.79-3.06,7.65-16v-.07c-4.25-75.24,1-98.62,1.17-99.4h0c6.06-31.56,36.56-52.23,68.12-46.18,31.56,6.06,52.23,36.56,46.18,68.12-3.8,19.79-17.56,36.2-36.38,43.39-2.39-.8-4-1.39-4.06-1.95-.18-2.12-15.38-2-15.38-2,0,0-15.18-.12-15.39,2-.11,1.18-7.17,2.45-13.66,5.54-.38-.24-.81-.37-1.26-.39-.5.12-3.75,1.9-3.75,1.9-.16.52-.23,1.06-.2,1.6-2.81,2.15-4.92,4.89-5.35,8.44-.89,7.31-.38,16.75.16,24.06-.96.26-1.71,1-2,1.95-.56,3.61-.75,7.27-.56,10.92,0,0,.26,3.49,1.76,4.11-.17.61-.39,1.22-.65,1.8h0c-.44,1.5-1.44,4-1.71,4.72,0,.04,0,.09,0,.13v.27c3.04,1.08,6.13,1.99,9.27,2.72l.5.13c1.72.43,3.45.83,5.21,1.18v-.06l3.49-12.85c1.14-3.67,4.15-6.46,7.9-7.31.38-.11,9.32-2.39,29.55-.23.05,0,.11,0,.16,0h0c4.31.42,7.94,3.38,9.22,7.51l3.39,11,.08.22c4.65-1.26,9.18-2.91,13.54-4.95.1-.03.2-.07.29-.12,58.2-24.73,85.33-91.96,60.6-150.16C201.87,27.44,160.37-.01,114.42,0ZM97.65,168.77c-.45,0-9.87,3.63-9.87,3.63l-1.84-.08-1.58-.07c.39-1.04.92-2.02,1.58-2.91,4.77-6.45,15.28-7.11,15.28-7.11,0,0-3.14,6.54-3.57,6.54h0ZM139.23,168.43c-.41,0-3.07-6.77-3.07-6.77,0,0,13.75,2,16.52,11.49l-3.86-.42s-9.17-4.29-9.59-4.3h0Z"/><path fill="#fff" d="M101.18,162.23s-3.1,6.54-3.53,6.54-9.87,3.63-9.87,3.63l-1.84-.08-1.58-.07c.39-1.04.92-2.02,1.58-2.91,4.73-6.45,15.24-7.11,15.24-7.11Z"/><path fill="#fff" d="M152.68,173.15l-3.86-.42s-9.17-4.29-9.59-4.3-3.07-6.77-3.07-6.77c0,0,13.78,1.98,16.52,11.49Z"/><path fill="#fff" d="M145.3,225h0c-26.95,8.91-53.78,1.66-53.78,1.66v-.06l3.49-12.85c1.14-3.67,4.15-6.46,7.9-7.31.38-.11,9.32-2.39,29.55-.23.05,0,.11,0,.16,0h0c4.31.42,7.94,3.38,9.22,7.51l3.39,11,.07.28Z"/></svg>`;

  /* ---------- persistent state ---------- */
  const KEY = 'gmpAcademyV1';
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  state.lessons = state.lessons || {};
  state.quizzes = state.quizzes || {};
  state.exam = state.exam || null;
  state.fieldChecks = state.fieldChecks || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  A.appHooks = { getState: () => state, save, rerender: () => route() };

  /* ---------- time model ----------
     Realistic completion targets: all 14 modules (lessons + quizzes)
     total ~1 hour; the certification exam is ~30 min. Lesson minutes
     are distributed to sum to each module's total, so every surface
     (home, module page, lesson page) stays consistent. */
  (function normalizeTimes() {
    const MIN = { m01: 4, m02: 4, m03: 4, m04: 5, m05: 4, m06: 4, m07: 5, m08: 5, m09: 4, m10: 5, m11: 4, m12: 4, m13: 4, m14: 4 };
    (A.modules || []).forEach(m => {
      const total = MIN[m.id] || 4;
      m.minutes = total;
      const n = m.lessons.length || 1;
      const base = Math.floor(total / n), rem = total - base * n;
      m.lessons.forEach((l, i) => { l.minutes = base + (i >= n - rem ? 1 : 0); });
    });
  })();

  /* ---------- helpers ---------- */
  const mod = id => A.modules.find(m => m.id === id);
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const hydrate = html => html.replace(/\[\[DIAGRAM:(\w+)\]\]/g, (_, n) => (D[n] ? D[n]() : ''));

  function lessonDone(mid, lid) { return !!state.lessons[mid + '/' + lid]; }
  function quizPassed(mid) { const q = state.quizzes[mid]; return q && q.total && (q.score / q.total) >= 0.7; }
  function moduleLessonsDone(m) { return m.lessons.every(l => lessonDone(m.id, l.id)); }
  function moduleComplete(m) { return moduleLessonsDone(m) && quizPassed(m.id); }
  function moduleState(m) {
    if (moduleComplete(m)) return 'done';
    const any = m.lessons.some(l => lessonDone(m.id, l.id)) || state.quizzes[m.id];
    return any ? 'progress' : 'todo';
  }
  function modulePct(m) {
    const total = m.lessons.length + 1;
    let done = m.lessons.filter(l => lessonDone(m.id, l.id)).length;
    if (quizPassed(m.id)) done++;
    return Math.round(done / total * 100);
  }
  function phaseComplete(pn) {
    const mods = A.modules.filter(m => m.phase === pn);
    return mods.length > 0 && mods.every(moduleComplete);
  }
  function phaseDoneCount(pn) {
    const mods = A.modules.filter(m => m.phase === pn);
    return { done: mods.filter(moduleComplete).length, total: mods.length };
  }
  function overallPct() {
    let done = 0, total = 0;
    A.modules.forEach(m => {
      total += m.lessons.length + 1;
      m.lessons.forEach(l => { if (lessonDone(m.id, l.id)) done++; });
      if (quizPassed(m.id)) done++;
    });
    return total ? Math.round(done / total * 100) : 0;
  }
  function modulesDone() { return A.modules.filter(moduleComplete).length; }

  /* time estimates (from per-module minutes) */
  function totalMinutes() { return A.modules.reduce((s, m) => s + (m.minutes || 0), 0); }
  function remainingMinutes() { return A.modules.filter(m => !moduleComplete(m)).reduce((s, m) => s + (m.minutes || 0), 0); }
  function phaseMinutes(pn) { return A.modules.filter(m => m.phase === pn).reduce((s, m) => s + (m.minutes || 0), 0); }
  function fmtDur(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return h ? (m ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
  }

  /* certification eligibility — hard gate + admin override */
  function certOverride() { return !!(A.adminHooks && A.adminHooks.certOverride && A.adminHooks.certOverride()); }
  function certEligible() { return certOverride() || A.modules.every(moduleComplete); }

  function pbar(pct) { return `<div class="pbar"><i style="width:${pct}%"></i></div>`; }

  /* ---------- rail ---------- */
  const RAIL = [
    { id: 'home', ico: 'home', label: 'Home', href: '#/', match: h => h === '#/' || h === '#' || h === '' },
    { id: 'modules', ico: 'grid', label: 'Modules', href: '#/modules', match: h => h.startsWith('#/module') },
    { id: 'field', ico: 'bolt', label: 'Field kit', href: '#/field', match: h => h.startsWith('#/field') },
    { id: 'cert', ico: 'check', label: 'Certification', href: '#/certification', match: h => h === '#/certification' || h === '#/exam' },
    { id: 'textbook', ico: 'book', label: 'Textbook', href: '#/textbook', match: h => h === '#/textbook' || h === '#/guide' },
    { id: 'admin', ico: 'gear', label: 'Admin', href: '#/admin', match: h => h.startsWith('#/admin') }
  ];
  function renderRail(hash) {
    let h = `<a class="rail-logo" href="#/" title="GMP Access Installer Academy">${LOGO_MARK}</a>`;
    RAIL.forEach(r => {
      const active = r.match(hash);
      h += `<a class="rail-item${active ? ' active' : ''}" href="${r.href}"><span class="ri">${UI(r.ico, 19)}</span>${r.label}</a>`;
    });
    h += `<div class="rail-spacer"></div>`;
    const pct = overallPct();
    h += `<div class="rail-progress" title="Curriculum progress"><div class="ring" style="background:conic-gradient(var(--green) ${pct * 3.6}deg, var(--line) 0)"><span style="background:var(--bg);border-radius:50%;width:27px;height:27px;display:flex;align-items:center;justify-content:center">${pct}%</span></div></div>`;
    $('#rail').innerHTML = h;
  }

  /* ---------- HOME (progress dashboard) ---------- */
  const RECAP = {
    1: 'What GMP Access is, and how a lane turns a license plate into an open gate.',
    2: 'Every lane & location device: WISE IO controller, cameras, lighting, POS, NUC, scanners.',
    3: 'The 9-point site walk, gate wiring & loop logic, and LPR camera placement.',
    4: 'Bench prep before install day: the NUC (Ubuntu, BIOS, TeamViewer) and WISE controllers.',
    5: 'On site: wire the gate, find the board, test the loops, prove the arm, install the POS.',
    6: 'Firewall whitelist, daily ports & endpoints, and a documented, supportable go-live.'
  };

  function resumeHref() {
    for (const m of A.modules) {
      for (const l of m.lessons) if (!lessonDone(m.id, l.id)) return `#/module/${m.id}/lesson/${l.id}`;
      if (!quizPassed(m.id)) return `#/module/${m.id}/quiz`;
    }
    return null;
  }

  function viewHome() {
    const pct = overallPct();
    const done = modulesDone();
    const resume = resumeHref();
    const rem = remainingMinutes();

    let h = `<div class="home-hero">
      <span class="kicker">GMP Access · Partner Installer Program</span>
      <h2>Installer Academy</h2>
      <p>Everything needed to install, configure, validate, and support GMP Access deployments — built end-to-end from the <em>Access Install V3</em> guide.</p>
      <div class="hero-actions" id="heroActions">
        ${resume ? `<a class="btn accent" href="${resume}">${pct ? 'Resume training' : 'Start Module M01'}</a>`
                 : `<a class="btn accent" href="#/certification">Go to certification</a>`}
        <button class="btn secondary" data-action="quick-intro">${UI('star', 14)} Quick intro</button>
        <button class="btn ghost" data-action="tour">${UI('refresh', 14)} Take the tour</button>
      </div>
    </div>`;

    // progress summary strip
    h += `<div class="prog-summary">
      <div class="ps-main">
        <div class="ps-top"><b>${pct}% complete</b><span>${done} of ${A.modules.length} modules · ~${fmtDur(totalMinutes())} training + ${A.examMeta.minutes}-min certification${rem ? ` · ~${fmtDur(rem)} left` : ''}</span></div>
        ${pbar(pct)}
      </div>
      <div class="ps-stats">
        <div class="ps-stat"><div class="n">${done}/${A.modules.length}</div><div class="l">Modules</div></div>
        <div class="ps-stat"><div class="n">${A.phaseMeta.filter(p => phaseComplete(p.n)).length}/${A.phaseMeta.length}</div><div class="l">Phases</div></div>
        <div class="ps-stat"><div class="n">${state.exam ? (state.exam.passed ? 'PASS' : Math.round(state.exam.best) + '%') : '—'}</div><div class="l">Certification</div></div>
      </div>
    </div>`;

    // certification eligibility banner
    const eligible = certEligible();
    const remain = A.modules.length - done;
    if (eligible) {
      h += `<div class="cert-banner ok" id="certBanner">
        <div class="cb-ico">${UI('check', 22)}</div>
        <div class="cb-body">
          <b>You're eligible for certification${!A.modules.every(moduleComplete) ? ' <span class="cb-note">(admin override active)</span>' : ''}</b>
          <span>${state.exam && state.exam.passed ? 'Passed — best score ' + Math.round(state.exam.best) + '%. You can retake to raise it.' : 'All modules complete. The certification exam takes about ' + A.examMeta.minutes + ' minutes — take it when you\'re ready.'}</span>
        </div>
        <a class="btn accent" href="#/certification">${state.exam && state.exam.passed ? 'Retake' : 'Start certification'}</a>
      </div>`;
    } else {
      h += `<div class="cert-banner locked" id="certBanner">
        <div class="cb-ico">${UI('lock', 20)}</div>
        <div class="cb-body">
          <b>Certification unlocks when all ${A.modules.length} modules are complete</b>
          <span>${remain} module${remain === 1 ? '' : 's'} remaining. Progress checks off automatically as you finish each one.</span>
        </div>
        <a class="btn secondary" href="#/modules">View modules</a>
      </div>`;
    }

    // phase grid
    h += `<h3 class="home-h3">Module progress &amp; certification eligibility</h3>`;
    h += `<div class="phase-grid" id="phaseGrid">`;
    A.phaseMeta.forEach(ph => {
      const mods = A.modules.filter(m => m.phase === ph.n);
      if (!mods.length) return;
      const pc = phaseDoneCount(ph.n);
      const complete = phaseComplete(ph.n);
      const title = ph.title.split('—')[0].trim();
      h += `<div class="phase-card${complete ? ' done' : ''}">
        <div class="pcard-head">
          <span class="pc-num">PHASE ${ph.n}</span>
          <span class="pc-check">${complete ? UI('check', 16) : `${pc.done}/${pc.total}`}</span>
        </div>
        <div class="pc-title">${esc(title)}</div>
        <div class="pc-meta">${fmtDur(phaseMinutes(ph.n))} · ${pc.total} module${pc.total === 1 ? '' : 's'}</div>
        <div class="pc-mods">`;
      mods.forEach(m => {
        const st = moduleState(m);
        const mp = modulePct(m);
        const mark = st === 'done'
          ? `<span class="pm-check done">${UI('check', 13)}</span>`
          : st === 'progress'
            ? `<span class="pm-check prog">${mp}%</span>`
            : `<span class="pm-check todo"></span>`;
        h += `<a class="pm-row${st === 'done' ? ' is-done' : ''}" href="#/module/${m.id}">
          ${mark}
          <span class="pm-code">${m.code}</span>
          <span class="pm-title">${esc(m.title)}</span>
          <span class="pm-min">${m.minutes}m</span>
        </a>`;
      });
      h += `</div></div>`;
    });
    h += `</div>`;

    // quick recap
    h += `<h3 class="home-h3">Quick recap — what this program covers</h3>
      <div class="recap">`;
    A.phaseMeta.forEach(ph => {
      h += `<div class="recap-row"><span class="rc-n">P${ph.n}</span><span class="rc-t"><b>${esc(ph.title.split('—')[0].trim())}.</b> ${esc(RECAP[ph.n] || '')}</span></div>`;
    });
    h += `</div>`;

    return { crumb: '<b>Home</b>', html: h, home: true };
  }

  /* ---------- MODULES (curriculum page) ---------- */
  function viewModules() {
    let h = `<span class="kicker">Curriculum</span><h2 class="page-title">Modules</h2>
      <p class="lede">6 phases, ${A.modules.length} modules, in real deployment order — about ${fmtDur(totalMinutes())} of training plus a ${A.examMeta.minutes}-minute certification. Work them top to bottom, or jump to any module.</p>`;
    A.phaseMeta.forEach(ph => {
      const mods = A.modules.filter(m => m.phase === ph.n);
      if (!mods.length) return;
      const pc = phaseDoneCount(ph.n);
      h += `<div class="mods-phase">
        <div class="mods-phase-head"><span class="ph-num">PHASE ${ph.n}</span><span class="ph-title">${esc(ph.title)}</span>
          <span class="ph-meta">${phaseComplete(ph.n) ? UI('check', 14) + ' complete' : pc.done + '/' + pc.total + ' · ' + fmtDur(phaseMinutes(ph.n))}</span></div>
        <div class="mod-grid">`;
      mods.forEach(m => {
        const st = moduleState(m);
        const badge = st === 'done' ? '<span class="badge done">Complete</span>' : st === 'progress' ? `<span class="badge progress">${modulePct(m)}%</span>` : '<span class="badge todo">Not started</span>';
        h += `<a class="mod-card" href="#/module/${m.id}">
          <div class="mc-top"><span class="mcode">${m.code}</span>${badge}</div>
          <h4>${esc(m.title)}</h4>
          <div class="mc-tag">${esc(m.tagline)}</div>
          <div class="mc-meta"><span>≈${m.minutes} min</span><span>${m.lessons.length} lessons</span><span>${m.quiz.length}-question check</span></div>
        </a>`;
      });
      h += `</div></div>`;
    });
    return { crumb: '<b>Modules</b>', html: h, home: true };
  }

  /* ---------- module / lesson ---------- */
  function viewModule(m) {
    let h = `<span class="kicker">Phase ${m.phase} · ${esc(m.code)}</span><h2 class="page-title">${esc(m.title)}</h2><p class="lede">${esc(m.tagline)}</p>`;
    h += `<div class="lesson-meta"><span>≈${m.minutes} min</span><span>${m.lessons.length} lessons</span><span>${m.quiz.length}-question knowledge check</span>${moduleComplete(m) ? `<span style="color:var(--green-deep);font-weight:700">${UI('check', 12)} Module complete</span>` : ''}</div>`;
    h += `<div class="objectives"><h4>You will be able to</h4><ul>${m.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>`;
    h += '<ul class="lesson-list">';
    m.lessons.forEach((l, i) => {
      const done = lessonDone(m.id, l.id);
      h += `<li><a class="lesson-row" href="#/module/${m.id}/lesson/${l.id}"><span class="num">${m.code}.${i + 1}</span><span class="t">${esc(l.title)}</span><span class="state${done ? ' done' : ''}">${done ? UI('check', 12) + ' Read' : '≈' + l.minutes + ' min'}</span></a></li>`;
    });
    const q = state.quizzes[m.id];
    h += `<li><a class="lesson-row" href="#/module/${m.id}/quiz"><span class="num">${UI('pencil', 14)}</span><span class="t">Knowledge check</span><span class="state${quizPassed(m.id) ? ' done' : ''}">${q ? `${q.score}/${q.total}` + (quizPassed(m.id) ? ' — passed' : ' — retake') : m.quiz.length + ' questions'}</span></a></li>`;
    h += '</ul>';
    h += `<div class="lesson-nav"><a class="btn secondary" href="#/modules">← All modules</a></div>`;
    return { crumb: `${m.code} · <b>${esc(m.title)}</b>`, html: h };
  }

  function viewLesson(m, l) {
    const i = m.lessons.indexOf(l);
    const done = lessonDone(m.id, l.id);
    let h = `<span class="kicker">${esc(m.code)} · Lesson ${i + 1} of ${m.lessons.length}</span><h2 class="page-title">${esc(l.title)}</h2>`;
    h += `<div class="lesson-meta"><span>≈${l.minutes} min</span><span><a href="#/module/${m.id}">${esc(m.title)}</a></span></div>`;
    h += `<div class="prose">${hydrate(l.html)}</div>`;
    h += `<div class="lesson-nav">`;
    if (i > 0) h += `<a class="btn secondary" href="#/module/${m.id}/lesson/${m.lessons[i - 1].id}">← ${esc(m.lessons[i - 1].title)}</a>`;
    else h += `<a class="btn secondary" href="#/module/${m.id}">← Module overview</a>`;
    h += `<span class="spacer"></span>`;
    const nextHref = i < m.lessons.length - 1 ? `#/module/${m.id}/lesson/${m.lessons[i + 1].id}` : `#/module/${m.id}/quiz`;
    h += `<button class="btn ${done ? 'secondary' : ''}" id="markBtn" data-m="${m.id}" data-l="${l.id}" data-next="${nextHref}">${done ? 'Completed — ' + (i < m.lessons.length - 1 ? 'next lesson' : 'knowledge check') + ' →' : 'Mark complete & continue →'}</button>`;
    h += `</div>`;
    return { crumb: `${m.code} · <b>${esc(l.title)}</b>`, html: h };
  }

  /* ---------- quiz engine ---------- */
  let quizRun = null;
  function viewQuiz(m) {
    quizRun = { mid: m.id, questions: m.quiz, answers: new Array(m.quiz.length).fill(null) };
    let h = `<span class="kicker">${esc(m.code)} · Knowledge check</span><h2 class="page-title">${esc(m.title)} — Knowledge Check</h2>
    <p class="lede">${m.quiz.length} questions. Answers reveal immediately with the source reference. Score 70%+ to complete the module.</p>`;
    h += quizBody(m.quiz);
    return { crumb: `${m.code} · <b>Knowledge check</b>`, html: h };
  }

  let examStarted = false;
  let examQuestions = null;
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function shuffleExamQuestions() {
    return shuffle(A.exam).map(q => {
      const order = shuffle(q.options.map((_, i) => i));
      return Object.assign({}, q, { options: order.map(i => q.options[i]), answer: order.indexOf(q.answer) });
    });
  }
  function viewCertification() {
    let h = `<span class="kicker">Final validation</span><h2 class="page-title">${esc(A.examMeta.title)}</h2>
    <p class="lede">${A.exam.length} questions drawn from every module — hardware, lane design, wiring, configuration, testing, POS, and network readiness. About ${A.examMeta.minutes} minutes · pass mark ${A.examMeta.pass}%.</p>`;

    if (!examStarted) {
      if (!certEligible()) {
        const remain = A.modules.length - modulesDone();
        h += `<div class="cert-locked">
          <div class="cl-ico">${UI('lock', 30)}</div>
          <h3>Certification is locked</h3>
          <p>You need to complete all ${A.modules.length} training modules before taking the certification exam. <b>${remain} module${remain === 1 ? '' : 's'} remaining.</b></p>
          ${pbar(overallPct())}
          <p style="margin-top:16px"><a class="btn accent" href="#/modules">Continue training →</a></p>
        </div>`;
        return { crumb: '<b>Certification</b>', html: h };
      }
      if (state.exam) h += `<div class="callout ${state.exam.passed ? 'good' : 'warn'}"><span class="co-label">Previous best</span><p>${Math.round(state.exam.best)}% — ${state.exam.passed ? 'passed. Retaking only raises your record.' : 'not yet passing. Review the flagged modules and retake.'}</p></div>`;
      h += `<div class="exam-cover">
        <h3 style="margin:.2em 0 .5em">Before you begin</h3>
        <form id="examProfile" class="ad-form" style="margin:10px 0 4px">
          <input class="ad-in" name="pname" placeholder="Your name" value="${esc(state.profile ? state.profile.name : '')}" required>
          <input class="ad-in" name="pemail" type="email" placeholder="you@company.com" value="${esc(state.profile ? state.profile.email : '')}" required>
          <button class="btn accent">Begin certification →</button>
        </form>
        <p class="exam-rules">This is a focused session: complete it in this window, in one sitting. Questions and answers are shuffled per attempt, and session activity is recorded with your result.</p>
      </div>`;
      return { crumb: '<b>Certification</b>', html: h };
    }
    if (!examQuestions) examQuestions = shuffleExamQuestions();
    quizRun = { mid: 'exam', questions: examQuestions, answers: new Array(examQuestions.length).fill(null) };
    h += `<div class="exam-live-bar"><span>Focused session in progress — answer all ${A.exam.length} questions.</span><button class="btn small ghost" data-action="abandon-exam">Abandon attempt</button></div>`;
    h += quizBody(examQuestions);
    return { crumb: '<b>Certification · in progress</b>', html: h };
  }

  function quizBody(questions) {
    let h = '';
    questions.forEach((q, qi) => {
      h += `<div class="quiz-q" id="q${qi}"><span class="qnum">Question ${qi + 1} / ${questions.length}</span>${q.type === 'scenario' ? '<span class="scenario-tag">Scenario</span>' : ''}<h4>${esc(q.stem)}</h4>`;
      q.options.forEach((o, oi) => {
        h += `<div class="opt" data-q="${qi}" data-o="${oi}"><span class="dot">${String.fromCharCode(65 + oi)}</span><span>${esc(o)}</span></div>`;
      });
      h += `<div class="explain-slot"></div></div>`;
    });
    h += `<div id="quizResult"></div>`;
    return h;
  }
  function handleOptionClick(el) {
    if (!quizRun) return;
    const qi = +el.dataset.q, oi = +el.dataset.o;
    if (quizRun.answers[qi] !== null) return;
    quizRun.answers[qi] = oi;
    const q = quizRun.questions[qi];
    const box = document.getElementById('q' + qi);
    box.querySelectorAll('.opt').forEach(opt => {
      const o = +opt.dataset.o;
      if (o === q.answer) opt.classList.add('correct');
      else if (o === oi) opt.classList.add('wrong');
      opt.style.cursor = 'default';
    });
    const right = oi === q.answer;
    box.querySelector('.explain-slot').innerHTML =
      `<div class="explain${right ? '' : ' miss'}"><b>${right ? 'Correct.' : 'Not quite.'}</b> ${esc(q.explain)}${q.source ? ` <span class="src">[${esc(q.source)}]</span>` : ''}</div>`;
    if (quizRun.answers.every(a => a !== null)) finishQuiz();
  }
  function finishQuiz() {
    const qs = quizRun.questions;
    const score = quizRun.answers.filter((a, i) => a === qs[i].answer).length;
    const pct = score / qs.length * 100;
    const res = document.getElementById('quizResult');
    if (quizRun.mid === 'exam') {
      const passed = pct >= A.examMeta.pass;
      const prev = state.exam || { best: 0, passed: false };
      const integrity = window.PROCTOR ? window.PROCTOR.stop('finished') : null;
      examStarted = false; examQuestions = null;
      state.exam = { best: Math.max(prev.best, pct), passed: prev.passed || passed, integrity };
      save();
      if (A.adminHooks) A.adminHooks.recordResult({
        kind: 'exam', name: state.profile && state.profile.name, email: state.profile && state.profile.email,
        score, total: qs.length, pct, integrity, ts: Date.now()
      });
      res.innerHTML = `<div class="quiz-score"><div class="big">${score}/${qs.length} — ${Math.round(pct)}%</div>
        <p>${passed ? UI('check', 15) + ' Certified. You have demonstrated end-to-end command of the GMP Access install program — hardware through handoff.' : `Pass mark is ${A.examMeta.pass}%. Review the modules referenced in the questions you missed, then retake.`}</p>
        <p><a class="btn accent" href="#/certification">Retake</a> <a class="btn secondary" href="#/" style="margin-left:8px">Home</a></p></div>`;
    } else {
      state.quizzes[quizRun.mid] = { score, total: qs.length, ts: Date.now() };
      save();
      if (A.adminHooks) A.adminHooks.recordResult({
        kind: 'quiz', module: (mod(quizRun.mid) || {}).code, name: state.profile && state.profile.name,
        email: state.profile && state.profile.email, score, total: qs.length, pct, ts: Date.now()
      });
      const passed = pct >= 70;
      const m = mod(quizRun.mid);
      const idx = A.modules.indexOf(m);
      const next = A.modules[idx + 1];
      const justCompleted = passed && moduleLessonsDone(m);
      res.innerHTML = `<div class="quiz-score"><div class="big">${score}/${qs.length}</div>
        <p>${passed ? UI('check', 15) + ' Knowledge check passed' + (justCompleted ? ' — module complete and checked off on your Home dashboard.' : ' — finish the remaining lessons to complete the module.') : 'Below 70% — review the lessons and retake to complete the module.'}</p>
        <p>${passed && next ? `<a class="btn accent" href="#/module/${next.id}">Next module: ${esc(next.code)} →</a>` : `<a class="btn accent" href="#/module/${quizRun.mid}/quiz">Retake</a>`}
        <a class="btn secondary" href="#/module/${quizRun.mid}" style="margin-left:8px">Module overview</a></p></div>`;
      renderRail(location.hash || '#/');
    }
    res.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- field kit (landing page + dark card view) ---------- */
  function viewFieldKit() {
    let h = `<span class="kicker">On-site reference</span><h2 class="page-title">Field kit</h2>
      <p class="lede">Quick reference for on-site work. Cards open in a high-contrast dark view built for sunlight and gloves; checklists remember their state on this device.</p>
      <div class="fk-grid">`;
    A.fieldCards.forEach(c => {
      h += `<a class="fk-card" href="#/field/${c.id}"><div class="fc-ico">${UI(c.icon, 22)}</div><h4>${esc(c.title)}</h4><p>${esc(c.desc)}</p></a>`;
    });
    h += `</div>`;
    return { crumb: '<b>Field kit</b>', html: h };
  }
  function viewFieldCard(cardId) {
    const c = A.fieldCards.find(x => x.id === cardId);
    if (!c) return viewFieldKit();
    document.body.classList.add('field-mode');
    let h = `<div class="field-head"><div><span class="kicker">Field kit · on-site view</span><h2>${UI(c.icon, 22)} ${esc(c.title)}</h2></div></div><div class="field-panel">`;
    if (c.checklist) {
      const st = state.fieldChecks[c.id] || {};
      h += `<ul class="checklist">`;
      c.checklist.forEach((item, i) => {
        h += `<li data-card="${c.id}" data-i="${i}" class="${st[i] ? 'done' : ''}"><span class="box">${UI('check', 13)}</span><span class="txt">${item.t}${item.why ? `<span class="why">${item.why}</span>` : ''}</span></li>`;
      });
      h += `</ul><p style="margin-top:14px"><button class="btn secondary small" id="resetChecks" data-card="${c.id}">Reset checklist</button></p>`;
    }
    if (c.html) h += hydrate(c.html);
    h += `<p class="src" style="color:var(--dark-muted)">Source: GMP Access Install V3, ${esc(c.source)}</p></div>
    <p><a class="btn secondary" href="#/field">← All field cards</a></p>`;
    return { crumb: `Field kit · <b>${esc(c.title)}</b>`, html: `<div class="field-wrap">${h}</div>`, bare: true };
  }

  /* ---------- glossary page ---------- */
  function viewGlossary() {
    let h = `<span class="kicker">Reference</span><h2 class="page-title">Glossary</h2>
      <p class="lede">Every term the curriculum and the field will throw at you, in plain English — grounded in the Access Install V3 guide.</p>
      <div class="gloss-grid">`;
    A.glossary.forEach(g => {
      h += `<div class="gloss-card"><div class="wl-ico">${A.glossIcon(g.icon)}</div><h4>${esc(g.term)}</h4><p>${esc(g.def)}</p><a href="#/module/${g.mod}">Covered in ${g.mod.toUpperCase()} →</a></div>`;
    });
    h += `</div>`;
    return { crumb: '<b>Glossary</b>', html: h };
  }

  /* ---------- coverage map ---------- */
  function viewCoverage() {
    let h = `<span class="kicker">Content fidelity</span><h2 class="page-title">Source Coverage Map</h2>
    <p class="lede">Every section of <em>GMP Access Install V3</em> mapped to where it lives in this academy. Ambiguities in the source are flagged in-line in the lessons rather than silently resolved.</p>
    <div class="tablewrap"><table class="spec wraprow">
    <tr><th>Source section (page)</th><th>Location here</th><th>Treatment</th></tr>`;
    A.coverage.forEach(r => { h += `<tr class="cov-row"><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`; });
    h += `</table></div>
    <div class="callout ambiguity"><span class="co-label">Known source ambiguities — flagged, not guessed</span>
    <ul>
      <li>iPro camera priced ~$1,100 (p.7) vs ~$1,500 (p.24) → both shown, flagged in M03.</li>
      <li>Zentron 21 dimension table prints two heights (55.8" H … 22.5" H) → flagged in M04.</li>
      <li>USB section mentions "Ubuntu 18.04 iso" once while specifying 24.04.03 LTS → flagged in M10; 24.04.03 operative.</li>
      <li>WISE Windows steps say set PC to 10.0.0.1, contradicting the guide's own warning and its 10.0.0.2 instruction → flagged and resolved per the warning in M11.</li>
      <li>Presence loop: descriptive text says signal at NO5; connection step says DI0 → NC5 → both reproduced in M08 with a verify-by-metal-test note.</li>
      <li>Tap &amp; Park section's lead sentence is truncated in the source → noted in M13; available steps fully reproduced.</li>
      <li>Purchase URLs are embedded hyperlinks in the PDF (not printed text) → item list + coordination rules preserved in M06; keep the PDF for the live links.</li>
    </ul></div>`;
    return { crumb: '<b>Coverage map</b>', html: h };
  }

  /* ---------- textbook (printable) ---------- */
  function viewTextbook() {
    let h = `<div class="print-controls no-print"><b style="font-size:.9rem">Installer Textbook</b>
      <span style="color:var(--muted);font-size:.8rem;flex:1">Complete curriculum + field reference, print-optimized. Use your browser's "Save as PDF" for a downloadable copy.</span>
      <a class="btn secondary small" href="#/glossary">Glossary</a>
      <a class="btn secondary small" href="#/coverage">Coverage map</a>
      <button class="btn accent" onclick="window.print()">Print / Save as PDF</button></div>
    <div class="guide">
      <div class="g-cover"><p class="kicker">GMP Access · Partner Installer Program</p>
      <h1>Installer Textbook</h1>
      <p>The complete GMP Access (IoT GateKit) installation curriculum<br>compiled from <em>Access Install V3</em></p>
      <p class="src">For authorized use only · Generated by the GMP Access Installer Academy</p></div>`;
    A.phaseMeta.forEach(p => {
      A.modules.filter(m => m.phase === p.n).forEach(m => {
        h += `<div class="g-module"><h2>${esc(m.code)} — ${esc(m.title)}</h2><p><em>${esc(m.tagline)}</em></p>`;
        m.lessons.forEach(l => { h += `<div class="g-lesson"><h3>${esc(l.title)}</h3><div class="prose">${hydrate(l.html)}</div></div>`; });
        h += `</div>`;
      });
    });
    h += `<div class="g-module"><h2>Field Reference Cards</h2>`;
    A.fieldCards.forEach(c => {
      h += `<div class="g-lesson light"><h3>${esc(c.title)}</h3>`;
      if (c.checklist) h += `<ul>${c.checklist.map(i => `<li>☐ ${i.t}${i.why ? ` — <em>${i.why}</em>` : ''}</li>`).join('')}</ul>`;
      if (c.html) h += `<div class="prose">${hydrate(c.html)}</div>`;
      h += `<p class="src">Source: ${esc(c.source)}</p></div>`;
    });
    h += `</div></div>`;
    return { crumb: '<b>Textbook</b>', html: h, wide: true, noPad: true };
  }

  /* ---------- search ---------- */
  let searchIndex = null;
  function buildIndex() {
    if (searchIndex) return searchIndex;
    searchIndex = [];
    const strip = html => html.replace(/\[\[DIAGRAM:\w+\]\]/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    A.modules.forEach(m => m.lessons.forEach(l => {
      searchIndex.push({ where: `${m.code} · ${l.title}`, text: (l.title + ' ' + strip(l.html)).toLowerCase(), href: `#/module/${m.id}/lesson/${l.id}` });
    }));
    A.fieldCards.forEach(c => {
      const t = (c.title + ' ' + c.desc + ' ' + (c.html ? strip(c.html) : '') + ' ' + (c.checklist ? c.checklist.map(i => i.t).join(' ') : '')).toLowerCase();
      searchIndex.push({ where: `Field · ${c.title}`, text: t, href: `#/field/${c.id}` });
    });
    A.glossary.forEach(g => searchIndex.push({ where: `Glossary · ${g.term}`, text: (g.term + ' ' + g.def).toLowerCase(), href: `#/glossary` }));
    return searchIndex;
  }
  function doSearch(q) {
    const box = $('#searchResults');
    q = q.trim().toLowerCase();
    if (q.length < 2) { box.style.display = 'none'; return; }
    const hits = buildIndex().filter(e => e.text.includes(q)).slice(0, 12);
    box.innerHTML = hits.length
      ? hits.map(hit => {
          const pos = hit.text.indexOf(q);
          const ctx = hit.text.slice(Math.max(0, pos - 40), pos + 60);
          return `<a href="${hit.href}"><span class="where">${esc(hit.where)}</span>…${esc(ctx)}…</a>`;
        }).join('')
      : '<div class="none">No matches in the curriculum, field cards, or glossary.</div>';
    box.style.display = 'block';
  }

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash || '#/';
    // certification lock: while a focused session runs, quietly log & bounce navigation
    if (window.PROCTOR && window.PROCTOR.active && hash !== '#/certification' && hash !== '#/exam') {
      window.PROCTOR.note('nav-attempt', hash);
      location.hash = '#/certification';
      return;
    }
    document.body.classList.remove('field-mode');
    let v;
    const parts = hash.slice(2).split('/');
    const p0 = parts[0];
    if (hash === '#/' || hash === '#' || p0 === '' || p0 === 'welcome') v = viewHome();
    else if (p0 === 'modules') v = viewModules();
    else if (p0 === 'module' && parts[1]) {
      const m = mod(parts[1]);
      if (!m) v = viewModules();
      else if (parts[2] === 'lesson' && parts[3]) { const l = m.lessons.find(x => x.id === parts[3]); v = l ? viewLesson(m, l) : viewModule(m); }
      else if (parts[2] === 'quiz') v = viewQuiz(m);
      else v = viewModule(m);
    }
    else if (p0 === 'field' && parts[1]) v = viewFieldCard(parts[1]);
    else if (p0 === 'field') v = viewFieldKit();
    else if (p0 === 'glossary') v = viewGlossary();
    else if (p0 === 'certification' || p0 === 'exam') v = viewCertification();
    else if (p0 === 'admin') v = A.viewAdmin(parts.slice(1));
    else if (p0 === 'coverage') v = viewCoverage();
    else if (p0 === 'textbook' || p0 === 'guide') v = viewTextbook();
    else v = viewHome();

    const content = $('#content');
    content.className = 'content' + (v.wide ? ' wide' : '') + (v.home ? ' home' : '');
    content.style.padding = v.noPad ? '0' : '';
    content.style.maxWidth = v.bare ? 'none' : '';
    content.innerHTML = v.html;
    $('#crumb').innerHTML = v.crumb || '';
    $('#searchResults').style.display = 'none';
    renderRail(hash);
    window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const opt = e.target.closest('.opt');
    if (opt) { handleOptionClick(opt); return; }
    const mark = e.target.closest('#markBtn');
    if (mark) { state.lessons[mark.dataset.m + '/' + mark.dataset.l] = true; save(); location.hash = mark.dataset.next; return; }
    const check = e.target.closest('.checklist li');
    if (check && check.dataset.card) {
      const cid = check.dataset.card, i = check.dataset.i;
      state.fieldChecks[cid] = state.fieldChecks[cid] || {};
      state.fieldChecks[cid][i] = !state.fieldChecks[cid][i];
      check.classList.toggle('done', !!state.fieldChecks[cid][i]);
      save();
      return;
    }
    const reset = e.target.closest('#resetChecks');
    if (reset) { delete state.fieldChecks[reset.dataset.card]; save(); route(); return; }
    const tourBtn = e.target.closest('[data-action="tour"]');
    if (tourBtn) { A.startTour(); return; }
    const qi = e.target.closest('[data-action="quick-intro"]');
    if (qi) { if (A.openQuickIntro) A.openQuickIntro(); return; }
    const abandon = e.target.closest('[data-action="abandon-exam"]');
    if (abandon) {
      const integrity = window.PROCTOR ? window.PROCTOR.stop('abandoned') : null;
      examStarted = false; quizRun = null; examQuestions = null;
      if (A.adminHooks) A.adminHooks.recordResult({
        kind: 'exam', name: state.profile && state.profile.name, email: state.profile && state.profile.email,
        score: 0, total: A.exam.length, pct: 0, integrity, ts: Date.now()
      });
      location.hash = '#/';
      return;
    }
    if (!e.target.closest('.search-box')) $('#searchResults').style.display = 'none';
  });
  document.addEventListener('submit', e => {
    const f = e.target.closest('#examProfile');
    if (!f) return;
    e.preventDefault();
    state.profile = { name: f.elements.pname.value.trim(), email: f.elements.pemail.value.trim() };
    save();
    examStarted = true;
    if (window.PROCTOR) window.PROCTOR.start();
    route();
  });
  $('#searchInput').addEventListener('input', e => doSearch(e.target.value));
  $('#searchInput').addEventListener('focus', e => doSearch(e.target.value));
  window.addEventListener('hashchange', route);
  route();
})();
