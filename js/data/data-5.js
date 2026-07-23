/* ============================================================
   Curriculum data — Phases 5–6: M12–M14
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const src = t => `<p class="src">Source: GMP Access Install V3 — ${t}</p>`;

  /* ==========================================================
     M12 — On-site IO installation & lane validation
     ========================================================== */
  A.modules.push({
    id: 'm12', code: 'M12', phase: 5,
    title: 'On-Site IO Installation & Lane Validation',
    tagline: 'Installing the WISE board in the gate, finding it on the network, and proving loops + gate arm in software.',
    minutes: 50,
    objectives: [
      'Install and network the WISE 4060 in the gate cabinet',
      'Locate each board on the garage network by MAC and map it to its lane',
      'Run the software loop-detection tests for presence and safety loops',
      'Execute the gate-arm function test in the correct, safe order and hand off to GMP'
    ],
    lessons: [
      {
        id: 'l1', title: 'Physical install in the gate', minutes: 10,
        html: `
<p>The IO unit is <strong>installed inside the gate</strong>. It is connected to the network via a <strong>CAT6 cable running from the nearest network switch to the gate</strong> — and depending on the conduit layout at the location, that nearest switch may be located <strong>inside the corresponding ticket dispenser or another gate</strong>.</p>
<p>The board is <strong>powered using the power ports available inside the gate</strong> (or the standalone 12/24VDC supply — M08). <strong>Typically, we integrate two loops per lane; however, depending on the lane setup, only one loop may be used.</strong></p>
<ol class="steps">
<li><b>Mount the WISE board in the gate cabinet</b> and complete the wiring from M08: VS+/VS− power, DICOM/DI1 safety, DICOM/DI0 presence, RL0± vend.</li>
<li><b>Run CAT6 from the nearest switch</b> (ticket dispenser or adjacent gate, per the conduit survey) to the board's LAN port.</li>
<li><b>Power on the IO board.</b></li>
</ol>
${src('"Installation — WISE 4060 IO Controller", p.50')}
<div class="callout field"><span class="co-label">Everything converges here</span><p>This is where the site walk (conduit paths), the bench work (board already in DHCP mode, MAC ledger in hand), and the wiring module all pay off. If any of those were skipped, this step is where the day stalls.</p></div>`
      },
      {
        id: 'l2', title: 'Find the board, open its page', minutes: 10,
        html: `
<ol class="steps">
<li><b>Connect your computer to the garage's wired network</b> using a CAT6 cable. <strong>Ensure your network settings are set to DHCP</strong> (you're joining the site network now — not the bench network from M11).</li>
<li><b>Locate the board by MAC:</b><pre><code>arp -n | grep &lt;MAC address of the device&gt;</code></pre><p>This returns the IP address of the device with that MAC. <strong>Use the MAC of the IO board to locate its IP and map it to the corresponding lane.</strong></p></li>
<li><b>Open a browser and enter the IO board's IP address</b> (your computer must be on the garage's wired network).</li>
<li><b>Log in:</b> username <code>root</code> · password <code>00000000</code>.</li>
</ol>
<p>You'll land on the WISE-4060/LAN web interface: a trend-log chart plus indicator bulbs for digital inputs (DI-0 … DI-3) and relay outputs (DO-0 … DO-3) with control buttons.</p>
${src('"Installation" / "Testing the IO Board", pp.50–51')}`
      },
      {
        id: 'l3', title: 'Loop detection in software', minutes: 12,
        html: `
<p>Same physics as the site-walk metal test — now observed at the far end of the chain, on the WISE web UI. <strong>When the loops are inactive, the lit bulbs on the screen correspond to the Presence and Safety loops.</strong> Activation makes the corresponding bulb turn <em>off</em> and the chart signal drop.</p>
<figure class="figure">[[DIAGRAM:testSequence]]<figcaption>The three states you'll see on the WISE web UI. Memorize the inversion: lit = inactive.</figcaption></figure>
<h4>Presence loop test (DI-0)</h4>
<ol class="steps">
<li><b>Place a piece of metal on the presence loop.</b></li>
<li><b>Watch the DI-0 bulb turn off.</b></li>
<li><b>Confirm the signal value on the chart drops.</b></li>
</ol>
<h4>Safety loop test (DI-1)</h4>
<ol class="steps">
<li><b>Place a piece of metal on the safety loop.</b></li>
<li><b>Watch the DI-1 bulb turn off.</b></li>
<li><b>Confirm the chart shows a drop in signal.</b></li>
</ol>
${src('"Loop Detection", pp.51–52')}
<div class="callout warn"><span class="co-label">Reading the bulbs correctly</span><p>Counter-intuitive but critical: <strong>inactive loop = bulb lit; active loop = bulb OFF + signal drop</strong>. If DI-0 responds when you put metal on what you believe is the <em>safety</em> loop, your loop identification (or gate-side wiring) is swapped — fix it now, because the platform's vend/close logic depends on which input is which.</p></div>
<div class="callout field"><span class="co-label">If a bulb never changes</span><p>Nothing on the chain moved? Work backward: metal actually on the loop → gate-board LED responding (M08 test) → DICOM/DI wire seated on the right terminals → board powered and on the right IP. The two-ends-of-the-chain comparison localizes the fault fast.</p></div>`
      },
      {
        id: 'l4', title: 'Gate arm function test & handoff', minutes: 12,
        html: `
<p>The final proof: the WISE relay can drive the physical gate, and the safety logic behaves. <strong>Order matters — follow it exactly.</strong></p>
<ol class="steps">
<li><b>Place a piece of metal on the Presence Loop and confirm DI-0 signal goes down.</b></li>
<li><b>Click the DO-0 button in the interface.</b><p>The DO-0 bulb lights up — <strong>the gate arm should rise</strong>.</p></li>
<li><b>Click the button again to stop the signal.</b><p><strong>This is important to prevent the gate arm from staying up.</strong> The relay is a command pulse, not a state to leave latched.</p></li>
<li><b>Place a piece of metal on the Safety Loop.</b><p>Confirm <strong>DI-1 signal goes down</strong> — and <strong>the gate arm should lower</strong>.</p></li>
</ol>
<div class="callout good"><span class="co-label">Onboarding complete</span><p><strong>Once confirmed, the gate has been successfully onboarded. Share the IO Board details with the GMP Tech Support team</strong> — the board/lane mapping and details from your ledger. GMP binds the board to the lane in the platform; your lane-level validation is done.</p></div>
${src('"Gate Arm Function Test", p.53')}
<div class="callout danger"><span class="co-label">Safety discipline</span><p>You are commanding a physical arm in a live lane. Keep the lane coned off, never leave DO-0 latched, and treat step 3 (click again to stop) as part of the test — not an optional cleanup.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'On the WISE web UI, what indicates an ACTIVE presence loop?',
        options: [
          'The DI-0 bulb lights up',
          'The DI-0 bulb turns OFF and the chart signal drops',
          'The DO-0 bulb lights up',
          'An audible beep'
        ],
        answer: 1,
        explain: 'Inactive loops show lit bulbs; activation turns the corresponding bulb OFF (DI-0 for presence, DI-1 for safety) and the trend chart shows the signal dropping.',
        source: '"Loop Detection", pp.51–52'
      },
      {
        type: 'scenario',
        stem: 'During the gate arm test you click DO-0 and the arm rises. What must you do next, and why?',
        options: [
          'Immediately test the safety loop',
          'Click DO-0 again to stop the signal — otherwise the gate arm stays up',
          'Refresh the browser',
          'Power-cycle the board to reset the relay'
        ],
        answer: 1,
        explain: 'Step 3 of the test: click the button again to stop the signal — this is important to prevent the gate arm from staying up. Only then proceed to the safety-loop lowering check.',
        source: '"Gate Arm Function Test", p.53'
      },
      {
        type: 'mcq',
        stem: 'To find an installed board\'s IP on the garage network you:',
        options: [
          'Browse to 10.0.0.1 — it keeps its factory IP',
          'Set your laptop to DHCP on the garage wired network and run arp -n | grep <MAC>, using the MAC you recorded at bench config',
          'Check the router\'s sticker',
          'Scan Bluetooth'
        ],
        answer: 1,
        explain: 'After the DHCP transition the factory IP is gone. Join the wired network with DHCP, then arp -n | grep <MAC> returns the device\'s current IP — and the MAC ledger maps it to the lane.',
        source: '"Installation", p.50'
      },
      {
        type: 'scenario',
        stem: 'Metal on the safety loop makes the gate-board LED flash, but DI-1 on the WISE UI never changes. Where is the fault, logically?',
        options: [
          'The loop itself is dead',
          'Between the gate board and the WISE input — check the DICOM → C4-6 and DI1 → NC4 connections',
          'The site DHCP server',
          'The camera'
        ],
        answer: 1,
        explain: 'The gate-board LED proves loop + gate-side relay work. The WISE UI not seeing it points to the tap wiring: DICOM/DI1 seating or terminal choice. Comparing both ends of the chain localizes the fault.',
        source: 'M08 wiring + "Loop Detection" logic, pp.22, 51–52'
      },
      {
        type: 'mcq',
        stem: 'What officially closes out a lane\'s gate onboarding?',
        options: [
          'The arm rises once',
          'Loop tests + gate arm test confirmed, then sharing the IO board details with the GMP Tech Support team',
          'Submitting the DHCP setting',
          'Taking a photo of the cabinet'
        ],
        answer: 1,
        explain: 'Once loop detection and the gate arm function test are confirmed, the gate has been successfully onboarded — and you share the IO board details with GMP Tech Support so the platform can bind board to lane.',
        source: '"Gate Arm Function Test", p.53'
      },
      {
        type: 'mcq',
        stem: 'How many loops does a typical lane integrate, per the installation section?',
        options: [
          'Always exactly two',
          'Typically two per lane, though depending on the lane setup only one may be used',
          'One',
          'Four'
        ],
        answer: 1,
        explain: '"Typically, we integrate two loops per lane; however, depending on the lane setup, only one loop may be used." — matching the single-loop scenario you learned to identify on the site walk.',
        source: '"Installation — WISE 4060 IO Controller", p.50'
      }
    ]
  });

  /* ==========================================================
     M13 — POS installation & payment app setup
     ========================================================== */
  A.modules.push({
    id: 'm13', code: 'M13', phase: 5,
    title: 'POS Installation: Adyen, PAX, ExpressLane & Tap & Park',
    tagline: 'Mounting and powering the terminals, entering PAX device settings, and the follow-on setup guides.',
    minutes: 35,
    objectives: [
      'Install the Adyen S1U2 using its referenced guides',
      'Install the PAX IM30: mounting options, power-up, network, settings access',
      'Know the ExpressLane and Tap & Park follow-on paths',
      'Recall the PAX settings password and entry gesture'
    ],
    lessons: [
      {
        id: 'l1', title: 'Adyen S1U2 installation', minutes: 6,
        html: `
<p>For the Adyen S1U2, the source delegates to two companion documents (links embedded in the PDF):</p>
<ul>
  <li>An <strong>installation reference guide for the Adyen S1U2</strong> — physical mounting and connection.</li>
  <li>A <strong>software installation guide</strong> to complete the setup (configuring GMP's POS app on the S1U2).</li>
</ul>
<div class="callout ambiguity"><span class="co-label">Coverage note</span><p>The install guide itself contains no inline Adyen steps — the procedures live in those referenced companion guides. Obtain them from GMP before an Adyen deployment; this module can only teach what the source contains: the device profile (M04) and the pointer to the guides.</p></div>
<p>What you already know from M04 still governs the install: 120V AC adapter, Ethernet or LTE with internet access, deployed at gated garages with ExpressLane, ordered through GMP.</p>
${src('"Adyen S1U2" (Installation), p.53')}`
      },
      {
        id: 'l2', title: 'PAX IM30 installation', minutes: 12,
        html: `
<p><strong>The POS can be installed either inside the existing ticket dispenser or on a dedicated pedestal, depending on site conditions.</strong> The device includes a power adapter and requires a <strong>wired internet connection through a CAT6 line</strong>.</p>
<ol class="steps">
<li><b>Mount the terminal</b> — existing ticket dispenser or dedicated pedestal (RevCon), per the site plan. Cutout dimensions come from the POS datasheet (M04).</li>
<li><b>Switch on the power supply.</b><p>The device should <strong>beep and power up</strong>.</p></li>
<li><b>Connect an Ethernet cable to the LAN port on the back plate of the IM30.</b></li>
<li><b>Observe the default screen</b> — the device boots to the POS default screen.</li>
</ol>
<h4>Entering device settings</h4>
<ol class="steps">
<li><b>Swipe up from the bottom of the screen.</b></li>
<li><b>Touch the back key ◁ twice.</b></li>
<li><b>When prompted for a password, enter <code>pax9876@@</code>.</b></li>
</ol>
${src('"PAX IM30 POS" / "Tap & Park", pp.53–54')}
<div class="callout field"><span class="co-label">Handle with care</span><p>That settings password is printed in the source install guide and reproduced here for field use — treat it like any site credential: needed for configuration, not for sharing beyond the install team.</p></div>`
      },
      {
        id: 'l3', title: 'ExpressLane & Tap & Park follow-ons', minutes: 10,
        html: `
<h4>ExpressLane</h4>
<p><strong>After the POS installation, follow the steps mentioned in this guide</strong> — the source points to a dedicated ExpressLane setup guide (link embedded in the PDF). ExpressLane configuration is completed from that companion document.</p>
<h4>Tap & Park</h4>
<p>The Tap & Park path begins after the POS is installed. The source's steps are the power-up, Ethernet, and settings-access sequence you learned in the previous lesson (beep on power, LAN to the back plate, swipe up → ◁ ◁ → <code>pax9876@@</code>).</p>
<div class="callout ambiguity"><span class="co-label">Incomplete sentence in source</span><p>The Tap & Park section opens with "<em>Once the POS has been installed, follow the</em> …" — the sentence is cut off in the source document, presumably pointing to another companion guide. The steps that follow it (power, Ethernet, settings entry) are fully reproduced in this module. For the complete Tap & Park configuration beyond device settings, request the referenced guide from GMP.</p></div>
<div class="callout warn"><span class="co-label">Don't forget the network layer</span><p>Both ExpressLane and Tap & Park assume the site network is ready: whitelist URLs open, ports reachable, continuous internet (with Granite backup where specified). That's Module M14 — the last gate before a site goes live.</p></div>
${src('"ExpressLane" / "Tap & Park", p.54')}`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'The PAX IM30 settings menu is reached by:',
        options: [
          'Holding the power button 5 seconds',
          'Swipe up from the bottom, touch the back key ◁ twice, enter password pax9876@@',
          'Double-tapping the screen and entering 0000',
          'Plugging in a USB keyboard'
        ],
        answer: 1,
        explain: 'Swipe up from the bottom of the screen, touch ◁ twice, and enter pax9876@@ at the password prompt.',
        source: '"Tap & Park" settings steps, p.54'
      },
      {
        type: 'mcq',
        stem: 'Where can the PAX IM30 be physically installed?',
        options: [
          'Only on the RevCon pedestal',
          'Inside the existing ticket dispenser or on a dedicated pedestal, depending on site conditions',
          'On the gate arm',
          'Inside the server room'
        ],
        answer: 1,
        explain: 'The POS installs either inside the existing ticket dispenser or on a dedicated pedestal, depending on site conditions — with a power adapter included and wired internet via CAT6.',
        source: '"PAX IM30 POS", p.53'
      },
      {
        type: 'scenario',
        stem: 'You power the IM30 and hear nothing; the screen stays dark. Per the install notes, what was the expected behavior?',
        options: [
          'Silent boot is normal',
          'The device should beep and power up when the supply is switched on — no beep means power isn\'t reaching it',
          'It only boots after Ethernet is connected',
          'It needs a SIM first'
        ],
        answer: 1,
        explain: 'Step 1 of the power-up: switch on the power supply and the device should beep and power up. No beep points at the supply, adapter, or outlet — before anything software.',
        source: '"Tap & Park" step 1, p.54'
      },
      {
        type: 'mcq',
        stem: 'How does the source guide handle Adyen S1U2 installation steps?',
        options: [
          'A full 12-step inline procedure',
          'It references companion documents: an installation reference guide and a software installation guide',
          'It says Adyen installs itself',
          'It\'s identical to the PAX procedure'
        ],
        answer: 1,
        explain: 'The source delegates Adyen installation to two referenced guides (installation reference + software installation). Obtain them from GMP for Adyen deployments — the install guide itself contains no inline Adyen steps.',
        source: '"Adyen S1U2" (Installation), p.53'
      },
      {
        type: 'mcq',
        stem: 'What network connection does the installed IM30 use?',
        options: [
          'Wi-Fi',
          'A wired internet connection through a CAT6 line, to the LAN port on the back plate',
          'LTE only',
          'RS-232 serial to the NUC'
        ],
        answer: 1,
        explain: 'The IM30 requires wired internet via CAT6, connected to the LAN port on its back plate. (This is also why exit-lane wiring minimums include the extra CAT6 terminations.)',
        source: '"PAX IM30 POS" p.53; "Tap & Park" step 2, p.54'
      }
    ]
  });

  /* ==========================================================
     M14 — Network readiness: whitelist & endpoints
     ========================================================== */
  A.modules.push({
    id: 'm14', code: 'M14', phase: 6,
    title: 'Firewall Whitelist, Endpoints & Ports',
    tagline: 'Every URL and port the site firewall must allow — for installation, and for daily operation forever after.',
    minutes: 40,
    objectives: [
      'Deliver the complete installation/maintenance URL whitelist to site IT',
      'Deliver the daily-operation endpoints with exact ports',
      'Explain the internal (LAN) port requirements between devices and the NUC',
      'Explain why HTTP and HTTPS variants must both be whitelisted'
    ],
    lessons: [
      {
        id: 'l1', title: 'Why this module decides go-live', minutes: 5,
        html: `
<p>The source dedicates a full section to <strong>the URLs and IPs that must be whitelisted in the site firewall to enable GMP Access installation and operation</strong>. It divides them into two lists with different lifetimes:</p>
<ul>
  <li><strong>Installation/Maintenance</strong> — needed while installing the stack and for future updates.</li>
  <li><strong>Daily Running Operation</strong> — needed forever; these are the system's lifelines.</li>
</ul>
<p>You started this conversation at the site walk (M07, item 8: operator IT must allow GMP's AWS backend). This module is the exact payload to hand that IT team. Send it early — firewall change tickets are often the longest lead-time item in the entire deployment.</p>
${src('"List of Whitelist URLs", p.54')}`
      },
      {
        id: 'l2', title: 'Installation & maintenance whitelist', minutes: 12,
        html: `
<p><strong>GMP Access runs on Docker containers</strong>, its images live in a <strong>private Docker Hub repository</strong>, and the stack needs various <strong>APT packages</strong>. Three groups follow from that:</p>
<h4>Docker installation</h4>
<div class="tablewrap"><table class="spec wraprow">
<tr><th>URL</th><th>Purpose</th></tr>
<tr><td><code>download.docker.com</code></td><td rowspan="3">Installation of Docker — GMP Access runs on Docker containers; these URLs are required to install Docker</td></tr>
<tr><td><code>github.com/docker/compose/</code></td></tr>
<tr><td><code>packages.cloud.google.com</code><br><code>apt.kubernetes.io/</code></td></tr>
</table></div>
<h4>Docker image access</h4>
<div class="tablewrap"><table class="spec wraprow">
<tr><th>URL</th><th>Purpose</th></tr>
<tr><td><code>registry-1.docker.io/v2/</code><br><code>hub.docker.com</code></td><td>GMP Access images are hosted in a private Docker Hub repository — needed during initial setup and for future updates</td></tr>
</table></div>
<h4>Software installation via APT</h4>
<div class="tablewrap"><table class="spec wraprow">
<tr><th>URLs</th><th>Purpose</th></tr>
<tr><td><code>connectivity-check.ubuntu.com</code> · <code>in.archive.ubuntu.com</code> · <code>ubuntu-archive.mirrors.estointernet.in</code> · <code>security.ubuntu.com</code> · <code>cloudfront.net</code> · <code>api.snapcraft.io</code> · <code>daisy.ubuntu.com</code> · <code>github-releases.githubusercontent.com</code> · <code>reviews.ubuntu.com</code></td><td>GMP Access requires various packages installed using APT</td></tr>
</table></div>
<div class="callout warn"><span class="co-label">HTTP and HTTPS — both</span><p>The source repeats the APT list under an "HTTP Versions" heading: <strong>these are the HTTP counterparts of the HTTPS URLs above. Some installation scripts use HTTP internally, so both versions should be whitelisted.</strong> An HTTPS-only firewall rule will still break installs.</p></div>
${src('"Installation/Maintenance Purpose", pp.54–56')}`
      },
      {
        id: 'l3', title: 'Daily-operation endpoints & internal ports', minutes: 15,
        html: `
<p>Two external endpoints and four internal ports keep a live site alive:</p>
<figure class="figure">[[DIAGRAM:portMap]]<figcaption>The complete traffic map of a running site: green flows never leave the LAN (but must survive VLAN segmentation); blue flows must cross the firewall forever.</figcaption></figure>
<h4>External — must reach the internet, permanently</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Endpoint</th><th>Port</th><th>Role</th><th>Description</th></tr>
<tr><td><code>api.parkingglobalserver.com</code></td><td>443</td><td>GMP Server</td><td>Primary communication endpoint for Get My Parking services</td></tr>
<tr><td><code>mqtt.parkingglobalserver.com</code></td><td>8883</td><td>MQTT Broker</td><td>Used by GMP Access for ReverseQR requests and gatekit monitoring</td></tr>
</table></div>
<h4>Internal — within the site LAN</h4>
<div class="tablewrap"><table class="spec">
<tr><th>Port</th><th>Role</th><th>Description</th></tr>
<tr><td>80</td><td>Local access</td><td>Should be open for access from NUC/VM</td></tr>
<tr><td>1883</td><td>Local MQTT broker</td><td>Required for the IO Controller to connect to the MQTT broker running on the NUC/VM</td></tr>
<tr><td>4000</td><td>LPR integration</td><td rowspan="2">If an LPR camera or reader is present, it must be able to send license plate data to the NUC/VM</td></tr>
<tr><td>4001</td><td>LPR integration</td></tr>
</table></div>
${src('"Daily Running Operation Purpose", pp.56–57')}
<div class="callout field"><span class="co-label">Map ports to symptoms</span>
<ul>
<li><strong>8883 blocked</strong> → ReverseQR requests fail, gatekit monitoring goes dark.</li>
<li><strong>443 blocked</strong> → the NUC can't reach GMP services at all.</li>
<li><strong>1883 blocked on the LAN</strong> → WISE boards can't talk to the NUC's broker: loops read locally but the platform never hears them.</li>
<li><strong>4000/4001 blocked</strong> → camera reads plates, platform never receives them — gates won't auto-vend.</li>
</ul>
<p>Internal VLAN segmentation between lane devices and the NUC is where 1883/4000/4001 problems hide on "secure" sites.</p></div>`
      },
      {
        id: 'l4', title: 'The handoff package', minutes: 8,
        html: `
<p>The training arc ends where operations begin. A complete handoff after a GMP Access install includes:</p>
<ol>
  <li><strong>To site IT:</strong> both whitelist lists (installation + daily ops, HTTP and HTTPS variants), the two external endpoints with ports 443/8883, and the internal port requirements (80, 1883, 4000, 4001) across any VLANs.</li>
  <li><strong>To GMP:</strong> NUC credentials (tenant-named, from M10) and TeamViewer ID + personal password; the IO board details per lane (MAC ledger, from M11/M12) — shared with GMP Tech Support at gate onboarding.</li>
  <li><strong>Validated on the way out:</strong> loop tests and gate-arm tests green in every lane (M12); POS powered, networked, and configured per its guide (M13); reads verified through the camera at night (M09); NUC reachable remotely with the HDMI emulator installed (M05/M10).</li>
</ol>
<div class="callout good"><span class="co-label">Supportability = the install outliving you</span><p>Every credential shared, MAC mapped, and port opened is what lets GMP support the site without another truck roll. The best installers are the ones support never has to call back about the basics.</p></div>
<p>That completes the curriculum. Take the final readiness exam, and keep Field Mode bookmarked for the next site.</p>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'The two permanent external endpoints and ports for a running site are:',
        options: [
          'api.parkingglobalserver.com:80 and mqtt.parkingglobalserver.com:1883',
          'api.parkingglobalserver.com:443 and mqtt.parkingglobalserver.com:8883',
          'hub.docker.com:443 and security.ubuntu.com:80',
          'teamviewer.com:5938 and api.snapcraft.io:443'
        ],
        answer: 1,
        explain: 'Daily operation: api.parkingglobalserver.com on 443 (primary GMP endpoint) and mqtt.parkingglobalserver.com on 8883 (MQTT broker for ReverseQR and gatekit monitoring). Ports 80/1883 are the internal LAN requirements; Docker/Ubuntu URLs are installation-time.',
        source: '"Daily Running Operation Purpose", pp.56–57'
      },
      {
        type: 'scenario',
        stem: 'Post-install, loops test fine on the WISE web UI but the platform never sees vehicles. Cameras also read plates that never arrive. Which internal ports do you suspect?',
        options: [
          '443 and 8883',
          '1883 (IO controller → NUC MQTT broker) and 4000/4001 (LPR data → NUC)',
          '21 and 22',
          '80 only'
        ],
        answer: 1,
        explain: 'Local device-to-NUC traffic: the IO controller needs 1883 to reach the MQTT broker on the NUC, and LPR devices send plate data to the NUC on 4000/4001. Blocked LAN ports produce exactly this "works locally, invisible to platform" signature.',
        source: '"Daily Running Operation Purpose", p.57'
      },
      {
        type: 'mcq',
        stem: 'Why must HTTP versions of the Ubuntu/APT URLs be whitelisted alongside HTTPS?',
        options: [
          'HTTP is faster',
          'Some installation scripts use HTTP internally, so both versions should be whitelisted',
          'The NUC doesn\'t support TLS',
          'Only HTTP is actually used'
        ],
        answer: 1,
        explain: 'The source explicitly lists the HTTP counterparts of the HTTPS URLs: some installation scripts use HTTP internally, so both must be allowed. An HTTPS-only rule still breaks installation.',
        source: '"HTTP Versions", p.56'
      },
      {
        type: 'mcq',
        stem: 'Why are download.docker.com, registry-1.docker.io/v2/ and hub.docker.com on the installation whitelist?',
        options: [
          'For camera firmware updates',
          'GMP Access runs on Docker containers, and its images are hosted in a private Docker Hub repository — needed for initial setup and future updates',
          'For TeamViewer',
          'For the PAX terminal'
        ],
        answer: 1,
        explain: 'GMP Access runs in Docker containers; the Docker URLs cover installing Docker itself and pulling GMP\'s images from the private Docker Hub repository — at setup and for updates.',
        source: '"Installation/Maintenance Purpose", pp.54–55'
      },
      {
        type: 'scenario',
        stem: 'A site reports gatekit monitoring is dark and ReverseQR requests fail, but web dashboards load fine. Which single rule most likely regressed?',
        options: [
          'Port 443 outbound',
          'Port 8883 outbound to mqtt.parkingglobalserver.com',
          'Port 80 internal',
          'The APT mirror list'
        ],
        answer: 1,
        explain: 'ReverseQR and gatekit monitoring ride the MQTT broker at mqtt.parkingglobalserver.com:8883. Dashboards working means 443 is fine — the MQTT rule is the likely casualty.',
        source: '"Daily Running Operation Purpose", p.57'
      }
    ]
  });
})();
