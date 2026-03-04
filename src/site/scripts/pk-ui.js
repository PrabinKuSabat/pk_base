(function () {
  var PEEK_THRESHOLD = 64;
  var root = document.documentElement;

  /* ── Progress bar ───────────────────────────────────────── */
  function setupProgress() {
    function update() {
      var scrollTop = root.scrollTop || document.body.scrollTop || 0;
      var max = (root.scrollHeight - root.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
      root.style.setProperty('--rzl-progress-pct', pct.toFixed(2) + '%');
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ── Hide navbar on scroll-down, show on scroll-up ────────── */
  function setupHideOnScroll() {
    var navbar = document.querySelector('.pk-navbar');
    if (!navbar) return;
    var lastY = window.scrollY || 0;
    var ticking = false;
    function onFrame() {
      var y = window.scrollY || 0;
      var atTop = y < 10;
      var goingDown = y > lastY + 4;
      if (atTop) {
        navbar.classList.remove('pk-nav-hidden');
      } else if (goingDown) {
        navbar.classList.add('pk-nav-hidden');
      } else if (y < lastY - 4) {
        navbar.classList.remove('pk-nav-hidden');
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onFrame); ticking = true; }
    }, { passive: true });
  }

  /* ── Navbar peek on mouse near top ─────────────────────── */
  function setupPeek() {
    var body = document.body;
    var active = false;
    function set(v) {
      if (active === v) return;
      active = v;
      body.classList.toggle('pk-nav-peek', v);
    }
    window.addEventListener('mousemove', function (e) { set(e.clientY <= PEEK_THRESHOLD); }, { passive: true });
    window.addEventListener('mouseleave', function () { set(false); });
  }

  /* ── Theme toggle ───────────────────────────────────────── */
  var THEME_KEY = 'pk_theme';
  function getCurrentTheme() {
    if (document.body.classList.contains('theme-dark')) return 'dark';
    if (document.body.classList.contains('theme-light')) return 'light';
    return localStorage.getItem(THEME_KEY) || 'light';
  }
  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem(THEME_KEY, theme);
  }
  window.pkToggleTheme = function () {
    applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
  };
  function restoreTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
  }

  /* ── Excalidraw dedicated pages ────────────────────────────

     Activates ONLY when the URL pathname contains ".excalidraw"
     (with the dot). This prevents accidental activation on notes
     that merely mention "excalidraw" in their title or path.

     What it does:
       1. Adds pk-excalidraw-page to <body> so CSS kicks in
       2. Strips fixed pixel width/height from the SVG and adds
          a viewBox so the browser can scale it
       3. Sets preserveAspectRatio="xMidYMid meet" so all drawing
          elements are visible and centred (letterbox, no clipping)
       4. Intercepts wheel events on the SVG container and
          forwards them to window.scrollBy so the mouse wheel
          scrolls the PAGE, not zooms the canvas
   ──────────────────────────────────────────────────────────── */
  function setupExcalidrawPage() {
    var path = window.location.pathname.toLowerCase();
    if (!path.includes('.excalidraw')) return;  /* dot required — safety guard */

    document.body.classList.add('pk-excalidraw-page');

    /* ─ SVG fitting: remove pixel dims, add viewBox + preserveAspectRatio ─ */
    function fitSVGs() {
      var svgs = document.querySelectorAll(
        '.excalidraw-svg svg, .content > svg, .content .excalidraw-svg svg'
      );
      if (!svgs.length) svgs = document.querySelectorAll('main.content svg');
      svgs.forEach(function (svg) {
        var w = parseFloat(svg.getAttribute('width')  || 0);
        var h = parseFloat(svg.getAttribute('height') || 0);
        if (w > 0 && h > 0 && !svg.getAttribute('viewBox')) {
          svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        }
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
      });
    }
    fitSVGs();
    setTimeout(fitSVGs, 250);
    setTimeout(fitSVGs, 800);

    /* ─ Forward wheel events on the SVG to the page scroller ──────────
       The SVG canvas would otherwise swallow wheel events and
       zoom the drawing instead of scrolling the page.
       Capture phase + preventDefault stops the SVG from seeing it.
    ───────────────────────────────────────────────────────── */
    function attachWheelForward() {
      var container = document.querySelector('.excalidraw-svg');
      if (!container) return;
      container.addEventListener('wheel', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var dx = e.shiftKey ? e.deltaY : e.deltaX;
        var dy = e.shiftKey ? 0        : e.deltaY;
        window.scrollBy({ left: dx, top: dy, behavior: 'auto' });
      }, { passive: false, capture: true });
    }
    attachWheelForward();
    setTimeout(attachWheelForward, 400);
  }

  /* ── Boot ─────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    restoreTheme();
    setupExcalidrawPage();
    setupProgress();
    setupHideOnScroll();
    setupPeek();
  });
})();
