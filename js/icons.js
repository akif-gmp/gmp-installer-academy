/* ============================================================
   UI icon set — inline SVG line icons (currentColor), no emoji.
   Usage: UI('name', size) → svg string.
   ============================================================ */
(function () {
  'use strict';
  const P = {
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    check: '<path d="M4 12.5l5 5L20 6"/>',
    printer: '<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevron: '<path d="M9 5l7 7-7 7"/>',
    refresh: '<path d="M20 8A8.5 8.5 0 1 0 21 13"/><path d="M20 3v5h-5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    download: '<path d="M12 3v12M6 10l6 6 6-6"/><path d="M4 20h16"/>',
    flag: '<path d="M5 3v18"/><path d="M5 4h12l-2.5 4L17 12H5"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    star: '<path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2-5.6-3.1-5.6 3.1 1.2-6.2L3 9.5l6.3-.8z"/>',
    gauge: '<path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l4-5"/><path d="M4 19h16"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4a3 3 0 0 1 6 0"/><path d="M8 10h8M8 14h8M8 18h5"/>',
    plug: '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
    key: '<circle cx="8" cy="14" r="4.5"/><path d="M11.5 10.5 20 2M16 6l3 3M13 9l2.5 2.5"/>',
    ruler: '<rect x="2.5" y="9" width="19" height="6" rx="1.5" transform="rotate(-35 12 12)"/><path d="M8.6 12.9l1.4 2M11.5 10.8l1.4 2M14.4 8.8l1.4 2"/>',
    box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3"/><path d="M7 15h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-3M20 16V6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.8"/><path d="M15.5 14.5A5 5 0 0 1 21 19.5"/>',
    doc: '<path d="M6 2h9l4 4v16H6z"/><path d="M15 2v4h4"/><path d="M9 11h7M9 15h7M9 19h4"/>',
    rocket: '<path d="M12 15c-2 0-5-1-5-1s1.5-7 5-10c3.5 3 5 10 5 10s-3 1-5 1z"/><path d="M12 15v5"/><path d="M8.5 13.5 6 18M15.5 13.5 18 18"/><circle cx="12" cy="8.5" r="1.4"/>',
    pencil: '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/><path d="M14 6l4 4"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    arrowr: '<path d="M4 12h16M13 5l7 7-7 7"/>'
  };
  window.UI = function (name, size, cls) {
    const s = size || 18;
    return `<svg class="ui-ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;
  };
})();
