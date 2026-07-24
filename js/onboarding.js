/* ============================================================
   Onboarding v3
   - Glossary data
   - Quick Intro: a popup modal about the SUBJECT (What is GMP,
     product offerings, ExpressLane, jargon). Triggered by button.
   - Virtual tour: spotlight over the PLATFORM. Repositions on
     scroll so it can never drift off-screen.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const dia = n => (window.DIAGRAMS[n] ? window.DIAGRAMS[n]() : '');
  const ico = n => `<svg viewBox="0 0 24 24" width="30" height="30">${window.ACADEMY_ICONS.raw[n] || ''}</svg>`;
  A.glossIcon = ico;

  /* ---------- glossary (source-grounded, plain English) ---------- */
  A.glossary = [
    { icon: 'gate', term: 'GMP Access / IoT GateKit', def: 'The product you install: a digital access control system for gated parking garages. Two names, one thing. Hardware goes in the lanes and in the parking office.', mod: 'm01' },
    { icon: 'kiosk', term: 'PARCS', def: 'Parking Access and Revenue Control System — the garage\'s EXISTING equipment: gates, ticket dispensers, pay stations. You don\'t replace it; you connect GMP Access to it.', mod: 'm07' },
    { icon: 'camera', term: 'LPR', def: 'License Plate Recognition — a camera reads the car\'s plate so the plate itself becomes the "ticket". The reason entry and exit can be ticketless.', mod: 'm03' },
    { icon: 'pos', term: 'ExpressLane', def: 'GMP\'s pay-in-the-lane experience: the driver pays at an unattended terminal or kiosk right in the exit lane. Sites "with ExpressLane" get extra hardware (POS, kiosk, backup internet) and need continuous internet.', mod: 'm01' },
    { icon: 'relay', term: 'Vend', def: 'Industry word for "open the gate". When GMP decides a car may pass, the WISE controller\'s relay closes the gate\'s own vend circuit — the gate opens as if its native system asked.', mod: 'm08' },
    { icon: 'loop', term: 'Presence loop', def: 'A wire loop in the pavement where the car stops. Metal above it = "a vehicle is waiting". Read by WISE input DI0.', mod: 'm08' },
    { icon: 'loopA', term: 'Safety loop', def: 'The loop under the gate arm. While a car is on it, the arm must not come down. Read by WISE input DI1.', mod: 'm08' },
    { icon: 'relay', term: 'WISE 4060', def: 'A small Advantech IO box installed inside each gate cabinet. Its inputs listen to the loops; its relay fires the vend. One per lane.', mod: 'm02' },
    { icon: 'switch', term: 'PoE / PoE+', def: 'Power over Ethernet — one cable carries both power and data. The PoE+ switch (installed in the ticket-dispenser housing) powers the LPR camera this way.', mod: 'm02' },
    { icon: 'nuc', term: 'NUC', def: 'A mini PC (ASUS NUC) in the parking office — the site\'s brain, running GMP\'s software. One per garage, plus an HDMI emulator plug so remote support isn\'t staring at a blank screen.', mod: 'm05' },
    { icon: 'scanner', term: 'Nested zone', def: 'A restricted area inside a garage (reserved floor, monthly-parker level) with its own controlled entry. Access there is by scanning a QR code — needs the Zebra scanner + Elo Backpack 4 kit.', mod: 'm05' },
    { icon: 'phone', term: 'ReverseQR / Tap & Park', def: 'Payment flows that ride on GMP Access. ReverseQR runs over the MQTT connection; Tap & Park is a setup path after the PAX POS is installed.', mod: 'm13' },
    { icon: 'globe', term: 'MQTT', def: 'The lightweight messaging protocol the system talks over: WISE boards → broker on the NUC (port 1883), and the NUC → GMP cloud (port 8883).', mod: 'm14' },
    { icon: 'doc', term: 'Datacap', def: 'The payment integration behind the PAX IM30 (DC Direct). US ExpressLane orders must specify "Datacap Android Forms" support to the reseller.', mod: 'm04' }
  ];

  /* ============================================================
     QUICK INTRO — subject primer (modal popup)
     ============================================================ */
  const subjectSlides = [
    {
      title: 'What is GMP Access?',
      body: `
<p><strong>GMP Access</strong> (also called the <strong>IoT GateKit</strong>) is a digital access-control system for gated parking garages. Instead of a paper ticket, a camera reads the car's <strong>license plate</strong> — and that plate becomes the ticket. It bolts onto a garage's <em>existing</em> gates rather than replacing them.</p>
<div class="figure">${dia('systemOverview')}</div>`
    },
    {
      title: 'The product family & ExpressLane',
      body: `
<p>Every site gets the <strong>base kit</strong>: recognition opens the gate. Sites that also want drivers to <strong>pay right in the lane</strong> add the <strong>ExpressLane</strong> layer — unattended payment terminals, kiosks, and always-on internet. You'll see "ExpressLane only" flags throughout the training; this is what they mean.</p>
<div class="figure">${dia('expressLaneCompare')}</div>`
    },
    {
      title: 'How a car gets through a lane',
      body: `
<p>Every device you'll install serves one link of this chain. Learn it once and you can localise almost any fault before opening a cabinet.</p>
<div class="figure">${dia('flowChain')}</div>`
    },
    {
      title: 'The jargon you\'ll hear',
      body: `
<p>Parking has its own vocabulary. These eight terms cover most of it — the full glossary has the rest.</p>
<div class="wl-terms">
${A.glossary.slice(0, 8).map(g => `<div class="wl-term"><div class="wl-ico">${ico(g.icon)}</div><b>${esc(g.term)}</b><span>${esc(g.def.split('.')[0])}.</span></div>`).join('')}
</div>
<p style="text-align:center;margin-top:14px"><a href="#/glossary" data-qi="close-link">See the full glossary →</a></p>`
    }
  ];
  let qiIdx = 0;
  let qiEl = null;

  function renderQi() {
    if (!qiEl) return;
    const s = subjectSlides[qiIdx], last = qiIdx === subjectSlides.length - 1;
    qiEl.querySelector('.qi-modal').innerHTML = `
      <div class="qi-head">
        <span class="kicker">Quick intro · ${qiIdx + 1} of ${subjectSlides.length}</span>
        <button class="qi-x" data-qi="close" aria-label="Close">${UI('close', 16)}</button>
      </div>
      <h3 class="qi-title">${esc(s.title)}</h3>
      <div class="qi-body">${s.body}</div>
      <div class="qi-nav">
        <button class="btn secondary small" data-qi="back" ${qiIdx === 0 ? 'disabled' : ''}>← Back</button>
        <div class="wl-dots">${subjectSlides.map((_, i) => `<span class="wl-dot${i === qiIdx ? ' on' : ''}" data-qi-dot="${i}"></span>`).join('')}</div>
        ${last ? `<button class="btn accent small" data-qi="close">Done</button>` : `<button class="btn small" data-qi="next">Next →</button>`}
      </div>`;
  }
  A.openQuickIntro = function () {
    qiIdx = 0;
    if (!qiEl) {
      qiEl = document.createElement('div');
      qiEl.className = 'qi-overlay';
      qiEl.innerHTML = `<div class="qi-modal" role="dialog" aria-modal="true"></div>`;
      document.body.appendChild(qiEl);
    }
    document.body.style.overflow = 'hidden';
    renderQi();
  };
  function closeQi() {
    if (qiEl) { qiEl.remove(); qiEl = null; }
    document.body.style.overflow = '';
  }

  /* ============================================================
     VIRTUAL TOUR — platform spotlight (repositions on scroll)
     ============================================================ */
  const tourSteps = [
    { sel: '.rail', title: 'Everything lives here', text: 'Six labelled destinations, always visible: Home, Modules, Field kit, Certification, Textbook and Admin. The ring at the bottom tracks your overall progress.', pos: 'right' },
    { sel: '#heroActions', title: 'New to the subject?', text: 'Quick intro is a 2-minute primer on GMP Access itself — what it is, ExpressLane, and the jargon. This tour (which you can replay anytime) is about the platform.', pos: 'bottom' },
    { sel: '#phaseGrid', title: 'Your curriculum & live progress', text: 'Six phases, fourteen modules. Each module checks off automatically when you finish its lessons and pass its knowledge check — and a phase checks off once all its modules are done.', pos: 'top' },
    { sel: '#certBanner', title: 'Certification eligibility', text: 'The certification exam unlocks once every module is complete. This banner always shows where you stand and what\'s left.', pos: 'top' },
    { sel: '.search-box', title: 'Search everything', text: 'Any terminal (NC4), IP (10.0.0.1), distance or password — search jumps straight to the lesson, field card, or glossary entry that has it.', pos: 'bottom' }
  ];
  let tourIdx = -1, tourEls = null, tourElRef = null;

  function tourUI() {
    if (tourEls) return tourEls;
    const scrim = document.createElement('div'); scrim.className = 'tour-scrim';
    const hole = document.createElement('div'); hole.className = 'tour-hole';
    const tip = document.createElement('div'); tip.className = 'tour-tip';
    document.body.appendChild(scrim); document.body.appendChild(hole); document.body.appendChild(tip);
    tourEls = { scrim, hole, tip };
    return tourEls;
  }
  function endTour() {
    window.removeEventListener('scroll', reposition, true);
    if (tourEls) { tourEls.scrim.remove(); tourEls.hole.remove(); tourEls.tip.remove(); tourEls = null; }
    tourIdx = -1; tourElRef = null;
    const st = A.appHooks.getState();
    if (!st.onboarded) { st.onboarded = true; A.appHooks.save(); }
  }
  function place() {
    if (!tourElRef || !tourEls) return;
    const r = tourElRef.getBoundingClientRect();
    const step = tourSteps[tourIdx];
    const { hole, tip } = tourEls;
    hole.style.cssText = `top:${r.top - 6}px;left:${r.left - 6}px;width:${r.width + 12}px;height:${r.height + 12}px;`;
    const tw = 320, th = tip.offsetHeight || 170, pad = 14;
    let top, left;
    if (step.pos === 'right') { top = Math.max(70, r.top); left = r.right + pad; }
    else if (step.pos === 'bottom') { top = r.bottom + pad; left = r.left + r.width / 2 - tw / 2; }
    else { top = r.top - th - pad; left = r.left + r.width / 2 - tw / 2; }
    left = Math.min(window.innerWidth - tw - 12, Math.max(12, left));
    if (top + th > window.innerHeight - 12) top = Math.max(12, window.innerHeight - th - 12);
    if (top < 12) top = 12;
    tip.style.cssText = `top:${top}px;left:${left}px;width:${tw}px`;
  }
  function reposition() { place(); }
  function showStep() {
    while (tourIdx < tourSteps.length) {
      const el = document.querySelector(tourSteps[tourIdx] && tourSteps[tourIdx].sel);
      if (el && el.getBoundingClientRect().width > 0) break;
      tourIdx++;
    }
    if (tourIdx >= tourSteps.length) { finishTour(); return; }
    const step = tourSteps[tourIdx];
    tourElRef = document.querySelector(step.sel);
    const { tip } = tourUI();
    tip.innerHTML = `<span class="kicker">Tour · ${tourIdx + 1} of ${tourSteps.length}</span>
      <h4>${esc(step.title)}</h4><p>${esc(step.text)}</p>
      <div class="tour-btns"><a href="#" data-tour="end">End tour</a>
        <span>${tourIdx > 0 ? '<button class="btn secondary small" data-tour="back">Back</button> ' : ''}<button class="btn small accent" data-tour="next">${tourIdx === tourSteps.length - 1 ? 'Finish' : 'Next →'}</button></span></div>`;
    // scroll target into view, then position (twice, to settle after layout/scroll)
    tourElRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    place();
    setTimeout(place, 260);
  }
  function finishTour() {
    endTour();
    const tip = document.createElement('div');
    tip.className = 'tour-tip tour-final';
    tip.innerHTML = `<h4>You're set.</h4><p>Start with <strong>M01 — What GMP Access Is & How a Lane Works</strong>. Everything else builds on it.</p>
      <div class="tour-btns"><a href="#" data-tour="close">Close</a><a class="btn accent small" href="#/module/m01" data-tour="close">Start M01 →</a></div>`;
    tip.style.cssText = `top:50%;left:50%;transform:translate(-50%,-50%);width:340px`;
    document.body.appendChild(tip);
    const kill = () => { tip.remove(); window.removeEventListener('hashchange', kill); };
    window.addEventListener('hashchange', kill);
    setTimeout(() => document.addEventListener('click', function once(e) {
      if (e.target.closest('[data-tour="close"]') || !e.target.closest('.tour-final')) { kill(); document.removeEventListener('click', once); }
    }), 50);
  }
  A.startTour = function () {
    const go = () => setTimeout(() => {
      tourIdx = 0; tourUI();
      window.addEventListener('scroll', reposition, true);
      showStep();
    }, 160);
    if (location.hash === '#/' || location.hash === '' || location.hash === '#') go();
    else { location.hash = '#/'; go(); }
  };

  /* ---------- event wiring ---------- */
  document.addEventListener('click', e => {
    // quick intro modal
    const qi = e.target.closest('[data-qi]');
    if (qi) {
      const act = qi.dataset.qi;
      if (act === 'next') { qiIdx = Math.min(subjectSlides.length - 1, qiIdx + 1); renderQi(); }
      else if (act === 'back') { qiIdx = Math.max(0, qiIdx - 1); renderQi(); }
      else if (act === 'close') { e.preventDefault(); closeQi(); }
      else if (act === 'close-link') { closeQi(); } // let the link navigate
      return;
    }
    const qd = e.target.closest('[data-qi-dot]');
    if (qd) { qiIdx = +qd.dataset.qiDot; renderQi(); return; }
    if (qiEl && e.target.classList && e.target.classList.contains('qi-overlay')) { closeQi(); return; }
    // tour
    const tr = e.target.closest('[data-tour]');
    if (tr) {
      const act = tr.dataset.tour;
      if (act === 'next') { tourIdx++; showStep(); }
      else if (act === 'back') { tourIdx = Math.max(0, tourIdx - 1); showStep(); }
      else if (act === 'end') { e.preventDefault(); endTour(); }
      return;
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { if (qiEl) closeQi(); else if (tourEls) endTour(); }
  });
  window.addEventListener('resize', () => { if (tourIdx >= 0 && tourEls) place(); });
  window.addEventListener('hashchange', () => { if (tourIdx >= 0) endTour(); });
})();
