/* ============================================================
   Onboarding v2: inline intro slides (Start-here section),
   glossary icons, spotlight tour for the rail layout.
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

  /* ---------- intro slides (rendered inline in the Start-here section) ---------- */
  const slides = [
    {
      title: 'You\'re going to make parking garages ticketless',
      body: `
<p style="max-width:64ch;margin:0 auto;color:var(--muted)">You don't need to know anything about GMP, parking systems, or networking to start. The product you'll install is called <strong>GMP Access</strong> (also called the <strong>IoT GateKit</strong>). It bolts onto a garage's existing gates so that a camera reading the car's plate — instead of a paper ticket — decides when the gate opens.</p>
<div class="figure" style="margin-top:14px">${dia('systemOverview')}</div>`
    },
    {
      title: 'Eight words that unlock everything',
      body: `
<p style="max-width:62ch;margin:0 auto;color:var(--muted)">Parking has jargon. These eight cover 90% of what you'll hear — the full glossary lives further down this page.</p>
<div class="wl-terms">
${A.glossary.slice(0, 8).map(g => `<div class="wl-term"><div class="wl-ico">${ico(g.icon)}</div><b>${esc(g.term)}</b><span>${esc(g.def.split('.')[0])}.</span></div>`).join('')}
</div>`
    },
    {
      title: 'How one car gets through a lane',
      body: `
<p style="max-width:62ch;margin:0 auto;color:var(--muted)">Every device you'll ever mount, wire, or debug serves one link of this chain. Learn it once and you can localize any fault before opening a cabinet.</p>
<div class="figure" style="margin-top:14px">${dia('flowChain')}</div>`
    },
    {
      title: 'One kit, two flavors',
      body: `
<p style="max-width:62ch;margin:0 auto;color:var(--muted)">Every site gets the base kit. Sites where drivers <em>pay in the lane</em> add the <strong>ExpressLane</strong> layer — more hardware, more wiring, and always-on internet. You'll see "ExpressLane only" flags across the curriculum; now you know what they mean.</p>
<div class="figure" style="margin-top:14px">${dia('expressLaneCompare')}</div>`
    },
    {
      title: 'Your path: 6 phases, 14 modules',
      body: `
<div class="figure">${dia('journey')}</div>
<p style="max-width:62ch;margin:12px auto 0;color:var(--muted)">Work the phases in order — each mirrors a real deployment. Every module ends with a <strong>10-question knowledge check</strong> (70% to pass); the program ends with a <strong>30-question readiness exam</strong>. Progress saves on this device.</p>`
    },
    {
      title: 'Learn here, use it on-site',
      body: `
<p style="max-width:62ch;margin:0 auto;color:var(--muted)">Everything you learn is also compressed into the <strong>Field kit</strong> further down this page — tappable checklists, wiring pinouts, every credential and distance. Cards open in a high-contrast dark view built for sunlight and gloves. The whole curriculum also prints as a field guide.</p>
<div class="wl-field-preview">
${[['clipboard', 'Site Walk Checklist'], ['plug', 'WISE Wiring Pinout'], ['key', 'Credentials & Defaults'], ['ruler', 'Distances & Geometry'], ['flask', 'Lane Test Procedure'], ['globe', 'Whitelist & Ports']].map(c => `<div class="wl-fc"><span>${UI(c[0], 16)}</span>${c[1]}</div>`).join('')}
</div>`
    }
  ];

  let slideIdx = 0;
  A.introSlideHtml = function () {
    const s = slides[slideIdx];
    const last = slideIdx === slides.length - 1;
    return `<div class="intro-slide">
      <span class="kicker">Intro · ${slideIdx + 1} of ${slides.length}</span>
      <div class="intro-title">${esc(s.title)}</div>
      ${s.body}
      <div class="wl-nav">
        <button class="btn secondary small" data-wl="back" ${slideIdx === 0 ? 'disabled' : ''}>← Back</button>
        <div class="wl-dots">${slides.map((_, i) => `<span class="wl-dot${i === slideIdx ? ' on' : ''}" data-wl-dot="${i}"></span>`).join('')}</div>
        ${last
          ? `<span><button class="btn accent small" data-wl="tour">Take the 30-sec tour →</button> <button class="btn small" data-wl="start" style="margin-left:6px">Start M01 →</button></span>`
          : `<button class="btn small" data-wl="next">Next →</button>`}
      </div>
    </div>`;
  };
  function repaintSlide() {
    const slot = document.getElementById('introSlot');
    if (slot) slot.innerHTML = A.introSlideHtml();
  }

  /* ---------- spotlight tour (rail layout) ---------- */
  const tourSteps = [
    { sel: '.rail', title: 'Everything lives here', text: 'Five labeled destinations, always visible: Home, Modules, Field kit, Exam, and the printable Guide. The ring at the bottom tracks your overall progress.', pos: 'right' },
    { sel: '#railModules', title: 'The module tree', text: 'Click Modules any time to slide out the full curriculum — 6 phases, 14 modules, with your progress dots. It closes as soon as you pick one.', pos: 'right' },
    { sel: 'details.sect[data-sec="curriculum"]', title: 'Or browse right here', text: 'The home page holds everything in collapsible sections: this curriculum, the field kit, the glossary, and reference tools. Sections remember whether you left them open.', pos: 'top' },
    { sel: '.search-box', title: 'Search everything', text: 'Any terminal (NC4), IP (10.0.0.1), distance, or password — search jumps straight to the lesson, field card, or glossary entry that has it.', pos: 'bottom' },
    { sel: '.topbar .btn.accent', title: 'Field kit, one tap', text: 'The on-site layer: checklists, pinouts, and credentials in a dark, glove-friendly view for when you\'re standing at a gate cabinet.', pos: 'bottom' }
  ];
  let tourIdx = -1, tourEls = null;

  function tourUI() {
    if (tourEls) return tourEls;
    const scrim = document.createElement('div');
    scrim.className = 'tour-scrim';
    const hole = document.createElement('div');
    hole.className = 'tour-hole';
    const tip = document.createElement('div');
    tip.className = 'tour-tip';
    document.body.appendChild(scrim); document.body.appendChild(hole); document.body.appendChild(tip);
    tourEls = { scrim, hole, tip };
    return tourEls;
  }
  function endTour() {
    if (tourEls) { tourEls.scrim.remove(); tourEls.hole.remove(); tourEls.tip.remove(); tourEls = null; }
    tourIdx = -1;
    const st = A.appHooks.getState();
    if (!st.onboarded) { st.onboarded = true; A.appHooks.save(); }
  }
  function showStep() {
    while (tourIdx < tourSteps.length) {
      const el = document.querySelector(tourSteps[tourIdx] && tourSteps[tourIdx].sel);
      if (el && el.getBoundingClientRect().width > 0) break;
      tourIdx++;
    }
    if (tourIdx >= tourSteps.length) { finishTour(); return; }
    const step = tourSteps[tourIdx];
    const el = document.querySelector(step.sel);
    el.scrollIntoView({ block: 'nearest' });
    const r = el.getBoundingClientRect();
    const { hole, tip } = tourUI();
    hole.style.cssText = `top:${r.top - 6}px;left:${r.left - 6}px;width:${r.width + 12}px;height:${r.height + 12}px;`;
    tip.innerHTML = `<span class="kicker">Tour · ${tourIdx + 1} of ${tourSteps.length}</span>
      <h4>${esc(step.title)}</h4><p>${esc(step.text)}</p>
      <div class="tour-btns"><a href="#" data-tour="end">End tour</a><button class="btn small accent" data-tour="next">${tourIdx === tourSteps.length - 1 ? 'Finish' : 'Next →'}</button></div>`;
    const tw = 320, pad = 14;
    let top, left;
    if (step.pos === 'right') { top = Math.max(70, r.top + 10); left = r.right + pad; }
    else if (step.pos === 'bottom') { top = r.bottom + pad; left = Math.min(window.innerWidth - tw - 16, Math.max(16, r.left + r.width / 2 - tw / 2)); }
    else { top = Math.max(70, r.top - pad - 160); left = Math.min(window.innerWidth - tw - 16, Math.max(16, r.left + r.width / 2 - tw / 2)); }
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 16;
    if (top < 8) top = r.bottom + pad;
    tip.style.cssText = `top:${top}px;left:${left}px;width:${tw}px`;
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
    const go = () => setTimeout(() => { tourIdx = 0; tourUI(); showStep(); }, 140);
    if (location.hash === '#/' || location.hash === '' || location.hash === '#') go();
    else { location.hash = '#/'; go(); }
  };

  /* ---------- event wiring ---------- */
  document.addEventListener('click', e => {
    const wl = e.target.closest('[data-wl]');
    if (wl) {
      e.preventDefault();
      const act = wl.dataset.wl;
      const st = A.appHooks.getState();
      if (act === 'next') { slideIdx = Math.min(slides.length - 1, slideIdx + 1); repaintSlide(); }
      else if (act === 'back') { slideIdx = Math.max(0, slideIdx - 1); repaintSlide(); }
      else if (act === 'tour') {
        st.onboarded = true; st.sections = st.sections || {}; st.sections.start = false;
        A.appHooks.save(); slideIdx = 0; A.startTour();
      }
      else if (act === 'start') {
        st.onboarded = true; st.sections = st.sections || {}; st.sections.start = false;
        A.appHooks.save(); slideIdx = 0; location.hash = '#/module/m01';
      }
      return;
    }
    const dot = e.target.closest('[data-wl-dot]');
    if (dot) { slideIdx = +dot.dataset.wlDot; repaintSlide(); return; }
    const tr = e.target.closest('[data-tour]');
    if (tr) {
      if (tr.dataset.tour === 'next') { tourIdx++; showStep(); }
      else if (tr.dataset.tour === 'end') { e.preventDefault(); endTour(); }
      return;
    }
  });
  window.addEventListener('resize', () => { if (tourIdx >= 0 && tourEls) showStep(); });
  window.addEventListener('hashchange', () => { if (tourIdx >= 0) endTour(); });
})();
