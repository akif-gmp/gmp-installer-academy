/* ============================================================
   Curriculum data — Phase 4: M10–M11 (bench setup)
   ============================================================ */
(function () {
  'use strict';
  const A = window.ACADEMY;
  const src = t => `<p class="src">Source: GMP Access Install V3 — ${t}</p>`;

  /* ==========================================================
     M10 — NUC bench setup
     ========================================================== */
  A.modules.push({
    id: 'm10', code: 'M10', phase: 4,
    title: 'NUC Setup: BIOS, Ubuntu & Remote Access',
    tagline: 'The complete bench procedure: power-failure BIOS setting, bootable USB, Ubuntu installation, and TeamViewer.',
    minutes: 60,
    objectives: [
      'Assemble the software toolkit: Zenmap/Nmap, Rufus, GMP Ubuntu disk file',
      'Configure the NUC BIOS to power on automatically after an outage',
      'Create a bootable Ubuntu USB with Rufus and install Ubuntu 24.04.03 LTS',
      'Set up TeamViewer for unattended remote support and hand credentials to GMP'
    ],
    lessons: [
      {
        id: 'l1', title: 'The software toolkit', minutes: 5,
        html: `
<p>Three tools before any hardware pre-install work:</p>
<div class="tablewrap"><table class="spec">
<tr><th>Tool</th><th>Purpose</th></tr>
<tr><td>ZENMAP / NMAP</td><td>Network IP scanner — used to find WISE controllers after their DHCP transition (M11/M12)</td></tr>
<tr><td>Rufus</td><td>Creates the bootable USB stick for the Ubuntu install</td></tr>
<tr><td>GMP Ubuntu Disk File</td><td>The OS image (download link embedded in the source PDF)</td></tr>
</table></div>
<figure class="figure">[[DIAGRAM:benchFlow]]<figcaption>The whole bench program in one line. Each stage is a lesson in this module; the exit criteria checklist lives in Field Mode.</figcaption></figure>
${src('"Recommended Software Tools", p.27')}
<div class="callout field"><span class="co-label">Do this at the office</span><p>Everything in this module can — and should — happen on the bench before you're standing in a parking office. Downloads on site Wi-Fi are how afternoons die.</p></div>`
      },
      {
        id: 'l2', title: 'BIOS: survive a power outage', minutes: 8,
        html: `
<p>A parking garage loses power; when it comes back, the gate system must come back with it — with no one on site to push a power button. That's this setting.</p>
<ol class="steps">
<li><b>Connect a monitor, keyboard, and mouse to the NUC and power it on.</b></li>
<li><b>Press <code>F2</code> during startup</b> to enter the BIOS setup menu.</li>
<li><b>Navigate to the Power tab.</b></li>
<li><b>Go to Secondary Power Settings.</b></li>
<li><b>From the "After Power Failure" dropdown, select <u>Power On</u>.</b></li>
<li><b>Press <code>F10</code></b> to save the settings and exit BIOS.</li>
</ol>
${src('"Power Outage Setting", pp.27–29')}
<div class="callout danger"><span class="co-label">Skipping this = truck roll</span><p>If "After Power Failure" stays at default, the first site power blip leaves the NUC off, every lane down, and remote support helpless — someone must physically press the button. Set it before the OS install so it can never be forgotten.</p></div>`
      },
      {
        id: 'l3', title: 'Create the bootable USB (Windows/Rufus)', minutes: 12,
        html: `
<p>Using a Windows machine and Rufus:</p>
<ol class="steps">
<li><b>Download Ubuntu 24.04.03 LTS and Rufus.</b></li>
<li><b>Install Rufus on your system.</b></li>
<li><b>Launch Rufus and insert a USB stick (minimum 8 GB).</b><p>Rufus will detect the device. If multiple USB devices are connected, select the correct one manually from the <em>Device</em> dropdown.</p></li>
<li><b>Click SELECT, choose the Ubuntu ISO you downloaded, click Open.</b></li>
<li><b>Leave options at default and click START.</b><p>Rufus auto-updates the Volume Label; leave all other options as the default.</p></li>
<li><b>If prompted for additional files to complete writing the ISO, click Yes to continue.</b></li>
<li><b>Wait ~10 minutes</b> for Rufus to write the image to the USB stick.</li>
<li><b>When the status bar turns green and shows READY, click Close.</b></li>
</ol>
${src('"Create a Bootable USB Drive (Using Windows)", pp.29–33')}
<div class="callout ambiguity"><span class="co-label">Source note (18.04 vs 24.04)</span><p>The section's intro sentence mentions "the Ubuntu 18.04 iso image," while its own Step 1 — and the install section that follows — specify <strong>Ubuntu 24.04.03 LTS</strong>. Treat 24.04.03 LTS as the operative version; the 18.04 mention appears to be a leftover from an earlier revision of the document.</p></div>
<div class="callout warn"><span class="co-label">Data destruction warning</span><p>Rufus erases the USB stick, and the Ubuntu install that follows erases the NUC's disk. Nothing you care about should be on either device.</p></div>`
      },
      {
        id: 'l4', title: 'Install Ubuntu 24.04.03 LTS on the NUC', minutes: 18,
        html: `
<ol class="steps">
<li><b>Boot the NUC from the USB stick.</b><p>Insert the bootable USB flash drive and restart/boot the device. If the USB isn't automatically detected, press <code>F12</code> at startup and select the USB device from the boot menu. On the welcome screen, select <strong>Install Ubuntu</strong>, choose your keyboard layout → Continue.</p></li>
<li><b>Choose "Normal Installation".</b><p>Also check the box for <strong>Download updates</strong> and <strong>install third-party software</strong> → Continue.</p></li>
<li><b>Select "Erase disk and install Ubuntu".</b><p>This is what removes the factory Windows OS (M05). Everything on the NUC's disk is destroyed.</p></li>
<li><b>Click Install Now and confirm changes → Continue.</b></li>
<li><b>Skip encryption. Set the time zone to match the car park's location → Continue.</b></li>
<li><b>Create login details and the NUC device name.</b><p><strong>Try to use the parking/tenant name in both</strong> — e.g., NUC name: <code>garageA</code>, password: <code>garageA123</code>. Select <strong>Log in automatically</strong>. <strong>Share the credentials with the GMP team.</strong></p></li>
<li><b>Wait for installation to complete, click Restart Now.</b><p>When prompted, remove the USB stick and press Enter.</p></li>
<li><b>Log in with your new credentials.</b></li>
<li><b>Open the terminal (<code>Ctrl + Alt + T</code>) and update the system:</b>
<pre><code>sudo apt update
sudo apt upgrade</code></pre></li>
</ol>
${src('"Install Ubuntu 24.04.03 LTS on NUC", pp.34–39')}
<div class="callout field"><span class="co-label">Why these choices matter</span><ul>
<li><em>Erase disk</em> — the NUC becomes a single-purpose appliance; dual-boot remnants only cause boot-order grief on a headless machine.</li>
<li><em>Skip encryption</em> — an encrypted disk would demand a passphrase at every reboot, which no one is present to type after a power outage (the whole point of the BIOS setting).</li>
<li><em>Log in automatically</em> + tenant-named credentials shared with GMP — the machine must come up into a usable session on its own, and GMP support must be able to identify and access it remotely.</li>
</ul></div>`
      },
      {
        id: 'l5', title: 'TeamViewer for unattended support', minutes: 12,
        html: `
<p>TeamViewer is GMP's remote-support path to the NUC. The setup goal is <em>unattended</em> access: the machine reachable at any time with no one on site.</p>
<ol class="steps">
<li><b>Download and install TeamViewer</b> (link referenced in the source).</li>
<li><b>Launch TeamViewer.</b></li>
<li><b>Click Extras in the top menu → select Options.</b></li>
<li><b>In the General tab, enable "Start TeamViewer with the system".</b><p>Survives reboots — pairs with the BIOS auto-power-on so a power-cycled NUC comes back reachable.</p></li>
<li><b>Go to Advanced and set a Personal Password.</b><p>A fixed password means access doesn't depend on someone reading a session code off the screen.</p></li>
<li><b>Click Apply to save changes.</b></li>
<li><b>Share the TeamViewer ID and password with the GMP team.</b></li>
</ol>
${src('"TeamViewer Setup", pp.40–43')}
<div class="callout good"><span class="co-label">Bench exit criteria</span><p>Before this NUC leaves your bench: BIOS = Power On after failure ✓ · Ubuntu 24.04.03 installed, auto-login ✓ · <code>apt update/upgrade</code> run ✓ · TeamViewer starts with system, personal password set ✓ · credentials + TeamViewer ID shared with GMP ✓ · <strong>HDMI display emulator plug in hand for deployment</strong> ✓ (M05 — without it, this TeamViewer work shows a blank screen once headless).</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'Which BIOS path and setting keeps the NUC lane-ready after a power outage?',
        options: [
          'Boot tab → Fast Boot → Enabled',
          'Power tab → Secondary Power Settings → After Power Failure → Power On (F2 to enter, F10 to save)',
          'Security tab → Auto Restart → On',
          'Advanced tab → Wake on LAN'
        ],
        answer: 1,
        explain: 'Press F2 at startup, go to Power → Secondary Power Settings, set "After Power Failure" to Power On, save with F10. Without it, a power blip leaves the whole site down until someone physically restarts the NUC.',
        source: '"Power Outage Setting", pp.27–29'
      },
      {
        type: 'mcq',
        stem: 'Minimum USB stick size for the bootable drive, and roughly how long does Rufus take to write it?',
        options: [
          '4 GB, ~2 minutes',
          '8 GB, ~10 minutes',
          '16 GB, ~30 minutes',
          '32 GB, ~5 minutes'
        ],
        answer: 1,
        explain: 'Minimum 8 GB stick; Rufus takes about 10 minutes to write the image, finishing with a green READY status bar.',
        source: '"Create a Bootable USB Drive", pp.29–32'
      },
      {
        type: 'mcq',
        stem: 'During the Ubuntu install, how does the guide say to form the machine name and credentials?',
        options: [
          'Random strong password, never shared',
          'Use the parking/tenant name in both (e.g., garageA / garageA123), enable automatic login, and share the credentials with the GMP team',
          'Use "admin/admin" for consistency',
          'Let Ubuntu generate them'
        ],
        answer: 1,
        explain: 'Try to use the parking/tenant name in the NUC name and password (e.g., nuc name: garageA, password: garageA123), select "Log in automatically", and share the credentials with the GMP team.',
        source: '"Install Ubuntu", Step 6, p.38'
      },
      {
        type: 'scenario',
        stem: 'Installation finished; you\'re at the fresh Ubuntu desktop. What does the guide say to run first in the terminal?',
        options: [
          'sudo reboot',
          'sudo apt update && sudo apt upgrade (Ctrl+Alt+T to open the terminal)',
          'docker compose up',
          'nmap 10.0.0.1'
        ],
        answer: 1,
        explain: 'Open the terminal with Ctrl+Alt+T and run sudo apt update, then sudo apt upgrade. (Docker and the GMP stack come later, via GMP — and require the whitelist URLs from M14 to be open.)',
        source: '"Install Ubuntu", Step 9, p.39'
      },
      {
        type: 'scenario',
        stem: 'Which TWO TeamViewer settings make the access unattended, and what do you send GMP?',
        options: [
          'Dark theme + auto-update; send a screenshot',
          '"Start TeamViewer with the system" (General) + a Personal Password (Advanced); send GMP the TeamViewer ID and password',
          'Session recording + VPN mode; send the license key',
          'Nothing — defaults suffice'
        ],
        answer: 1,
        explain: 'Enable start-with-system so TeamViewer survives reboots, set a Personal Password so access needs no one on-site, then share the TeamViewer ID and password with the GMP team.',
        source: '"TeamViewer Setup", pp.40–43'
      },
      {
        type: 'mcq',
        stem: 'Which Ubuntu version does this deployment use?',
        options: [
          'Ubuntu 18.04 LTS',
          'Ubuntu 22.04 LTS',
          'Ubuntu 24.04.03 LTS',
          'Any recent version'
        ],
        answer: 2,
        explain: 'Ubuntu 24.04.03 LTS — per the USB-creation step 1 and the install section title. (One leftover sentence in the source mentions 18.04; the operative version throughout is 24.04.03 LTS.)',
        source: '"Create a Bootable USB Drive" / "Install Ubuntu 24.04.03 LTS", pp.29–34'
      }
    ]
  });

  /* ==========================================================
     M11 — WISE controller configuration
     ========================================================== */
  A.modules.push({
    id: 'm11', code: 'M11', phase: 4,
    title: 'WISE Controller Configuration & DHCP Transition',
    tagline: 'Talking to the board at 10.0.0.1, mapping MAC to lane, and flipping it to DHCP for the site network.',
    minutes: 55,
    objectives: [
      'Explain the factory network defaults of the WISE-4060-LANB and why your PC must adapt',
      'Prepare a Windows or Linux computer to reach 10.0.0.1',
      'Log into the config page, record the MAC-to-lane mapping, switch IP mode to DHCP',
      'Locate the board on the site network afterward using arp'
    ],
    lessons: [
      {
        id: 'l1', title: 'The goal and the factory state', minutes: 8,
        html: `
<p><strong>Each IO board must be configured to use the DHCP protocol</strong>, so it accepts an IP address as soon as it is connected to the network on-site — <strong>or a specific IP address provided by the garage operator</strong>, if the site's IT mandates static assignments.</p>
<p>Factory state: <strong>the WISE-4060-LANB has a factory-set default IP address of <code>10.0.0.1</code></strong>, and <strong>the controller can only be accessed on its default IP and subnet</strong>. To access and configure the device, <strong>your PC must be on the same network</strong> — which means temporarily giving your laptop a static address in that range.</p>
<div class="kv">
  <div class="k"><span class="lab">Default IP</span><span class="val mono">10.0.0.1</span></div>
  <div class="k"><span class="lab">Config page</span><span class="val mono">http://10.0.0.1/config</span></div>
  <div class="k"><span class="lab">Username</span><span class="val mono">root</span></div>
  <div class="k"><span class="lab">Password</span><span class="val mono">00000000</span></div>
  <div class="k"><span class="lab">Target mode</span><span class="val">DHCP</span></div>
</div>
<figure class="figure">[[DIAGRAM:dhcpTransition]]<figcaption>The whole module in one picture: talk to the board at its factory address on the bench, flip it to DHCP, then find it again on-site by its MAC.</figcaption></figure>
<div class="callout danger"><span class="co-label">The one rule that breaks everything</span><p><strong>Do not set the controller's default IP (<code>10.0.0.1</code>) as your computer's IP address — you won't reach the config page.</strong> Two devices, one address, no conversation. Your laptop takes a <em>different</em> address in the range, e.g. <code>10.0.0.2</code>.</p></div>
${src('"Set up the IO Controller", p.44; "WISE Controller Configuration", pp.45–48')}`
      },
      {
        id: 'l2', title: 'Bench connection and first contact', minutes: 12,
        html: `
<h4>Prepare the computer</h4>
<ol class="steps">
<li><b>Open Network Settings on your computer.</b></li>
<li><b>Open the TCP/IPv4 settings of your Ethernet interface.</b></li>
<li><b>Switch the interface to manual mode</b> (IP mode: Manual).</li>
<li><b>Use: IP address <code>10.0.0.2</code>, subnet mask <code>255.255.0.0</code>.</b></li>
<li><b>Save and close settings.</b></li>
</ol>
<h4>Prepare the IO board</h4>
<ol class="steps">
<li><b>Power up the WISE IO Board using a 12V DC power supply</b> (VS+/VS− — M08).</li>
<li><b>Connect the IO board to your computer's Ethernet port with a CAT6 LAN cable.</b></li>
</ol>
<h4>Test the connection</h4>
<ol class="steps">
<li><b>Open Command Prompt / Terminal and run:</b><pre><code>ping 10.0.0.1</code></pre></li>
<li><b>Look for a reply like:</b><pre><code>64 bytes from 10.0.0.1: icmp_seq=0 ttl=64 time=12.995 ms</code></pre><p>A reply means the board is connected correctly and will be accessible from the computer.</p></li>
</ol>
<h4>Open the config page & record the MAC</h4>
<ol class="steps">
<li><b>Browse to <code>10.0.0.1/config</code>.</b></li>
<li><b>Turn the IO controller over and find its MAC address. Note it down and map it to a lane.</b><p>You will need this later when installing the controller — after the DHCP switch, the MAC is the only way to find the board's new IP and know which lane it belongs to.</p></li>
</ol>
${src('"Prepare the computer / IO Board / Test the connection / Changing IO Board settings", pp.44–45')}
<div class="callout field"><span class="co-label">The MAC-to-lane ledger</span><p>Configuring six boards for six lanes? Label each physical board AND keep a written table: MAC ↔ intended lane. This ledger is what M12's <code>arp</code> lookup runs against, and it's part of what you hand GMP support at the end.</p></div>`
      },
      {
        id: 'l3', title: 'OS-specific setup: Windows and Linux paths', minutes: 15,
        html: `
<p>The source gives OS-specific walkthroughs for putting your machine on the board's network. Reproduced faithfully — including a contradiction you need to know about.</p>
<h4>For Windows</h4>
<ol class="steps">
<li><b>Connect the WISE controller to the PC via LAN.</b> Set the default IP address in the system.</li>
<li><b>Go to Control Panel → Network and Internet.</b></li>
<li><b>Navigate to Network and Sharing Center → Change Adapter Settings → Network Connections.</b></li>
<li><b>Right-click the correct Ethernet interface → Properties.</b></li>
<li><b>Select Internet Protocol Version 4 (TCP/IPv4) → Properties</b>, and update the address. The source's Windows section prints: IP address <code>10.0.0.1</code>, subnet <code>255.255.255.0</code>, gateway <code>10.0.0.1</code>.</li>
<li><b>Click OK to apply.</b></li>
</ol>
<div class="callout ambiguity"><span class="co-label">Source contradiction — resolve it this way</span><p>The Windows step above tells you to set your PC to <code>10.0.0.1</code> — but the source's own warning says <strong>never</strong> to give your computer the controller's default IP, and its "Prepare the computer" section says to use <code>10.0.0.2</code>. These cannot both be right. <strong>Follow the warning: give your PC <code>10.0.0.2</code> (gateway <code>10.0.0.1</code>) on Windows too.</strong> If you set 10.0.0.1 you will create an address conflict and the config page will not load.</p></div>
<h4>For Linux</h4>
<ol class="steps">
<li><b>Create a manual wired profile</b> referencing the controller's defaults (source lists: default IP <code>10.0.0.1</code>, subnet <code>255.0.0.0</code>, gateway <code>10.0.0.2</code>).</li>
<li><b>Go to Settings → Network → Wired, click + to add a profile.</b></li>
<li><b>Under IPv4, choose Manual for the IPv4 Method.</b></li>
<li><b>Enter the details:</b> Address: <em>your PC's IP, e.g. <code>10.0.0.2</code></em> · Gateway: <code>10.0.0.1</code> · Subnet: <code>255.0.0.0</code>. Click Apply.</li>
</ol>
${src('"WISE Controller Configuration — For WINDOWS / For LINUX", pp.45–48')}
<div class="callout spec"><span class="co-label">What actually matters</span><p>Across all the printed variants, the working recipe is constant: <strong>PC = 10.0.0.2 (or any non-.1 address the subnet reaches) · gateway 10.0.0.1 · a subnet mask that spans both addresses (255.255.0.0 and 255.0.0.0 both do; 255.255.255.0 also works with 10.0.0.x)</strong>. The board is always at 10.0.0.1.</p></div>`
      },
      {
        id: 'l4', title: 'Flip to DHCP and find the board again', minutes: 12,
        html: `
<h4>Final configuration steps (Windows/Linux)</h4>
<ol class="steps">
<li><b>Connect the WISE controller to your computer via LAN and open <code>http://10.0.0.1/config</code>.</b></li>
<li><b>Log in: username <code>root</code>, password <code>00000000</code>.</b></li>
<li><b>Click Configuration in the left menu → go to the Network tab.</b></li>
<li><b>Change IP Mode from Static to DHCP. Click Submit to save.</b></li>
<li><b>Disconnect the controller from your computer and connect it to the site's network switch.</b></li>
<li><b>Find the controller's new IP via its MAC:</b><pre><code>arp -n | grep &lt;MAC address of the device&gt;</code></pre><p>(Run Zenmap/Nmap to sweep the network if needed — that's why it's in the toolkit.)</p></li>
</ol>
${src('"Final Configuration Steps", pp.48–49')}
<div class="callout good"><span class="co-label">Per-board completion criteria</span><p>For every WISE board: pinged at 10.0.0.1 ✓ · MAC recorded and mapped to a lane ✓ · IP mode = DHCP, submitted ✓ · found on the site network by MAC ✓. Do this for all boards before install day and the on-site work (M12) becomes wiring + testing only.</p><p>Remember the alternative: if the operator provides specific IP addresses instead of DHCP, configure those as instructed.</p></div>
<div class="callout field"><span class="co-label">After DHCP, 10.0.0.1 is gone</span><p>Once you submit DHCP mode and the board joins a network with a DHCP server, it no longer answers at 10.0.0.1. The MAC ledger and <code>arp -n | grep</code> are your only sane path to it. Lose the mapping and you're power-cycling boards to watch ARP tables.</p></div>`
      }
    ],
    quiz: [
      {
        type: 'mcq',
        stem: 'Factory defaults for reaching a new WISE-4060-LANB config page:',
        options: [
          'IP 192.168.1.1, admin/admin',
          'IP 10.0.0.1, path /config, login root / 00000000',
          'IP 10.0.0.2, login root/root',
          'DHCP out of the box, any IP'
        ],
        answer: 1,
        explain: 'The board ships at 10.0.0.1 (static); browse to 10.0.0.1/config and log in with root / 00000000. DHCP is what you configure, not the factory state.',
        source: '"Set up the IO Controller" / "Final Configuration Steps", pp.44–48'
      },
      {
        type: 'scenario',
        stem: 'A tech sets their laptop\'s Ethernet to 10.0.0.1/255.255.255.0 and can\'t load the config page. Why?',
        options: [
          'The subnet must be 255.255.0.0 exactly',
          'They gave the laptop the controller\'s own default IP — an address conflict; the laptop should use a different address such as 10.0.0.2',
          'DHCP hasn\'t been enabled yet',
          'The board needs PoE power first'
        ],
        answer: 1,
        explain: 'The source\'s explicit warning: do not set the controller\'s default IP (10.0.0.1) as your computer\'s IP — you won\'t reach the config page. Use 10.0.0.2 (as the "Prepare the computer" section specifies).',
        source: 'Warning, p.48; "Prepare the computer", p.44'
      },
      {
        type: 'mcq',
        stem: 'Why must you record the MAC address (from the underside of the board) before switching to DHCP?',
        options: [
          'It\'s needed for the warranty',
          'After DHCP, the board\'s IP is unknown — you find it with arp -n | grep <MAC>, and the MAC is what maps the board to its lane',
          'The MAC is the config-page password',
          'GMP bills per MAC address'
        ],
        answer: 1,
        explain: 'Post-DHCP, the board takes whatever IP the site\'s DHCP server assigns. The recorded MAC lets you find it (arp -n | grep <MAC>) and keeps the board↔lane mapping intact — needed later during installation.',
        source: '"Changing IO Board settings", p.45; "Final Configuration Steps", p.49'
      },
      {
        type: 'mcq',
        stem: 'The exact sequence to switch the board\'s network mode is:',
        options: [
          'Network Settings → DHCP → Reboot',
          'Configuration (left menu) → Network tab → IP Mode: Static → DHCP → Submit',
          'Advanced → TCP/IP → Auto',
          'It switches automatically when it sees a DHCP server'
        ],
        answer: 1,
        explain: 'In the config UI: Configuration → Network tab → change IP Mode from Static to DHCP → Submit. Then disconnect from your laptop and connect the board to the site switch.',
        source: '"Final Configuration Steps", Steps 6–8, p.49'
      },
      {
        type: 'scenario',
        stem: 'The garage operator\'s IT team doesn\'t run DHCP for device VLANs and issues fixed addresses. What does the guide allow?',
        options: [
          'Refuse — DHCP is mandatory',
          'Configure the board to the specific IP address provided by the garage operator instead of DHCP',
          'Keep the factory 10.0.0.1 forever',
          'Use the NUC as a DHCP server'
        ],
        answer: 1,
        explain: 'The boards must be configured "to use the DHCP protocol… (or to a specific IP address provided by the garage operator)". Static site-assigned addressing is an explicitly supported path.',
        source: '"Set up the IO Controller", p.44'
      },
      {
        type: 'mcq',
        stem: 'What confirms first contact with a factory-fresh board from your prepared laptop?',
        options: [
          'The board\'s LED turns blue',
          'A ping reply from 10.0.0.1 (e.g., "64 bytes from 10.0.0.1 …")',
          'An entry in Zenmap',
          'The relay clicks'
        ],
        answer: 1,
        explain: 'Run ping 10.0.0.1 — a reply such as "64 bytes from 10.0.0.1: icmp_seq=0 ttl=64 time=12.995 ms" means the board is connected correctly and accessible.',
        source: '"Test the connection", p.44'
      }
    ]
  });
})();
