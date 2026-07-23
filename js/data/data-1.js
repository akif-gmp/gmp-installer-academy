/* ============================================================
   Curriculum data — Phase 1 (Orientation) + Phase 2 part 1
   Modules M01–M03. Source of truth: GMP Access Install V3.
   ============================================================ */
(function () {
  'use strict';
  window.ACADEMY = window.ACADEMY || {};
  const A = window.ACADEMY;
  A.modules = A.modules || [];

  A.phaseMeta = [
    { n: 1, title: 'Orientation — the system you are installing' },
    { n: 2, title: 'Hardware mastery — know every device' },
    { n: 3, title: 'Site assessment — walk, wiring & placement' },
    { n: 4, title: 'Bench setup — compute & controller prep' },
    { n: 5, title: 'On-site installation & validation' },
    { n: 6, title: 'Network readiness & operational handoff' }
  ];

  const src = t => `<p class="src">Source: GMP Access Install V3 — ${t}</p>`;

  /* ==========================================================
     M01 — What GMP Access is & lane architecture
     ========================================================== */
  A.modules.push({
    id: 'm01', code: 'M01', phase: 1,
    title: 'What GMP Access Is & How a Lane Works',
    tagline: 'The system concept, the IoT GateKit, and the anatomy of every lane type you will build.',
    minutes: 45,
    objectives: [
      'Explain what GMP Access (the GMP IoT GateKit) is and what problem it solves',
      'Name the two device families that make ticketless entry/exit possible',
      'Identify every component in an entry, exit, and reversible lane topology',
      'Read all eight official lane diagrams and know when each layout applies'
    ],
    lessons: [
      {
        id: 'l1', title: 'The system in one picture', minutes: 12,
        html: `
<p><strong>GMP Access</strong> — commonly referred to as the <strong>GMP IoT GateKit</strong> — is a digital access control system specifically designed for <strong>gated parking garages</strong>. It includes hardware installed in two places: at the <strong>entry/exit lanes</strong>, and in the <strong>parking office</strong>. The system leverages <strong>LPR (license plate recognition) cameras</strong> and <strong>unattended payment terminals</strong> to enable seamless, <strong>ticketless</strong> entry and exit.</p>
${src('"What is GMP Access?", p.5')}
<p>Hold on to that two-part split, because the whole installation job divides along it:</p>
<ul>
  <li><strong>In the lane</strong> — the devices a driver interacts with or drives over: the LPR camera, the WISE IO controller inside the gate, the PoE+ switch inside the ticket-dispenser housing, speed bumps, lighting, and (on ExpressLane sites) a POS terminal, kiosk, or display.</li>
  <li><strong>At the location (office/server room)</strong> — the compute and connectivity layer: an ASUS NUC running GMP's custom Linux, its HDMI display emulator plug, and optionally a 4G/5G backup internet SIM.</li>
</ul>
<figure class="figure">[[DIAGRAM:systemOverview]]<figcaption>Where the pieces live. Everything in the lane rides the site LAN back to the NUC; the NUC talks to GMP's AWS backend over the site's internet connection (firewall rules permitting — Module M14 covers exactly which URLs and ports).</figcaption></figure>
<h4>How a ticketless pass-through actually happens</h4>
<p>Walk the chain of events for a car exiting a garage, because every device you will install exists to serve one link of it:</p>
<ol>
  <li>The car rolls over a <strong>speed bump</strong> placed before the lane island — slowing it enough for a clean plate read.</li>
  <li>The <strong>LPR camera</strong> captures the plate. Lighting quality and camera geometry (Module M09) decide whether this read succeeds.</li>
  <li>The car settles on the <strong>presence loop</strong> — a wire loop in the pavement that tells the system "a vehicle is stopped here."</li>
  <li>The platform decides whether to vend: plate recognized, session paid (or payment taken at the lane's <strong>POS terminal/kiosk</strong>).</li>
  <li>The <strong>WISE 4060 IO controller</strong> — wired into the gate's control board — fires its relay and the <strong>gate arm</strong> rises.</li>
  <li>The car drives through, crossing the <strong>safety loop</strong> under the arm. When the safety loop clears, the arm can lower without hitting the vehicle.</li>
</ol>
<figure class="figure">[[DIAGRAM:flowChain]]<figcaption>The pass-through chain. Every device in the curriculum serves one numbered link — and every fault report maps back to one of them.</figcaption></figure>
<div class="callout field"><span class="co-label">Field intuition</span><p>Almost every troubleshooting conversation you'll ever have maps to one link of this chain: <em>bad read</em> → camera/lighting/speed; <em>gate won't open</em> → IO wiring or loop mapping; <em>gate won't close / closes on cars</em> → safety loop; <em>nothing works</em> → network or power. Learn the chain and you can localize a fault before opening a single cabinet.</p></div>
<p>One more definition you need on day one: <strong>ExpressLane</strong> is GMP's unattended pay-at-the-lane experience. Sites "with ExpressLane" get payment hardware in the lane (Adyen or PAX terminals, kiosks or POS pedestals) and require continuous internet connectivity. Several equipment rules in this curriculum apply <em>only</em> to ExpressLane configurations — they are flagged wherever they appear.</p>
<figure class="figure">[[DIAGRAM:expressLaneCompare]]<figcaption>The base kit opens gates by recognition; ExpressLane adds pay-in-the-lane hardware on top — and with it, the continuous-internet requirement, AC power, and extra CAT6 runs.</figcaption></figure>`
      },
      {
        id: 'l2', title: 'Lane anatomy: loops, gate arm, camera, controller', minutes: 14,
        html: `
<p>Every lane variant in the system is assembled from the same small vocabulary of parts. Master these six and all eight lane diagrams become readable at a glance.</p>
<h4>The two loops</h4>
<p>Inductive loops are coils of wire in the pavement that detect metal above them. A GMP lane typically integrates <strong>two loops per lane</strong> (though depending on the lane setup, only one may be used):</p>
<div class="tablewrap"><table class="spec">
<tr><th>Loop</th><th>Where</th><th>What it means when active</th><th>WISE input</th></tr>
<tr><td>Presence loop</td><td>Where the car stops, at the driver's interaction point (kiosk/ticket machine alignment)</td><td>"A vehicle is waiting in the lane"</td><td>DI0</td></tr>
<tr><td>Safety loop</td><td>Directly under / just past the gate arm</td><td>"A vehicle is under the arm — do not close"</td><td>DI1</td></tr>
</table></div>
${src('"Loop Status Indicators" pp.21–23; "Testing the IO Board" pp.51–52; lane diagrams pp.58–65')}
<p>On a magnetic gate's control board, the loops are usually mapped so that the <strong>presence loop is set up as B and the safety loop as A</strong> (you will verify this on the site walk with a metal object — Module M07).</p>
<h4>The gate arm and "vend"</h4>
<p><strong>Vend</strong> is industry shorthand for commanding the gate to open. The existing PARCS gate already knows how to raise and lower its arm; our job is to give the GMP platform a wired path to trigger it. That path is the WISE controller's relay output (RL0), wired to the gate control board's vend input. Module M08 teaches the exact terminals.</p>
<h4>The LPR camera</h4>
<p>One LPR camera per lane, running on <strong>PoE or PoE+</strong> (PoE+ recommended for stable performance — make sure compatible network switches are used). Whether it reads the <em>rear</em> plate of a car that has passed it or the <em>front</em> plate of a car approaching it is a placement decision with precise distance rules (Module M09).</p>
<h4>The WISE 4060 IO controller</h4>
<p>One <strong>Advantech WISE 4060-LAN-B</strong> per lane, typically installed <strong>inside the gate cabinet</strong>. It reads the loops (digital inputs) and opens the gate (relay outputs). It needs two things: <strong>network connectivity</strong> (CAT6 from the nearest switch) and a <strong>12/24VDC power supply</strong>.</p>
<h4>The PoE+ switch</h4>
<p>Installed <strong>inside the ticket-dispenser housing</strong>, the PoE+ switch delivers both power and data over a single Ethernet cable to the camera and IO controller, using the <strong>existing network line from the server room</strong>. This is the pattern that keeps cabling minimal: one existing line in, short local runs out.</p>
<h4>The interaction point (ExpressLane)</h4>
<p>On ExpressLane sites, the driver pays or validates at the lane: a <strong>payment kiosk</strong>, a <strong>POS pedestal</strong>, or a POS mounted in the existing ticket dispenser. Its position in the lane <em>is</em> the driver's stopping point — the lane diagrams place it exactly where the presence loop holds the car.</p>
${src('"Equipment Layout", pp.15–16; "Know The Equipment", pp.5–8')}`
      },
      {
        id: 'l3', title: 'The eight lane topologies', minutes: 16,
        html: `
<p>The source guide closes with eight lane diagrams — the operational topology for every configuration you will encounter. They are reproduced below as faithful redrawings. Common to all of them: the Ethernet switch feeds both the IO controller (in the gate housing, with its DC adapter and power feed) and the LPR camera over a CAT6 PoE line, the safety loop sits at the gate arm, and the presence loop sits where the vehicle stops. The camera sits roughly <strong>30 ft</strong> from the driver's stopping point (the "Distance 30ft" annotation — Module M09 explains why).</p>
<h4>1 · Entry with gate control</h4>
<p>The minimal entry lane: camera reads the rear plate as the car pulls up to the gate. No payment hardware — entry is recognition only.</p>
<figure class="figure">[[DIAGRAM:entryGate]]<figcaption>Entry with Gate control (source p.59).</figcaption></figure>
<h4>2 · Exit with gate control</h4>
<p>The minimal exit lane — same hardware set as the minimal entry. Used where payment happens elsewhere (pay-on-foot, validations, ReverseQR).</p>
<figure class="figure">[[DIAGRAM:exitGate]]<figcaption>Exit with Gate control (source p.58).</figcaption></figure>
<h4>3 · Entry with gate control + kiosk</h4>
<p>ExpressLane entry with a payment kiosk. <em>The kiosk's position in the diagram represents where the driver stops before the gate</em> — that alignment is what makes the presence loop, kiosk reach, and camera distance all work together.</p>
<figure class="figure">[[DIAGRAM:entryKiosk]]<figcaption>Entry with Gate control + kiosk (source p.60).</figcaption></figure>
<h4>4 · Exit with gate control + kiosk</h4>
<figure class="figure">[[DIAGRAM:exitKiosk]]<figcaption>Exit with Gate control + kiosk (source p.61).</figcaption></figure>
<h4>5 · Exit with gate control + POS pedestal</h4>
<p>Same geometry as the kiosk exit, with a POS pedestal (e.g., RevCon housing a PAX IM30) as the interaction point. <em>The distance to the kiosk — same as the ticket machine — represents the driver's stopping point.</em></p>
<figure class="figure">[[DIAGRAM:exitPos]]<figcaption>Exit with Gate control + POS Pedestal (source p.62).</figcaption></figure>
<h4>6 · Exit with auto vend</h4>
<p>The fully hands-off exit: the camera front-reads the plate in a <strong>read zone</strong> at the gate, and a recognized, settled session vends the gate automatically — the driver never stops at a device.</p>
<figure class="figure">[[DIAGRAM:exitAutoVend]]<figcaption>Exit with Auto vend (source p.63).</figcaption></figure>
<h4>7 · Reversible lane with gate control</h4>
<p>One physical lane that serves <strong>entry and exit in an either/or setup</strong>. Everything doubles: two gates, two IO controllers, two LPR cameras, and mirrored loop pairs — which is exactly why the site-walk rule says <strong>a reversible lane counts as two lanes</strong> when estimating hardware.</p>
<figure class="figure">[[DIAGRAM:reversible]]<figcaption>Reversible lane with gate control (source p.64).</figcaption></figure>
<h4>8 · Reversible lane with gate control + kiosk</h4>
<figure class="figure">[[DIAGRAM:reversibleKiosk]]<figcaption>Reverse lane with gate control + Kiosk (source p.65).</figcaption></figure>
<div class="callout warn"><span class="co-label">Estimating rule</span><p>When counting lanes on a site walk: <strong>reversible lanes are counted as two separate lanes</strong> for hardware quantities. Two directions = two cameras + two IO boards + two gates' worth of wiring.</p></div>
${src('"Lane Diagram", pp.58–65; "Site Walk" item 1, p.17')}`
      },
      {
        id: 'l4', title: 'Operational summary & what you will build', minutes: 3,
        html: `
<p>Before moving on, make sure this module's mental model is solid — the rest of the curriculum assumes it.</p>
<div class="callout spec"><span class="co-label">Module M01 — operational summary</span>
<ul>
<li>GMP Access = GMP IoT GateKit: digital access control for gated parking garages; hardware at lanes + parking office; LPR cameras + unattended payment terminals → ticketless entry/exit.</li>
<li>Per lane: LPR camera (PoE/PoE+), WISE 4060 IO board (network + 12/24VDC, in the gate cabinet), PoE+ switch (in the ticket-dispenser housing), speed bump, lighting; plus POS/kiosk/display on ExpressLane sites.</li>
<li>Per location: ASUS NUC (GMP Linux) + HDMI display emulator; optional Granite 4G/5G backup SIM (ExpressLane requires continuous internet).</li>
<li>Two loops per lane (typical): presence (DI0) = vehicle waiting; safety (DI1) = vehicle under arm. Vend = relay RL0.</li>
<li>Eight lane topologies; reversible lanes count as two lanes.</li>
</ul></div>
<p>Next: Phase 2 takes every device named above and teaches it properly — specs, power, placement, and procurement.</p>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'GMP Access is best described as:',
        options: [
          'A cloud dashboard for parking analytics',
          'A digital access control system for gated parking garages, using LPR cameras and unattended payment terminals for ticketless entry/exit',
          'A replacement PARCS gate product that swaps out existing gate arms',
          'A mobile payments app for drivers'
        ],
        answer: 1,
        explain: 'GMP Access (the GMP IoT GateKit) is a digital access control system specifically designed for gated parking garages, with hardware at entry/exit lanes and in the parking office. It leverages LPR cameras and unattended payment terminals for seamless, ticketless entry and exit. It works with the existing gate — it does not replace it.',
        source: '"What is GMP Access?", p.5'
      },
      {
        type: 'mcq',
        stem: 'A vehicle is stopped at the interaction point waiting for the gate. Which loop is it sitting on, and which WISE input reflects that?',
        options: [
          'Safety loop — DI1',
          'Presence loop — DI0',
          'Presence loop — DI1',
          'Safety loop — DI0'
        ],
        answer: 1,
        explain: 'The presence loop detects the waiting vehicle at the stopping point and is read on DI0. The safety loop (DI1) sits at the gate arm and prevents the arm from closing on a vehicle.',
        source: 'Loop indicators pp.21–23; IO testing pp.51–52'
      },
      {
        type: 'scenario',
        stem: 'Site survey scenario: a garage has 2 dedicated entry lanes, 1 dedicated exit lane, and 1 reversible lane. How many lanes do you count for hardware estimation?',
        options: ['4', '5', '6', '3 — reversible lanes need no extra hardware'],
        answer: 1,
        explain: 'Reversible lanes are counted as two separate lanes (they need doubled per-direction hardware: two cameras, two IO boards, two gates). 2 + 1 + (1×2) = 5.',
        source: '"Site Walk" item 1, p.17; reversible lane diagrams pp.64–65'
      },
      {
        type: 'mcq',
        stem: 'Which statement about the WISE 4060 IO controller\'s role in the lane is correct?',
        options: [
          'It processes license plate images on-board',
          'It reads the pavement loops via digital inputs and opens the gate via relay output',
          'It powers the LPR camera over PoE',
          'It hosts the parking server application'
        ],
        answer: 1,
        explain: 'The WISE 4060 is an Ethernet IO module: digital inputs read the loops, dry-contact relays fire the gate vend. The camera does the plate reading; the PoE+ switch does the powering; the NUC hosts the server.',
        source: '"WISE 4060-LAN-B IO Unit", p.5'
      },
      {
        type: 'scenario',
        stem: 'In the "Exit with Auto vend" topology, where does the LPR camera read the plate?',
        options: [
          'Rear plate, 30 ft behind the stopped car',
          'Front plate, in a read zone at the gate as the car approaches',
          'It doesn\'t — auto vend uses a QR scanner instead',
          'Rear plate, after the car has passed through the gate'
        ],
        answer: 1,
        explain: 'Auto vend exits front-read the approaching vehicle in a read zone behind the gate arm, so a recognized, settled session can vend the gate without the driver stopping at any device.',
        source: 'Lane diagram "Exit with Auto vend", p.63'
      }
    ]
  });

  /* ==========================================================
     M02 — Core lane hardware
     ========================================================== */
  A.modules.push({
    id: 'm02', code: 'M02', phase: 2,
    title: 'Core Lane Hardware: IO, Power, Switch, Speed Bumps',
    tagline: 'The WISE 4060 controller, its DC power, the PoE+ switch pattern, and speed control for clean reads.',
    minutes: 40,
    objectives: [
      'Describe the WISE 4060-LAN-B: what it does, where it installs, what it needs',
      'State the IO board power requirement and its two supply options',
      'Explain the PoE+ switch placement pattern and why it minimizes cabling',
      'Place speed bumps correctly and explain their dual purpose'
    ],
    lessons: [
      {
        id: 'l1', title: 'WISE 4060-LAN-B — the lane\'s hands and ears', minutes: 12,
        html: `
<p>The <strong>Advantech WISE 4060-LAN-B</strong> is an <strong>Ethernet IO module</strong> containing <strong>digital inputs</strong> and <strong>dry-contact relays</strong> for output operations. Typically, <strong>one unit is deployed at each lane</strong> to read the loops and open the gate. These controllers are also used to connect <strong>pedestrian doors</strong> to the digital platform — the same input/relay pattern generalizes beyond vehicle gates.</p>
${src('"WISE 4060-LAN-B IO Unit", p.5')}
<div class="kv">
  <div class="k"><span class="lab">Role</span><span class="val">Loops in, vend out</span></div>
  <div class="k"><span class="lab">Quantity</span><span class="val">1 per lane</span></div>
  <div class="k"><span class="lab">Install location</span><span class="val">Inside the gate cabinet</span></div>
  <div class="k"><span class="lab">Power</span><span class="val">12/24 VDC</span></div>
  <div class="k"><span class="lab">Network</span><span class="val">CAT6 to nearest switch</span></div>
  <div class="k"><span class="lab">Default IP</span><span class="val mono">10.0.0.1</span></div>
</div>
<figure class="figure">[[DIAGRAM:wiseBoard]]<figcaption>The only terminals you will ever touch on the WISE 4060: two for power, three for the loops, one relay pair for the vend, and the LAN port.</figcaption></figure>
<p>Why "dry contact" matters to you as an installer: the relay is a clean, isolated switch — it doesn't inject voltage into the gate board; it simply closes a circuit the gate board already provides. That's what makes the GateKit compatible with existing PARCS gates: you wire the relay across the gate's own vend input (M08), and the gate behaves as if its native ticket system commanded it.</p>
<h4>Terminals you will actually touch</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Terminal</th><th>Function</th><th>Used for</th></tr>
<tr><td><code>VS+</code> / <code>VS−</code></td><td>Supply voltage in</td><td>12/24VDC board power</td></tr>
<tr><td><code>DI0</code></td><td>Digital input 0</td><td>Presence loop signal</td></tr>
<tr><td><code>DI1</code></td><td>Digital input 1</td><td>Safety loop signal</td></tr>
<tr><td><code>DICOM</code></td><td>Digital input common</td><td>Shared common for DI0/DI1, wired to the gate board</td></tr>
<tr><td><code>RL0+</code> / <code>RL0−</code></td><td>Relay output 0</td><td>Gate arm vend circuit</td></tr>
</table></div>
<p>On the WISE board, <strong>the connection ports remain consistent for respective loops and gate functions across gate models</strong> — the gate-side terminals vary by manufacturer, but your side of the wiring doesn't. Full wiring detail is Module M08.</p>
<div class="callout spec"><span class="co-label">Procurement</span><p>US purchase sources named in the guide: <strong>Mouser Electronics</strong> and <strong>DigiKey</strong>. The datasheet referenced is <code>WISE_4000_LAN_DS</code>. (Live links are embedded in the source PDF.)</p></div>`
      },
      {
        id: 'l2', title: 'DC power for the IO board', minutes: 6,
        html: `
<p>The WISE board does not power itself over Ethernet — it needs a dedicated <strong>12/24VDC power supply</strong>, and the guide is emphatic that <strong>the WISE IO board must be installed in every gate</strong> with such a supply provided.</p>
<p>You have two legitimate supply options:</p>
<ol>
  <li><strong>A standalone 12/24VDC power supply</strong> — purchasable from any electronics store or via Amazon.</li>
  <li><strong>The magnetic gate's own DC power</strong> — power can be drawn from the gate's DC supply, since the board lives inside the gate cabinet anyway.</li>
</ol>
<div class="callout spec"><span class="co-label">The two wires</span>
<ul>
<li><code>VS+</code> on WISE board → <strong>+12/24V</strong> port on power supply</li>
<li><code>VS−</code> on WISE board → <strong>0V</strong> port on power supply</li>
</ul></div>
${src('"DC Power Supply", pp.5–6; "WISE IO Board Power Requirements", p.20')}
<div class="callout field"><span class="co-label">Field note</span><p>Decide the power source per gate during the site walk, not on install day. If the gate's DC supply is crowded or undocumented, budget a standalone supply — they're cheap, and a dedicated supply removes one variable when you're debugging loop signals later.</p></div>`
      },
      {
        id: 'l3', title: 'The PoE+ switch pattern', minutes: 10,
        html: `
<p><strong>PoE+ switches deliver both power and data over a single Ethernet cable</strong> — ideal for connecting LPR cameras and IO controllers at entry and exit lanes.</p>
<p>The placement pattern is one of the guide's most important cabling ideas: the switch is <strong>installed inside the ticket-dispenser housing</strong>, where it uses the <strong>existing network line from the server room</strong>. That single existing line then fans out locally:</p>
<ul>
  <li>→ LPR camera (PoE+ powered — no separate camera power run)</li>
  <li>→ WISE IO controller at the gate (data; the IO board takes DC power separately)</li>
  <li>→ the ticket machine itself, if it needs the connection back</li>
</ul>
<figure class="figure">[[DIAGRAM:poeFanout]]<figcaption>The cabling idea that makes retrofits cheap: one existing line into the dispenser housing, a PoE+ switch inside it, short local runs out.</figcaption></figure>
<p>This is why the site walk checks <em>power and network port availability in all ticket dispensers</em> (M07): each dispenser usually already has a network line from the server room, and the whole lane design leans on reusing it. You need <strong>AC power available for the switch</strong> inside the housing — or plan to install an extension board with a power receptacle.</p>
${src('"PoE+ Switch", p.6; "Site Walk" item 7, pp.18–19')}
<div class="callout warn"><span class="co-label">Camera power compatibility</span><p>The LPR camera runs on PoE or PoE+, and <strong>PoE+ is recommended for stable performance — ensure compatible network switches are used</strong>. If reads drop out intermittently, an underpowered PoE budget is a prime suspect.</p></div>
<p>Existing network lines can be used <strong>provided they have internet access</strong>, because the ASUS NUC will be installed on the same network — the lane devices and the NUC must see each other (ports 80/1883/4000/4001 internally; Module M14 has the full table).</p>`
      },
      {
        id: 'l4', title: 'Speed bumps: speed control + cable protection', minutes: 8,
        html: `
<p>To ensure accurate license plate reads, it's essential to <strong>control vehicle speed</strong> in your entry and exit lanes. Slowing cars down momentarily at key points ensures better camera performance — a plate crossing the read zone too fast is the cheapest way to ruin an otherwise perfect install.</p>
<div class="callout spec"><span class="co-label">Placement rule</span><p>GMP recommends installing <strong>one speed bump in each lane</strong>, positioned <strong>3–5 feet before the lane island</strong>. The bump reduces vehicle speed as cars approach the camera zone, improving LPR accuracy.</p></div>
<figure class="figure">[[DIAGRAM:bumpPlacement]]<figcaption>Top view: the bump slows the car just before it enters the camera zone at the lane island.</figcaption></figure>
<p>The recommended product is a <strong>6-inch rubber speed bump with built-in cable-protection channels</strong> — the channels protect any surface cables crossing the lane, which is the second half of its job on retrofit sites where you can't trench.</p>
<div class="kv">
  <div class="k"><span class="lab">Length</span><span class="val">84"</span></div>
  <div class="k"><span class="lab">Width</span><span class="val">11.8"</span></div>
  <div class="k"><span class="lab">Height</span><span class="val">2"</span></div>
  <div class="k"><span class="lab">Per lane</span><span class="val">1</span></div>
  <div class="k"><span class="lab">Position</span><span class="val">3–5 ft before island</span></div>
</div>
${src('"6” Rubber Speed Bumps with Cable Protection", p.6')}
<div class="callout field"><span class="co-label">Field note</span><p>Think of the bump as part of the <em>camera system</em>, not site furniture: its position is defined relative to the lane island / camera zone. If the camera moves during commissioning, re-ask whether the bump still slows cars at the right point.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'What are the two things every WISE 4060 installation needs to function?',
        options: [
          'PoE power and a SIM card',
          'Network connectivity (CAT6) and a 12/24VDC power supply',
          '120V AC power and Wi-Fi',
          'An HDMI emulator and a USB drive'
        ],
        answer: 1,
        explain: 'The WISE 4060 requires network connectivity and a DC power supply (12/24VDC). It does not run on PoE — the DC supply is separate, either standalone or drawn from the magnetic gate\'s DC power.',
        source: '"Entry Lane Setup", p.15; "WISE IO Board Power Requirements", p.20'
      },
      {
        type: 'mcq',
        stem: 'Where does the guide say the PoE+ switch is installed, and why there?',
        options: [
          'In the server room, to stay close to the NUC',
          'Inside the ticket-dispenser housing, to reuse the existing network line from the server room',
          'Inside the gate cabinet, next to the WISE board',
          'On the camera pole, to shorten the camera cable'
        ],
        answer: 1,
        explain: 'The switch goes inside the ticket-dispenser housing, using the existing network line from the server room to simplify setup and reduce cabling. From there it feeds the camera (PoE+), the IO controller at the gate, and the ticket machine.',
        source: '"PoE+ Switch", p.6; Site Walk item 7'
      },
      {
        type: 'scenario',
        stem: 'You\'re wiring board power. Which connection is correct?',
        options: [
          'VS+ → 0V, VS− → +12/24V',
          'VS+ → +12/24V, VS− → 0V',
          'VS+ → RL0+, VS− → RL0−',
          'VS+ → DICOM, VS− → 0V'
        ],
        answer: 1,
        explain: 'VS+ goes to the +12/24V port on the power supply and VS− to the 0V port. Reversing supply polarity is the classic bench mistake — check before energizing.',
        source: '"WISE IO Board Power Requirements", p.20'
      },
      {
        type: 'mcq',
        stem: 'The speed bump placement rule is:',
        options: [
          'One per lane, 3–5 ft before the lane island',
          'Two per lane, at entry and under the gate',
          'One per lane, 25–30 ft before the ticket dispenser',
          'One per garage, at the street entrance'
        ],
        answer: 0,
        explain: 'One speed bump per lane, positioned 3–5 feet before the lane island, slowing vehicles as they approach the camera zone. (25–30 ft before the dispenser is the rear-read camera distance — a different rule.)',
        source: '"6” Rubber Speed Bumps", p.6'
      },
      {
        type: 'scenario',
        stem: 'A retrofit site can\'t trench across the lane, and a camera cable must cross the pavement. What does the recommended speed bump contribute?',
        options: [
          'Nothing — cables must never cross a lane',
          'Its built-in channels protect surface cables while it also slows vehicles for the read',
          'It powers the camera inductively',
          'It replaces the presence loop'
        ],
        answer: 1,
        explain: 'The 6" rubber speed bumps offer built-in channels to protect surface cables — dual purpose: speed control for LPR accuracy plus cable protection.',
        source: '"6” Rubber Speed Bumps", p.6'
      }
    ]
  });

  /* ==========================================================
     M03 — Cameras & lighting
     ========================================================== */
  A.modules.push({
    id: 'm03', code: 'M03', phase: 2,
    title: 'Cameras & Lighting for LPR',
    tagline: 'The two camera options, how to choose between them, and the lighting spec that makes plates readable.',
    minutes: 40,
    objectives: [
      'Distinguish the iPro WV-S15700-V2L from the INEX IZA500GR and their processing models',
      'Apply the camera selection logic: lighting, environment, mounting, traffic pattern',
      'Specify the ZSGoes flood light and the lux/lumen targets by environment',
      'State the lighting-position principles that prevent glare and misreads'
    ],
    lessons: [
      {
        id: 'l1', title: 'Two cameras, two philosophies', minutes: 14,
        html: `
<p>The system supports two camera options, and they differ in a way that affects your network design, server load, and budget conversation.</p>
<h4>iPro WV-S15700-V2L (4K)</h4>
<p>The iPro is a <strong>4K network camera</strong> — and the guide is explicit: <strong>this is a network camera, not an LPR camera</strong>. It captures excellent video of moving vehicles and hands the recognition problem to software elsewhere (it <strong>works with the Uncanny Vision LPR solution</strong>). It's ideal where <strong>vehicles are expected to be in motion</strong> while plates are read, is <strong>best suited for outdoor installation</strong>, offers <strong>optical zoom</strong>, and <strong>requires medium to good lighting</strong>. Suitable for indoor and outdoor use, good for both stop-and-go and moving traffic.</p>
<h4>INEX IZA500GR</h4>
<p>The INEX is the all-in-one: <strong>onboard processing</strong> combining <strong>two sensors (color and IR)</strong>, a <strong>multi-core AI processor</strong>, and <strong>LPR software in one integrated unit</strong>. It offers high-speed data processing, maintains <strong>high accuracy in all lighting and weather conditions</strong>, reads at vehicle speeds <strong>up to 80 mph</strong>, includes <strong>onboard OCR</strong>, and <strong>does not require external servers</strong>.</p>
<figure class="figure">[[DIAGRAM:cameraCompare]]<figcaption>The two philosophies at a glance. The full spec comparison follows below.</figcaption></figure>
<div class="tablewrap"><table class="spec">
<tr><th>Attribute</th><th>iPro WV-S15700-V2L</th><th>INEX IZA500GR</th></tr>
<tr><td>Type</td><td>4K network camera (not an LPR camera)</td><td>Integrated ALPR unit</td></tr>
<tr><td>Recognition</td><td>External — Uncanny Vision LPR solution</td><td>Onboard OCR, no external servers</td></tr>
<tr><td>Sensors</td><td>4K, optical zoom</td><td>Dual: color + IR</td></tr>
<tr><td>Lighting need</td><td>Medium to good lighting required</td><td>High accuracy in all lighting/weather</td></tr>
<tr><td>Traffic</td><td>Stop-and-go and moving</td><td>Up to 80 mph</td></tr>
<tr><td>Environment</td><td>Indoor & outdoor (outdoor-oriented)</td><td>All conditions</td></tr>
<tr><td>Price</td><td>~$1,100 (equipment section) / ~$1,500 (selection table)</td><td>~$1,000</td></tr>
<tr><td>SaaS</td><td>$75/month per camera</td><td>~$75/month (cost can vary based on the provider)</td></tr>
</table></div>
<div class="callout ambiguity"><span class="co-label">Source discrepancy</span><p>The source document prices the iPro at <strong>~$1,100</strong> in the equipment section (p.7) but <strong>~$1,500</strong> in the LPR Camera Selection table (p.24). Both figures appear verbatim; confirm current pricing with GMP before quoting a customer. The INEX SaaS note also carries the caveat "<em>cost can vary based on the provider</em>."</p></div>
${src('"Cameras", p.7; "LPR Camera Selection", p.24')}`
      },
      {
        id: 'l2', title: 'Selection logic in the field', minutes: 8,
        html: `
<p>The guide's rule: <strong>camera choice depends on location conditions</strong> — lighting, indoor/outdoor environment, and mounting feasibility. Turn that into a decision you can run on a site walk:</p>
<ol>
  <li><strong>How is the lighting?</strong> If the lane can't reliably give you medium-to-good light (and you can't add it), the INEX's IR + all-conditions accuracy is the safer call. The iPro explicitly requires medium to good lighting.</li>
  <li><strong>Will vehicles be moving through the read zone?</strong> Both handle motion, but the INEX is rated to 80 mph — for transit-style or free-flow reads it has headroom. The iPro is explicitly good for stop-and-go and moving traffic in a garage context.</li>
  <li><strong>What's the mounting situation?</strong> The iPro's optical zoom buys flexibility when the camera must sit farther away (it keeps the same 25–30 ft placement rule — M09). Where mounting options are tight or server dependency is unwanted, the INEX's self-contained processing simplifies the chain.</li>
  <li><strong>What infrastructure do you want to depend on?</strong> iPro → recognition runs in the Uncanny Vision solution (a server dependency). INEX → recognition happens in the camera; it sends plate data directly (this is the device pushing to ports 4000/4001 on the NUC — M14).</li>
</ol>
<div class="callout field"><span class="co-label">Field intuition</span><p>Cheap summary that holds up: <strong>iPro = a great eye that needs a brain and good light; INEX = eye and brain in one box that tolerates bad light.</strong> Then verify against the site's actual lighting and mounting constraints.</p></div>
${src('"LPR Camera Selection", p.24')}`
      },
      {
        id: 'l3', title: 'Lighting hardware & targets', minutes: 10,
        html: `
<p>LPR cameras require <strong>well-lit plates</strong> for accurate reading. Many garages lack sufficient illumination — <strong>even outdoor lanes may need additional lights for night use</strong>. Lighting is not an accessory; on the site walk it's a first-class check (item 9), because <strong>poor lighting leads to misreads and underperformance</strong>.</p>
<h4>The recommended fixture</h4>
<p><strong>ZSGoes LED Flood Light (50W)</strong> — low-voltage LED flood lights mounted near LPR cameras to improve visibility in low-light or nighttime conditions:</p>
<div class="kv">
  <div class="k"><span class="lab">Power</span><span class="val">50 W</span></div>
  <div class="k"><span class="lab">Color temp</span><span class="val">6000K cool white</span></div>
  <div class="k"><span class="lab">Beam angle</span><span class="val">120°</span></div>
  <div class="k"><span class="lab">Output</span><span class="val">up to 4500 lm (50W)</span></div>
  <div class="k"><span class="lab">Rating</span><span class="val">IP65 outdoor</span></div>
  <div class="k"><span class="lab">Mounting</span><span class="val">Surface or spike stand</span></div>
</div>
<h4>The numeric targets</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Metric</th><th>Value</th><th>Context</th></tr>
<tr><td>Lux in the read zone</td><td>500–600 lux</td><td>Site-walk lighting check — assumes camera shutter speed 1/1000s</td></tr>
<tr><td>Fixture output, indoor</td><td>≥ 8,000 lumens</td><td>Recommended luminosity for lighting equipment to be purchased</td></tr>
<tr><td>Fixture output, outdoor</td><td>≥ 32,000 lumens</td><td>Same recommendation, outdoor lanes</td></tr>
<tr><td>Pole-mount height</td><td>8–10 ft</td><td>Lights mounted on poles</td></tr>
</table></div>
${src('"ZSGoes LED Flood Light", p.7; Site Walk item 9, p.19; "Lighting in the lanes for LPR Read", p.26')}
<div class="callout ambiguity"><span class="co-label">Note the spread</span><p>The single ZSGoes 50W unit peaks at 4,500 lm, while purchase recommendations are ≥8,000 lm indoor / ≥32,000 lm outdoor. The guide doesn't state fixture counts — treat the lumen targets as the lane requirement and plan multiple fixtures (or higher-output units) accordingly, then validate with the 500–600 lux check.</p></div>`
      },
      {
        id: 'l4', title: 'Positioning principles: geometry beats wattage', minutes: 8,
        html: `
<p>The guide's lighting-position rules are few and absolute:</p>
<ul>
  <li><strong>Angle the light downward and parallel to the camera</strong> — lights should be installed at an angle parallel to the camera's lens to minimize glare.</li>
  <li><strong>Avoid direct reflection into the lens.</strong> A plate is retroreflective; light bouncing straight back into the camera whites it out.</li>
  <li><strong>Poles at 8–10 ft</strong> for lights, matching the camera-height band (M09), which is what makes "parallel to the lens" achievable.</li>
  <li><strong>Use spotlights or additional lighting if required</strong> — the targets are outcomes, not fixture counts.</li>
  <li><strong>Observe actual read performance in each lane through the camera</strong> and adjust lighting as needed. The camera's own view is the test instrument.</li>
</ul>
<figure class="figure">[[DIAGRAM:lightGeometry]]<figcaption>Geometry beats wattage: the same fixture either lights the plate or blinds the camera, depending purely on where and how it's aimed.</figcaption></figure>
<div class="callout good"><span class="co-label">Validation habit</span><p>After aiming lights, always re-check through the camera at night or in worst-case lighting. The 500–600 lux figure gets you close; the read-rate you observe through the lens is the acceptance test.</p></div>
${src('"Lighting in the lanes for LPR Read", p.26; Site Walk item 9, p.19')}`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'Which statement about the iPro WV-S15700-V2L is true per the guide?',
        options: [
          'It has onboard OCR and needs no external servers',
          'It is a network camera — not an LPR camera — and works with the Uncanny Vision LPR solution',
          'It only works indoors',
          'It reads plates at up to 80 mph'
        ],
        answer: 1,
        explain: 'The iPro is explicitly "a network camera, not an LPR camera" — recognition happens in the Uncanny Vision LPR solution. Onboard OCR and the 80 mph rating belong to the INEX IZA500GR.',
        source: '"Cameras", p.7; "LPR Camera Selection", p.24'
      },
      {
        type: 'scenario',
        stem: 'A dim underground garage with no budget for major lighting upgrades needs LPR at exit. Which camera does the selection logic favor?',
        options: [
          'iPro — 4K resolution compensates for darkness',
          'INEX IZA500GR — dual color+IR sensors maintain high accuracy in all lighting conditions',
          'Either, as long as you add a speed bump',
          'Neither can work indoors'
        ],
        answer: 1,
        explain: 'The iPro requires medium to good lighting; the INEX combines color and IR sensors and maintains high accuracy in all lighting and weather conditions. Poor, hard-to-fix lighting is exactly the case for the INEX.',
        source: '"LPR Camera Selection", p.24'
      },
      {
        type: 'mcq',
        stem: 'The site-walk lighting target in the read zone is:',
        options: [
          '100–200 lux at any shutter speed',
          '500–600 lux, assuming shutter speed 1/1000s',
          '8,000 lux indoors',
          '4,500 lux with a 120° beam'
        ],
        answer: 1,
        explain: 'The suggested lux is 500–600, considering shutter speed of 1/1000s. The 8,000/32,000 figures are lumen output recommendations for purchased fixtures (indoor/outdoor), and 4,500 lm/120° describe the ZSGoes unit.',
        source: 'Site Walk item 9, p.19; "Lighting in the lanes", p.26'
      },
      {
        type: 'mcq',
        stem: 'How should lane lighting be angled relative to the camera?',
        options: [
          'Pointed at the camera to backlight the plate',
          'Perpendicular to the lane, from the side',
          'Downward and parallel to the camera lens, avoiding direct reflection into the lens',
          'Straight down from directly overhead only'
        ],
        answer: 2,
        explain: 'Lights should be angled downward and parallel to the camera\'s lens to minimize glare, and must avoid direct reflection into the lens — plates are retroreflective and glare whites out reads.',
        source: 'Site Walk item 9; "Lighting in the lanes for LPR Read", p.26'
      },
      {
        type: 'scenario',
        stem: 'You install one ZSGoes 50W flood (4,500 lm) in an outdoor lane and call lighting done. What did you miss?',
        options: [
          'Nothing — one 50W flood meets the spec',
          'Outdoor lanes carry a ≥32,000-lumen recommendation; a single 4,500 lm unit falls far short — plan more/larger fixtures, then verify 500–600 lux and actual reads through the camera',
          'Outdoor lanes never need lighting',
          'The ZSGoes is indoor-only'
        ],
        answer: 1,
        explain: 'The purchase recommendation is ≥8,000 lm indoor and ≥32,000 lm outdoor. One 4,500 lm fixture doesn\'t reach the outdoor bar; the guide also says to use additional lighting if required and to validate through the camera.',
        source: '"Lighting in the lanes", p.26; "ZSGoes LED Flood Light", p.7'
      }
    ]
  });
})();
