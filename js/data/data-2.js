/* ============================================================
   Curriculum data — Phase 2 part 2: M04–M06
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const src = t => `<p class="src">Source: GMP Access Install V3 — ${t}</p>`;

  /* ==========================================================
     M04 — Payment & guest-facing hardware
     ========================================================== */
  A.modules.push({
    id: 'm04', code: 'M04', phase: 2,
    title: 'POS Devices, Mounts, Pedestals & Kiosks',
    tagline: 'Adyen S1U2, PAX IM30, the ordering rules that prevent expensive mistakes, and every housing option.',
    minutes: 50,
    objectives: [
      'Describe both unattended payment terminals and their power/network needs',
      'State the ordering constraints: who to contact and what to specify to resellers',
      'Choose between housing options: existing dispenser, housing box, gooseneck, pedestal, kiosk',
      'Recall the LamasaTech Zentron 21 and RevCon pedestal specs and capabilities'
    ],
    lessons: [
      {
        id: 'l1', title: 'Adyen S1U2 — the Adyen-stack terminal', minutes: 8,
        html: `
<p>The <strong>Adyen S1U2</strong> is a compact, all-in-one <strong>unattended payment terminal</strong> from Adyen, supporting <strong>EMV, MSR, contactless (NFC), QR code, and mobile wallet payments</strong>. GMP deploys these POS devices at <strong>gated garages with ExpressLane</strong>.</p>
<div class="kv">
  <div class="k"><span class="lab">Power</span><span class="val">120V AC adapter (included)</span></div>
  <div class="k"><span class="lab">Network</span><span class="val">Ethernet or LTE</span></div>
  <div class="k"><span class="lab">Requires</span><span class="val">Internet access</span></div>
  <div class="k"><span class="lab">Ordering</span><span class="val">Via the Get My Parking team</span></div>
</div>
<div class="callout warn"><span class="co-label">Ordering rule</span><p><strong>Contact the Get My Parking team to order Adyen for your location.</strong> The buy-links table repeats it: "Contact us before placing your order." Adyen units are tied to the payment configuration — don't buy them cold off a reseller.</p></div>
<p>The source references three supporting documents for this device (links embedded in the PDF): the buy link with datasheet, an <strong>installation reference guide</strong>, and a <strong>guide to configure our POS app on the S1U2</strong>. Installation itself is covered in Module M13.</p>
${src('"Adyen S1U2", p.8; "Links to Buy Equipment", p.14')}`
      },
      {
        id: 'l2', title: 'PAX IM30 — the Datacap-stack terminal', minutes: 10,
        html: `
<p>The <strong>PAX IM30</strong> is an all-in-one unattended payment terminal designed to handle all payment methods: <strong>EMV®, MSR, NFC contactless, QR code, and NFC-enabled mobile wallets</strong>. Also deployed at gated garages with ExpressLane.</p>
<p>Its integration story differs from Adyen's, and this drives the purchasing rules:</p>
<ul>
  <li>It works with <strong>Datacap's DC Direct integration</strong> and <strong>can be purchased through any reseller</strong>.</li>
  <li><strong>Confirm the payment processor with the GMP team before making a purchase.</strong></li>
  <li>For <strong>ExpressLane locations in the US</strong>, the machines <strong>need to support Datacap Android Forms settings — specify this to the reseller at the time of ordering.</strong></li>
</ul>
<div class="kv">
  <div class="k"><span class="lab">Power</span><span class="val">120V AC adapter (included)</span></div>
  <div class="k"><span class="lab">Network</span><span class="val">Ethernet (CAT6), internet access</span></div>
  <div class="k"><span class="lab">Integration</span><span class="val">Datacap DC Direct</span></div>
  <div class="k"><span class="lab">US ExpressLane</span><span class="val">Datacap Android Forms</span></div>
</div>
<div class="callout danger"><span class="co-label">Expensive-mistake prevention</span><p>The two things that brick a PAX order: (1) buying before the payment processor is confirmed with GMP; (2) failing to specify <strong>Datacap Android Forms support</strong> for US ExpressLane sites when ordering. Both are stated requirements — put them in your procurement checklist verbatim.</p></div>
<p>Supporting documents referenced: the <strong>IM30 datasheet</strong> (<code>IM30_EN_20200420.pdf</code>) and an <strong>installation guide for the IM30 POS</strong>.</p>
${src('"PAX IM30", pp.8–9')}`
      },
      {
        id: 'l3', title: 'Housing the terminal: mounts and boxes', minutes: 8,
        html: `
<p>A bare terminal needs a home in the lane. The guide gives three paths for housing the devices:</p>
<ol>
  <li><strong>Purchased online</strong> — a <strong>gooseneck stand (42")</strong> and a <strong>housing box</strong> are both available online (links in the source PDF). The off-the-shelf housing box <strong>needs to be modified to fit the POS body</strong> — the dimensions of the cutout are available in the POS datasheet.</li>
  <li><strong>Supplied through GMP</strong> — the GMP-supplied housing box comes with a <strong>pre-cut opening for the POS</strong>, already prepared and ready for installation at the site.</li>
  <li><strong>Installed inside existing ticket dispensers</strong> — reuse the enclosure already standing at the stopping point.</li>
</ol>
<div class="callout field"><span class="co-label">Field note</span><p>If you're not equipped to make clean cutouts in a steel box on-site, ask for the GMP-supplied pre-cut housing — the cutout dimensions live in the POS datasheet either way, and a bad cutout is both ugly and a water-ingress risk.</p></div>
${src('"Alternate POS Installation Mounts", p.9')}`
      },
      {
        id: 'l4', title: 'LamasaTech Zentron 21 display kiosk', minutes: 10,
        html: `
<p>The <strong>LamasaTech Zentron 21</strong> is a <strong>parking display kiosk for self-service applications</strong> — the full-screen interaction point used in ExpressLane lanes.</p>
<ul>
  <li><strong>Outdoor visibility and durability:</strong> 21-inch display, <strong>1000 cd/m² brightness</strong>, anti-glare toughened glass.</li>
  <li><strong>Weatherproof and dust-resistant:</strong> <strong>IP66-rated display</strong> & <strong>IP55-rated enclosure</strong>.</li>
  <li><strong>Heating & fan cooling</strong> for reliable 24/7 operation in all climates.</li>
  <li><strong>Integrated sensors:</strong> automatic LED brightness adjustment and a programmable status strip (customizable colors/sequences).</li>
  <li><strong>Multifunctional inputs:</strong> QR/barcode scanner, RFID reader, camera, microphone, and waterproof speaker for customer interactions.</li>
  <li><strong>Built for high-traffic areas</strong> — vandal-resistant, designed for public use.</li>
</ul>
<div class="tablewrap"><table class="spec">
<tr><th>Dimensions</th><th>Weight</th><th>Color</th><th>Finish</th><th>Material</th></tr>
<tr><td>55.8" H × 7.1" D × 22.5" (see note)</td><td>175 lbs</td><td>Matte Gray</td><td>Matte Gray</td><td>.100 Aluminium</td></tr>
</table></div>
<div class="callout ambiguity"><span class="co-label">Source ambiguity</span><p>The source's dimensions table prints the third figure as <em>22.5" H</em> — a second height value. It is almost certainly the width, but the document does not say so; confirm against the manufacturer datasheet before cutting mounting plans.</p></div>
<p>The device weighs 175 lbs — plan lifting help and anchoring hardware. An <strong>installation guide for the display app</strong> is referenced in the source. Ordering: <strong>contact the GMP team for support while placing the order</strong>.</p>
${src('"LamasaTech Zentron 21", pp.9–10; "Links to Buy Equipment", p.14')}`
      },
      {
        id: 'l5', title: 'RevCon POS pedestal', minutes: 10,
        html: `
<p>The <strong>RevCon POS Pedestal</strong> is a <strong>custom-designed enclosure for the PAX IM30</strong> credit card reader, with a <strong>UV-resistant, vandal-proof polycarbonate faceplate</strong>. Where the Zentron is a full display kiosk, the RevCon is a hardened home for the payment terminal itself.</p>
<ul>
  <li><strong>Customizable graphics:</strong> pedestal wraps with white-labeled designs are available.</li>
  <li><strong>Modular hardware support:</strong> integrated speaker, microphone, support button, and an optional <strong>Zebra MS4717-LU-1C0R barcode scanner</strong> (punch-out mount).</li>
  <li><strong>Weather & tamper-proof:</strong> protects against water, dust, insects, and physical damage.</li>
  <li><strong>Corrosion-resistant aluminum construction:</strong> mount scanners, proximity readers, or signage without rust risk.</li>
  <li><strong>Flexible deployment:</strong> works in entry and exit lanes; requires <strong>AC power & internet</strong>.</li>
  <li><strong>Expandable functionality:</strong> can house <strong>IO boards, networking switches</strong>, and integrate <strong>existing call-center buttons</strong>.</li>
</ul>
<div class="tablewrap"><table class="spec">
<tr><th>Dimensions</th><th>Weight</th><th>Color</th><th>Finish</th><th>Material</th></tr>
<tr><td>50" H × 9.375" W × 5.75" D</td><td>35 lbs</td><td>Glossy White</td><td>Glossy Smooth</td><td>.100 Aluminium</td></tr>
</table></div>
<div class="callout field"><span class="co-label">Design opportunity</span><p>Because the RevCon can house IO boards and network switches, it can double as the lane's equipment cabinet where the gate housing is cramped — one pedestal carrying POS + scanner + IO + switch. Note it during the site walk when gate cabinets look crowded.</p></div>
<p>Ordering: <strong>contact the GMP team for support while placing the order.</strong></p>
${src('"The RevCon POS Pedestal", p.10; "Links to Buy Equipment", p.14')}`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'A partner wants to order PAX IM30 units for a US ExpressLane site from a third-party reseller. What must they do?',
        options: [
          'Nothing special — any IM30 works',
          'Confirm the payment processor with GMP first, and specify Datacap Android Forms support to the reseller at ordering time',
          'Order through Adyen instead',
          'Buy the LTE variant only'
        ],
        answer: 1,
        explain: 'The IM30 can be bought through any reseller, but the processor must be confirmed with the GMP team before purchase, and US ExpressLane machines must support Datacap Android Forms settings — specified to the reseller at the time of ordering.',
        source: '"PAX IM30", p.8'
      },
      {
        type: 'mcq',
        stem: 'How is the Adyen S1U2 ordered?',
        options: [
          'Any electronics reseller',
          'Direct from Adyen\'s website with no coordination',
          'Contact the Get My Parking team to order it for your location',
          'It comes bundled with the NUC'
        ],
        answer: 2,
        explain: 'The guide directs installers to contact the Get My Parking team to order Adyen for a location, and the buy-links table repeats "Contact us before placing your order."',
        source: '"Adyen S1U2", p.8; "Links to Buy Equipment", p.14'
      },
      {
        type: 'mcq',
        stem: 'Which housing option requires modification before the POS fits?',
        options: [
          'The GMP-supplied housing box',
          'The off-the-shelf online housing box — cut per the dimensions in the POS datasheet',
          'The existing ticket dispenser',
          'The RevCon pedestal'
        ],
        answer: 1,
        explain: 'The online housing box must be modified to fit the POS body; cutout dimensions are in the POS datasheet. The GMP-supplied version comes with a pre-cut opening, ready for installation.',
        source: '"Alternate POS Installation Mounts", p.9'
      },
      {
        type: 'mcq',
        stem: 'Match the ingress ratings of the LamasaTech Zentron 21:',
        options: [
          'IP55 display, IP66 enclosure',
          'IP66 display, IP55 enclosure',
          'IP65 display and enclosure',
          'No IP rating — indoor only'
        ],
        answer: 1,
        explain: 'The Zentron 21 has an IP66-rated display and an IP55-rated enclosure, plus heating and fan cooling for 24/7 operation in all climates.',
        source: '"LamasaTech Zentron 21", p.9'
      },
      {
        type: 'scenario',
        stem: 'A lane\'s gate cabinet is too cramped for the WISE board and a network switch. Which guide-supported option solves this while adding payment hardware?',
        options: [
          'Mount the electronics on the camera pole',
          'The RevCon pedestal — it can house IO boards and networking switches alongside the PAX IM30',
          'Skip the switch and use Wi-Fi',
          'Install the WISE board in the server room instead'
        ],
        answer: 1,
        explain: 'The RevCon\'s expandable functionality explicitly includes housing IO boards and networking switches, and it can integrate existing call-center buttons — making it a legitimate overflow cabinet for lane electronics.',
        source: '"The RevCon POS Pedestal", p.10'
      }
    ]
  });

  /* ==========================================================
     M05 — Location compute & special equipment
     ========================================================== */
  A.modules.push({
    id: 'm05', code: 'M05', phase: 2,
    title: 'Location Compute, Backup Internet & Scanner Devices',
    tagline: 'The NUC and its headless-mode dependency, 4G/5G backup, and the scanner+compute pair for nested lanes.',
    minutes: 40,
    objectives: [
      'Spec the ASUS NUC and explain the OS replacement that happens during setup',
      'Explain why the HDMI display emulator plug is mandatory for every NUC',
      'Describe the Granite Multicell backup SIM and when it matters',
      'Identify the Zebra scanner + Elo Backpack 4 pairing for restricted/nested lanes'
    ],
    lessons: [
      {
        id: 'l1', title: 'The ASUS NUC — one brain per garage', minutes: 10,
        html: `
<p>The <strong>ASUS NUC</strong> is a compact and powerful mini PC, ideal for running parking server applications. <strong>One unit is required per garage.</strong></p>
<div class="kv">
  <div class="k"><span class="lab">Recommended model</span><span class="val">NUC 13 Pro NUC13ANHi5</span></div>
  <div class="k"><span class="lab">RAM</span><span class="val">16 GB</span></div>
  <div class="k"><span class="lab">Storage</span><span class="val">512 GB SSD</span></div>
  <div class="k"><span class="lab">Quantity</span><span class="val">1 per garage</span></div>
</div>
<p>During setup, <strong>any pre-installed Windows OS is replaced with GMP's custom Linux operating system</strong> (Ubuntu-based — the full bench procedure is Module M10). The NUC then runs the GMP Access stack in Docker containers, connects to the same network as the lane devices, and communicates with GMP's AWS backend.</p>
<div class="callout field"><span class="co-label">Placement</span><p>The NUC lives in the parking office / server room and must be on a network that reaches both the lane devices (local ports — M14) and the internet (GMP AWS backend). This is why the site walk checks the firewall and existing network lines early.</p></div>
${src('"NUC", p.11')}`
      },
      {
        id: 'l2', title: 'The HDMI display emulator — small plug, mandatory', minutes: 6,
        html: `
<p><strong>ASUS NUCs require a display emulator plug to run in headless (displayless) mode.</strong> Without this plug, remote access tools like TeamViewer may show a <strong>blank screen</strong>, because the system doesn't detect a connected monitor. The emulator plug mimics a physical display, ensuring smooth remote access and full functionality.</p>
<figure class="figure">[[DIAGRAM:headless]]<figcaption>The failure only shows up after you leave: on the bench (monitor attached) everything works; deployed headless without the plug, remote support sees nothing.</figcaption></figure>
<div class="callout danger"><span class="co-label">Non-negotiable</span><p><strong>You need one plug for each NUC you deploy.</strong> A NUC without the emulator works fine while your monitor is attached on the bench — then becomes remotely unusable once installed and headless in the office. This is the classic "worked when I left the site" failure. Put the plug in the HDMI port before you leave.</p></div>
${src('"NUC", p.11')}`
      },
      {
        id: 'l3', title: 'Granite Multicell Carrier — 4G/5G internet backup', minutes: 8,
        html: `
<p><strong>ExpressLane requires continuous internet connectivity to work.</strong> That single sentence is the reason backup internet exists in this hardware list: a site taking unattended payments cannot tolerate an ISP outage.</p>
<p>With <strong>Granite's Multi-Carrier SIM</strong>, you can access <strong>all Tier 1 and Tier 2 carriers' data networks in the USA from a single SIM card</strong> — on a smartphone, tablet, or data device. The technology <strong>intelligently roams to find the strongest signal regardless of carrier</strong>, supports <strong>over 600 domestic and international carriers across more than 150 countries</strong>, and can be used as either a <strong>physical SIM or an embedded SIM (eSIM)</strong>.</p>
<div class="callout field"><span class="co-label">When to include it</span><p>Treat it as standard kit for ExpressLane deployments: payments, ReverseQR, and gatekit monitoring all die with the internet link. The guide lists it in the procurement table as "Granite Multicell Carrier 4G/5G Backup."</p></div>
${src('"Granite Multicell Carrier – 4G/5G Internet Backup", p.11')}`
      },
      {
        id: 'l4', title: 'Scanner devices for restricted & nested lanes', minutes: 12,
        html: `
<p>Some locations have <strong>nested zones</strong> — areas inside the garage with their own restricted entry points (reserved floors, monthly-parker areas, transit lanes). Access there is validated by <strong>scanning</strong> (QR codes for validation, permits, reservations) rather than payment. The guide specifies a two-device kit for these points, with an explicit pairing rule:</p>
<div class="callout warn"><span class="co-label">Pairing rule</span><p><strong>Both devices are required to enable scanning at the location. Together, they are housed on a RevCon gooseneck pedestal</strong>, making the kit suitable for mounting at each nested entry point. This requirement applies to <strong>transit and entry lanes that have restricted access</strong>.</p></div>
<h4>Zebra Fixed Mount Scanner — the eye</h4>
<p>Designed for reliable scanning in parking-garage environments where lighting and operating conditions vary. It supports <strong>fast, accurate scanning of QR codes using OCR, along with 1D and 2D barcodes</strong> — well-suited for <strong>ExpressLane validation/permit/reservation access workflows</strong>. Its <strong>wide field of view and omnidirectional scanning</strong> let drivers present codes without precise alignment, keeping traffic moving. Built for fixed-mount installations.</p>
<div class="kv"><div class="k"><span class="lab">Recommended model</span><span class="val">Zebra MS4717</span></div></div>
<h4>Elo Backpack 4 — the brain</h4>
<p>The <strong>Elo Backpack 4 (by Zebra)</strong> is a compact <strong>Android-based compute unit</strong> designed to power interactive displays and peripheral devices in lane environments. Its small form factor lets it mount <strong>discreetly behind screens or within lane hardware enclosures</strong> without rack space. It runs parking software, drives display content, and interfaces with barcode scanners and other lane devices.</p>
<p>In ExpressLane deployments, it is typically used <strong>at lanes where Zentron 21 (LamasaTech) displays are not present</strong> — enabling screen functionality and scanner integration for entry and exit access control in <strong>nested zones</strong>.</p>
<div class="kv"><div class="k"><span class="lab">Recommended model</span><span class="val">Elo Backpack 4 (Android Compute Engine)</span></div></div>
${src('"Scanner Devices", pp.12–13')}
<div class="callout field"><span class="co-label">Decision shortcut</span><p>Nested/restricted entry point → RevCon gooseneck pedestal + Zebra MS4717 + Elo Backpack 4, as a set. Lane already has a Zentron 21 → the kiosk's own scanner/compute covers it, no Backpack needed.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'How many NUCs and how many HDMI display emulator plugs does a 6-lane garage need?',
        options: [
          '6 NUCs, 6 plugs',
          '1 NUC, 1 plug',
          '1 NUC, no plug if TeamViewer is installed',
          '2 NUCs for redundancy, 2 plugs'
        ],
        answer: 1,
        explain: 'One NUC is required per garage (not per lane), and one emulator plug per NUC. The plug is what keeps TeamViewer from showing a blank screen in headless mode — TeamViewer does not remove the need for it.',
        source: '"NUC", p.11'
      },
      {
        type: 'scenario',
        stem: 'You commissioned a NUC with a monitor attached, then racked it headless. Days later, remote TeamViewer sessions show a blank screen. Most likely cause?',
        options: [
          'TeamViewer license expired',
          'The HDMI display emulator plug was never installed — the NUC detects no monitor',
          'Ubuntu crashed',
          'The firewall blocks port 443'
        ],
        answer: 1,
        explain: 'Without the display emulator plug, remote access tools like TeamViewer may show a blank screen because the system doesn\'t detect a connected monitor. One plug per deployed NUC.',
        source: '"NUC", p.11'
      },
      {
        type: 'mcq',
        stem: 'Why does the hardware list include a Granite Multicell 4G/5G backup SIM?',
        options: [
          'To give the WISE boards wireless connectivity',
          'Because ExpressLane requires continuous internet connectivity — the multi-carrier SIM roams to the strongest available network',
          'To stream camera video to the cloud',
          'It\'s only for temporary use during installation'
        ],
        answer: 1,
        explain: 'ExpressLane requires continuous internet to work. Granite\'s multi-carrier SIM reaches all Tier 1/2 US carriers from a single SIM (600+ carriers, 150+ countries, physical or eSIM), intelligently roaming to the strongest signal.',
        source: '"Granite Multicell Carrier", p.11'
      },
      {
        type: 'scenario',
        stem: 'A nested monthly-parker level has a restricted entry lane with no Zentron display. What does the guide say to deploy for scan-based access?',
        options: [
          'Just a Zebra MS4717 — it scans on its own',
          'Just an Elo Backpack 4',
          'Both: Zebra MS4717 + Elo Backpack 4, housed together on a RevCon gooseneck pedestal',
          'A PAX IM30'
        ],
        answer: 2,
        explain: 'Both devices are required to enable scanning; together they are housed on a RevCon gooseneck pedestal at each nested entry point. The Backpack 4 is used precisely at lanes where Zentron 21 displays are not present.',
        source: '"Scanner Devices", pp.12–13'
      },
      {
        type: 'mcq',
        stem: 'What happens to the NUC\'s pre-installed Windows OS?',
        options: [
          'It stays — GMP software runs on Windows',
          'It is replaced during setup with GMP\'s custom Linux operating system',
          'It dual-boots with Ubuntu',
          'It\'s replaced with Android'
        ],
        answer: 1,
        explain: 'During setup, any pre-installed Windows OS is replaced with GMP\'s custom Linux OS (the Ubuntu-based image installed in Module M10).',
        source: '"NUC", p.11'
      }
    ]
  });

  /* ==========================================================
     M06 — Procurement & lane BOMs
     ========================================================== */
  A.modules.push({
    id: 'm06', code: 'M06', phase: 2,
    title: 'Procurement & Lane Equipment Layouts',
    tagline: 'The full buy list, who to call before ordering what, and the exact per-lane bill of materials with wiring counts.',
    minutes: 35,
    objectives: [
      'Reproduce the complete equipment purchase list and its coordination rules',
      'Build an entry-lane and exit-lane bill of materials from memory',
      'State the minimum wiring requirements (CAT6 terminations, DC, AC) per lane type',
      'Estimate hardware for a full site from lane counts'
    ],
    lessons: [
      {
        id: 'l1', title: 'The master equipment list', minutes: 12,
        html: `
<p>The source guide carries a consolidated purchase table ("Links to Buy Equipment"). The actual URLs are embedded links in the PDF — keep the PDF (or GMP's procurement contact) at hand when ordering. What matters operationally is the list itself and the coordination flags:</p>
<div class="tablewrap"><table class="spec wraprow">
<tr><th>Item</th><th>Purchase route / coordination rule</th></tr>
<tr><td>WISE 4060 LANB IO</td><td>Buy link + datasheet (<code>WISE_4000_LAN_DS</code>); US sources: Mouser, DigiKey</td></tr>
<tr><td>INEX IZA500GR</td><td>Buy link</td></tr>
<tr><td>iPro WV-S15700-V2L</td><td>Two buy links provided</td></tr>
<tr><td>Floodlights (ZSGoes)</td><td>Buy link</td></tr>
<tr><td>PoE+ Switch</td><td>Buy link</td></tr>
<tr><td>PAX IM30 POS</td><td>Datasheet <code>IM30_EN_20200420.pdf</code>; buy link — <strong>contact GMP for support before placing your order</strong></td></tr>
<tr><td>Adyen S1U2 POS</td><td>Buy link — <strong>contact GMP before placing your order</strong></td></tr>
<tr><td>DC Power Supply</td><td>Buy link (any electronics store / Amazon)</td></tr>
<tr><td>ASUS NUC Computer</td><td>Buy link (recommended: NUC 13 Pro NUC13ANHi5)</td></tr>
<tr><td>Display Emulator HDMI Plug</td><td>Buy link — one per NUC</td></tr>
<tr><td>Granite Multicell Carrier 4G/5G Backup</td><td>Buy link</td></tr>
<tr><td>POS Pedestal — RevCon</td><td>Buy link — <strong>contact GMP team for support while placing the order</strong></td></tr>
<tr><td>Display Pedestal — LamasaTech</td><td>Buy link — <strong>contact GMP team for support while placing the order</strong></td></tr>
<tr><td>Speed Bumps</td><td>Buy link</td></tr>
<tr><td>Zebra Fixed Mount Scanner</td><td>Buy link (recommended: MS4717)</td></tr>
<tr><td>Elo Backpack 4 by Zebra</td><td>Buy link</td></tr>
</table></div>
<div class="callout warn"><span class="co-label">The "call first" list</span><p>Four items must not be ordered without GMP coordination: <strong>Adyen S1U2</strong>, <strong>PAX IM30</strong>, <strong>RevCon pedestal</strong>, <strong>LamasaTech Zentron 21</strong>. Payment devices carry processor/configuration dependencies; pedestals carry customization (wraps, cutouts, punch-outs).</p></div>
${src('"Links to Buy Equipment", pp.14–15')}`
      },
      {
        id: 'l2', title: 'Entry lane BOM & wiring', minutes: 8,
        html: `
<p>Each <strong>entry lane</strong> in a GMP Access or ExpressLane configuration requires:</p>
<ul>
  <li><strong>1× LPR Camera</strong> — runs on PoE or PoE+ (<em>PoE+ recommended for stable performance; ensure compatible network switches are used</em>).</li>
  <li><strong>1× WISE 4060 IO Board</strong> — requires both network connectivity and a DC power supply; typically installed inside the gate cabinet.</li>
  <li><strong>1× LED Display <em>(optional — ExpressLane only)</em></strong> — requires AC power and a network connection.</li>
</ul>
<div class="callout spec"><span class="co-label">Wiring requirements — ExpressLane entry lane</span>
<ul>
<li>Minimum <strong>2× CAT6 terminations</strong></li>
<li><strong>1× DC power supply</strong> for the IO board</li>
</ul></div>
${src('"Entry Lane Setup", p.15')}`
      },
      {
        id: 'l3', title: 'Exit lane BOM & wiring', minutes: 8,
        html: `
<p>Each <strong>exit lane</strong> requires:</p>
<ul>
  <li><strong>1× LPR Camera</strong> — PoE or PoE+ (PoE+ switches recommended).</li>
  <li><strong>1× WISE 4060 IO Board</strong> — network access + DC power supply; usually mounted within the gate housing.</li>
  <li><strong>1× Kiosk or POS Pedestal with Intercom <em>(ExpressLane only)</em></strong> — requires AC power and at least <strong>two CAT6 terminations</strong> of its own for network connectivity.</li>
</ul>
<div class="callout spec"><span class="co-label">Wiring requirements — ExpressLane exit lane</span>
<ul>
<li>Minimum <strong>4× CAT6 terminations</strong></li>
<li><strong>1× DC power supply</strong> for the IO board</li>
<li><strong>1× AC power outlet</strong> for the kiosk or POS pedestal</li>
</ul></div>
<p>Why exits are heavier than entries: the exit is where payment happens, so it carries the kiosk/pedestal (AC + 2 CAT6) on top of the camera + IO pair. Auto-vend exits (M01, diagram 6) are the exception — no interaction device at all.</p>
<figure class="figure">[[DIAGRAM:laneWiringCounts]]<figcaption>Entry vs exit at a glance: exits carry the payment hardware, so they carry the wiring — double the CAT6 plus an AC outlet.</figcaption></figure>
${src('"Exit Lane Setup", p.16')}`
      },
      {
        id: 'l4', title: 'Whole-site estimation drill', minutes: 7,
        html: `
<p>Fold the lane math and the per-location items together and you can quote hardware from a lane count. Worked example — ExpressLane site with <strong>2 entries, 2 exits, 1 reversible lane</strong>. The reversible lane counts as two lane-directions (its diagram shows two cameras, two IO boards, two gates), so effective lane-directions = 2 + 2 + 2 = <strong>6</strong>.</p>
<div class="tablewrap"><table class="spec">
<tr><th>Item</th><th>Count</th><th>Driver</th></tr>
<tr><td>LPR cameras</td><td>6</td><td>1 per lane-direction</td></tr>
<tr><td>WISE 4060 boards</td><td>6</td><td>1 per lane-direction</td></tr>
<tr><td>DC power supplies</td><td>6</td><td>1 per IO board (or draw from each gate's DC)</td></tr>
<tr><td>Speed bumps</td><td>5</td><td>1 per physical lane</td></tr>
<tr><td>Kiosk / POS pedestal</td><td>3</td><td>ExpressLane exit directions (2 exits + reversible exit side)</td></tr>
<tr><td>PoE+ switches</td><td>per dispenser</td><td>1 per ticket-dispenser housing that fans out to lane devices</td></tr>
<tr><td>NUC + HDMI emulator</td><td>1 + 1</td><td>Per garage</td></tr>
<tr><td>Granite backup SIM</td><td>1</td><td>ExpressLane requires continuous internet</td></tr>
<tr><td>Floodlights</td><td>per survey</td><td>≥8,000 lm indoor / ≥32,000 lm outdoor per lane needing light</td></tr>
</table></div>
<ol>
  <li>Count lanes IN and OUT; <strong>count reversible lanes as two</strong>.</li>
  <li>Per lane-direction: 1 camera + 1 WISE + 1 DC supply (+ kiosk/pedestal on ExpressLane exits; + optional LED display on ExpressLane entries).</li>
  <li>Per physical lane: 1 speed bump; CAT6 counts (2 entry / 4 exit minimum); lighting to spec.</li>
  <li>Per site: 1 NUC + 1 emulator plug; backup SIM for ExpressLane; scanner+Backpack kits per nested restricted entry.</li>
</ol>
<div class="callout field"><span class="co-label">Reality check</span><p>The wiring minimums are why the site walk checks conduit space (M07): "minimum 4× CAT6" at an exit means nothing if the conduit to the island is packed. Procurement and conduit findings travel together in your site report.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'Minimum wiring for an ExpressLane exit lane is:',
        options: [
          '2× CAT6 + 1× DC supply',
          '4× CAT6 + 1× DC supply + 1× AC outlet for the kiosk/pedestal',
          '1× CAT6 + PoE for everything',
          '4× CAT6 only'
        ],
        answer: 1,
        explain: 'Exit lanes: minimum 4× CAT6 terminations, 1× DC power supply for the IO board, and 1× AC power outlet for the kiosk or POS pedestal. (Entry lanes: minimum 2× CAT6 + 1× DC supply.)',
        source: '"Exit Lane Setup", p.16'
      },
      {
        type: 'mcq',
        stem: 'Which items require contacting GMP before/while ordering?',
        options: [
          'WISE 4060, DC supply, speed bumps',
          'Adyen S1U2, PAX IM30, RevCon pedestal, LamasaTech Zentron',
          'NUC and HDMI emulator',
          'Only the Granite SIM'
        ],
        answer: 1,
        explain: 'The buy table flags both POS terminals ("contact us before placing your order") and both pedestals ("contact our team for support while you\'re placing the order"). Everything else is a straight purchase.',
        source: '"Links to Buy Equipment", pp.14–15'
      },
      {
        type: 'scenario',
        stem: 'An ExpressLane entry lane will include the optional LED display. What power/network does the display itself need?',
        options: [
          'PoE only',
          'AC power and a network connection',
          'DC 12/24V from the gate',
          'Battery powered'
        ],
        answer: 1,
        explain: 'The optional LED display (ExpressLane entry lanes) requires AC power and a network connection — one reason entry wiring plans need more than the bare 2× CAT6 minimum when the display is included.',
        source: '"Entry Lane Setup", p.15'
      },
      {
        type: 'scenario',
        stem: 'Site: 1 entry, 1 exit, 1 reversible lane, ExpressLane. How many WISE 4060 boards?',
        options: ['2', '3', '4', '5'],
        answer: 2,
        explain: 'Reversible lanes count as two lane-directions with their own IO boards (the reversible diagram shows two controllers). 1 + 1 + 2 = 4 WISE boards.',
        source: 'Site Walk item 1; reversible lane diagrams pp.64–65'
      },
      {
        type: 'mcq',
        stem: 'The US purchase sources named for the WISE 4060 are:',
        options: [
          'Amazon and Best Buy',
          'Mouser Electronics and DigiKey',
          'Advantech direct only',
          'Zebra resellers'
        ],
        answer: 1,
        explain: 'The guide names Mouser Electronics and DigiKey as US sources for the WISE 4060-LAN-B, along with the WISE_4000_LAN_DS datasheet.',
        source: '"WISE 4060-LAN-B IO Unit", p.5'
      }
    ]
  });
})();
