/* ============================================================
   Illustration library v2 — concept visuals
   Same palette/style as diagrams.js. One visual per concept.
   ============================================================ */
(function () {
  'use strict';
  const C = {
    ink: '#1c1c1c', muted: '#6b7c93', line: '#c9c5bc',
    amber: '#ffc300', amberDeep: '#8a6a00', amberSoft: 'rgba(255,195,0,.2)',
    red: '#dc2626', green: '#23ad5e', greenSoft: '#e2f1ec',
    blue: '#1d4ed8', blueSoft: '#dbeafe', paper: '#ffffff', dark: '#1c1c1c',
    graySoft: '#eeece7'
  };
  const DEFS = `<defs>
    <marker id="a2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="${C.ink}"/></marker>
    <marker id="a2r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="${C.red}"/></marker>
    <marker id="a2g" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="${C.green}"/></marker>
  </defs>`;

  /* small icon builders (24x24 viewbox drawn at any size via <g scale>) */
  const ICO = {
    bump: `<path d="M2 18 Q 12 6 22 18 Z" fill="${C.dark}"/><rect x="0" y="18" width="24" height="2.5" fill="${C.line}"/>`,
    camera: `<rect x="2" y="8" width="14" height="9" rx="2" fill="${C.dark}"/><path d="M16 10 L22 7 L22 18 L16 15 Z" fill="${C.dark}"/><circle cx="7" cy="12.5" r="2.4" fill="${C.paper}"/>`,
    loop: `<rect x="3" y="6" width="18" height="12" rx="4" fill="none" stroke="${C.red}" stroke-width="2.4" stroke-dasharray="4 3"/>`,
    loopA: `<rect x="3" y="6" width="18" height="12" rx="4" fill="none" stroke="${C.amber}" stroke-width="2.4" stroke-dasharray="4 3"/>`,
    cloud: `<path d="M6 17 a4.5 4.5 0 1 1 1.4-8.8 a5.4 5.4 0 0 1 10.3 1.4 a3.8 3.8 0 0 1-.6 7.4 Z" fill="${C.blueSoft}" stroke="${C.blue}" stroke-width="1.6"/>`,
    relay: `<rect x="3" y="4" width="18" height="16" rx="3" fill="${C.blueSoft}" stroke="${C.ink}" stroke-width="1.5"/><circle cx="12" cy="12" r="4.5" fill="#0e7490"/><circle cx="12" cy="12" r="2.6" fill="#e2f2f8"/>`,
    gate: `<rect x="2" y="14" width="5" height="8" rx="1.5" fill="#93c5fd"/><rect x="6" y="8" width="17" height="4" rx="2" fill="#e8945f"/>`,
    pos: `<rect x="6" y="3" width="12" height="18" rx="2.5" fill="${C.dark}"/><rect x="8.5" y="6" width="7" height="5" rx="1" fill="#8fd3ff"/><rect x="8.5" y="13" width="7" height="4" rx="1" fill="#3c434e"/>`,
    kiosk: `<rect x="7" y="2" width="10" height="20" rx="2" fill="#2563eb"/><rect x="9" y="4.5" width="6" height="7" rx="1" fill="#dbeafe"/><rect x="9" y="14" width="6" height="2.6" rx="1" fill="#dbeafe"/>`,
    nuc: `<rect x="3" y="7" width="18" height="11" rx="2.5" fill="#eef4fb" stroke="#64748b" stroke-width="1.6"/><circle cx="17.5" cy="12.5" r="1.6" fill="${C.amber}"/><rect x="6" y="11" width="7" height="2.6" rx="1" fill="#64748b"/>`,
    plug: `<rect x="8" y="4" width="8" height="9" rx="2" fill="${C.amberDeep}"/><rect x="10" y="13" width="4" height="6" rx="1" fill="${C.dark}"/><rect x="9.5" y="1.5" width="1.8" height="3.5" fill="${C.dark}"/><rect x="12.7" y="1.5" width="1.8" height="3.5" fill="${C.dark}"/>`,
    switch: `<rect x="2" y="7" width="20" height="11" rx="2.5" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.8"/><rect x="5" y="13" width="3.4" height="3.2" fill="${C.ink}"/><rect x="10" y="13" width="3.4" height="3.2" fill="${C.ink}"/><rect x="15" y="13" width="3.4" height="3.2" fill="${C.ink}"/><rect x="5" y="9.5" width="13.4" height="2.4" rx="1" fill="${C.ink}"/>`,
    scanner: `<rect x="4" y="6" width="16" height="12" rx="2.5" fill="${C.dark}"/><rect x="7" y="9.5" width="10" height="5" rx="1.5" fill="#fca5a5"/><path d="M9 12 h6" stroke="${C.red}" stroke-width="1.4"/>`,
    sim: `<rect x="5" y="3" width="14" height="18" rx="2.5" fill="${C.greenSoft}" stroke="${C.green}" stroke-width="1.6"/><path d="M14 3 l5 5 v-5 Z" fill="${C.green}"/><rect x="8.5" y="11" width="7" height="6" rx="1.4" fill="none" stroke="${C.green}" stroke-width="1.4"/>`,
    car: `<path d="M3 15 Q3 11 7 10.4 L9 7.4 Q9.7 6 11.5 6 h4 Q17 6 17.8 7.4 L19.5 10.4 Q22 11 22 14 v2.6 h-2.6 a2.4 2.4 0 0 1-4.8 0 h-4.2 a2.4 2.4 0 0 1-4.8 0 H3 Z" fill="${C.dark}"/><circle cx="8" cy="16.6" r="1.7" fill="#565e6b"/><circle cx="17" cy="16.6" r="1.7" fill="#565e6b"/>`,
    light: `<circle cx="12" cy="9" r="5" fill="${C.amber}"/><path d="M12 1v3 M4 4l2 2 M20 4l-2 2 M1 11h3 M20 11h3" stroke="${C.amber}" stroke-width="1.8"/><path d="M8 16 L16 16 L14.5 22 L9.5 22 Z" fill="${C.graySoft}" stroke="${C.line}"/>`,
    doc: `<path d="M6 2 h9 l4 4 v16 H6 Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.7"/><path d="M15 2 v4 h4" fill="none" stroke="${C.ink}" stroke-width="1.7"/><path d="M9 11h7 M9 14.5h7 M9 18h5" stroke="${C.muted}" stroke-width="1.5"/>`,
    wrench: `<path d="M14.5 3 a5.5 5.5 0 0 0-5 7.8 L3.6 16.7 a2.3 2.3 0 0 0 3.2 3.2 L12.7 14 a5.5 5.5 0 0 0 7.6-6.4 l-3.4 3.4 -3.2-1 -1-3.2 3.4-3.4 A5.5 5.5 0 0 0 14.5 3 Z" fill="${C.muted}"/>`,
    check: `<circle cx="12" cy="12" r="10" fill="${C.greenSoft}" stroke="${C.green}" stroke-width="1.8"/><path d="M7.5 12.5 l3 3 l6-7" fill="none" stroke="${C.green}" stroke-width="2.4" stroke-linecap="round"/>`,
    phone: `<rect x="6.5" y="2" width="11" height="20" rx="2.6" fill="${C.dark}"/><rect x="8.3" y="4.5" width="7.4" height="13" rx="1" fill="#8fd3ff"/><circle cx="12" cy="19.6" r="1.2" fill="#8fd3ff"/>`,
    globe: `<circle cx="12" cy="12" r="9" fill="${C.blueSoft}" stroke="${C.blue}" stroke-width="1.7"/><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="${C.blue}" stroke-width="1.3"/><path d="M3.5 12h17 M5 7.5h14 M5 16.5h14" stroke="${C.blue}" stroke-width="1.3"/>`
  };
  function icon(name, x, y, s) {
    return `<g transform="translate(${x},${y}) scale(${(s || 32) / 24})">${ICO[name] || ''}</g>`;
  }
  window.ACADEMY_ICONS = { raw: ICO, icon };

  function chip(x, y, w, h, fill, stroke) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill || C.paper}" stroke="${stroke || C.line}" stroke-width="1.4"/>`;
  }
  function label(x, y, t, size, weight, fill, anchor) {
    return `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" font-size="${size || 11}" font-weight="${weight || 600}" fill="${fill || C.ink}">${t}</text>`;
  }

  const G = {};

  /* ---------- M01: how a car gets through (6-step chain) ---------- */
  G.flowChain = function () {
    const steps = [
      ['bump', 'Speed bump', 'slows the car', '3–5 ft before island'],
      ['camera', 'LPR camera', 'reads the plate', 'lighting decides success'],
      ['loop', 'Presence loop', '“car is waiting”', 'WISE input DI0'],
      ['cloud', 'Platform decides', 'recognized + paid?', 'or pay at POS/kiosk'],
      ['relay', 'WISE relay fires', 'vend command', 'relay RL0'],
      ['gate', 'Gate opens', 'safety loop guards', 'arm can’t hit the car']
    ];
    const W = 900, H = 190, bw = 132, gap = 16, x0 = 14;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:860px" role="img" aria-label="How a car gets through a lane">${DEFS}`;
    steps.forEach((st, i) => {
      const x = x0 + i * (bw + gap);
      s += chip(x, 30, bw, 130);
      s += `<circle cx="${x + 22}" cy="${50}" r="12" fill="${C.ink}"/>` + label(x + 22, 54.5, i + 1, 12, 800, '#fff');
      s += icon(st[0], x + bw / 2 - 19, 60, 38);
      s += label(x + bw / 2, 118, st[1], 12.5, 800);
      s += label(x + bw / 2, 134, st[2], 10.5, 500, C.muted);
      s += label(x + bw / 2, 149, st[3], 9.5, 500, C.amberDeep);
      if (i < steps.length - 1) s += `<line x1="${x + bw + 2}" y1="95" x2="${x + bw + gap - 3}" y2="95" stroke="${C.ink}" stroke-width="2" marker-end="url(#a2)"/>`;
    });
    return s + '</svg>';
  };

  /* ---------- Welcome/M01: GMP Access vs + ExpressLane ---------- */
  G.expressLaneCompare = function () {
    const W = 860, H = 300;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:820px" role="img" aria-label="GMP Access vs ExpressLane">${DEFS}`;
    // left card — base
    s += chip(14, 16, 400, 268, '#fbfaf8');
    s += label(214, 46, 'GMP ACCESS (base)', 13, 800, C.ink);
    s += label(214, 66, 'Recognition opens the gate — no payment in the lane', 10.5, 500, C.muted);
    [['camera', 'LPR camera'], ['relay', 'WISE IO board'], ['switch', 'PoE+ switch'], ['nuc', 'NUC (1 per garage)']].forEach((r, i) => {
      const x = 44 + (i % 2) * 190, y = 90 + Math.floor(i / 2) * 84;
      s += icon(r[0], x, y, 36) + label(x + 46, y + 24, r[1], 11.5, 600, C.ink, 'start');
    });
    s += label(214, 264, 'Payment settled elsewhere (validations, pay-on-foot, app)', 10, 500, C.muted);
    // plus
    s += `<circle cx="437" cy="150" r="17" fill="${C.amber}"/>` + label(437, 156, '+', 20, 800, '#fff');
    // right card — expresslane
    s += chip(460, 16, 386, 268, '#fdf6ec', '#eed9ac');
    s += label(653, 46, '+ EXPRESSLANE', 13, 800, C.amberDeep);
    s += label(653, 66, 'Driver pays right in the lane, unattended', 10.5, 500, C.muted);
    [['pos', 'POS terminal (Adyen / PAX)'], ['kiosk', 'Kiosk or POS pedestal'], ['sim', '4G/5G backup internet'], ['scanner', 'Scanners (nested zones)']].forEach((r, i) => {
      const x = 488 + (i % 2) * 180, y = 90 + Math.floor(i / 2) * 84;
      s += icon(r[0], x, y, 36) + label(x + 44, y + 24, r[1], 10.5, 600, C.ink, 'start');
    });
    s += label(653, 264, 'Needs continuous internet + AC power + extra CAT6 in lanes', 10, 500, C.amberDeep);
    return s + '</svg>';
  };

  /* ---------- M02: WISE board terminal map ---------- */
  G.wiseBoard = function () {
    const W = 620, H = 330;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:600px" role="img" aria-label="WISE 4060 terminal map">${DEFS}`;
    s += `<rect x="170" y="30" width="280" height="250" rx="14" fill="#eef4fb" stroke="#64748b" stroke-width="2"/>`;
    s += label(310, 60, 'WISE 4060-LAN-B', 15, 800);
    s += `<circle cx="310" cy="150" r="46" fill="#0e7490"/><circle cx="310" cy="150" r="30" fill="#e2f2f8"/>`;
    s += label(310, 155, 'IO', 16, 800, '#0e7490');
    s += `<rect x="285" y="238" width="50" height="26" rx="4" fill="${C.dark}"/>` + label(310, 255, 'LAN', 10, 700, '#fff');
    // left terminals: inputs
    const L = [['DI0', 'presence loop in', C.red], ['DI1', 'safety loop in', C.amber], ['DICOM', 'input common', C.muted]];
    L.forEach((t, i) => {
      const y = 92 + i * 52;
      s += `<rect x="140" y="${y}" width="62" height="26" rx="5" fill="#fff" stroke="${t[2]}" stroke-width="2"/>` + label(171, y + 17, t[0], 11, 800, t[2]);
      s += label(130, y + 17, t[1], 10.5, 600, C.muted, 'end');
    });
    // right terminals: power + relay
    const R = [['VS+', '+12/24 VDC', C.amberDeep], ['VS−', '0 V', C.amberDeep], ['RL0±', 'vend relay out', C.green]];
    R.forEach((t, i) => {
      const y = 92 + i * 52;
      s += `<rect x="418" y="${y}" width="62" height="26" rx="5" fill="#fff" stroke="${t[2]}" stroke-width="2"/>` + label(449, y + 17, t[0], 11, 800, t[2]);
      s += label(490, y + 17, t[1], 10.5, 600, C.muted, 'start');
    });
    s += label(310, 306, 'Inputs listen to the loops · relay speaks to the gate · LAN talks to the platform', 11, 600, C.muted);
    return s + '</svg>';
  };

  /* ---------- M02: PoE+ fan-out ---------- */
  G.poeFanout = function () {
    const W = 780, H = 330;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:760px" role="img" aria-label="PoE+ switch fan-out">${DEFS}`;
    // server room
    s += chip(20, 110, 170, 96, '#fbfaf8');
    s += icon('nuc', 44, 128, 36) + label(105, 152, 'Server room', 12, 800) + label(105, 168, 'NUC + internet', 10.5, 500, C.muted);
    // existing line
    s += `<line x1="190" y1="158" x2="300" y2="158" stroke="${C.ink}" stroke-width="2.6"/>`;
    s += label(245, 148, 'ONE existing', 10, 700, C.amberDeep) + label(245, 176, 'network line', 10, 700, C.amberDeep);
    // dispenser housing
    s += `<rect x="300" y="70" width="200" height="180" rx="12" fill="#fdf6ec" stroke="#eed9ac" stroke-width="1.6"/>`;
    s += label(400, 96, 'Ticket-dispenser housing', 11.5, 800, C.amberDeep);
    s += icon('switch', 372, 120, 56);
    s += label(400, 200, 'PoE+ switch', 12, 800) + label(400, 216, 'needs AC power here', 10, 600, C.muted);
    s += label(400, 232, '(or add extension board)', 9.5, 500, C.muted);
    // fan out
    const outs = [['camera', 'LPR camera', 'power + data (PoE+)', 46], ['relay', 'WISE IO at gate', 'data only (DC separate)', 146], ['pos', 'Ticket machine / POS', 'data', 246]];
    outs.forEach(o => {
      s += `<path d="M 500 160 Q 540 160 560 ${o[3] + 22}" fill="none" stroke="${C.ink}" stroke-width="2" marker-end="url(#a2)"/>`;
      s += chip(566, o[3] - 6, 196, 62, '#fbfaf8');
      s += icon(o[0], 582, o[3] + 6, 32);
      s += label(624, o[3] + 18, o[1], 11.5, 800, C.ink, 'start');
      s += label(624, o[3] + 36, o[2], 10, 500, C.muted, 'start');
    });
    return s + '</svg>';
  };

  /* ---------- M02: speed bump placement ---------- */
  G.bumpPlacement = function () {
    const W = 760, H = 210;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:740px" role="img" aria-label="Speed bump placement">${DEFS}`;
    s += `<rect x="20" y="60" width="720" height="100" fill="#f2f0eb" stroke="${C.line}"/>`;
    s += label(80, 50, 'street →', 10.5, 600, C.muted);
    // car moving
    s += icon('car', 60, 86, 52);
    s += `<line x1="130" y1="112" x2="185" y2="112" stroke="${C.muted}" stroke-width="1.8" marker-end="url(#a2)"/>`;
    // bump
    s += `<rect x="300" y="70" width="26" height="80" rx="6" fill="${C.dark}"/>`;
    s += `<path d="M300 70 h26" stroke="${C.amber}" stroke-width="3"/>`;
    s += label(313, 178, 'speed bump', 10.5, 700);
    s += label(313, 192, '84"L × 11.8"W × 2"H · cable channels', 9, 500, C.muted);
    // island
    s += `<rect x="400" y="60" width="150" height="100" rx="8" fill="#e3e0da" stroke="${C.line}"/>`;
    s += label(475, 50, 'LANE ISLAND', 10.5, 800, C.muted);
    s += icon('camera', 420, 84, 36) + icon('kiosk', 486, 80, 40);
    s += label(475, 148, 'camera zone', 10, 600, C.muted);
    // gate
    s += `<rect x="600" y="66" width="10" height="30" rx="3" fill="#93c5fd"/><rect x="608" y="70" width="120" height="9" rx="4" fill="#e8945f"/>`;
    s += label(660, 108, 'gate', 10.5, 600, C.muted);
    // distance annotation
    s += `<line x1="326" y1="34" x2="400" y2="34" stroke="${C.red}" stroke-width="1.6" marker-start="url(#a2r)" marker-end="url(#a2r)"/>`;
    s += label(363, 26, '3–5 ft', 12, 800, C.red);
    return s + '</svg>';
  };

  /* ---------- M03: camera decision visual ---------- */
  G.cameraCompare = function () {
    const W = 860, H = 320;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:820px" role="img" aria-label="iPro vs INEX">${DEFS}`;
    function card(x, title, sub, rows, footer, accent) {
      let o = chip(x, 16, 400, 288, '#fbfaf8');
      o += `<rect x="${x}" y="16" width="400" height="52" rx="10" fill="${accent}"/><rect x="${x}" y="56" width="400" height="12" fill="#fbfaf8"/>`;
      o += label(x + 200, 38, title, 14, 800, '#fff');
      o += label(x + 200, 56, sub, 10.5, 600, 'rgba(255,255,255,.85)');
      rows.forEach((r, i) => {
        const y = 96 + i * 40;
        o += `<circle cx="${x + 34}" cy="${y}" r="4" fill="${accent}"/>`;
        o += label(x + 50, y + 4, r, 11.5, 600, C.ink, 'start');
      });
      o += `<rect x="${x + 20}" y="252" width="360" height="36" rx="8" fill="${C.graySoft}"/>`;
      o += label(x + 200, 274, footer, 11, 700, C.ink);
      return o;
    }
    s += card(14, 'iPro WV-S15700-V2L (4K)', 'a great eye that needs a brain and good light', [
      'Network camera — NOT an LPR camera',
      'Recognition runs in Uncanny Vision (server)',
      'Needs medium–good lighting · optical zoom',
      'Stop-and-go and moving traffic'
    ], '~$1,100–1,500 + $75/mo per camera', '#334155');
    s += card(446, 'INEX IZA500GR', 'eye and brain in one box, tolerates bad light', [
      'Integrated ALPR: color + IR sensors',
      'Onboard AI + OCR — no external servers',
      'High accuracy in ALL lighting / weather',
      'Reads at up to 80 mph'
    ], '~$1,000 + ~$75/mo SaaS (varies)', C.amberDeep);
    return s + '</svg>';
  };

  /* ---------- M03/M09: light geometry right vs wrong ---------- */
  G.lightGeometry = function () {
    const W = 820, H = 300;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:800px" role="img" aria-label="Lighting geometry">${DEFS}`;
    function scene(x, ok) {
      let o = chip(x, 16, 390, 268, ok ? '#f3faf4' : '#fdf3f3', ok ? '#bfe3c8' : '#f0c9c9');
      o += label(x + 195, 44, ok ? '✓ DO — parallel to the lens' : '✗ DON’T — light opposing the lens', 13, 800, ok ? C.green : C.red);
      // ground + car rear with plate
      o += `<rect x="${x + 20}" y="240" width="350" height="10" fill="#d7d3ca"/>`;
      o += `<g transform="translate(${x + 230},196)"><path d="M-50 44 L-50 12 Q-50 -6 -28 -9 L14 -16 Q46 -20 62 2 L74 20 Q80 28 80 44 Z" fill="${C.dark}"/><rect x="-46" y="18" width="9" height="15" rx="2" fill="#f5f2ea" stroke="${C.ink}" stroke-width="1.4"/><circle cx="-22" cy="45" r="12" fill="#11141a"/><circle cx="56" cy="45" r="12" fill="#11141a"/></g>`;
      // camera pole (left)
      o += `<rect x="${x + 46}" y="120" width="8" height="120" fill="#b9b4a8"/>`;
      o += `<g transform="translate(${x + 62},128) rotate(35)"><rect x="-4" y="-7" width="26" height="14" rx="3" fill="${C.ink}"/><path d="M22 -6 L32 -9 L32 9 L22 6 Z" fill="${C.ink}"/></g>`;
      o += `<line x1="${x + 70}" y1="140" x2="${x + 186}" y2="216" stroke="${C.muted}" stroke-width="1.2" stroke-dasharray="4 4"/>`;
      if (ok) {
        // light next to camera, same angle
        o += `<rect x="${x + 96}" y="112" width="8" height="128" fill="#b9b4a8"/>`;
        o += `<g transform="translate(${x + 112},120) rotate(35)"><rect x="-6" y="-7" width="20" height="14" rx="3" fill="${C.amber}"/></g>`;
        o += `<path d="M ${x + 116} 130 L ${x + 205} 212 L ${x + 155} 226 Z" fill="${C.amberSoft}"/>`;
        o += label(x + 195, 268, 'Light 8–10 ft high, angled down, beside the camera — plate lit, no glare', 10, 600, C.green);
      } else {
        // light facing the camera from beyond the car
        o += `<rect x="${x + 330}" y="112" width="8" height="128" fill="#b9b4a8"/>`;
        o += `<g transform="translate(${x + 326},124) rotate(148)"><rect x="-6" y="-7" width="20" height="14" rx="3" fill="${C.amber}"/></g>`;
        o += `<path d="M ${x + 318} 132 L ${x + 86} 140 L ${x + 180} 190 Z" fill="${C.amberSoft}"/>`;
        o += `<g transform="translate(${x + 74},136)"><path d="M0 0 l14 8 M0 8 l14 -8 M18 4 l12 0" stroke="${C.red}" stroke-width="2.4"/></g>`;
        o += label(x + 195, 268, 'Beam fires into the lens — retroreflective plate whites out, reads fail', 10, 600, C.red);
      }
      return o;
    }
    s += scene(6, true) + scene(420, false);
    return s + '</svg>';
  };

  /* ---------- M05: headless NUC problem ---------- */
  G.headless = function () {
    const W = 820, H = 250;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:800px" role="img" aria-label="HDMI emulator dependency">${DEFS}`;
    function half(x, ok) {
      let o = chip(x, 14, 392, 218, ok ? '#f3faf4' : '#fdf3f3', ok ? '#bfe3c8' : '#f0c9c9');
      o += label(x + 196, 42, ok ? '✓ With HDMI display emulator' : '✗ Headless, no emulator plug', 13, 800, ok ? C.green : C.red);
      o += icon('nuc', x + 48, 74, 62);
      if (ok) o += `<g transform="translate(${x + 116},96)">${ICO.plug}</g>`;
      // arrow to remote screen
      o += `<line x1="${x + 150}" y1="106" x2="${x + 224}" y2="106" stroke="${ok ? C.green : C.red}" stroke-width="2" marker-end="url(#${ok ? 'a2g' : 'a2r'})" ${ok ? '' : 'stroke-dasharray="5 4"'}/>`;
      o += label(x + 187, 96, 'TeamViewer', 9.5, 700, C.muted);
      // remote laptop screen
      o += `<rect x="${x + 232}" y="64" width="120" height="80" rx="6" fill="${ok ? '#dbeafe' : '#111'}" stroke="${C.ink}" stroke-width="2"/>`;
      o += `<rect x="${x + 268}" y="146" width="48" height="8" rx="3" fill="${C.ink}"/>`;
      if (ok) { o += label(x + 292, 100, 'GMP support', 10, 700, C.blue); o += label(x + 292, 114, 'sees the desktop', 9.5, 600, C.blue); }
      else { o += label(x + 292, 108, 'BLANK SCREEN', 10.5, 800, '#f87171'); }
      o += label(x + 196, 210, ok ? 'Plug mimics a monitor → remote access works. One plug per NUC.' : 'NUC detects no monitor → remote tools render nothing.', 10, 600, ok ? C.green : C.red);
      return o;
    }
    s += half(8, false) + half(418, true);
    return s + '</svg>';
  };

  /* ---------- M06: wiring minimums per lane type ---------- */
  G.laneWiringCounts = function () {
    const W = 840, H = 270;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:820px" role="img" aria-label="Wiring minimums by lane type">${DEFS}`;
    function cat6(x, y) { return `<rect x="${x}" y="${y}" width="34" height="22" rx="4" fill="${C.blueSoft}" stroke="${C.blue}" stroke-width="1.5"/>` + label(x + 17, y + 15, 'CAT6', 8.5, 800, C.blue); }
    function dc(x, y) { return `<rect x="${x}" y="${y}" width="34" height="22" rx="4" fill="#fde9d2" stroke="${C.amberDeep}" stroke-width="1.5"/>` + label(x + 17, y + 15, 'DC', 9, 800, C.amberDeep); }
    function ac(x, y) { return `<rect x="${x}" y="${y}" width="34" height="22" rx="4" fill="#fecaca" stroke="${C.red}" stroke-width="1.5"/>` + label(x + 17, y + 15, 'AC', 9, 800, C.red); }
    // entry card
    s += chip(14, 16, 392, 238, '#fbfaf8');
    s += label(210, 46, 'ENTRY LANE (ExpressLane)', 13, 800);
    s += icon('camera', 44, 66, 34) + label(88, 88, '1× LPR camera (PoE/PoE+)', 11, 600, C.ink, 'start');
    s += icon('relay', 44, 110, 34) + label(88, 132, '1× WISE 4060 (gate cabinet)', 11, 600, C.ink, 'start');
    s += `<g opacity=".55">${icon('kiosk', 44, 154, 34)}${label(88, 176, 'LED display — optional (AC + network)', 11, 600, C.muted, 'start')}</g>`;
    s += label(38, 212, 'Minimum wiring:', 10.5, 800, C.muted, 'start');
    s += cat6(150, 196) + cat6(190, 196) + dc(230, 196);
    s += label(210, 240, '2× CAT6 terminations + 1× DC supply', 10.5, 700, C.amberDeep);
    // exit card
    s += chip(434, 16, 392, 238, '#fdf6ec', '#eed9ac');
    s += label(630, 46, 'EXIT LANE (ExpressLane)', 13, 800, C.amberDeep);
    s += icon('camera', 464, 66, 34) + label(508, 88, '1× LPR camera (PoE/PoE+)', 11, 600, C.ink, 'start');
    s += icon('relay', 464, 110, 34) + label(508, 132, '1× WISE 4060 (gate housing)', 11, 600, C.ink, 'start');
    s += icon('pos', 464, 152, 34) + label(508, 174, '1× kiosk / POS pedestal + intercom', 11, 600, C.ink, 'start');
    s += label(458, 212, 'Minimum wiring:', 10.5, 800, C.muted, 'start');
    s += cat6(570, 196) + cat6(610, 196) + cat6(650, 196) + cat6(690, 196) + dc(730, 196) + ac(770, 196);
    s += label(630, 240, '4× CAT6 + 1× DC supply + 1× AC outlet', 10.5, 700, C.amberDeep);
    return s + '</svg>';
  };

  /* ---------- M07: site walk route map ---------- */
  G.siteWalkMap = function () {
    const W = 860, H = 360;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:840px" role="img" aria-label="Site walk stops">${DEFS}`;
    // garage outline
    s += `<rect x="20" y="20" width="820" height="320" rx="14" fill="#f6f5f1" stroke="${C.line}" stroke-width="1.6"/>`;
    s += label(430, 44, 'THE GARAGE — 9 stops, walked with the location manager', 12, 800, C.muted);
    // lanes bottom
    s += `<rect x="60" y="220" width="330" height="100" fill="#eeece7" stroke="${C.line}"/>`;
    s += label(225, 212, 'ENTRY / EXIT LANES', 10, 800, C.muted);
    s += `<line x1="225" y1="220" x2="225" y2="320" stroke="${C.line}" stroke-dasharray="6 5"/>`;
    s += icon('kiosk', 130, 240, 30) + icon('camera', 95, 244, 26) + icon('kiosk', 300, 240, 30) + icon('camera', 340, 244, 26);
    s += `<rect x="180" y="292" width="60" height="8" rx="4" fill="#e8945f"/><rect x="255" y="292" width="60" height="8" rx="4" fill="#e8945f"/>`;
    // office top right
    s += `<rect x="620" y="70" width="180" height="90" rx="8" fill="#eef4fb" stroke="#94a3b8"/>`;
    s += label(710, 94, 'OFFICE / SERVER ROOM', 10, 800, C.blue);
    s += icon('nuc', 650, 104, 34) + icon('globe', 720, 104, 34);
    // stops
    const stops = [
      [120, 180, '1', 'count lanes (reversible = 2)'],
      [80, 130, '2', 'approach length per lane'],
      [225, 258, '3–4', 'gate make · open control board'],
      [318, 180, '5', 'loops functional? metal test'],
      [430, 258, '6', 'conduit space for CAT6'],
      [520, 180, '7', 'dispenser power + network'],
      [710, 180, '8', 'firewall → GMP AWS'],
      [600, 258, '9', 'lighting: 500–600 lux'],
    ];
    // path
    s += `<path d="M120 180 L80 130 L225 258 L318 180 L430 258 L520 180 L710 180 L600 258" fill="none" stroke="${C.amber}" stroke-width="2" stroke-dasharray="7 5" opacity=".7"/>`;
    stops.forEach(st => {
      s += `<circle cx="${st[0]}" cy="${st[1]}" r="15" fill="${C.ink}"/>` + label(st[0], st[1] + 4.5, st[2], 11, 800, '#fff');
      s += label(st[0], st[1] + 32, st[3], 9.5, 700, C.ink);
    });
    return s + '</svg>';
  };

  /* ---------- M10: bench flow ---------- */
  G.benchFlow = function () {
    const steps = [
      ['wrench', 'BIOS', 'After Power Failure', '= Power On'],
      ['doc', 'Bootable USB', 'Rufus + Ubuntu', '24.04.03 · ≥8GB'],
      ['nuc', 'Install Ubuntu', 'erase disk · auto-login', 'tenant-named creds'],
      ['phone', 'TeamViewer', 'start w/ system', '+ personal password'],
      ['check', 'Share with GMP', 'credentials + TV ID', '+ pack HDMI plug']
    ];
    const W = 880, H = 175, bw = 156, gap = 18, x0 = 12;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:860px" role="img" aria-label="NUC bench flow">${DEFS}`;
    steps.forEach((st, i) => {
      const x = x0 + i * (bw + gap);
      s += chip(x, 24, bw, 122);
      s += icon(st[0], x + bw / 2 - 17, 38, 34);
      s += label(x + bw / 2, 96, st[1], 12.5, 800);
      s += label(x + bw / 2, 112, st[2], 10, 500, C.muted);
      s += label(x + bw / 2, 127, st[3], 10, 500, C.muted);
      if (i < steps.length - 1) s += `<line x1="${x + bw + 2}" y1="85" x2="${x + bw + gap - 3}" y2="85" stroke="${C.ink}" stroke-width="2" marker-end="url(#a2)"/>`;
    });
    return s + '</svg>';
  };

  /* ---------- M11: bench → site DHCP transition ---------- */
  G.dhcpTransition = function () {
    const W = 860, H = 260;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:840px" role="img" aria-label="DHCP transition">${DEFS}`;
    // bench
    s += chip(14, 20, 380, 210, '#fbfaf8');
    s += label(204, 48, 'ON THE BENCH (factory state)', 12.5, 800);
    s += `<rect x="48" y="76" width="110" height="66" rx="8" fill="#eef4fb" stroke="#64748b" stroke-width="1.6"/>`;
    s += label(103, 100, 'WISE board', 11, 800) + label(103, 120, '10.0.0.1', 12, 800, C.amberDeep);
    s += `<line x1="158" y1="109" x2="250" y2="109" stroke="${C.ink}" stroke-width="2.4"/>` + label(204, 100, 'CAT6', 9.5, 700, C.muted);
    s += `<rect x="250" y="76" width="110" height="66" rx="8" fill="#fff" stroke="${C.line}" stroke-width="1.6"/>`;
    s += label(305, 100, 'your laptop', 11, 800) + label(305, 120, '10.0.0.2', 12, 800, C.green);
    s += label(204, 172, 'root / 00000000 at 10.0.0.1/config', 10.5, 700, C.muted);
    s += label(204, 192, 'record MAC → lane · set IP Mode: DHCP · Submit', 10.5, 700, C.ink);
    s += label(204, 216, 'Laptop must NEVER take 10.0.0.1', 10.5, 800, C.red);
    // arrow
    s += `<line x1="400" y1="122" x2="452" y2="122" stroke="${C.ink}" stroke-width="2.6" marker-end="url(#a2)"/>`;
    // site
    s += chip(460, 20, 386, 210, '#f3faf4', '#bfe3c8');
    s += label(653, 48, 'ON SITE (after DHCP)', 12.5, 800, C.green);
    s += `<rect x="492" y="76" width="110" height="66" rx="8" fill="#eef4fb" stroke="#64748b" stroke-width="1.6"/>`;
    s += label(547, 100, 'WISE board', 11, 800) + label(547, 120, 'IP = ?', 12, 800, C.muted);
    s += icon('switch', 646, 84, 48);
    s += label(670, 152, 'site switch', 10, 600, C.muted);
    s += `<line x1="602" y1="109" x2="644" y2="109" stroke="${C.ink}" stroke-width="2.2"/>`;
    s += `<rect x="716" y="76" width="112" height="66" rx="8" fill="#fff" stroke="${C.line}" stroke-width="1.6"/>`;
    s += label(772, 100, 'your laptop', 11, 800) + label(772, 120, 'DHCP', 12, 800, C.green);
    s += `<line x1="694" y1="109" x2="716" y2="109" stroke="${C.ink}" stroke-width="2.2"/>`;
    s += label(653, 176, '10.0.0.1 is GONE — find the board by MAC:', 10.5, 700, C.ink);
    s += `<rect x="521" y="188" width="264" height="26" rx="6" fill="${C.dark}"/>`;
    s += label(653, 205, 'arp -n | grep <MAC>', 12, 700, '#fbbf24');
    return s + '</svg>';
  };

  /* ---------- M12: WISE UI bulb states ---------- */
  G.testSequence = function () {
    const W = 860, H = 300;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:840px" role="img" aria-label="WISE UI bulb logic">${DEFS}`;
    function panel(x, title, di0on, di1on, note, accent) {
      let o = chip(x, 20, 268, 240, '#fbfaf8');
      o += `<rect x="${x}" y="20" width="268" height="40" rx="10" fill="${C.dark}"/><rect x="${x}" y="50" width="268" height="10" fill="#fbfaf8"/>`;
      o += label(x + 134, 45, title, 12, 800, '#fff');
      [['DI-0', di0on, 'presence'], ['DI-1', di1on, 'safety']].forEach((b, i) => {
        const bx = x + 74 + i * 120;
        o += `<circle cx="${bx}" cy="118" r="26" fill="${b[1] ? '#fde68a' : '#e5e3dd'}" stroke="${b[1] ? C.amber : C.line}" stroke-width="3"/>`;
        if (b[1]) o += `<circle cx="${bx}" cy="118" r="12" fill="${C.amber}"/>`;
        else o += `<line x1="${bx - 9}" y1="109" x2="${bx + 9}" y2="127" stroke="${C.muted}" stroke-width="3" stroke-linecap="round"/>`;
        o += label(bx, 162, b[0], 12, 800);
        o += label(bx, 178, b[2], 9.5, 600, C.muted);
      });
      // trend chart
      o += `<rect x="${x + 26}" y="196" width="216" height="34" rx="5" fill="#fff" stroke="${C.line}"/>`;
      const mid = 213;
      if (di0on && di1on) o += `<path d="M${x + 32} ${mid} h204" stroke="${C.amber}" stroke-width="2.4"/>`;
      else o += `<path d="M${x + 32} ${mid} h80 l10 12 h40 l10 -12 h64" stroke="${C.red}" stroke-width="2.4" fill="none"/>`;
      o += label(x + 134, 250, note, 10, 700, accent);
      return o;
    }
    s += panel(10, 'IDLE — no vehicle', true, true, 'Bulbs LIT = loops inactive', C.muted);
    s += panel(296, 'Metal on PRESENCE loop', false, true, 'DI-0 goes OFF + chart dips', C.red);
    s += panel(582, 'Metal on SAFETY loop', true, false, 'DI-1 goes OFF + chart dips', C.red);
    s += label(430, 286, 'Counter-intuitive on purpose: LIT means inactive. If the wrong bulb reacts, your loop wiring is swapped.', 11, 700, C.amberDeep);
    return s + '</svg>';
  };

  /* ---------- M14: port map ---------- */
  G.portMap = function () {
    const W = 860, H = 380;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:840px" role="img" aria-label="Ports and endpoints">${DEFS}`;
    // cloud
    s += `<path d="M330 74 a34 34 0 1 1 10-52 a40 40 0 0 1 76 10 a28 28 0 0 1-6 55 Z" transform="translate(120,6)" fill="#eff6ff" stroke="#93c5fd" stroke-width="2"/>`;
    s += label(492, 48, 'GMP CLOUD (AWS)', 12, 800, C.blue);
    s += label(492, 66, 'api / mqtt .parkingglobalserver.com', 9.5, 600, C.muted);
    // firewall line
    s += `<line x1="60" y1="130" x2="800" y2="130" stroke="${C.red}" stroke-width="2.4" stroke-dasharray="10 6"/>`;
    s += `<rect x="60" y="118" width="90" height="24" rx="6" fill="${C.red}"/>` + label(105, 134, 'FIREWALL', 10, 800, '#fff');
    // NUC center
    s += `<rect x="392" y="180" width="200" height="80" rx="10" fill="#eef4fb" stroke="#64748b" stroke-width="2"/>`;
    s += icon('nuc', 412, 200, 40) + label(512, 214, 'NUC / VM', 13, 800) + label(512, 232, 'GMP stack in Docker', 9.5, 600, C.muted);
    // external arrows
    s += `<line x1="452" y1="180" x2="422" y2="86" stroke="${C.blue}" stroke-width="2.4" marker-end="url(#a2)"/>`;
    s += `<rect x="330" y="120" width="86" height="22" rx="11" fill="${C.blue}"/>` + label(373, 135, '443 · HTTPS', 9.5, 800, '#fff');
    s += label(373, 162, 'primary GMP endpoint', 9, 600, C.muted);
    s += `<line x1="540" y1="180" x2="566" y2="86" stroke="${C.blue}" stroke-width="2.4" marker-end="url(#a2)"/>`;
    s += `<rect x="548" y="120" width="90" height="22" rx="11" fill="${C.blue}"/>` + label(593, 135, '8883 · MQTT', 9.5, 800, '#fff');
    s += label(593, 162, 'ReverseQR + monitoring', 9, 600, C.muted);
    // LAN devices
    const devs = [
      [80, 300, 'relay', 'WISE IO boards', '1883 → MQTT broker on NUC', '1883'],
      [360, 300, 'camera', 'LPR camera / reader', '4000 / 4001 → plate data', '4000·4001'],
      [640, 300, 'nuc', 'Local access', 'port 80 open from NUC/VM', '80']
    ];
    devs.forEach(d => {
      s += chip(d[0] - 24, d[1] - 20, 220, 76, '#fbfaf8');
      s += icon(d[2], d[0] - 6, d[1] - 4, 34);
      s += label(d[0] + 40, d[1] + 12, d[3], 11, 800, C.ink, 'start');
      s += label(d[0] + 40, d[1] + 30, d[4], 9.5, 600, C.muted, 'start');
      const cx = d[0] + 86;
      s += `<line x1="${cx}" y1="${d[1] - 20}" x2="${490}" y2="262" stroke="${C.green}" stroke-width="2.2" marker-end="url(#a2g)"/>`;
      const mx = (cx + 490) / 2, my = (d[1] - 20 + 262) / 2;
      s += `<rect x="${mx - 34}" y="${my - 11}" width="68" height="20" rx="10" fill="${C.green}"/>` + label(mx, my + 3, d[5], 9, 800, '#fff');
    });
    s += label(430, 290 - 22, '', 10, 600);
    s += label(430, 372, 'Green = inside the site LAN (mind VLAN segmentation) · Blue = must cross the firewall, permanently', 10.5, 700, C.muted);
    return s + '</svg>';
  };

  /* ---------- Welcome: journey path ---------- */
  G.journey = function () {
    const stops = [
      ['1', 'Orientation', 'the system + lanes'],
      ['2', 'Hardware', 'every device'],
      ['3', 'Site assessment', 'walk · wiring · placement'],
      ['4', 'Bench setup', 'NUC + controllers'],
      ['5', 'Install & validate', 'wire · test · prove'],
      ['6', 'Network & handoff', 'firewall · go-live']
    ];
    const W = 880, H = 200;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:860px" role="img" aria-label="Your journey">${DEFS}`;
    s += `<path d="M60 120 C 200 40, 300 190, 440 110 S 700 40, 820 120" fill="none" stroke="${C.amber}" stroke-width="3.5" stroke-dasharray="1 9" stroke-linecap="round"/>`;
    const pos = [[60, 120], [212, 92], [365, 128], [520, 92], [672, 96], [820, 120]];
    stops.forEach((st, i) => {
      const [x, y] = pos[i];
      s += `<circle cx="${x}" cy="${y}" r="20" fill="${i === 0 ? C.amberDeep : C.ink}"/>` + label(x, y + 5, st[0], 13, 800, '#fff');
      const ty = y > 110 ? y + 42 : y - 46;
      s += label(x, ty, st[1], 12, 800);
      s += label(x, ty + 15, st[2], 9.5, 600, C.muted);
    });
    return s + '</svg>';
  };

  Object.assign(window.DIAGRAMS, G);
})();
