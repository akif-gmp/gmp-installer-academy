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
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2323ad5e'/><rect x='30' y='34' width='12' height='38' rx='4' fill='%23ffc300'/><rect x='26' y='24' width='48' height='11' rx='4' fill='%23ffc300' transform='rotate(-16 50 30)'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@500;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap">
<style>${css}</style>
<div class="app">
  <nav class="rail no-print" id="rail" aria-label="Main navigation"></nav>
  <div class="main">
    <header class="topbar no-print">
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
