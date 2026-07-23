/* ============================================================
   GMP Access Installer Academy — application engine v2
   Icon rail + slide-over curriculum panel + merged home page.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const D = window.DIAGRAMS;
  const $ = sel => document.querySelector(sel);

  /* GMP pin + gate-arm mark — same shape language as GMP's own product icons
     (a location pin containing a glyph unique to the product; gate-arm = Access). */
  const LOGO_MARK = `<svg viewBox="0 0 100 100" role="img" aria-label="GMP Access">
    <path d="M50 6C29 6 13 22 13 43c0 27 37 51 37 51s37-24 37-51C87 22 71 6 50 6z" fill="#23ad5e"/>
    <g transform="translate(50,42)">
      <rect x="-5" y="-16" width="10" height="30" rx="3" fill="#ffc300"/>
      <rect x="-3" y="-24" width="26" height="8" rx="3" fill="#ffc300" transform="rotate(-18)"/>
    </g>
  </svg>`;

  /* ---------- persistent state ---------- */
  const KEY = 'gmpAcademyV1';
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  state.lessons = state.lessons || {};
  state.quizzes = state.quizzes || {};
  state.exam = state.exam || null;
  state.fieldChecks = state.fieldChecks || {};
  state.sections = state.sections || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  A.appHooks = { getState: () => state, save, rerender: () => route() };

  /* ---------- helpers ---------- */
  const mod = id => A.modules.find(m => m.id === id);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
  function overallPct() {
    let done = 0, total = 0;
    A.modules.forEach(m => {
      total += m.lessons.length + 1;
      m.lessons.forEach(l => { if (lessonDone(m.id, l.id)) done++; });
      if (quizPassed(m.id)) done++;
    });
    return total ? Math.round(done / total * 100) : 0;
  }
  function phasePct(pn) {
    const mods = A.modules.filter(m => m.phase === pn);
    const done = mods.filter(moduleComplete).length;
    return `${done}/${mods.length} complete`;
  }
  function secOpen(id, def) { return state.sections[id] === undefined ? def : !!state.sections[id]; }

  /* ---------- rail ---------- */
  const RAIL = [
    { id: 'home', ico: 'home', label: 'Home', href: '#/', match: h => h === '#/' || h === '#' || h === '' },
    { id: 'modules', ico: 'grid', label: 'Modules', panel: true, match: h => h.startsWith('#/module/') },
    { id: 'field', ico: 'bolt', label: 'Field kit', href: '#/field', match: h => h.startsWith('#/field') },
    { id: 'exam', ico: 'check', label: 'Exam', href: '#/exam', match: h => h === '#/exam' },
    { id: 'guide', ico: 'printer', label: 'Guide', href: '#/guide', match: h => h === '#/guide' },
    { id: 'admin', ico: 'gear', label: 'Admin', href: '#/admin', match: h => h.startsWith('#/admin') }
  ];
  function renderRail(hash) {
    const rail = $('#rail');
    let h = `<a class="rail-logo" href="#/" title="GMP Access Installer Academy">${LOGO_MARK}</a>`;
    RAIL.forEach(r => {
      const active = r.match(hash);
      if (r.panel) h += `<button class="rail-item${active ? ' active' : ''}" id="railModules" title="Browse all modules"><span class="ri">${UI(r.ico, 19)}</span>${r.label}</button>`;
      else h += `<a class="rail-item${active ? ' active' : ''}" href="${r.href}"><span class="ri">${UI(r.ico, 19)}</span>${r.label}</a>`;
    });
    h += `<div class="rail-spacer"></div>`;
    const pct = overallPct();
    h += `<div class="rail-progress" title="Curriculum progress"><div class="ring" style="background:conic-gradient(var(--accent-bright) ${pct * 3.6}deg, var(--line) 0)"><span style="background:var(--bg);border-radius:50%;width:27px;height:27px;display:flex;align-items:center;justify-content:center">${pct}%</span></div></div>`;
    rail.innerHTML = h;
  }
  function renderPanel(hash) {
    const p = $('#navPanel');
    let h = `<div class="np-head"><b>Curriculum</b><button class="np-close" aria-label="Close">${UI('close', 15)}</button></div>`;
    A.phaseMeta.forEach(ph => {
      const mods = A.modules.filter(m => m.phase === ph.n);
      if (!mods.length) return;
      h += `<div class="np-section">Phase ${ph.n} · ${esc(ph.title.split('—')[0].trim())}</div>`;
      mods.forEach(m => {
        const st = moduleState(m);
        const tick = st === 'done' ? '<span class="tick">●</span>' : (st === 'progress' ? '<span class="tick partial">●</span>' : '');
        const active = hash.startsWith('#/module/' + m.id);
        h += `<a class="np-link${active ? ' active' : ''}" href="#/module/${m.id}"><span class="mcode">${m.code}</span><span>${esc(m.title)}</span>${tick}</a>`;
      });
    });
    h += `<div class="np-section">Validate & reference</div>`;
    h += `<a class="np-link${hash === '#/exam' ? ' active' : ''}" href="#/exam"><span class="mcode">${UI('check', 13)}</span><span>Final Readiness Exam${state.exam && state.exam.passed ? ' — passed' : ''}</span></a>`;
    h += `<a class="np-link" href="#/guide"><span class="mcode">${UI('printer', 13)}</span><span>Printable Field Guide</span></a>`;
    h += `<a class="np-link" href="#/coverage"><span class="mcode">${UI('map', 13)}</span><span>Source Coverage Map</span></a>`;
    p.innerHTML = h;
  }

  /* ---------- merged home ---------- */
  function section(id, ico, title, sub, meta, bodyHtml, defOpen) {
    return `<details class="sect" data-sec="${id}"${secOpen(id, defOpen) ? ' open' : ''}>
      <summary><span class="sect-ico">${UI(ico, 18)}</span><span class="sect-tt"><b>${esc(title)}</b><span>${esc(sub)}</span></span><span class="sect-meta">${esc(meta || '')}</span><span class="sect-chev">${UI('chevron', 13)}</span></summary>
      <div class="sect-body">${bodyHtml}</div></details>`;
  }

  function viewHome(opts) {
    opts = opts || {};
    const pct = overallPct();
    const modsDone = A.modules.filter(moduleComplete).length;
    let resume = '';
    outer: for (const m of A.modules) {
      for (const l of m.lessons) {
        if (!lessonDone(m.id, l.id)) { resume = `#/module/${m.id}/lesson/${l.id}`; break outer; }
      }
      if (!quizPassed(m.id)) { resume = `#/module/${m.id}/quiz`; break; }
    }
    let h = `<div class="home-hero">
      <span class="kicker">GMP Access · Partner Installer Program</span>
      <h2>Installer Academy</h2>
      <p>Everything needed to install, configure, validate, and support GMP Access deployments — built end-to-end from the <em>Access Install V3</em> guide.</p>
      <div class="hero-actions">
        ${resume ? `<a class="btn accent" href="${resume}">${pct ? 'Resume training' : 'Start Module M01'}</a>` : '<a class="btn accent" href="#/exam">Take the readiness exam</a>'}
        <button class="btn secondary" data-action="tour">${UI('refresh', 14)} 30-sec tour</button>
      </div>
    </div>`;

    // 1 · Start here
    const startOpen = !state.onboarded;
    h += section('start', 'star', 'Start here', 'New to GMP? A 6-step visual intro — no prior knowledge assumed.',
      state.onboarded ? 'completed' : 'new',
      `<div id="introSlot">${A.introSlideHtml()}</div>`, startOpen);

    // 2 · Progress
    h += section('progress', 'gauge', 'Your progress', 'Lessons, knowledge checks, and exam status on this device.', pct + '%',
      `<div class="stat-row">
        <div class="stat"><div class="n">${pct}%</div><div class="l">Overall</div></div>
        <div class="stat"><div class="n">${modsDone}/14</div><div class="l">Modules complete</div></div>
        <div class="stat"><div class="n">${Object.keys(state.quizzes).length}/14</div><div class="l">Checks taken</div></div>
        <div class="stat"><div class="n">${state.exam ? (state.exam.passed ? 'PASS' : Math.round(state.exam.best) + '%') : '—'}</div><div class="l">Readiness exam</div></div>
      </div>`, state.onboarded === true);

    // 3 · Curriculum
    let cur = '';
    A.phaseMeta.forEach((ph, pi) => {
      const mods = A.modules.filter(m => m.phase === ph.n);
      if (!mods.length) return;
      const phOpen = secOpen('phase' + ph.n, pi === 0);
      cur += `<details class="phase" data-sec="phase${ph.n}"${phOpen ? ' open' : ''}>
        <summary><span class="ph-num">PHASE ${ph.n}</span><span class="ph-title">${esc(ph.title)}</span><span class="ph-meta">${phasePct(ph.n)}</span><span class="sect-chev">${UI('chevron', 12)}</span></summary>
        <div class="mod-grid">`;
      mods.forEach(m => {
        const st = moduleState(m);
        const badge = st === 'done' ? '<span class="badge done">Complete</span>' : st === 'progress' ? '<span class="badge progress">In progress</span>' : '<span class="badge todo">Not started</span>';
        cur += `<a class="mod-card" href="#/module/${m.id}">
          <div class="mc-top"><span class="mcode">${m.code}</span>${badge}</div>
          <h4>${esc(m.title)}</h4>
          <div class="mc-tag">${esc(m.tagline)}</div>
          <div class="mc-meta"><span>≈${m.minutes} min</span><span>${m.lessons.length} lessons</span><span>${m.quiz.length}-question check</span></div>
        </a>`;
      });
      cur += `</div></details>`;
    });
    h += section('curriculum', 'grid', 'Curriculum', '6 phases · 14 modules · in real deployment order.', `${modsDone}/14 complete`, cur, true);

    // 4 · Field kit
    let fk = `<p class="fk-note">Quick reference for on-site work. Cards open in a high-contrast dark view built for sunlight and gloves; checklists remember their state on this device.</p><div class="fk-grid">`;
    A.fieldCards.forEach(c => {
      fk += `<a class="fk-card" href="#/field/${c.id}"><div class="fc-ico">${UI(c.icon, 22)}</div><h4>${esc(c.title)}</h4><p>${esc(c.desc)}</p></a>`;
    });
    fk += `</div>`;
    h += section('field', 'bolt', 'Field kit', 'Checklists, pinouts, credentials, distances — for the gate cabinet.', A.fieldCards.length + ' cards', fk, state.onboarded === true);

    // 5 · Glossary
    let gl = `<div class="gloss-grid">`;
    A.glossary.forEach(g => {
      gl += `<div class="gloss-card"><div class="wl-ico">${A.glossIcon(g.icon)}</div><h4>${esc(g.term)}</h4><p>${esc(g.def)}</p><a href="#/module/${g.mod}">Covered in ${g.mod.toUpperCase()} →</a></div>`;
    });
    gl += `</div>`;
    h += section('glossary', 'book', 'Glossary', 'Every term in plain English, linked to the module that teaches it.', A.glossary.length + ' terms', gl, false);

    // 6 · Reference
    h += section('reference', 'printer', 'Reference & validation', 'The exam, the printable textbook, and the source coverage map.', '',
      `<div class="ref-row">
        <a class="mod-card" href="#/exam"><div class="mc-top"><span class="mcode">EXAM</span>${state.exam && state.exam.passed ? '<span class="badge done">Passed</span>' : '<span class="badge todo">30 questions</span>'}</div><h4>Final Readiness Exam</h4><div class="mc-tag">Drawn from every module · pass mark 80%.</div></a>
        <a class="mod-card" href="#/guide"><div class="mc-top"><span class="mcode">PRINT</span></div><h4>Printable Field Guide</h4><div class="mc-tag">The full curriculum as a print-ready textbook (Save as PDF).</div></a>
        <a class="mod-card" href="#/coverage"><div class="mc-top"><span class="mcode">MAP</span></div><h4>Source Coverage Map</h4><div class="mc-tag">Every section of Access Install V3 → where it lives here.</div></a>
      </div>`, false);

    return { crumb: '<b>Home</b>', html: h, scrollTo: opts.scrollTo };
  }

  /* ---------- module / lesson (unchanged views) ---------- */
  function viewModule(m) {
    let h = `<span class="kicker">Phase ${m.phase} · ${esc(m.code)}</span><h2 class="page-title">${esc(m.title)}</h2><p class="lede">${esc(m.tagline)}</p>`;
    h += `<div class="lesson-meta"><span>≈${m.minutes} min</span><span>${m.lessons.length} lessons</span><span>${m.quiz.length}-question knowledge check</span></div>`;
    h += `<div class="objectives"><h4>You will be able to</h4><ul>${m.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div>`;
    h += '<ul class="lesson-list">';
    m.lessons.forEach((l, i) => {
      const done = lessonDone(m.id, l.id);
      h += `<li><a class="lesson-row" href="#/module/${m.id}/lesson/${l.id}"><span class="num">${m.code}.${i + 1}</span><span class="t">${esc(l.title)}</span><span class="state${done ? ' done' : ''}">${done ? UI('check', 12) + ' Read' : '≈' + l.minutes + ' min'}</span></a></li>`;
    });
    const q = state.quizzes[m.id];
    h += `<li><a class="lesson-row" href="#/module/${m.id}/quiz"><span class="num">${UI('pencil', 14)}</span><span class="t">Knowledge check</span><span class="state${quizPassed(m.id) ? ' done' : ''}">${q ? `${q.score}/${q.total}` + (quizPassed(m.id) ? ' — passed' : ' — retake') : m.quiz.length + ' questions'}</span></a></li>`;
    h += '</ul>';
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
    h += `<button class="btn ${done ? 'secondary' : ''}" id="markBtn" data-m="${m.id}" data-l="${l.id}" data-next="${nextHref}">${done ? 'Completed ✓ — ' + (i < m.lessons.length - 1 ? 'next lesson' : 'knowledge check') + ' →' : 'Mark complete & continue →'}</button>`;
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
  function viewExam() {
    let h = `<span class="kicker">Final validation</span><h2 class="page-title">${esc(A.examMeta.title)}</h2>
    <p class="lede">${A.exam.length} questions drawn from every module — hardware, lane design, wiring, configuration, testing, POS, and network readiness. Pass mark: ${A.examMeta.pass}%.</p>`;
    if (!examStarted) {
      if (state.exam) h += `<div class="callout ${state.exam.passed ? 'good' : 'warn'}"><span class="co-label">Previous best</span><p>${Math.round(state.exam.best)}% — ${state.exam.passed ? 'passed. Retaking only raises your record.' : 'not yet passing. Review the flagged modules and retake.'}</p></div>`;
      h += `<div class="exam-cover">
        <h3 style="margin:.2em 0 .5em">Before you begin</h3>
        <form id="examProfile" class="ad-form" style="margin:10px 0 4px">
          <input class="ad-in" name="pname" placeholder="Your name" value="${esc(state.profile ? state.profile.name : '')}" required>
          <input class="ad-in" name="pemail" type="email" placeholder="you@company.com" value="${esc(state.profile ? state.profile.email : '')}" required>
          <button class="btn accent">Begin exam →</button>
        </form>
        <p class="exam-rules">This is a focused session: complete it in this window, in one sitting. Session activity is recorded with your attempt.</p>
      </div>`;
      return { crumb: '<b>Final Readiness Exam</b>', html: h };
    }
    if (!examQuestions) examQuestions = shuffleExamQuestions();
    quizRun = { mid: 'exam', questions: examQuestions, answers: new Array(examQuestions.length).fill(null) };
    h += `<div class="exam-live-bar"><span>Focused session in progress — answer all ${A.exam.length} questions.</span><button class="btn small ghost" data-action="abandon-exam">Abandon attempt</button></div>`;
    h += quizBody(examQuestions);
    return { crumb: '<b>Final Readiness Exam · in progress</b>', html: h };
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
        <p>${passed ? UI('check', 15) + ' Readiness exam passed. You have demonstrated end-to-end command of the GMP Access install program — hardware through handoff.' : `Pass mark is ${A.examMeta.pass}%. Review the modules referenced in the questions you missed, then retake.`}</p>
        <p><a class="btn accent" href="#/exam">Retake</a> <a class="btn secondary" href="#/" style="margin-left:8px">Home</a></p></div>`;
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
      res.innerHTML = `<div class="quiz-score"><div class="big">${score}/${qs.length}</div>
        <p>${passed ? UI('check', 15) + ' Knowledge check passed' + (moduleLessonsDone(m) ? ' — module complete.' : ' — finish the remaining lessons to complete the module.') : 'Below 70% — review the lessons and retake to complete the module.'}</p>
        <p>${passed && next ? `<a class="btn accent" href="#/module/${next.id}">Next module: ${esc(next.code)} →</a>` : `<a class="btn accent" href="#/module/${quizRun.mid}/quiz">Retake</a>`}
        <a class="btn secondary" href="#/module/${quizRun.mid}" style="margin-left:8px">Module overview</a></p></div>`;
      renderRail(location.hash || '#/');
    }
    res.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- field card (dark on-site view) ---------- */
  function viewFieldCard(cardId) {
    const c = A.fieldCards.find(x => x.id === cardId);
    if (!c) return viewHome({ scrollTo: 'field' });
    document.body.classList.add('field-mode');
    let h = `<div class="field-head"><div><span class="kicker">Field kit · on-site view</span><h2>${UI(c.icon, 22)} ${esc(c.title)}</h2></div></div><div class="field-panel">`;
    if (c.checklist) {
      const st = state.fieldChecks[c.id] || {};
      h += `<ul class="checklist">`;
      c.checklist.forEach((item, i) => {
        h += `<li data-card="${c.id}" data-i="${i}" class="${st[i] ? 'done' : ''}"><span class="box">✓</span><span class="txt">${item.t}${item.why ? `<span class="why">${item.why}</span>` : ''}</span></li>`;
      });
      h += `</ul><p style="margin-top:14px"><button class="btn secondary small" id="resetChecks" data-card="${c.id}">Reset checklist</button></p>`;
    }
    if (c.html) h += hydrate(c.html);
    h += `<p class="src" style="color:var(--dark-muted)">Source: GMP Access Install V3, ${esc(c.source)}</p></div>
    <p><a class="btn secondary" href="#/field">← All field cards</a></p>`;
    return { crumb: `Field kit · <b>${esc(c.title)}</b>`, html: `<div class="field-wrap">${h}</div>`, bare: true };
  }

  /* ---------- coverage map ---------- */
  function viewCoverage() {
    let h = `<span class="kicker">Content fidelity</span><h2 class="page-title">Source Coverage Map</h2>
    <p class="lede">Every section of <em>GMP Access Install V3</em> mapped to where it lives in this academy. Ambiguities in the source are flagged in-line in the lessons rather than silently resolved.</p>
    <div class="tablewrap"><table class="spec wraprow">
    <tr><th>Source section (page)</th><th>Location here</th><th>Treatment</th></tr>`;
    A.coverage.forEach(r => {
      h += `<tr class="cov-row"><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`;
    });
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

  /* ---------- printable guide ---------- */
  function viewGuide() {
    let h = `<div class="print-controls no-print"><b style="font-size:.9rem">Printable Field Guide</b>
      <span style="color:var(--muted);font-size:.8rem;flex:1">Complete curriculum + field reference, print-optimized. Use your browser's "Save as PDF" for a downloadable copy.</span>
      <button class="btn accent" onclick="window.print()">Print / Save as PDF</button></div>
    <div class="guide">
      <div class="g-cover"><p class="kicker">GMP Access · Partner Installer Program</p>
      <h1>Installer Field Guide</h1>
      <p>The complete GMP Access (IoT GateKit) installation curriculum<br>compiled from <em>Access Install V3</em></p>
      <p class="src">For authorized use only · Generated by the GMP Access Installer Academy</p></div>`;
    A.phaseMeta.forEach(p => {
      const mods = A.modules.filter(m => m.phase === p.n);
      mods.forEach(m => {
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
    return { crumb: '<b>Printable Field Guide</b>', html: h, wide: true, noPad: true };
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
    A.glossary.forEach(g => {
      searchIndex.push({ where: `Glossary · ${g.term}`, text: (g.term + ' ' + g.def).toLowerCase(), href: `#/glossary` });
    });
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
  function closePanel() { document.body.classList.remove('panel-open'); }
  function route() {
    const hash = location.hash || '#/';
    // exam lock: while a focused session is running, quietly log & bounce navigation
    if (window.PROCTOR && window.PROCTOR.active && hash !== '#/exam') {
      window.PROCTOR.note('nav-attempt', hash);
      location.hash = '#/exam';
      return;
    }
    document.body.classList.remove('field-mode');
    closePanel();
    let v;
    const parts = hash.slice(2).split('/');
    if (hash === '#/' || hash === '#') v = viewHome();
    else if (parts[0] === 'welcome') v = viewHome({ scrollTo: 'start', open: 'start' });
    else if (parts[0] === 'glossary') v = viewHome({ scrollTo: 'glossary', open: 'glossary' });
    else if (parts[0] === 'field' && !parts[1]) v = viewHome({ scrollTo: 'field', open: 'field' });
    else if (parts[0] === 'field' && parts[1]) v = viewFieldCard(parts[1]);
    else if (parts[0] === 'module' && parts[1]) {
      const m = mod(parts[1]);
      if (!m) v = viewHome();
      else if (parts[2] === 'lesson' && parts[3]) {
        const l = m.lessons.find(x => x.id === parts[3]);
        v = l ? viewLesson(m, l) : viewModule(m);
      }
      else if (parts[2] === 'quiz') v = viewQuiz(m);
      else v = viewModule(m);
    }
    else if (parts[0] === 'exam') v = viewExam();
    else if (parts[0] === 'admin') v = A.viewAdmin(parts.slice(1));
    else if (parts[0] === 'coverage') v = viewCoverage();
    else if (parts[0] === 'guide') v = viewGuide();
    else v = viewHome();

    // route-level section opening (e.g. #/glossary)
    if (v.scrollTo || (parts[0] === 'welcome' || parts[0] === 'glossary' || (parts[0] === 'field' && !parts[1]))) {
      const target = v.scrollTo;
      if (target) state.sections[target] = true;
    }

    const content = $('#content');
    content.className = 'content' + (v.wide ? ' wide' : '');
    if (v.noPad) content.style.padding = '0'; else content.style.padding = '';
    if (v.bare) content.style.maxWidth = 'none'; else content.style.maxWidth = '';
    content.innerHTML = v.html;
    $('#crumb').innerHTML = v.crumb || '';
    $('#searchResults').style.display = 'none';
    renderRail(hash);
    renderPanel(hash);
    if (v.scrollTo) {
      const sec = document.querySelector(`details.sect[data-sec="${v.scrollTo}"]`);
      if (sec) { sec.open = true; setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); }
    } else window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const opt = e.target.closest('.opt');
    if (opt) { handleOptionClick(opt); return; }
    const mark = e.target.closest('#markBtn');
    if (mark) {
      state.lessons[mark.dataset.m + '/' + mark.dataset.l] = true;
      save();
      location.hash = mark.dataset.next;
      return;
    }
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
    if (e.target.closest('#railModules') || e.target.closest('#hamburger')) {
      document.body.classList.toggle('panel-open');
      return;
    }
    if (e.target.closest('.np-close') || e.target.closest('.panel-scrim')) { closePanel(); return; }
    if (e.target.closest('.np-link')) closePanel();
    const tourBtn = e.target.closest('[data-action="tour"]');
    if (tourBtn) { A.startTour(); return; }
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
  // persist collapsible section state
  document.addEventListener('toggle', e => {
    const d = e.target;
    if (d.matches && d.matches('details[data-sec]')) {
      state.sections[d.dataset.sec] = d.open;
      save();
    }
  }, true);
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
