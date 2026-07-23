/* ============================================================
   Field Mode reference cards + coverage map + final exam
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;

  /* ---------- Field reference cards ---------- */
  A.fieldCards = [
    {
      id: 'sitewalk', icon: 'clipboard', title: 'Site Walk Checklist',
      desc: '9-point pre-install survey — tappable',
      checklist: [
        { t: 'Count lanes IN and OUT (reversible lanes count as TWO)', why: 'Drives all hardware quantities' },
        { t: 'Measure approach length in each lane', why: 'Rear-read LPR feasibility (needs 25–30 ft before dispenser)' },
        { t: 'Record PARCS brand and gate make/model', why: 'Essential to understand gate wiring; Magnetic gates are standard, installer-set-up' },
        { t: 'Open gate + examine control board — ALL LANES: note every port in use; check for third-party systems (Vend, Parkonect)', why: 'Plan wiring; know whose wires share the board' },
        { t: 'Check loops functional — ALL LANES (Magnetic Pro: check board screen; presence typically B, safety A; metal-object test flashes icons)', why: 'Determines how the IoT Kit deploys' },
        { t: 'Check space in network conduits — ALL LANES (can CAT6 be pushed through?)', why: 'If not: new conduit work = added scope' },
        { t: 'Check power + network ports in all ticket dispensers — ALL LANES (existing line must have internet; AC for PoE+ switch or plan extension board)', why: 'The PoE+ switch pattern depends on it; NUC shares this network' },
        { t: 'Check site firewall — operator IT must allow GMP AWS backend', why: 'Start the ticket now; see Whitelist card for payload' },
        { t: 'Check lighting — ALL LANES: 500–600 lux in read zone (at 1/1000s shutter); lights parallel to camera lens', why: 'Poor lighting = misreads; order floodlights now if short' }
      ],
      source: 'Site Walk, pp.17–19'
    },
    {
      id: 'wiring', icon: 'plug', title: 'WISE Wiring Pinout',
      desc: 'Power, loops, vend — exact terminals',
      html: `
<h4>Board power (12/24VDC)</h4>
<div class="tablewrap"><table class="spec">
<tr><th>WISE</th><th>→</th><th>Other end</th></tr>
<tr><td><code>VS+</code></td><td>→</td><td>+12/24V on power supply (or gate DC)</td></tr>
<tr><td><code>VS−</code></td><td>→</td><td>0V on power supply</td></tr>
</table></div>
<h4>Loops (Magnetic/Datapark example)</h4>
<div class="tablewrap"><table class="spec">
<tr><th>WISE</th><th>→</th><th>Gate control board</th></tr>
<tr><td><code>DICOM</code></td><td>→</td><td>C4-6 (shared common)</td></tr>
<tr><td><code>DI1</code> (safety)</td><td>→</td><td>NC4</td></tr>
<tr><td><code>DI0</code> (presence)</td><td>→</td><td>NC5 <em>(source text also references NO5 — verify with metal test)</em></td></tr>
</table></div>
<h4>Gate arm vend</h4>
<div class="tablewrap"><table class="spec">
<tr><th>WISE</th><th>→</th><th>Gate control board</th></tr>
<tr><td><code>RL0−</code></td><td>→</td><td>24V</td></tr>
<tr><td><code>RL0+</code></td><td>→</td><td>IN1</td></tr>
</table></div>
<h4>Loop indicators (Magnetic Pro)</h4>
<ul>
<li>Safety loop active → indicator at <strong>NC4</strong> (Relay 4 output, signal at NO4)</li>
<li>Presence loop active → indicator at <strong>NO5</strong> (Relay 5 output)</li>
<li>Pink/Orange/Blue/Green wires (right of terminals) = loop + arm status to dispenser; separate far-left pink = vend</li>
</ul>
<p>WISE-side ports are identical across gate models.</p>`,
      source: 'pp.20–24'
    },
    {
      id: 'creds', icon: 'key', title: 'Credentials & Defaults',
      desc: 'IPs, logins, passwords, commands',
      html: `
<div class="tablewrap"><table class="spec">
<tr><th>Item</th><th>Value</th></tr>
<tr><td>WISE default IP</td><td><code>10.0.0.1</code> (static, factory)</td></tr>
<tr><td>WISE config page</td><td><code>http://10.0.0.1/config</code></td></tr>
<tr><td>WISE login</td><td><code>root</code> / <code>00000000</code></td></tr>
<tr><td>Your laptop (bench)</td><td><code>10.0.0.2</code>, subnet <code>255.255.0.0</code> — NEVER 10.0.0.1</td></tr>
<tr><td>Find board after DHCP</td><td><code>arp -n | grep &lt;MAC&gt;</code></td></tr>
<tr><td>Test board link</td><td><code>ping 10.0.0.1</code></td></tr>
<tr><td>PAX IM30 settings</td><td>Swipe up → ◁ ◁ → <code>pax9876@@</code></td></tr>
<tr><td>NUC naming</td><td>Parking/tenant name (e.g., <code>garageA</code> / <code>garageA123</code>); auto-login ON; share with GMP</td></tr>
<tr><td>NUC BIOS</td><td>F2 → Power → Secondary Power Settings → After Power Failure = <strong>Power On</strong> → F10</td></tr>
<tr><td>Ubuntu version</td><td>24.04.03 LTS (USB ≥8 GB via Rufus, ~10 min write)</td></tr>
<tr><td>Ubuntu first commands</td><td><code>sudo apt update</code> · <code>sudo apt upgrade</code> (Ctrl+Alt+T)</td></tr>
</table></div>`,
      source: 'pp.27–49, 54'
    },
    {
      id: 'distances', icon: 'ruler', title: 'Distances & Geometry',
      desc: 'Every number for placement',
      html: `
<h4>Rear-read LPR</h4>
<ul>
<li>Camera operating range: <strong>1–6 m (3–20 ft)</strong></li>
<li>Camera <strong>25–30 ft before ticket dispenser</strong> (same with optical zoom)</li>
<li>Mount height <strong>8–10 ft</strong>, tilt <strong>30–45°</strong>, always upright</li>
<li>Gate-to-camera total: <strong>30–35 ft</strong></li>
<li>Avoid steep inclines (plates under bumpers, e.g. Jeep Wrangler)</li>
</ul>
<h4>Front-read LPR</h4>
<ul>
<li>Camera <strong>5–10 ft beyond dispenser</strong>, inside lane; ceiling preferred, aimed at stop point</li>
<li>Pole mounts <strong>≥8–10 ft</strong> (headlight glare)</li>
</ul>
<h4>Lighting</h4>
<ul>
<li><strong>500–600 lux</strong> in read zone (shutter 1/1000s)</li>
<li>Fixtures: <strong>≥8,000 lm indoor · ≥32,000 lm outdoor</strong>; poles 8–10 ft</li>
<li>Downward, parallel to lens, no direct reflection; validate through the camera</li>
</ul>
<h4>Speed bump</h4>
<ul><li>1 per lane, <strong>3–5 ft before lane island</strong> · 84"L × 11.8"W × 2"H, cable channels</li></ul>`,
      source: 'pp.6, 19, 24–26'
    },
    {
      id: 'bom', icon: 'box', title: 'Lane BOMs & Wiring Minimums',
      desc: 'Per-lane equipment and cable counts',
      html: `
<h4>Entry lane</h4>
<ul>
<li>1× LPR camera (PoE/PoE+; PoE+ recommended, compatible switch)</li>
<li>1× WISE 4060 (network + DC supply; in gate cabinet)</li>
<li>1× LED display <em>(optional, ExpressLane only — AC + network)</em></li>
<li>Wiring: <strong>min 2× CAT6 + 1× DC supply</strong></li>
</ul>
<h4>Exit lane</h4>
<ul>
<li>1× LPR camera · 1× WISE 4060</li>
<li>1× kiosk or POS pedestal w/ intercom <em>(ExpressLane only — AC + ≥2 CAT6)</em></li>
<li>Wiring: <strong>min 4× CAT6 + 1× DC supply + 1× AC outlet</strong></li>
</ul>
<h4>Per site</h4>
<ul>
<li>1× ASUS NUC (NUC 13 Pro NUC13ANHi5, 16GB/512GB) + <strong>1× HDMI display emulator plug per NUC</strong></li>
<li>Granite Multicell 4G/5G backup SIM (ExpressLane needs continuous internet)</li>
<li>Nested/restricted entries: Zebra MS4717 + Elo Backpack 4 <strong>together</strong> on RevCon gooseneck</li>
</ul>
<h4>Rules of thumb</h4>
<ul>
<li>Reversible lane = 2 lanes (2 cameras, 2 IO boards)</li>
<li>Call GMP before ordering: Adyen, PAX (US ExpressLane: specify Datacap Android Forms), RevCon, LamasaTech</li>
</ul>`,
      source: 'pp.5–16'
    },
    {
      id: 'iotest', icon: 'flask', title: 'Lane Test Procedure',
      desc: 'Loop detection + gate arm test',
      checklist: [
        { t: 'Laptop on garage wired network, DHCP on', why: '' },
        { t: 'arp -n | grep <MAC> → browse to board IP, login root/00000000', why: '' },
        { t: 'Inactive state: DI-0 and DI-1 bulbs LIT', why: 'Lit = inactive; active = bulb OFF + chart drop' },
        { t: 'Metal on PRESENCE loop → DI-0 bulb OFF, signal drops', why: '' },
        { t: 'Metal on SAFETY loop → DI-1 bulb OFF, chart drops', why: '' },
        { t: 'Metal on presence → DI-0 down; click DO-0 → bulb lights, ARM RISES', why: '' },
        { t: 'Click DO-0 AGAIN to stop signal', why: 'Prevents the arm staying up — mandatory' },
        { t: 'Metal on safety → DI-1 down, ARM LOWERS', why: '' },
        { t: 'Share IO board details with GMP Tech Support', why: 'Gate officially onboarded' }
      ],
      source: 'pp.50–53'
    },
    {
      id: 'network', icon: 'globe', title: 'Whitelist & Ports',
      desc: 'Hand this to site IT',
      html: `
<h4>Daily operation — external (permanent)</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Endpoint</th><th>Port</th><th>Role</th></tr>
<tr><td><code>api.parkingglobalserver.com</code></td><td>443</td><td>GMP Server — primary endpoint</td></tr>
<tr><td><code>mqtt.parkingglobalserver.com</code></td><td>8883</td><td>MQTT — ReverseQR + gatekit monitoring</td></tr>
</table></div>
<h4>Daily operation — internal LAN</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Port</th><th>Requirement</th></tr>
<tr><td>80</td><td>Open for access from NUC/VM</td></tr>
<tr><td>1883</td><td>IO Controller → MQTT broker on NUC/VM</td></tr>
<tr><td>4000, 4001</td><td>LPR camera/reader → plate data to NUC/VM</td></tr>
</table></div>
<h4>Installation/maintenance URLs (HTTPS <em>and</em> HTTP — both!)</h4>
<ul>
<li><strong>Docker install:</strong> <code>download.docker.com</code> · <code>github.com/docker/compose/</code> · <code>packages.cloud.google.com</code> · <code>apt.kubernetes.io/</code></li>
<li><strong>Docker images (private repo):</strong> <code>registry-1.docker.io/v2/</code> · <code>hub.docker.com</code></li>
<li><strong>APT packages:</strong> <code>connectivity-check.ubuntu.com</code> · <code>in.archive.ubuntu.com</code> · <code>ubuntu-archive.mirrors.estointernet.in</code> · <code>security.ubuntu.com</code> · <code>cloudfront.net</code> · <code>api.snapcraft.io</code> · <code>daisy.ubuntu.com</code> · <code>github-releases.githubusercontent.com</code> · <code>reviews.ubuntu.com</code></li>
</ul>
<p><em>Some install scripts use HTTP internally — whitelist both protocol versions.</em></p>`,
      source: 'pp.54–57'
    },
    {
      id: 'benchexit', icon: 'monitor', title: 'NUC Bench Exit Criteria',
      desc: 'Before the NUC leaves your bench',
      checklist: [
        { t: 'BIOS: After Power Failure = Power On (F2 → Power → Secondary Power Settings, save F10)', why: 'Site power blip must not require a truck roll' },
        { t: 'Ubuntu 24.04.03 LTS installed (Erase disk; Normal install + updates + third-party; skip encryption; timezone = car park location)', why: '' },
        { t: 'Credentials use parking/tenant name; auto-login enabled; shared with GMP', why: '' },
        { t: 'sudo apt update && sudo apt upgrade run', why: '' },
        { t: 'TeamViewer: starts with system + personal password set; ID + password shared with GMP', why: 'Unattended remote support' },
        { t: 'HDMI display emulator plug packed — one per NUC', why: 'Headless NUC shows blank TeamViewer screen without it' },
        { t: 'All WISE boards: pinged at 10.0.0.1, MAC recorded → lane, IP mode = DHCP submitted', why: 'On-site day becomes wiring + testing only' }
      ],
      source: 'pp.27–49'
    },
    {
      id: 'diagrams', icon: 'map', title: 'Lane Diagrams',
      desc: 'All 8 official topologies',
      html: `
<p>Tap to review each configuration (rendered from the source diagrams, pp.58–65):</p>
<div class="figure">[[DIAGRAM:entryGate]]</div>
<div class="figure">[[DIAGRAM:exitGate]]</div>
<div class="figure">[[DIAGRAM:entryKiosk]]</div>
<div class="figure">[[DIAGRAM:exitKiosk]]</div>
<div class="figure">[[DIAGRAM:exitPos]]</div>
<div class="figure">[[DIAGRAM:exitAutoVend]]</div>
<div class="figure">[[DIAGRAM:reversible]]</div>
<div class="figure">[[DIAGRAM:reversibleKiosk]]</div>`,
      source: 'pp.58–65'
    }
  ];

  /* ---------- Coverage map: source section → product location ---------- */
  A.coverage = [
    ['What is GMP Access? (p.5)', 'M01 L1', 'Full concept + system overview diagram'],
    ['WISE 4060-LAN-B IO Unit (p.5)', 'M02 L1', 'Role, terminals, purchase sources, datasheet ref'],
    ['DC Power Supply (pp.5–6)', 'M02 L2 · M08 L2', 'Requirement + VS+/VS− wiring'],
    ['PoE+ Switch (p.6)', 'M02 L3', 'Placement pattern + power budget warning'],
    ['6" Rubber Speed Bumps (p.6)', 'M02 L4', 'Placement rule + dimensions + cable channels'],
    ['iPro WV-S15700-V2L (p.7)', 'M03 L1', 'Full profile; price discrepancy flagged'],
    ['INEX IZA500GR (p.7)', 'M03 L1', 'Full profile incl. 80 mph, onboard OCR'],
    ['ZSGoes LED Flood Light (p.7)', 'M03 L3', 'Full spec + lumen targets'],
    ['Adyen S1U2 (p.8)', 'M04 L1 · M13 L1', 'Device + ordering rule + install guide refs'],
    ['PAX IM30 (pp.8–9)', 'M04 L2 · M13 L2', 'Device + Datacap rules + install steps'],
    ['Alternate POS Mounts (p.9)', 'M04 L3', 'Gooseneck 42", housing box + cutout rule'],
    ['LamasaTech Zentron 21 (pp.9–10)', 'M04 L4', 'Full spec; dimension ambiguity flagged'],
    ['RevCon POS Pedestal (p.10)', 'M04 L5', 'Full spec + expandability'],
    ['NUC (p.11)', 'M05 L1 · M10', 'Spec + OS replacement + full bench setup'],
    ['HDMI Display Emulator (p.11)', 'M05 L2', 'Headless dependency, one per NUC'],
    ['Granite Multicell 4G/5G (p.11)', 'M05 L3', 'Backup internet for ExpressLane'],
    ['Scanner Devices note (p.12)', 'M05 L4', 'Both-required pairing rule, nested lanes'],
    ['Zebra Fixed Mount Scanner (p.12)', 'M05 L4', 'MS4717 profile'],
    ['Elo Backpack 4 (p.13)', 'M05 L4', 'Compute unit, used where no Zentron present'],
    ['Links to Buy Equipment (pp.14–15)', 'M06 L1', 'Full 16-item table + "call first" flags'],
    ['Entry Lane Setup (p.15)', 'M06 L2', 'BOM + wiring minimums'],
    ['Exit Lane Setup (p.16)', 'M06 L3', 'BOM + wiring minimums'],
    ['Site Walk 9 items (pp.17–19)', 'M07 (all lessons)', 'Every item, reason, and sub-detail'],
    ['Gate Wiring Check (p.20)', 'M08 L1', 'Magnetic + Datapark example, wiring map diagram'],
    ['WISE IO Power Requirements (p.20)', 'M08 L2', 'VS+/VS− steps'],
    ['Loop Status Indicators (pp.21–23)', 'M08 L3–L4', 'All three board states + connections'],
    ['Gate Arm Vend (pp.23–24)', 'M08 L4', '24V→RL0−, IN1→RL0+'],
    ['LPR Camera Selection (p.24)', 'M03 L1–L2', 'Comparison table + decision logic'],
    ['LPR Position / Rear-read (pp.24–26)', 'M09 L1–L2', 'All distances/heights/tilt incl. image-only figures'],
    ['Front-read mounting (p.26)', 'M09 L3', '5–10 ft, ceiling, 8–10 ft poles'],
    ['Lighting in lanes (p.26)', 'M03 L4 · M09 L4', 'Geometry + lumen/lux targets'],
    ['Recommended Software Tools (p.27)', 'M10 L1', 'Zenmap/Nmap, Rufus, GMP Ubuntu image'],
    ['Power Outage Setting (pp.27–29)', 'M10 L2', 'Full BIOS procedure'],
    ['Bootable USB (pp.29–33)', 'M10 L3', 'Full Rufus procedure; 18.04 mention flagged'],
    ['Install Ubuntu 24.04.03 (pp.34–39)', 'M10 L4', 'All 9 steps incl. naming + apt commands'],
    ['TeamViewer Setup (pp.40–43)', 'M10 L5', 'All 7 steps'],
    ['Set up IO Controller (p.44)', 'M11 L1–L2', 'DHCP goal, defaults, ping test, MAC mapping'],
    ['WISE Config Windows/Linux (pp.45–48)', 'M11 L3', 'Both OS paths; IP contradiction flagged + resolved'],
    ['Final Config Steps / DHCP (pp.48–49)', 'M11 L4', 'root/00000000, Static→DHCP, arp lookup'],
    ['Installation: WISE 4060 (p.50)', 'M12 L1–L2', 'Physical install + network discovery'],
    ['Testing IO Board / Loop Detection (pp.50–52)', 'M12 L3', 'DI-0/DI-1 bulb logic + chart'],
    ['Gate Arm Function Test (p.53)', 'M12 L4', 'Exact 4-step order + handoff to GMP support'],
    ['Adyen S1U2 install (p.53)', 'M13 L1', 'Companion-guide references noted'],
    ['PAX IM30 POS install (pp.53–54)', 'M13 L2', 'Mounting, power-up, LAN, settings password'],
    ['ExpressLane (p.54)', 'M13 L3', 'Follow-on guide reference'],
    ['Tap & Park (p.54)', 'M13 L3', 'Steps reproduced; truncated sentence flagged'],
    ['Whitelist URLs — Install/Maintenance (pp.54–56)', 'M14 L2', 'All URLs, all three groups, HTTP+HTTPS rule'],
    ['Whitelist — Daily Operation (pp.56–57)', 'M14 L3', 'Both endpoints + all four internal ports'],
    ['Lane Diagrams (pp.58–65)', 'M01 L3 · Field Mode', 'All 8 rebuilt as SVG']
  ];

  /* ---------- Final exam (drawn across all modules) ---------- */
  A.examMeta = { pass: 80, title: 'Installer Readiness Exam' };
  A.exam = [
    { stem: 'A reversible lane on a site walk adds how much to your camera and IO board counts?', options: ['+1 camera, +1 board', '+2 cameras, +2 boards', 'Nothing — reuse the entry lane hardware', '+2 cameras, +1 shared board'], answer: 1, explain: 'Reversible lanes count as two lanes; the diagrams show two cameras and two IO controllers.', source: 'M01/M06/M07' },
    { stem: 'Which device pair is mandatory — together — for scan-based access at a nested restricted entry?', options: ['Zentron 21 + PAX IM30', 'Zebra MS4717 + Elo Backpack 4 on a RevCon gooseneck', 'iPro camera + NUC', 'Adyen S1U2 + gooseneck'], answer: 1, explain: 'Both devices are required to enable scanning; they are housed together on a RevCon gooseneck pedestal at each nested entry point.', source: 'M05' },
    { stem: 'ExpressLane exit lane minimum wiring:', options: ['2× CAT6 + DC', '4× CAT6 + 1× DC supply + 1× AC outlet', '1× CAT6 + PoE', '6× CAT6'], answer: 1, explain: 'Exit: min 4× CAT6, DC for the IO board, AC for the kiosk/pedestal.', source: 'M06' },
    { stem: 'The WISE board\'s factory login is:', options: ['admin / password', 'root / 00000000', 'root / wise4060', 'gmp / gmp123'], answer: 1, explain: 'Username root, password 00000000 — at http://10.0.0.1/config.', source: 'M11' },
    { stem: 'Safety loop wiring to the WISE board (Magnetic/Datapark example):', options: ['DICOM→C4-6, DI1→NC4', 'DI0→NC5, DICOM→NO4', 'RL0+→IN1, RL0−→24V', 'DI1→C4-6, DICOM→NC4'], answer: 0, explain: 'DICOM to C4-6 and DI1 to NC4. (The RL0 pair is vend, not a loop.)', source: 'M08' },
    { stem: 'Gate arm vend wiring:', options: ['24V→RL0−, IN1→RL0+', '24V→RL0+, IN1→RL0−', '24V→DI0, IN1→DI1', 'IN1→DICOM, 24V→VS+'], answer: 0, explain: '24V from the gate control board to RL0−; IN1 from the gate control board to RL0+.', source: 'M08' },
    { stem: 'Rear-read camera placement relative to the ticket dispenser:', options: ['5–10 ft beyond it', '25–30 ft before it', '30–45 ft before it', 'Directly above it'], answer: 1, explain: '25–30 ft before the dispenser (15 ft vehicle + 10 ft rear-to-driver assumption); same with optical zoom.', source: 'M09' },
    { stem: 'Rear-read mount height and tilt from the source figure:', options: ['8–10 ft, 30–45°', '5–6 ft, 15°', '12 ft, 60°', 'Any height, 45° fixed'], answer: 0, explain: 'Height 8–10 ft, camera tilted 30 to 45°, total gate-to-camera 30–35 ft.', source: 'M09' },
    { stem: 'Night-only read failures on a 5-ft pole front-read camera are most likely caused by:', options: ['DHCP lease expiry', 'Headlight glare — pole cameras must be at least 8–10 ft high', 'MQTT port blocked', 'Loop interference'], answer: 1, explain: 'Front-read pole cameras must be ≥8–10 ft to stay above headlight beams.', source: 'M09' },
    { stem: 'Lighting targets: read-zone lux and outdoor fixture lumens?', options: ['500–600 lux; ≥32,000 lm', '100 lux; 4,500 lm', '1,000 lux; ≥8,000 lm', '500–600 lux; ≥8,000 lm'], answer: 0, explain: '500–600 lux (at 1/1000s shutter); purchased fixtures ≥8,000 lm indoor / ≥32,000 lm outdoor.', source: 'M03/M09' },
    { stem: 'Which BIOS change is mandatory on every NUC?', options: ['Enable virtualization', 'Power tab → Secondary Power Settings → After Power Failure = Power On', 'Disable secure boot', 'Set boot password'], answer: 1, explain: 'The NUC must power on automatically after an outage — no one is on site to press the button.', source: 'M10' },
    { stem: 'During Ubuntu install, the disk option to select is:', options: ['Install alongside Windows', 'Erase disk and install Ubuntu', 'Manual partitioning', 'LVM with encryption'], answer: 1, explain: 'Erase disk and install Ubuntu — the factory Windows OS is replaced with GMP\'s Linux.', source: 'M10' },
    { stem: 'What makes TeamViewer access "unattended" per the setup?', options: ['A session PIN read over the phone', 'Start-with-system enabled + a personal password set, both shared with GMP', 'A VPN tunnel', 'SSH keys'], answer: 1, explain: 'General → start with system; Advanced → personal password; share ID + password with GMP.', source: 'M10' },
    { stem: 'Your laptop must NOT take which address when configuring a factory WISE board?', options: ['10.0.0.2', '10.0.0.1 — the controller\'s own default IP', '10.0.0.50', 'Any DHCP address'], answer: 1, explain: 'Setting your PC to 10.0.0.1 conflicts with the board — the config page becomes unreachable. Use 10.0.0.2.', source: 'M11' },
    { stem: 'After switching a board to DHCP and plugging it into the site switch, you find it by:', options: ['Browsing 10.0.0.1', 'arp -n | grep <MAC> (MAC recorded from the board\'s underside)', 'It emails its IP', 'Checking the gate screen'], answer: 1, explain: 'The factory IP is gone after DHCP; the recorded MAC + arp lookup (or Nmap/Zenmap sweep) locates it and preserves the lane mapping.', source: 'M11/M12' },
    { stem: 'On the WISE web UI, an ACTIVE loop shows as:', options: ['Bulb lit', 'Bulb OFF + signal drop on the chart', 'Red banner', 'Relay click sound'], answer: 1, explain: 'Inactive = lit; active = bulb off (DI-0 presence, DI-1 safety) with a chart drop.', source: 'M12' },
    { stem: 'Correct gate-arm test order after the arm rises via DO-0:', options: ['Test safety loop immediately', 'Click DO-0 again to stop the signal, then metal on safety loop → arm lowers', 'Power-cycle the board', 'Close the browser'], answer: 1, explain: 'Click again to stop the signal (prevents the arm staying up), then confirm the safety loop lowers the arm.', source: 'M12' },
    { stem: 'PAX IM30 settings password:', options: ['pax1234@@', 'pax9876@@', '00000000', 'garageA123'], answer: 1, explain: 'Swipe up, back key twice, password pax9876@@.', source: 'M13' },
    { stem: 'US ExpressLane PAX orders must specify what to the reseller?', options: ['White color', 'Datacap Android Forms settings support', 'LTE modem', 'Extra-long power cable'], answer: 1, explain: 'For ExpressLane locations in the US, IM30s need Datacap Android Forms support — specified at ordering time, after confirming the processor with GMP.', source: 'M04' },
    { stem: 'The two permanent external endpoints for a live site are:', options: ['api.parkingglobalserver.com:443 + mqtt.parkingglobalserver.com:8883', 'hub.docker.com:443 + security.ubuntu.com:80', 'api…:80 + mqtt…:1883', 'AWS console + TeamViewer'], answer: 0, explain: '443 = primary GMP endpoint; 8883 = MQTT for ReverseQR + gatekit monitoring.', source: 'M14' },
    { stem: 'Port 1883 on the site LAN exists so that:', options: ['The camera streams video', 'The IO Controller connects to the MQTT broker running on the NUC/VM', 'TeamViewer connects', 'The POS reaches Datacap'], answer: 1, explain: 'Local MQTT: WISE boards → broker on the NUC. Blocked 1883 = loops read locally but platform never hears them.', source: 'M14' },
    { stem: 'Plate reads never reach the platform though the camera works. Which ports carry LPR data to the NUC?', options: ['443', '4000 and 4001', '8883', '80'], answer: 1, explain: 'LPR cameras/readers must be able to send plate data to the NUC/VM on ports 4000/4001.', source: 'M14' },
    { stem: 'Why whitelist HTTP versions of the Ubuntu URLs too?', options: ['Redundancy', 'Some installation scripts use HTTP internally', 'HTTPS is deprecated', 'The NUC lacks TLS'], answer: 1, explain: 'The source explicitly lists HTTP counterparts because some install scripts use HTTP internally — both must be open.', source: 'M14' },
    { stem: 'A NUC works on the bench but TeamViewer shows a blank screen once deployed headless. The missing item is:', options: ['A second monitor', 'The HDMI display emulator plug (one per NUC)', 'More RAM', 'A static IP'], answer: 1, explain: 'Without the emulator plug the NUC detects no display and remote tools render blank.', source: 'M05' },
    { stem: 'Speed bump placement:', options: ['3–5 ft before the lane island, one per lane', '10 ft after the gate', 'Under the presence loop', 'Two per lane at both ends'], answer: 0, explain: 'One per lane, 3–5 ft before the lane island — slowing cars into the camera zone, with cable channels as a bonus.', source: 'M02' },
    { stem: 'Which camera maintains accuracy in all lighting/weather and needs no external servers?', options: ['iPro WV-S15700-V2L', 'INEX IZA500GR', 'Zebra MS4717', 'Any 4K camera'], answer: 1, explain: 'The INEX combines color+IR sensors, onboard AI and OCR — no server dependency, rated to 80 mph.', source: 'M03' },
    { stem: 'The PoE+ switch for a lane is installed:', options: ['In the server room', 'Inside the ticket-dispenser housing, fed by the existing network line from the server room', 'In the gate cabinet', 'On the camera pole'], answer: 1, explain: 'Inside the dispenser housing — reusing the existing line, fanning out to camera, IO controller, and ticket machine.', source: 'M02' },
    { stem: 'Loop mapping on a Magnetic gate with both loops set is typically:', options: ['Presence = A, Safety = B', 'Presence = B, Safety = A', 'Both on A', 'Random'], answer: 1, explain: 'The presence loop is typically set up as B and the safety loop as A — verified with the metal-object test.', source: 'M07' },
    { stem: 'What completes a gate\'s onboarding after all tests pass?', options: ['Closing the cabinet', 'Sharing the IO board details with the GMP Tech Support team', 'Rebooting the NUC', 'Emailing the operator'], answer: 1, explain: 'Once loop + arm tests are confirmed, share the IO board details with GMP Tech Support — the platform binds board to lane.', source: 'M12' },
    { stem: 'Which items require GMP contact before ordering?', options: ['NUC, USB stick', 'Adyen S1U2, PAX IM30, RevCon pedestal, LamasaTech Zentron', 'Speed bumps, floodlights', 'CAT6 cable'], answer: 1, explain: 'Both POS terminals and both pedestals carry "contact GMP" flags in the buy table.', source: 'M06' }
  ];
})();
