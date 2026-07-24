/* ============================================================
   GMP Access Installer Academy — application engine v3
   Icon rail + standalone pages. Home = progress dashboard.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const D = window.DIAGRAMS;
  const $ = sel => document.querySelector(sel);

  /* GMP pin + gate-arm mark — same shape language as GMP's own product icons. */
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
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
  A.appHooks = { getState: () => state, save, rerender: () => route() };

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
        <div class="ps-top"><b>${pct}% complete</b><span>${done} of ${A.modules.length} modules · ${fmtDur(totalMinutes())} total${rem ? ` · ~${fmtDur(rem)} left` : ''}</span></div>
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
          <span>${state.exam && state.exam.passed ? 'Passed — best score ' + Math.round(state.exam.best) + '%. You can retake to raise it.' : 'All modules complete. Take the certification exam when you\'re ready.'}</span>
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
        <div class="pc-meta">${fmtDur(phaseMinutes(ph.n))} · ${pc.total} modules</div>
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

    return { crumb: '<b>Home</b>', html: h };
  }

  /* ---------- MODULES (curriculum page) ---------- */
  function viewModules() {
    let h = `<span class="kicker">Curriculum</span><h2 class="page-title">Modules</h2>
      <p class="lede">6 phases, ${A.modules.length} modules, in real deployment order — ${fmtDur(totalMinutes())} of training. Work them top to bottom, or jump to any module.</p>`;
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
    return { crumb: '<b>Modules</b>', html: h };
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
    <p class="lede">${A.exam.length} questions drawn from every module — hardware, lane design, wiring, configuration, testing, POS, and network readiness. Pass mark: ${A.examMeta.pass}%.</p>`;

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
    content.className = 'content' + (v.wide ? ' wide' : '');
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
