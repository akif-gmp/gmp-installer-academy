/* ============================================================
   Exam integrity monitor ("focused session").
   Client-side scope — quietly records, never nags:
   - tab switches / window blur (visibilitychange, blur/focus)
   - time spent away from the exam
   - in-app navigation attempts during the exam
   - a second tab of this app opening in the SAME browser profile
     (BroadcastChannel lock; second tab is blocked + logged)
   - fullscreen exits (if the candidate entered fullscreen)
   Hard limits (documented, need a backend + login to solve):
   - incognito / another browser / another device cannot be
     detected or blocked without single-session auth tokens.
   ============================================================ */
(function () {
  'use strict';
  const P = {
    active: false,
    startedAt: null,
    events: [],
    awayMs: 0,
    _awaySince: null
  };
  window.PROCTOR = P;

  let bc = null;
  try { bc = new BroadcastChannel('gmp-academy-lock'); } catch (e) {}

  function log(type, detail) {
    if (!P.active) return;
    P.events.push({ t: Date.now(), type, detail: detail || '' });
  }

  P.note = log;

  P.start = function () {
    P.active = true;
    P.startedAt = Date.now();
    P.events = [];
    P.awayMs = 0;
    P._awaySince = null;
    try { sessionStorage.setItem('gmpExamActive', '1'); } catch (e) {}
    if (bc) bc.postMessage({ kind: 'exam-started' });
    log('start');
  };

  P.stop = function (outcome) {
    if (!P.active) return null;
    if (P._awaySince) { P.awayMs += Date.now() - P._awaySince; P._awaySince = null; }
    log('stop', outcome || 'finished');
    const summary = P.summary(outcome);
    P.active = false;
    try { sessionStorage.removeItem('gmpExamActive'); } catch (e) {}
    if (bc) bc.postMessage({ kind: 'exam-ended' });
    return summary;
  };

  P.summary = function (outcome) {
    const count = type => P.events.filter(e => e.type === type).length;
    return {
      outcome: outcome || 'finished',
      startedAt: P.startedAt,
      endedAt: Date.now(),
      durationSec: Math.round((Date.now() - P.startedAt) / 1000),
      tabSwitches: count('hidden'),
      windowBlurs: count('blur'),
      awaySeconds: Math.round(P.awayMs / 1000),
      navAttempts: count('nav-attempt'),
      secondTabs: count('second-tab'),
      fullscreenExits: count('fs-exit'),
      events: P.events.slice(0, 200)
    };
  };

  /* ---------- passive listeners ---------- */
  document.addEventListener('visibilitychange', () => {
    if (!P.active) return;
    if (document.hidden) { log('hidden'); P._awaySince = Date.now(); }
    else {
      log('visible');
      if (P._awaySince) { P.awayMs += Date.now() - P._awaySince; P._awaySince = null; }
    }
  });
  window.addEventListener('blur', () => log('blur'));
  window.addEventListener('focus', () => log('focus'));
  document.addEventListener('fullscreenchange', () => {
    if (P.active && !document.fullscreenElement) log('fs-exit');
  });
  window.addEventListener('beforeunload', () => {
    if (P.active) log('unload-attempt');
  });

  /* ---------- second-tab lock (same browser profile) ---------- */
  if (bc) {
    bc.onmessage = e => {
      const kind = e.data && e.data.kind;
      if (kind === 'hello') {
        // another tab of this app just opened
        if (P.active) { log('second-tab'); bc.postMessage({ kind: 'exam-active' }); }
      } else if (kind === 'exam-active') {
        // an exam is running in ANOTHER tab — block this one
        if (!P.active) showTabBlock();
      } else if (kind === 'exam-ended') {
        hideTabBlock();
      }
    };
    // announce ourselves on load
    setTimeout(() => bc.postMessage({ kind: 'hello' }), 300);
  }

  let blockEl = null;
  function showTabBlock() {
    if (blockEl) return;
    blockEl = document.createElement('div');
    blockEl.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(250,250,248,.96);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;text-align:center;padding:24px';
    blockEl.innerHTML = '<div style="max-width:420px"><div style="color:#b45309">' + (window.UI ? window.UI('lock', 34) : '') + '</div><h3 style="margin:.4em 0">An exam is in progress in another window</h3><p style="color:#7a808a;font-size:.9rem">This page is paused until the exam in your other tab is submitted or abandoned.</p></div>';
    document.body.appendChild(blockEl);
  }
  function hideTabBlock() {
    if (blockEl) { blockEl.remove(); blockEl = null; }
  }
})();
