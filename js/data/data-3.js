/* ============================================================
   Curriculum data — Phase 3: M07–M09 (site assessment)
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const src = t => `<p class="src">Source: GMP Access Install V3 — ${t}</p>`;

  /* ==========================================================
     M07 — The site walk
     ========================================================== */
  A.modules.push({
    id: 'm07', code: 'M07', phase: 3,
    title: 'The Site Walk: 9-Point Pre-Install Survey',
    tagline: 'The ordered checklist that determines scope, hardware counts, and whether the install can even proceed.',
    minutes: 45,
    objectives: [
      'Run all nine site-walk checks in order and record what each one demands',
      'Test loop mapping on a magnetic gate with a metal object',
      'Assess conduit, power, and network availability for the lane design',
      'Identify third-party systems and firewall constraints before install day'
    ],
    lessons: [
      {
        id: 'l1', title: 'Why the walk comes first', minutes: 5,
        html: `
<p>Before site installation begins, the guide requires a fixed sequence of pre-install activities — <strong>completed in the listed order</strong> — to assess the scope and complexity of the work. The instruction is explicit: <strong>treat this as a checklist for installation.</strong></p>
<p>The sequence is: <strong>1. Site Walk → 2. Gate Wiring Check → 3. Loop Status Indicators</strong> (then LPR selection and positioning). This module covers the site walk itself — done <strong>with the location manager</strong>, because walking the site together is the first step toward understanding the existing equipment (<strong>PARCS</strong> — Parking Access and Revenue Control System) and the effort required for setting up the GMP system.</p>
${src('"Pre-install Preparation", p.17')}
<div class="callout field"><span class="co-label">Field discipline</span><p>Every item below produces a written note. A site walk that produces vibes instead of numbers gets re-walked. The Field Mode section of this product has the 9-point list as a tappable checklist for use on-site.</p></div>
<figure class="figure">[[DIAGRAM:siteWalkMap]]<figcaption>The nine stops. Items 4–7 and 9 repeat in every lane — sampling one lane and extrapolating is how installs slip.</figcaption></figure>`
      },
      {
        id: 'l2', title: 'Points 1–4: lanes, approach, gate, control board', minutes: 14,
        html: `
<h4>1 · Number of lanes IN and OUT</h4>
<p><em>Why:</em> required to estimate hardware quantities. <strong>Note: reversible lanes are counted as two separate lanes.</strong> This single number drives the whole BOM (M06).</p>
<h4>2 · Approach length in each lane</h4>
<p><em>Why:</em> determines the <strong>feasibility of deploying rear-reading LPR cameras</strong>. Rear-read needs 25–30 ft of camera-to-dispenser distance (M09); a lane fed directly off the street may simply not have the geometry, forcing front-read placement.</p>
<h4>3 · PARCS brand and gate make</h4>
<p><em>Why:</em> note the make and model of the gate — <strong>it is essential to understand the gate's wiring</strong>. <strong>Magnetic gates are standard and will be set up by the installer.</strong> Everything in Module M08's wiring walkthrough is illustrated on a Magnetic gate connected to a Datapark PARCS; other models have similar connection points, but you need to know what you're facing.</p>
<h4>4 · Open the gate and examine the control board — in ALL LANES</h4>
<p><em>Why:</em> <strong>note all ports used by existing wires</strong>, and <strong>check if any third-party systems (e.g., Vend or Parkonect) are deployed</strong>. Someone else's controller wired into the vend circuit changes your install plan — you need to know whose wires you're sharing a terminal block with.</p>
${src('"Site Walk" items 1–4, p.17')}
<div class="callout warn"><span class="co-label">All lanes means all lanes</span><p>Items 4, 5, 6, 7, and 9 are each marked <strong>(ALL LANES)</strong> in the source. Gates on the same site can be wired differently, loops can be dead in one lane and live in the next. Sampling one lane and extrapolating is how installs slip a week.</p></div>`
      },
      {
        id: 'l3', title: 'Point 5: are the loops functional?', minutes: 8,
        html: `
<p><em>Why it matters:</em> loop status is <strong>important for determining how the IoT Kit will be deployed</strong>. The lane logic depends on presence and safety detection; if loops are dead, that's major scope you must know about now.</p>
<p><strong>If it's a Magnetic Pro gate, examine the board screen.</strong> The source shows two situations you'll encounter:</p>
<ul>
  <li><strong>Both loops set:</strong> the screen shows Presence and Safety loop icons. <strong>The presence loop is typically set up as B, and the safety loop as A.</strong></li>
  <li><strong>Only one loop set:</strong> the screen shows a single mapped loop — you must identify which physical loop it is.</li>
</ul>
<div class="callout spec"><span class="co-label">The metal-object test</span><p><strong>Place a metal object on the loops — icons should flash on the screen to signal activation.</strong> With a single-loop setup, use the metal object to identify which loop is mapped. This is the same physical test you will repeat in software during commissioning (M12), so learn it here.</p></div>
${src('"Site Walk" item 5, pp.17–18')}`
      },
      {
        id: 'l4', title: 'Points 6–7: conduits, power & network at the island', minutes: 10,
        html: `
<h4>6 · Check for space in the network conduits — ALL LANES</h4>
<p>Gates and ticket machines typically have an <strong>underground or overground conduit</strong> connecting them. <strong>Verify if the CAT6 line(s) can be pushed through the conduit. If not, new conduit work may be required</strong> — and that's a scoping conversation to have now, not on install day. Recall the minimum counts: 2× CAT6 (entry), 4× CAT6 (exit).</p>
<h4>7 · Check power and network port availability in all ticket dispensers — ALL LANES</h4>
<p>Each ticket dispenser usually has a <strong>network line from the server room</strong>. A <strong>PoE+ switch can be installed here</strong> to run lines to the camera, the IO controller at the gate, and the ticket machine.</p>
<ul>
  <li><strong>We can use existing network lines, provided they have internet access</strong>, because the ASUS NUC will be installed on the same network.</li>
  <li><strong>Ensure AC power is available for the switch, or plan to install an extension board with a power receptacle.</strong></li>
</ul>
${src('"Site Walk" items 6–7, pp.18–19')}
<div class="callout field"><span class="co-label">What "good" looks like</span><p>A green lane at this point: conduit with pull-space for the CAT6 counts, a live network drop in the dispenser that reaches the internet, and an AC outlet (or a plan for one) inside the housing. Anything less goes in the report as pre-work.</p></div>`
      },
      {
        id: 'l5', title: 'Points 8–9: firewall and lighting', minutes: 8,
        html: `
<h4>8 · Check the firewall and the network at the site</h4>
<p><strong>The operator's IT team must allow access to GMP's AWS backend IP addresses so the on-site ASUS NUC can connect.</strong> Start this conversation at the site walk: enterprise IT change windows are slow, and the full whitelist (Module M14) includes installation-time URLs (Docker, Ubuntu APT) plus the daily-operation endpoints and ports. An install can be hardware-complete and still dead because a firewall ticket sat in a queue.</p>
<h4>9 · Check lighting in the lanes — ALL LANES</h4>
<p><strong>Adequate lighting is necessary for LPR functionality. Poor lighting leads to misreads and underperformance.</strong> The checks:</p>
<ul>
  <li>Lights should be installed <strong>at an angle parallel to the camera's lens to minimize glare</strong>.</li>
  <li>Target: <strong>500–600 lux</strong> in the read zone (considering shutter speed 1/1000s).</li>
</ul>
<p>Note per lane whether existing lighting meets this or floodlights go on the procurement list (≥8,000 lm indoor / ≥32,000 lm outdoor — M03).</p>
${src('"Site Walk" items 8–9, p.19')}
<div class="callout good"><span class="co-label">Walk output = install plan</span><p>A complete site walk yields: lane count (reversible ×2) → BOM; approach lengths → camera placement strategy per lane; gate makes + board photos + third-party systems → wiring plan; loop status per lane → deployment plan; conduit/power/network status → cabling & electrician pre-work; firewall contact started → network readiness; lighting per lane → floodlight orders. That document <em>is</em> your install plan.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'Who do you walk the site with, and what\'s the primary purpose?',
        options: [
          'Alone — to work faster',
          'With the location manager — to understand the existing equipment (PARCS) and the effort required to set up the GMP system',
          'With the gate manufacturer',
          'With the operator\'s IT team only'
        ],
        answer: 1,
        explain: 'The site walk is done with the location manager and is the first step toward understanding the existing PARCS equipment and the setup effort. (IT gets involved for the firewall item, but the walk itself is with the location manager.)',
        source: '"Site Walk", p.17'
      },
      {
        type: 'scenario',
        stem: 'On a Magnetic Pro gate, the board screen shows only one loop icon. What does the guide tell you to do?',
        options: [
          'Assume it\'s the presence loop',
          'Use a metal object on the loops to identify which loop is mapped — the icon flashes on activation',
          'Rewire it immediately to add the second loop',
          'Skip loop checks for that lane'
        ],
        answer: 1,
        explain: 'With a single-loop setup, place a metal object on each loop to see which one activates the screen icon. (When both are set: presence is typically B, safety is A.)',
        source: '"Site Walk" item 5, pp.17–18'
      },
      {
        type: 'mcq',
        stem: 'Why does the site walk measure approach length in each lane?',
        options: [
          'To size the speed bump order',
          'To determine feasibility of deploying rear-reading LPR cameras',
          'To calculate conduit fill',
          'To position the PoE+ switch'
        ],
        answer: 1,
        explain: 'Approach length determines whether rear-read camera placement (which needs 25–30 ft before the dispenser) is feasible — short approaches force different placement strategies.',
        source: '"Site Walk" item 2, p.17'
      },
      {
        type: 'mcq',
        stem: 'What must the operator\'s IT team do for the installation to function?',
        options: [
          'Provide a public IP for each WISE board',
          'Allow access to GMP\'s AWS backend IP addresses so the on-site NUC can connect',
          'Disable the site firewall entirely',
          'Install TeamViewer on their own servers'
        ],
        answer: 1,
        explain: 'Site-walk item 8: the operator\'s IT team must allow access to GMP\'s AWS backend so the NUC can connect. The detailed URL/port whitelist is Module M14.',
        source: '"Site Walk" item 8, p.19'
      },
      {
        type: 'scenario',
        stem: 'When you open each gate cabinet during the walk, what two things are you recording?',
        options: [
          'Serial numbers and firmware versions',
          'All ports used by existing wires, and whether third-party systems (e.g., Vend, Parkonect) are deployed',
          'The gate arm length and loop resistance',
          'Paint condition and lock type'
        ],
        answer: 1,
        explain: 'Item 4: open the gate and examine the control board in ALL lanes — note all ports used by existing wires and check for third-party systems like Vend or Parkonect that share the board.',
        source: '"Site Walk" item 4, p.17'
      },
      {
        type: 'mcq',
        stem: 'If a lane\'s conduit between ticket machine and gate is full, the guide says:',
        options: [
          'Run cables on the surface without protection',
          'Use Wi-Fi instead',
          'New conduit work may be required — flag it as scope',
          'Skip the IO controller for that lane'
        ],
        answer: 2,
        explain: 'Verify CAT6 can be pushed through the existing (underground or overground) conduit; if not, new conduit work may be required. That is exactly the kind of scope the pre-install walk exists to surface.',
        source: '"Site Walk" item 6, p.18'
      }
    ]
  });

  /* ==========================================================
     M08 — Gate wiring & loop logic
     ========================================================== */
  A.modules.push({
    id: 'm08', code: 'M08', phase: 3,
    title: 'Gate Wiring, Loop Signals & Vend Logic',
    tagline: 'Reading the gate control board, wiring the WISE board to power, loops, and the vend circuit — terminal by terminal.',
    minutes: 55,
    objectives: [
      'Wire WISE board power correctly (VS+/VS− with 12/24VDC)',
      'Read loop status indicators on a Magnetic Pro control board',
      'Make the safety loop, presence loop, and gate-arm vend connections exactly',
      'Explain the relay/terminal logic behind each connection'
    ],
    lessons: [
      {
        id: 'l1', title: 'The gate wiring check', minutes: 8,
        html: `
<p>As part of the site walk, you <strong>assess gate wiring to plan the installation approach</strong>. Everything in this module uses the source's worked example: a <strong>Magnetic Gate connected to a Datapark PARCS</strong>. Other gate models have <strong>similar connection points</strong>, and crucially: <strong>on the WISE board, the connection ports remain consistent for respective loops and gate functions</strong> — your side of the wiring never changes.</p>
<figure class="figure">[[DIAGRAM:wiseWiring]]<figcaption>The complete WISE ↔ gate wiring map taught in this module. Gate-side terminals are from the Magnetic Pro / Datapark example; WISE-side ports are universal.</figcaption></figure>
<div class="callout warn"><span class="co-label">Before touching terminals</span><p>This module assumes you did M07 item 4: you've opened the cabinet, photographed the board, noted every port in use, and identified third-party systems. Never move or repurpose an existing wire without understanding what it feeds.</p></div>
${src('"Gate Wiring Check", p.20')}`
      },
      {
        id: 'l2', title: 'Powering the WISE board', minutes: 6,
        html: `
<p><strong>The WISE IO board must be installed in every gate</strong>, and a <strong>12/24VDC power supply must be provided</strong> for it. Power can also be <strong>drawn from the magnetic gate's DC power</strong>.</p>
<ol class="steps">
<li><b>Connect VS+ on the WISE board → +12/24V port on the power supply</b></li>
<li><b>Connect VS− on the WISE board → 0V port on the power supply</b></li>
</ol>
${src('"WISE IO Board Power Requirements", p.20')}
<div class="callout field"><span class="co-label">Bench habit</span><p>You'll power boards twice in this program: once on the bench for network configuration (M11, with a 12V DC supply) and once permanently in the gate. Same two terminals both times.</p></div>`
      },
      {
        id: 'l3', title: 'Reading loop status on the control board', minutes: 14,
        html: `
<p>The Magnetic Pro control board tells you everything through its indicator LEDs and screw terminals. The source teaches three states — learn to read all three before connecting anything.</p>
<h4>State 1: NO loop active</h4>
<p>Looking at the output/input ports on a Magnetic Pro gate control board: on the right side of the screw terminals, the <strong>Pink, Orange, Blue, and Green wires carry loop and gate-arm status signals to the ticket dispenser</strong>. A <strong>separate pink wire on the far left controls gate arm vending</strong>. With no vehicle present, no loop indicator is lit.</p>
<h4>State 2: SAFETY loop active</h4>
<p>When the safety loop is triggered, <strong>an indicator lights up in front of the NC4 pin</strong>. This means <strong>Relay 4 is configured for output, and the signal wire is at terminal NO4</strong>.</p>
<h4>State 3: PRESENCE loop active</h4>
<p>When the presence loop is active, <strong>an indicator lights up in front of the NO5 pin</strong>. This means <strong>Relay 5 is configured for output. The signal wire for the ticket dispenser is present on the NO5 terminal.</strong></p>
${src('"Loop Status Indicators", pp.21–23')}
<div class="callout field"><span class="co-label">What you're really learning</span><p>The gate board exposes each loop's state through a relay (Relay 4 = safety, Relay 5 = presence in this example). Your WISE inputs will tap those relay terminals. The LEDs are your ground truth: metal object on loop → LED responds → you know which relay, which terminal, which loop.</p></div>`
      },
      {
        id: 'l4', title: 'Making the three connections', minutes: 15,
        html: `
<p>With the board read, make the connections. Terminal names below are exact — from the Magnetic Pro / Datapark example.</p>
<h4>Safety loop → WISE</h4>
<ol class="steps">
<li><b>Connect DICOM on the WISE Board → C4-6 terminal on the gate control board</b></li>
<li><b>Connect DI1 on the WISE Board → NC4 terminal on the gate control board</b></li>
</ol>
<h4>Presence loop → WISE</h4>
<ol class="steps">
<li><b>Connect DICOM on the WISE board → C4-6 terminal on the gate control board</b><p>DICOM is the shared common for both digital inputs — one wire to C4-6 serves both loop connections.</p></li>
<li><b>Connect DI0 on the WISE board → NC5 terminal on the gate control board</b></li>
</ol>
<div class="callout ambiguity"><span class="co-label">Source note (NO5 vs NC5)</span><p>The source's descriptive text says the presence-loop indicator lights at the <strong>NO5</strong> pin and the ticket dispenser's signal wire sits on <strong>NO5</strong>, while its connection instruction says to land <strong>DI0 on NC5</strong>. Both statements are reproduced here exactly as printed. On-site, verify with the metal-object test that your chosen terminal actually transitions when the loop activates before finalizing.</p></div>
<h4>Gate arm vend → WISE</h4>
<p>The gate arm vend connection is made as follows, <strong>based on existing connections</strong>:</p>
<ol class="steps">
<li><b>Connect 24V from the gate control board → RL0− on the WISE Board</b></li>
<li><b>Connect IN1 from the gate control board → RL0+ on the WISE Board</b></li>
</ol>
<p>When the platform commands a vend, the WISE relay closes RL0, completing the gate board's own 24V → IN1 vend circuit — the gate opens exactly as if its native system asked.</p>
<p><strong>Similar connection points exist for other gate models.</strong> The WISE-side ports (DICOM, DI0, DI1, RL0±, VS±) are always the same.</p>
${src('"Loop Status Indicators" / "Gate Arm Vend", pp.22–24')}`
      },
      {
        id: 'l5', title: 'Wiring recap card', minutes: 5,
        html: `
<p>The complete lane wiring, in one table — this exact card also lives in Field Mode:</p>
<div class="tablewrap"><table class="spec">
<tr><th>Circuit</th><th>WISE terminal</th><th>Other end (Magnetic/Datapark example)</th></tr>
<tr><td>Board power +</td><td><code>VS+</code></td><td>+12/24V on power supply (or gate DC)</td></tr>
<tr><td>Board power −</td><td><code>VS−</code></td><td>0V on power supply</td></tr>
<tr><td>Input common</td><td><code>DICOM</code></td><td>C4-6 on gate control board</td></tr>
<tr><td>Safety loop</td><td><code>DI1</code></td><td>NC4 on gate control board</td></tr>
<tr><td>Presence loop</td><td><code>DI0</code></td><td>NC5 on gate control board (see NO5/NC5 source note)</td></tr>
<tr><td>Vend</td><td><code>RL0−</code></td><td>24V from gate control board</td></tr>
<tr><td>Vend</td><td><code>RL0+</code></td><td>IN1 from gate control board</td></tr>
<tr><td>Network</td><td>LAN port</td><td>CAT6 to nearest switch</td></tr>
</table></div>
<div class="callout good"><span class="co-label">Sanity checks before closing the cabinet</span>
<ul>
<li>Metal on presence loop → gate-board LED responds (and later, DI-0 in software — M12).</li>
<li>Metal on safety loop → LED responds (DI-1 in software).</li>
<li>Existing ticket-dispenser signal wires still landed where they were — you tapped, you didn't steal.</li>
</ul></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'The gate wiring walkthrough in the guide is illustrated with which combination?',
        options: [
          'A FAAC gate with Parkonect',
          'A Magnetic Gate connected to a Datapark PARCS',
          'A Magnetic gate with Vend',
          'A generic gate with no PARCS'
        ],
        answer: 1,
        explain: 'The example uses a Magnetic Gate connected to a Datapark PARCS. Other gate models have similar connection points, and the WISE-side ports stay consistent.',
        source: '"Gate Wiring Check", p.20'
      },
      {
        type: 'mcq',
        stem: 'Which pair correctly wires the safety loop to the WISE board?',
        options: [
          'DICOM → C4-6 and DI1 → NC4',
          'DICOM → NC4 and DI1 → C4-6',
          'DI0 → NC5 and DI1 → NO4',
          'RL0+ → IN1 and RL0− → 24V'
        ],
        answer: 0,
        explain: 'Safety loop: DICOM on the WISE board goes to the C4-6 terminal, and DI1 goes to NC4 on the gate control board. (The RL0 pair is the vend circuit, not a loop.)',
        source: '"When the SAFETY LOOP is ACTIVE", p.22'
      },
      {
        type: 'mcq',
        stem: 'The gate arm vend connection is:',
        options: [
          '24V from gate board → RL0−, and IN1 from gate board → RL0+',
          '24V → DI0, IN1 → DI1',
          'RL0+ → C4-6, RL0− → NC5',
          '24V → VS+, IN1 → VS−'
        ],
        answer: 0,
        explain: 'Vend: 24V from the gate control board lands on RL0−, and IN1 from the gate control board lands on RL0+. The WISE relay closing completes the gate\'s own vend circuit.',
        source: '"Gate Arm Vend", pp.23–24'
      },
      {
        type: 'scenario',
        stem: 'You trigger the safety loop on a Magnetic Pro board and see the indicator light at NC4. What does that tell you per the guide?',
        options: [
          'The loop is broken',
          'Relay 4 is configured for output, and the signal wire is at terminal NO4',
          'Relay 5 handles the safety loop',
          'The vend circuit is active'
        ],
        answer: 1,
        explain: 'The NC4 indicator on safety-loop activation means Relay 4 is configured for output with the signal wire at NO4 — that\'s the relay you tap for the WISE safety-loop input.',
        source: '"When the SAFETY LOOP is ACTIVE", p.22'
      },
      {
        type: 'scenario',
        stem: 'A colleague on a different gate brand asks if the WISE-side wiring changes. Correct answer?',
        options: [
          'Yes — every gate needs different WISE ports',
          'No — similar connection points exist on other gate models, and on the WISE board the ports remain consistent for the respective loops and gate functions',
          'Only the vend relay moves',
          'The WISE board doesn\'t work with other brands'
        ],
        answer: 1,
        explain: 'The guide states that similar connection points exist for other gate models and the WISE connection ports remain consistent for respective loops and gate functions. You re-identify the gate-side terminals; your side is fixed.',
        source: '"Gate Arm Vend", p.24'
      },
      {
        type: 'mcq',
        stem: 'On the no-loop-active board photo, what do the Pink/Orange/Blue/Green wires on the right of the screw terminals do?',
        options: [
          'They power the WISE board',
          'They carry loop and gate-arm status signals to the ticket dispenser',
          'They are unused spares',
          'They control lane lighting'
        ],
        answer: 1,
        explain: 'Those four wires carry loop and gate-arm status to the ticket dispenser; the separate pink wire on the far left controls gate-arm vending.',
        source: '"When NO LOOP is ACTIVE", p.21'
      }
    ]
  });

  /* ==========================================================
     M09 — LPR placement & lighting geometry
     ========================================================== */
  A.modules.push({
    id: 'm09', code: 'M09', phase: 3,
    title: 'LPR Camera Placement & Read Geometry',
    tagline: 'Rear-read vs front-read strategy, the exact distances and heights, and the lighting geometry behind clean reads.',
    minutes: 45,
    objectives: [
      'Decide rear-read vs front-read placement from lane geometry',
      'Apply the rear-read numbers: 25–30 ft, 8–10 ft height, 30–45° tilt, 30–35 ft total',
      'Apply the front-read numbers: 5–10 ft beyond dispenser, 8–10 ft pole height',
      'Position lighting to support the chosen geometry'
    ],
    lessons: [
      {
        id: 'l1', title: 'The placement decision', minutes: 8,
        html: `
<p><strong>The feasibility of LPR deployment depends on whether rear-plate reading is possible.</strong> This is especially important in <strong>entry lanes, where vehicles may come directly off the street</strong>, making it challenging to capture plates effectively. Mounting positions vary with the camera's capabilities and the availability of space at the site — which is why the site walk measured every approach length (M07 item 2).</p>
<div class="tablewrap"><table class="spec">
<tr><th>Strategy</th><th>Reads</th><th>Needs</th><th>Typical use</th></tr>
<tr><td>Rear-read</td><td>Rear plate of a vehicle that has passed the camera</td><td>25–30 ft of approach before the dispenser</td><td>Preferred where geometry allows; the standard lane diagrams (M01) show it</td></tr>
<tr><td>Front-read</td><td>Front plate of an approaching vehicle</td><td>Space 5–10 ft beyond the dispenser, inside the lane</td><td>Short approaches, street-fed entries, auto-vend exits</td></tr>
</table></div>
${src('"LPR Position", p.24')}
<div class="callout field"><span class="co-label">Why rear-read is the default</span><p>The camera sits behind the car looking at a plate that's motionless (car stopped at the dispenser/kiosk), at a shallow angle, with no headlights in the lens. Front-read trades that comfort for placement flexibility — and pays for it with glare management.</p></div>`
      },
      {
        id: 'l2', title: 'Rear-read geometry: the numbers', minutes: 14,
        html: `
<p>A typical camera's <strong>operating range is 1–6 m (3–20 ft)</strong>. The placement math from the source:</p>
<ul>
  <li>Assuming a <strong>15 ft vehicle</strong> and a <strong>10 ft distance from the rear to the driver's seat</strong> (where the ticket dispenser aligns when the car enters the lane), the camera should be placed <strong>25–30 ft before the ticket dispenser</strong>. This range allows for optimal read quality and angle.</li>
  <li>If you're using a camera <strong>with optical zoom</strong>, place it <strong>25–30 ft before the ticket dispenser</strong> as well.</li>
</ul>
<figure class="figure">[[DIAGRAM:rearRead]]<figcaption>Rear-read installation geometry (source p.25): 8–10 ft mount height, 30–45° tilt, min 25–max 30 ft from the kiosk, total gate-to-camera min 30–max 35 ft (gates can be closer or further as required by the location).</figcaption></figure>
<div class="kv">
  <div class="k"><span class="lab">Mount height</span><span class="val">8–10 ft</span></div>
  <div class="k"><span class="lab">Camera tilt</span><span class="val">30–45°</span></div>
  <div class="k"><span class="lab">From kiosk</span><span class="val">25–30 ft</span></div>
  <div class="k"><span class="lab">Gate → camera</span><span class="val">30–35 ft</span></div>
  <div class="k"><span class="lab">Operating range</span><span class="val">1–6 m (3–20 ft)</span></div>
</div>
<p>Two absolute rules ride along with the numbers:</p>
<ul>
  <li><strong>Camera angle should avoid steep inclines</strong> — to prevent misreads on vehicles (like Jeep Wranglers) where plates are under bumpers or off-center.</li>
  <li><strong>Always mount the camera upright.</strong></li>
</ul>
${src('"Rear-read mounting of the LPR Camera", pp.25–26')}
<div class="callout field"><span class="co-label">Why 25–30 ft works</span><p>Car stopped with driver at the dispenser → the rear plate sits ~10 ft behind the driver → ~10–15 ft in front of a camera placed 25–30 ft back. That lands the plate mid-band in the 3–20 ft operating range, with margin for long vehicles and sloppy stops.</p></div>`
      },
      {
        id: 'l3', title: 'Front-read geometry: the numbers', minutes: 10,
        html: `
<p>For effective front-plate LPR capture:</p>
<ul>
  <li>Position the camera <strong>5–10 ft beyond the ticket dispenser</strong> (inside the lane).</li>
  <li><strong>Preferably mounted on the ceiling</strong>, angled downward towards where the front of the vehicle will come to a stop.</li>
  <li><strong>Pole-mounted cameras should be at least 8–10 ft high to avoid headlight glare</strong> from approaching vehicles.</li>
</ul>
<figure class="figure">[[DIAGRAM:frontRead]]<figcaption>Front-read placement: camera 5–10 ft beyond the dispenser, aimed at the vehicle's stopping point; height ≥8–10 ft keeps headlights out of the lens.</figcaption></figure>
${src('"Front-read mounting of LPR Camera", p.26')}
<div class="callout warn"><span class="co-label">The glare trap</span><p>Front-read means the camera faces oncoming headlights. Height is the defense — 8–10 ft minimum puts the lens above the beam pattern. A front-read camera at eye level will produce beautiful daytime reads and useless night reads.</p></div>`
      },
      {
        id: 'l4', title: 'Lighting geometry for the read', minutes: 13,
        html: `
<p>All the lighting rules from M03 exist to serve this module's geometry. Bringing them together as a placement procedure:</p>
<ol class="steps">
<li><b>Survey the lane's natural light.</b><p>LPR cameras require well-lit plates; many garages lack sufficient illumination — even outdoor lanes may need additional lights for night use. Target 500–600 lux in the read zone (at 1/1000s shutter).</p></li>
<li><b>Mount lights at 8–10 ft on poles</b> — the same band as the camera, which is what makes the parallel-angle rule physically achievable.</li>
<li><b>Angle light downward and parallel to the camera</b>, never opposing it. Avoid direct reflection into the lens — plates are retroreflective.</li>
<li><b>Add fixtures where needed.</b><p>Use spotlights or additional lighting if required. Purchased fixtures: ≥8,000 lm indoor, ≥32,000 lm outdoor.</p></li>
<li><b>Validate through the camera.</b><p>Observe actual read performance in each lane through the camera and adjust lighting as needed — the camera's own image is the acceptance test, at night, with real traffic.</p></li>
</ol>
${src('"Lighting in the lanes for LPR Read", p.26')}
<div class="callout good"><span class="co-label">Geometry cheat-sheet</span>
<ul>
<li>Rear-read: camera 25–30 ft before dispenser · 8–10 ft high · 30–45° tilt · gate-to-camera 30–35 ft · upright · no steep angles.</li>
<li>Front-read: camera 5–10 ft past dispenser · ceiling preferred · pole ≥8–10 ft (headlights).</li>
<li>Light: 8–10 ft high · downward · parallel to lens · no reflection · 500–600 lux · validate through the lens.</li>
</ul></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'For rear-read mounting, the camera is placed:',
        options: [
          '5–10 ft before the ticket dispenser',
          '25–30 ft before the ticket dispenser',
          '30–45 ft past the gate',
          'Directly above the presence loop'
        ],
        answer: 1,
        explain: 'Rear-read: 25–30 ft before the ticket dispenser (based on a 15 ft vehicle and 10 ft rear-to-driver distance). The same 25–30 ft applies when using an optical-zoom camera. 5–10 ft beyond the dispenser is the front-read rule.',
        source: '"Rear-read mounting", p.25'
      },
      {
        type: 'mcq',
        stem: 'The rear-read ceiling-mount figure specifies which height and tilt?',
        options: [
          '6 ft high, 90° straight down',
          '8–10 ft high, tilted 30–45°',
          '12–15 ft high, tilted 10°',
          'Any height, as long as it\'s upright'
        ],
        answer: 1,
        explain: 'Mount at 8–10 ft with the camera tilted 30 to 45°, positioned min 25–max 30 ft from the kiosk, total gate-to-camera distance min 30–max 35 ft.',
        source: 'Rear-read installation figure, p.25'
      },
      {
        type: 'scenario',
        stem: 'An entry lane is fed directly off the street with almost no approach. Per the guide\'s logic, what placement do you evaluate?',
        options: [
          'Rear-read anyway — it always works',
          'Front-read: camera 5–10 ft beyond the dispenser inside the lane, ceiling-mounted or on a pole at least 8–10 ft high',
          'Mount the camera in the gate cabinet',
          'Skip LPR for that lane'
        ],
        answer: 1,
        explain: 'Rear-read feasibility depends on approach length — street-fed entries are the guide\'s explicit hard case. Front-read placement (5–10 ft beyond the dispenser, high mount against headlight glare) is the alternative.',
        source: '"LPR Position" / "Front-read mounting", pp.24–26'
      },
      {
        type: 'scenario',
        stem: 'Night reads fail on a front-read lane; day reads are fine. The camera is pole-mounted at 5 ft. Most guide-aligned fix?',
        options: [
          'Increase camera zoom',
          'Raise the camera to at least 8–10 ft — at 5 ft it\'s catching headlight glare from approaching vehicles',
          'Move it 30 ft further back',
          'Lower the shutter speed'
        ],
        answer: 1,
        explain: 'Pole-mounted front-read cameras should be at least 8–10 ft high specifically to avoid headlight glare — the classic works-by-day / fails-by-night signature.',
        source: '"Front-read mounting", p.26'
      },
      {
        type: 'mcq',
        stem: 'Why does the guide warn about vehicles like Jeep Wranglers in camera-angle planning?',
        options: [
          'They\'re too tall for the gate arm',
          'Steep camera inclines cause misreads on vehicles whose plates are under bumpers or off-center',
          'Their plates are reflective',
          'They trigger the safety loop twice'
        ],
        answer: 1,
        explain: 'Camera angle should avoid steep inclines to prevent misreads on vehicles like Jeep Wranglers where plates sit under bumpers or off-center — and always mount the camera upright.',
        source: '"Rear-read mounting", p.26'
      }
    ]
  });
})();
