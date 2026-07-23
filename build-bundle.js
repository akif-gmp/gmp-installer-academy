// Bundles the academy into one self-contained HTML file (dist/).
const fs = require('fs');
const css = fs.readFileSync('css/app.css', 'utf8');
const files = ['js/icons.js', 'js/diagrams.js', 'js/diagrams2.js', 'js/data/data-1.js', 'js/data/data-2.js',
  'js/data/data-3.js', 'js/data/data-4.js', 'js/data/data-5.js', 'js/data/reference.js',
  'js/data/quiz-extra.js', 'js/proctor.js', 'js/onboarding.js', 'js/data/demo-data.js', 'js/admin.js', 'js/app.js'];
let js = files.map(f => fs.readFileSync(f, 'utf8')).join('\n;\n');
js = js.replace(/<\/script/g, '<\\/script');
const html = `<title>GMP Access — Installer Academy</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${css}</style>
<div class="app">
  <nav class="rail no-print" id="rail" aria-label="Main navigation"></nav>
  <div class="panel-scrim"></div>
  <aside class="nav-panel no-print" id="navPanel" aria-label="Curriculum"></aside>
  <div class="main">
    <header class="topbar no-print">
      <button class="hamburger" id="hamburger" aria-label="Curriculum menu"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
      <div class="crumb" id="crumb"></div>
      <div class="search-box">
        <input id="searchInput" type="search" placeholder="Search… (e.g. NC4, 10.0.0.1, lux)" autocomplete="off">
        <div class="search-results" id="searchResults" style="display:none"></div>
      </div>
      <a class="btn small accent" href="#/field"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg> Field kit</a>
    </header>
    <main class="content" id="content"></main>
  </div>
</div>
<script>${js}</script>`;
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/gmp-installer-academy.html', html);
console.log('bundle bytes:', html.length);
