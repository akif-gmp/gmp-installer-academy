/* ============================================================
   GMP Access Installer Academy — SVG diagram library
   Faithful recreations of the lane diagrams and geometry
   figures from "GMP Access Install V3" (pp. 20, 25, 58–65).
   ============================================================ */
(function () {
  'use strict';

  const C = {
    ink: '#1c1c1c', muted: '#6b7c93', line: '#c9c5bc',
    amber: '#ffc300', amberSoft: 'rgba(255,195,0,.22)',
    red: '#dc2626', blue: '#bfdbfe', blueDeep: '#1d4ed8',
    green: '#bbf7d0', pink: '#fecaca', gray: '#cbd5e1',
    car: '#20242b', paper: '#ffffff'
  };

  /* ---------- shared primitives ---------- */

  function carTopView(cx, cy, scale, rotate) {
    return `<g transform="translate(${cx},${cy}) scale(${scale || 1}) rotate(${rotate || 0})">
      <rect x="-44" y="-88" width="88" height="176" rx="26" fill="${C.car}"/>
      <rect x="-50" y="-46" width="9" height="16" rx="3" fill="${C.car}"/>
      <rect x="41" y="-46" width="9" height="16" rx="3" fill="${C.car}"/>
      <path d="M -31 -50 Q 0 -62 31 -50 L 27 -26 Q 0 -34 -27 -26 Z" fill="#eef1f5"/>
      <path d="M -29 62 Q 0 72 29 62 L 26 42 Q 0 50 -26 42 Z" fill="#eef1f5"/>
      <rect x="-33" y="-24" width="66" height="62" rx="10" fill="#2b313b"/>
    </g>`;
  }

  function switchIcon(x, y, label) {
    return `<g transform="translate(${x},${y})">
      <rect x="0" y="0" width="44" height="36" rx="7" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.5"/>
      <rect x="8" y="20" width="7" height="8" fill="${C.ink}"/>
      <rect x="18" y="20" width="7" height="8" fill="${C.ink}"/>
      <rect x="28" y="20" width="7" height="8" fill="${C.ink}"/>
      <rect x="8" y="8" width="27" height="7" rx="2" fill="${C.ink}"/>
      <text x="22" y="-8" text-anchor="middle" font-size="11" font-style="italic" fill="${C.ink}">${label || 'Ethernet switch'}</text>
    </g>`;
  }

  function cameraIcon(x, y, flip) {
    return `<g transform="translate(${x},${y})${flip ? ' scale(-1,1)' : ''}">
      <rect x="-26" y="-20" width="52" height="46" rx="6" fill="${C.paper}" stroke="${C.line}"/>
      <g transform="rotate(-32)">
        <rect x="-14" y="-7" width="24" height="13" rx="3" fill="${C.ink}"/>
        <path d="M 10 -6 L 20 -9 L 20 8 L 10 5 Z" fill="${C.ink}"/>
        <rect x="-6" y="-12" width="9" height="6" rx="2" fill="${C.ink}"/>
      </g>
    </g>`;
  }

  function ioCluster(x, y, dcLabel) {
    // Controller/IO board in gate housing + DC adapter + power feed
    return `<g transform="translate(${x},${y})">
      <rect x="0" y="0" width="86" height="78" rx="8" fill="${C.blue}" opacity=".55"/>
      <rect x="14" y="8" width="58" height="26" rx="4" fill="${C.paper}" stroke="${C.line}"/>
      <text x="43" y="19" text-anchor="middle" font-size="9.5" fill="${C.ink}">Controller/</text>
      <text x="43" y="30" text-anchor="middle" font-size="9.5" fill="${C.ink}">IO Board</text>
      <circle cx="43" cy="52" r="14" fill="#0e7490"/>
      <circle cx="43" cy="52" r="9" fill="#e2f2f8"/>
      <rect x="36" y="48" width="14" height="8" rx="2" fill="#0e7490"/>
      <text x="43" y="92" text-anchor="middle" font-size="10" fill="${C.ink}">Gate Housing</text>
      <rect x="-64" y="26" width="56" height="22" rx="4" fill="${C.green}"/>
      <text x="-36" y="40" text-anchor="middle" font-size="9.5" fill="${C.ink}">DC Adapter</text>
      <text x="-36" y="62" text-anchor="middle" font-size="9" font-style="italic" fill="${C.muted}">${dcLabel || '12 V'}</text>
      <line x1="-8" y1="37" x2="14" y2="37" stroke="${C.ink}" stroke-width="1.6"/>
      <rect x="-130" y="26" width="52" height="22" rx="4" fill="${C.pink}"/>
      <text x="-104" y="40" text-anchor="middle" font-size="9.5" fill="${C.ink}">Power</text>
      <line x1="-78" y1="37" x2="-64" y2="37" stroke="${C.ink}" stroke-width="1.6"/>
      <text x="-4" y="18" text-anchor="middle" font-size="8.5" font-style="italic" fill="${C.muted}">Network</text>
    </g>`;
  }

  function loopRect(x, y, w, h, color, label, labelPos, rot) {
    const cx = x + w / 2, cy = y + h / 2;
    let lbl = '';
    if (labelPos === 'inside') {
      lbl = `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="12" font-style="italic" fill="${C.ink}"${rot ? ` transform="rotate(180 ${cx} ${cy})"` : ''}>${label}</text>`;
    } else if (labelPos === 'right') {
      lbl = `<text x="${x + w + 26}" y="${cy}" font-size="12" font-style="italic" fill="${C.ink}" transform="rotate(90 ${x + w + 26} ${cy})" text-anchor="middle">${label}</text>
             <line x1="${x + w + 2}" y1="${cy}" x2="${x + w + 16}" y2="${cy}" stroke="${C.red}" stroke-width="1.5" marker-end="url(#arr-red)"/>`;
    }
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="9 6"/>${lbl}`;
  }

  function gateArm(x, y, w, label) {
    return `<g>
      <rect x="${x}" y="${y}" width="${w}" height="22" rx="3" fill="${C.gray}" stroke="#94a3b8"/>
      <text x="${x + w / 2}" y="${y + 15}" text-anchor="middle" font-size="10" fill="${C.ink}">${label || 'Gate Arm'}</text>
    </g>`;
  }

  function beam(fromX, fromY, toX1, toY1, toX2, toY2) {
    return `<polygon points="${fromX},${fromY} ${toX1},${toY1} ${toX2},${toY2}" fill="${C.amberSoft}"/>`;
  }

  const DEFS = `<defs>
    <marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="${C.ink}"/></marker>
    <marker id="arr-red" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L8,4.5 L0,9 Z" fill="${C.red}"/></marker>
  </defs>`;

  /* ---------- single-direction lane diagram (6 variants) ---------- */
  /* opts: {title, dir:'entry'|'exit', device:null|'kiosk'|'pos', autoVend, dcLabel, note} */
  function laneDiagram(o) {
    const W = 660, H = o.note ? 590 : 560;
    const laneX = 340, laneW = 220, laneY = 66, laneH = 440;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.title}" style="max-width:640px">${DEFS}
      <text x="${W / 2}" y="34" text-anchor="middle" font-size="21" font-weight="800" fill="${C.ink}">${o.title}</text>
      <rect x="${laneX}" y="${laneY}" width="${laneW}" height="${laneH}" fill="none" stroke="${C.line}" stroke-width="1.6"/>`;

    if (!o.autoVend) {
      // safety loop above gate arm, presence loop under vehicle
      s += loopRect(laneX + 30, laneY + 18, laneW - 60, 52, C.amber, 'Safety Loop', 'inside');
      s += gateArm(laneX - 12, laneY + 88, laneW + 24);
      s += carTopView(laneX + laneW / 2, laneY + 268, 1);
      s += loopRect(laneX + 38, laneY + 210, laneW - 76, 116, C.red, 'Presence Loop', 'right');
      // LPR camera bottom-left reading rear plate
      s += beam(318, laneY + 402, laneX + laneW / 2 - 30, laneY + 342, laneX + laneW / 2 + 18, laneY + 356);
      s += cameraIcon(318, laneY + 402);
      s += `<text x="318" y="${laneY + 446}" text-anchor="middle" font-size="10" fill="${C.ink}">LPR camera</text>`;
    } else {
      // Exit with Auto vend: vehicle beyond the gate, read zone behind gate arm, camera front-reads
      s += carTopView(laneX + laneW / 2, laneY + 150, 1);
      s += gateArm(laneX - 12, laneY + 262, laneW + 24);
      s += loopRect(laneX + 34, laneY + 216, laneW - 68, 130, C.red, '', 'none');
      s += `<text x="${laneX + laneW / 2}" y="${laneY + 322}" text-anchor="middle" font-size="12" font-style="italic" fill="${C.ink}">Read Zone</text>`;
      s += beam(316, laneY + 356, laneX + laneW / 2 - 26, laneY + 216, laneX + laneW / 2 + 26, laneY + 232);
      s += cameraIcon(316, laneY + 356);
      s += `<text x="316" y="${laneY + 400}" text-anchor="middle" font-size="10" fill="${C.ink}">LPR camera</text>`;
    }

    // vehicle direction arrow
    const dirLabel = o.dir === 'entry' ? 'Vehicle Entry' : 'Vehicle Exit';
    s += `<line x1="${laneX + laneW / 2}" y1="${laneY + laneH + 34}" x2="${laneX + laneW / 2}" y2="${laneY + laneH + 6}" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#arr)"/>
      <text x="${laneX + laneW / 2 + 14}" y="${laneY + laneH + 28}" font-size="12" font-style="italic" fill="${C.ink}">${dirLabel}</text>`;

    // switch + IO cluster + cabling
    s += switchIcon(64, 70);
    s += ioCluster(196, 128, o.dcLabel);
    // ethernet from switch to IO
    s += `<path d="M 108 88 H 239 V 128" fill="none" stroke="${C.ink}" stroke-width="1.7"/>
      <text x="170" y="82" font-size="10" font-style="italic" fill="${C.ink}">Ethernet</text>`;
    // IO to gate housing zone (dashed hint toward gate arm + safety loop)
    s += `<path d="M 282 160 H 316 V ${laneY + 44} H ${laneX + 26}" fill="none" stroke="${C.line}" stroke-width="1.4" stroke-dasharray="4 4"/>
      <path d="M 282 190 H 322 V ${laneY + 99} H ${laneX - 12}" fill="none" stroke="${C.line}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
    // CAT6 PoE run from switch down to camera
    const camY = o.autoVend ? laneY + 356 : laneY + 402;
    s += `<path d="M 86 106 V ${camY + 44} H 292" fill="none" stroke="${C.ink}" stroke-width="1.7"/>
      <text x="120" y="${camY + 38}" font-size="10" font-style="italic" fill="${C.ink}">CAT 6 POE line</text>`;

    // optional kiosk / POS pedestal
    if (o.device) {
      const isPos = o.device === 'pos';
      const dx = 196, dy = 330;
      s += `<rect x="${dx}" y="${dy}" width="86" height="78" rx="8" fill="#fde9d2" opacity=".8"/>`;
      if (isPos) {
        s += `<g transform="translate(${dx + 43},${dy + 30})">
          <rect x="-12" y="-16" width="24" height="34" rx="4" fill="${C.ink}"/>
          <rect x="-8" y="-12" width="16" height="10" rx="2" fill="#8fd3ff"/>
          <rect x="-8" y="2" width="16" height="12" rx="2" fill="#3c434e"/>
        </g><text x="${dx + 43}" y="${dy + 66}" text-anchor="middle" font-size="9.5" font-style="italic" fill="${C.ink}">POS Pedestal</text>`;
      } else {
        s += `<g transform="translate(${dx + 43},${dy + 28})">
          <rect x="-11" y="-20" width="22" height="44" rx="3" fill="#2563eb"/>
          <rect x="-7" y="-16" width="14" height="16" rx="2" fill="#dbeafe"/>
          <rect x="-7" y="4" width="14" height="6" rx="1.5" fill="#dbeafe"/>
        </g><text x="${dx + 43}" y="${dy + 68}" text-anchor="middle" font-size="9.5" font-style="italic" fill="${C.ink}">*Payment Kiosk</text>`;
      }
      // network + power runs to device
      s += `<path d="M 130 88 V ${dy + 39} H ${dx}" fill="none" stroke="${C.ink}" stroke-width="1.5"/>
            <path d="M 92 165 H 74 V ${dy + 58} H ${dx}" fill="none" stroke="${C.ink}" stroke-width="1.5"/>`;
      // distance annotation device→camera
      s += `<line x1="${dx + 43}" y1="${dy + 82}" x2="${dx + 43}" y2="${camY - 24}" stroke="${C.muted}" stroke-width="1.2" marker-end="url(#arr)"/>
        <text x="${dx + 55}" y="${(dy + 82 + camY) / 2}" font-size="9.5" font-style="italic" fill="${C.muted}" transform="rotate(90 ${dx + 55} ${(dy + 82 + camY) / 2})" text-anchor="middle">Distance 30ft</text>`;
    } else if (!o.autoVend) {
      // distance annotation from IO area straight to camera (per source: Distance 30ft)
      s += `<line x1="239" y1="240" x2="239" y2="${camY - 4}" stroke="${C.muted}" stroke-width="1.2" marker-end="url(#arr)"/>
        <text x="251" y="${(240 + camY) / 2}" font-size="9.5" font-style="italic" fill="${C.muted}" transform="rotate(90 251 ${(240 + camY) / 2})" text-anchor="middle">Distance 30ft</text>`;
    }

    if (o.note) s += `<text x="${W / 2}" y="${H - 14}" text-anchor="middle" font-size="11" font-style="italic" fill="${C.ink}">${o.note}</text>`;
    return s + '</svg>';
  }

  /* ---------- reversible lane diagram (2 variants) ---------- */
  function reversibleDiagram(o) {
    const W = 680, H = 700;
    const laneX = 250, laneW = 200, laneY = 90, laneH = 500;
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.title}" style="max-width:660px">${DEFS}
      <text x="${W / 2}" y="36" text-anchor="middle" font-size="21" font-weight="800" fill="${C.ink}">${o.title}</text>
      <rect x="${laneX}" y="${laneY}" width="${laneW}" height="${laneH}" fill="none" stroke="${C.line}" stroke-width="1.6"/>`;

    // TOP side (serves entry direction): safety loop + gate arm
    s += loopRect(laneX + 26, laneY + 14, laneW - 52, 46, C.amber, 'Safety Loop', 'inside');
    s += gateArm(laneX - 14, laneY + 74, laneW + 28);
    // BOTTOM side mirrored
    s += loopRect(laneX + 26, laneY + laneH - 60, laneW - 52, 46, C.amber, 'Safety Loop', 'inside', true);
    s += gateArm(laneX - 14, laneY + laneH - 96, laneW + 28);
    // presence loops (two, middle) + car
    s += carTopView(laneX + laneW / 2, laneY + 205, 0.94);
    s += loopRect(laneX + 34, laneY + 152, laneW - 68, 106, C.red, '', 'none');
    s += `<text x="${laneX - 18}" y="${laneY + 205}" font-size="12" font-style="italic" fill="${C.ink}" transform="rotate(-90 ${laneX - 18} ${laneY + 205})" text-anchor="middle">Presence Loop</text>
      <line x1="${laneX + 30}" y1="${laneY + 205}" x2="${laneX + 12}" y2="${laneY + 205}" stroke="${C.red}" stroke-width="1.5" marker-end="url(#arr-red)"/>`;
    s += loopRect(laneX + 34, laneY + 300, laneW - 68, 62, C.red, 'Presence Loop', 'inside', true);
    // camera bottom-left reading car rear (entry direction), camera icon top-right (exit direction)
    s += beam(laneX - 42, laneY + 400, laneX + laneW / 2 - 28, laneY + 268, laneX + laneW / 2 + 14, laneY + 282);
    s += cameraIcon(laneX - 42, laneY + 400);
    s += `<text x="${laneX - 42}" y="${laneY + 444}" text-anchor="middle" font-size="10" fill="${C.ink}">LPR camera</text>`;
    s += `<g transform="translate(${laneX + laneW + 62},${laneY + 18})">${cameraIcon(0, 22, true)}<text x="0" y="66" text-anchor="middle" font-size="10" fill="${C.ink}">LPR camera</text></g>`;

    // direction arrows
    s += `<line x1="150" y1="${laneY + 210}" x2="150" y2="${laneY + 290}" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#arr)"/>
      <text x="150" y="${laneY + 196}" text-anchor="middle" font-size="12" font-style="italic" fill="${C.ink}">${o.kiosk ? 'Exit' : 'Entry'}</text>`;
    s += `<line x1="${laneX + laneW + 90}" y1="${laneY + 268}" x2="${laneX + laneW + 90}" y2="${laneY + 188}" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#arr)"/>
      <text x="${laneX + laneW + 90}" y="${laneY + 292}" text-anchor="middle" font-size="12" font-style="italic" fill="${C.ink}">${o.kiosk ? 'Entry' : 'Exit'}</text>`;
    s += `<line x1="${laneX + laneW / 2}" y1="${laneY + laneH - 118}" x2="${laneX + laneW / 2}" y2="${laneY + laneH - 178}" stroke="${C.ink}" stroke-width="1.6" marker-end="url(#arr)" transform="rotate(180 ${laneX + laneW / 2} ${laneY + laneH - 148})"/>`;

    // top-left switch + IO cluster (compact)
    s += switchIcon(46, 76, 'Ethernet switch');
    s += `<g transform="translate(0,0)">
      <rect x="120" y="120" width="78" height="66" rx="8" fill="${C.blue}" opacity=".55"/>
      <rect x="130" y="127" width="58" height="24" rx="4" fill="${C.paper}" stroke="${C.line}"/>
      <text x="159" y="137" text-anchor="middle" font-size="8.5" fill="${C.ink}">Controller/</text>
      <text x="159" y="147" text-anchor="middle" font-size="8.5" fill="${C.ink}">IO Board</text>
      <circle cx="159" cy="166" r="11" fill="#0e7490"/><circle cx="159" cy="166" r="7" fill="#e2f2f8"/>
      <text x="159" y="112" text-anchor="middle" font-size="9" fill="${C.ink}">Gate Housing</text>
      <rect x="66" y="196" width="52" height="20" rx="4" fill="${C.green}"/>
      <text x="92" y="209" text-anchor="middle" font-size="8.5" fill="${C.ink}">DC Adapter</text>
      <text x="92" y="230" text-anchor="middle" font-size="8" font-style="italic" fill="${C.muted}">12 V</text>
      <rect x="40" y="248" width="46" height="20" rx="4" fill="${C.pink}"/>
      <text x="63" y="261" text-anchor="middle" font-size="8.5" fill="${C.ink}">Power</text>
      <path d="M 90 112 H 159 V 120" fill="none" stroke="${C.ink}" stroke-width="1.5"/>
      <text x="112" y="106" font-size="9" font-style="italic" fill="${C.ink}">Ethernet</text>
      <line x1="92" y1="216" x2="92" y2="196" stroke="${C.ink}" stroke-width="1.4"/>
      <path d="M 63 248 V 236 H 80" fill="none" stroke="${C.ink}" stroke-width="1.4"/>
      <path d="M 118 206 H 140 V 186" fill="none" stroke="${C.ink}" stroke-width="1.4"/>
      <text x="126" y="200" font-size="8" font-style="italic" fill="${C.muted}">Network</text>
    </g>`;
    // bottom-right switch + IO cluster (mirrored)
    s += `<g transform="translate(${laneX + laneW + 20},${laneY + laneH - 130})">
      <rect x="20" y="0" width="78" height="66" rx="8" fill="${C.blue}" opacity=".55"/>
      <rect x="30" y="7" width="58" height="24" rx="4" fill="${C.paper}" stroke="${C.line}"/>
      <text x="59" y="17" text-anchor="middle" font-size="8.5" fill="${C.ink}">Controller/</text>
      <text x="59" y="27" text-anchor="middle" font-size="8.5" fill="${C.ink}">IO Board</text>
      <circle cx="59" cy="46" r="11" fill="#0e7490"/><circle cx="59" cy="46" r="7" fill="#e2f2f8"/>
      <text x="59" y="-8" text-anchor="middle" font-size="9" fill="${C.ink}">Gate Housing</text>
      <rect x="120" y="-30" width="46" height="20" rx="4" fill="${C.pink}"/>
      <text x="143" y="-17" text-anchor="middle" font-size="8.5" fill="${C.ink}">Power</text>
      <line x1="143" y1="-10" x2="143" y2="20" stroke="${C.ink}" stroke-width="1.4"/>
      <path d="M 98 33 H 143 V 20" fill="none" stroke="${C.ink}" stroke-width="1.4"/>
      ${switchIcon(120, 84, 'Ethernet switch')}
      <path d="M 142 84 V 66 H 98" fill="none" stroke="${C.ink}" stroke-width="1.5"/>
      <text x="104" y="80" font-size="9" font-style="italic" fill="${C.ink}">Ethernet</text>
    </g>`;

    // kiosk variant: payment kiosk on the exit approach (left side)
    if (o.kiosk) {
      s += `<g><rect x="106" y="320" width="80" height="72" rx="8" fill="#fde9d2" opacity=".8"/>
        <g transform="translate(146,352)">
          <rect x="-11" y="-20" width="22" height="42" rx="3" fill="#2563eb"/>
          <rect x="-7" y="-16" width="14" height="15" rx="2" fill="#dbeafe"/>
          <rect x="-7" y="3" width="14" height="6" rx="1.5" fill="#dbeafe"/>
        </g>
        <text x="146" y="382" text-anchor="middle" font-size="9" font-style="italic" fill="${C.ink}">Payment Kiosk</text>
        <path d="M 63 268 V 356 H 106" fill="none" stroke="${C.ink}" stroke-width="1.4"/>
        <path d="M 68 96 H 56 V 340 H 106 V 336" fill="none" stroke="${C.ink}" stroke-width="1.4"/></g>`;
    }

    s += `<text x="${W / 2}" y="${H - 16}" text-anchor="middle" font-size="11.5" font-style="italic" fill="${C.ink}">Entry and exit happen in the same lane — it functions in an either/or setup</text>`;
    return s + '</svg>';
  }

  /* ---------- LPR rear-read geometry (p.25) ---------- */
  function rearReadGeometry() {
    const W = 700, H = 430;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rear-read LPR camera geometry" style="max-width:680px">${DEFS}
      <text x="${W / 2}" y="28" text-anchor="middle" font-size="17" font-weight="800" fill="${C.ink}">Rear license plate installation (camera installed on ceiling / pole)</text>
      <text x="${W / 2}" y="48" text-anchor="middle" font-size="12" fill="${C.ink}">The camera should be mounted at a height of <tspan font-weight="800">8–10 ft</tspan></text>
      <rect x="30" y="330" width="640" height="14" fill="#d7d3ca"/>
      <rect x="60" y="90" width="12" height="240" fill="#b9b4a8"/>
      <g transform="translate(84,102) rotate(38)"><rect x="-6" y="-9" width="34" height="18" rx="4" fill="${C.ink}"/><path d="M 28 -8 L 40 -12 L 40 12 L 28 8 Z" fill="${C.ink}"/></g>
      <text x="96" y="86" font-size="11" font-style="italic" fill="${C.ink}">Camera tilted at <tspan font-weight="800">30 to 45°</tspan></text>
      <line x1="100" y1="118" x2="268" y2="304" stroke="${C.amber}" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="100" y1="118" x2="332" y2="304" stroke="${C.amber}" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="42" y1="98" x2="42" y2="330" stroke="${C.ink}" stroke-width="1.2" marker-start="url(#arr)" marker-end="url(#arr)"/>
      <text x="30" y="214" font-size="11" font-weight="700" fill="${C.ink}" transform="rotate(-90 30 214)" text-anchor="middle">min 8 – max 10 ft</text>
      <g transform="translate(300,278)">
        <path d="M -60 42 L -60 14 Q -60 -6 -36 -10 L 8 -18 Q 44 -22 62 2 L 78 22 Q 84 30 84 42 Z" fill="${C.car}"/>
        <path d="M -30 -8 L 4 -14 Q 26 -16 38 -2 L 12 -2 Q -8 -2 -30 -8 Z" fill="#eef1f5"/>
        <circle cx="-30" cy="44" r="15" fill="#11141a"/><circle cx="-30" cy="44" r="7" fill="#565e6b"/>
        <circle cx="52" cy="44" r="15" fill="#11141a"/><circle cx="52" cy="44" r="7" fill="#565e6b"/>
        <rect x="-64" y="20" width="7" height="14" rx="2" fill="#f5f2ea" stroke="${C.ink}"/>
      </g>
      <g transform="translate(438,180)">
        <rect x="-24" y="0" width="48" height="128" rx="6" fill="#e7e4dc" stroke="${C.line}"/>
        <rect x="-17" y="10" width="34" height="58" rx="4" fill="#16a34a"/>
        <rect x="-11" y="18" width="22" height="34" rx="3" fill="#eafff2"/>
        <text x="0" y="158" text-anchor="middle" font-size="10.5" fill="${C.ink}">Kiosk / ticket</text>
        <text x="0" y="171" text-anchor="middle" font-size="10.5" fill="${C.ink}">dispenser</text>
      </g>
      <g transform="translate(600,214)">
        <rect x="-10" y="46" width="20" height="70" rx="4" fill="#93c5fd"/>
        <rect x="-88" y="34" width="86" height="12" rx="5" fill="#e8945f"/>
        <rect x="-88" y="34" width="20" height="12" rx="5" fill="#fff" stroke="#e8945f"/>
        <text x="0" y="132" text-anchor="middle" font-size="10.5" fill="${C.ink}">Gate</text>
      </g>
      <line x1="86" y1="366" x2="438" y2="366" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="6 5" marker-start="url(#arr)" marker-end="url(#arr)"/>
      <text x="262" y="384" text-anchor="middle" font-size="11" fill="${C.ink}">Camera positioned <tspan font-weight="800">min 25 to max 30 ft away from the kiosk</tspan></text>
      <line x1="86" y1="400" x2="600" y2="400" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="6 5" marker-start="url(#arr)" marker-end="url(#arr)"/>
      <text x="343" y="418" text-anchor="middle" font-size="11" fill="${C.ink}">Total gate-to-camera distance: <tspan font-weight="800">min 30 – max 35 ft</tspan> (gates can be closer or further as required by the location)</text>
    </svg>`;
  }

  /* ---------- LPR front-read geometry ---------- */
  function frontReadGeometry() {
    const W = 700, H = 360;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Front-read LPR camera geometry" style="max-width:680px">${DEFS}
      <text x="${W / 2}" y="28" text-anchor="middle" font-size="17" font-weight="800" fill="${C.ink}">Front-read installation (camera beyond the ticket dispenser)</text>
      <rect x="30" y="280" width="640" height="14" fill="#d7d3ca"/>
      <g transform="translate(180,232)">
        <path d="M 60 42 L 60 14 Q 60 -6 36 -10 L -8 -18 Q -44 -22 -62 2 L -78 22 Q -84 30 -84 42 Z" fill="${C.car}"/>
        <path d="M 30 -8 L -4 -14 Q -26 -16 -38 -2 L -12 -2 Q 8 -2 30 -8 Z" fill="#eef1f5"/>
        <circle cx="30" cy="44" r="15" fill="#11141a"/><circle cx="30" cy="44" r="7" fill="#565e6b"/>
        <circle cx="-52" cy="44" r="15" fill="#11141a"/><circle cx="-52" cy="44" r="7" fill="#565e6b"/>
        <rect x="-92" y="20" width="8" height="14" rx="2" fill="#f5f2ea" stroke="${C.ink}"/>
        <text x="-12" y="70" text-anchor="middle" font-size="10.5" font-style="italic" fill="${C.muted}">vehicle stops here</text>
      </g>
      <g transform="translate(330,150)">
        <rect x="-22" y="0" width="44" height="130" rx="6" fill="#e7e4dc" stroke="${C.line}"/>
        <rect x="-15" y="10" width="30" height="52" rx="4" fill="#16a34a"/>
        <text x="0" y="146" text-anchor="middle" font-size="10.5" fill="${C.ink}">Ticket dispenser</text>
      </g>
      <rect x="470" y="120" width="10" height="160" fill="#b9b4a8"/>
      <g transform="translate(462,128) rotate(212)"><rect x="-6" y="-9" width="34" height="18" rx="4" fill="${C.ink}"/><path d="M 28 -8 L 40 -12 L 40 12 L 28 8 Z" fill="${C.ink}"/></g>
      <line x1="452" y1="140" x2="140" y2="248" stroke="${C.amber}" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="452" y1="140" x2="252" y2="278" stroke="${C.amber}" stroke-width="1.4" stroke-dasharray="5 4"/>
      <text x="500" y="112" font-size="11" font-style="italic" fill="${C.ink}">Pole/ceiling mount</text>
      <text x="500" y="127" font-size="11" font-style="italic" fill="${C.ink}"><tspan font-weight="800">8–10 ft high</tspan> to avoid</text>
      <text x="500" y="142" font-size="11" font-style="italic" fill="${C.ink}">headlight glare</text>
      <line x1="330" y1="312" x2="475" y2="312" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="6 5" marker-start="url(#arr)" marker-end="url(#arr)"/>
      <text x="402" y="332" text-anchor="middle" font-size="11" fill="${C.ink}">Camera <tspan font-weight="800">5–10 ft beyond</tspan> the ticket dispenser (inside the lane)</text>
    </svg>`;
  }

  /* ---------- WISE wiring schematic (pp. 20–23 consolidated) ---------- */
  function wiseWiring() {
    const W = 700, H = 470;
    const rows = [
      { y: 120, wise: 'VS+', dst: '+12/24V on power supply', col: '#b45309', note: 'Board power (+)' },
      { y: 160, wise: 'VS−', dst: '0V on power supply', col: '#b45309', note: 'Board power (−)' },
      { y: 215, wise: 'DICOM', dst: 'C4-6 on gate control board', col: '#475569', note: 'Common (shared by both loops)' },
      { y: 255, wise: 'DI1', dst: 'NC4 on gate control board', col: '#d97706', note: 'Safety loop input' },
      { y: 295, wise: 'DI0', dst: 'NC5 on gate control board', col: '#dc2626', note: 'Presence loop input' },
      { y: 350, wise: 'RL0−', dst: '24V from gate control board', col: '#15803d', note: 'Gate arm vend' },
      { y: 390, wise: 'RL0+', dst: 'IN1 from gate control board', col: '#15803d', note: 'Gate arm vend' }
    ];
    let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WISE 4060 wiring map" style="max-width:680px">${DEFS}
      <text x="${W / 2}" y="30" text-anchor="middle" font-size="17" font-weight="800" fill="${C.ink}">WISE 4060 ↔ gate control board wiring (Magnetic gate + Datapark PARCS example)</text>
      <rect x="60" y="70" width="170" height="360" rx="10" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="145" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="${C.ink}">WISE 4060-LAN-B</text>
      <rect x="470" y="70" width="180" height="360" rx="10" fill="#f4f1ea" stroke="#94a3b8"/>
      <text x="560" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="${C.ink}">Gate control board / PSU</text>`;
    rows.forEach(r => {
      s += `<rect x="180" y="${r.y - 12}" width="50" height="24" rx="4" fill="#fff" stroke="${r.col}" stroke-width="1.6"/>
        <text x="205" y="${r.y + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="${r.col}">${r.wise}</text>
        <line x1="230" y1="${r.y}" x2="470" y2="${r.y}" stroke="${r.col}" stroke-width="2.2"/>
        <text x="350" y="${r.y - 6}" text-anchor="middle" font-size="9.5" font-style="italic" fill="${C.muted}">${r.note}</text>
        <text x="560" y="${r.y + 4}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${C.ink}">${r.dst}</text>`;
    });
    s += `<text x="${W / 2}" y="${H - 14}" text-anchor="middle" font-size="10.5" font-style="italic" fill="${C.muted}">Ports on the WISE board stay consistent across gate models; the gate-side terminals shown are from the source's Magnetic Pro example.</text>`;
    return s + '</svg>';
  }

  /* ---------- system overview (M1) ---------- */
  function systemOverview() {
    const W = 720, H = 400;
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GMP Access system overview" style="max-width:700px">${DEFS}
      <text x="${W / 2}" y="30" text-anchor="middle" font-size="17" font-weight="800" fill="${C.ink}">GMP Access (IoT GateKit) — where the pieces live</text>
      <ellipse cx="360" cy="86" rx="120" ry="34" fill="#eff6ff" stroke="#93c5fd"/>
      <text x="360" y="82" text-anchor="middle" font-size="12" font-weight="700" fill="${C.blueDeep}">GMP Cloud (AWS)</text>
      <text x="360" y="98" text-anchor="middle" font-size="9.5" fill="${C.muted}">api / mqtt .parkingglobalserver.com</text>
      <rect x="60" y="170" width="230" height="190" rx="12" fill="#fff" stroke="${C.line}"/>
      <text x="175" y="194" text-anchor="middle" font-size="12" font-weight="800" fill="${C.ink}">PARKING OFFICE / SERVER ROOM</text>
      <rect x="84" y="212" width="86" height="52" rx="6" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="127" y="234" text-anchor="middle" font-size="10.5" font-weight="700" fill="${C.ink}">ASUS NUC</text>
      <text x="127" y="248" text-anchor="middle" font-size="8.5" fill="${C.muted}">GMP Linux + Docker</text>
      <rect x="188" y="212" width="80" height="52" rx="6" fill="#f4f1ea" stroke="#94a3b8"/>
      <text x="228" y="230" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">Site network</text>
      <text x="228" y="244" text-anchor="middle" font-size="8.5" fill="${C.muted}">firewall +</text>
      <text x="228" y="256" text-anchor="middle" font-size="8.5" fill="${C.muted}">whitelist</text>
      <rect x="84" y="284" width="184" height="52" rx="6" fill="#fdf6ec" stroke="#e2c894"/>
      <text x="176" y="304" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">HDMI display emulator on NUC</text>
      <text x="176" y="320" text-anchor="middle" font-size="8.5" fill="${C.muted}">headless remote access · 4G/5G backup SIM</text>
      <rect x="420" y="170" width="240" height="190" rx="12" fill="#fff" stroke="${C.line}"/>
      <text x="540" y="194" text-anchor="middle" font-size="12" font-weight="800" fill="${C.ink}">EACH ENTRY / EXIT LANE</text>
      <rect x="440" y="212" width="96" height="40" rx="6" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="488" y="229" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">LPR camera</text>
      <text x="488" y="243" text-anchor="middle" font-size="8.5" fill="${C.muted}">PoE / PoE+</text>
      <rect x="548" y="212" width="96" height="40" rx="6" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="596" y="229" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">WISE 4060 IO</text>
      <text x="596" y="243" text-anchor="middle" font-size="8.5" fill="${C.muted}">loops + gate vend</text>
      <rect x="440" y="262" width="96" height="40" rx="6" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="488" y="279" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">PoE+ switch</text>
      <text x="488" y="293" text-anchor="middle" font-size="8.5" fill="${C.muted}">in ticket dispenser</text>
      <rect x="548" y="262" width="96" height="40" rx="6" fill="#eef4fb" stroke="#94a3b8"/>
      <text x="596" y="279" text-anchor="middle" font-size="9.5" font-weight="700" fill="${C.ink}">POS / kiosk</text>
      <text x="596" y="293" text-anchor="middle" font-size="8.5" fill="${C.muted}">ExpressLane only</text>
      <rect x="440" y="312" width="204" height="34" rx="6" fill="#fdf6ec" stroke="#e2c894"/>
      <text x="542" y="333" text-anchor="middle" font-size="9.5" fill="${C.ink}">Gate + safety loop + presence loop + speed bump</text>
      <path d="M 240 170 Q 280 120 320 106" fill="none" stroke="${C.blueDeep}" stroke-width="1.8" marker-end="url(#arr)"/>
      <path d="M 480 170 Q 440 120 402 106" fill="none" stroke="${C.blueDeep}" stroke-width="1.8" marker-end="url(#arr)"/>
      <line x1="290" y1="265" x2="420" y2="265" stroke="${C.ink}" stroke-width="2"/>
      <text x="355" y="258" text-anchor="middle" font-size="9.5" font-style="italic" fill="${C.muted}">site LAN (CAT6)</text>
      <text x="360" y="386" text-anchor="middle" font-size="10.5" font-style="italic" fill="${C.muted}">LPR cameras + unattended payment terminals → seamless, ticketless entry and exit</text>
    </svg>`;
  }

  window.DIAGRAMS = {
    exitGate: () => laneDiagram({ title: 'Exit with Gate control', dir: 'exit', dcLabel: '12 V' }),
    entryGate: () => laneDiagram({ title: 'Entry with Gate control', dir: 'entry', dcLabel: '12 V' }),
    entryKiosk: () => laneDiagram({ title: 'Entry with Gate control + kiosk', dir: 'entry', device: 'kiosk', dcLabel: '12V  24', note: '*The relative position of the kiosk represents where the driver stops before the gate.' }),
    exitKiosk: () => laneDiagram({ title: 'Exit with Gate control + kiosk', dir: 'exit', device: 'kiosk', dcLabel: '12 V', note: '*The relative position of the kiosk represents where the driver stops before the gate.' }),
    exitPos: () => laneDiagram({ title: 'Exit with Gate control + POS Pedestal', dir: 'exit', device: 'pos', dcLabel: '12 V', note: "*The distance to the kiosk (same as the ticket machine) represents the driver's stopping point." }),
    exitAutoVend: () => laneDiagram({ title: 'Exit with Auto vend', dir: 'exit', autoVend: true, dcLabel: '12 V' }),
    reversible: () => reversibleDiagram({ title: 'Reversible lane with gate control' }),
    reversibleKiosk: () => reversibleDiagram({ title: 'Reverse lane with gate control + Kiosk', kiosk: true }),
    rearRead: rearReadGeometry,
    frontRead: frontReadGeometry,
    wiseWiring: wiseWiring,
    systemOverview: systemOverview
  };
})();
