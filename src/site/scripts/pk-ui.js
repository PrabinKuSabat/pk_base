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

  /* ── Excalidraw fullscreen layout ────────────────────────────

     What this does:
     1. Detects URL containing ".excalidraw" → adds pk-excalidraw-page
     2. Fixes the SVG so all drawing elements fit (preserveAspectRatio)
     3. INTERCEPTS wheel events on the excalidraw container and
        forwards them to window.scrollBy — this makes the mouse
        wheel scroll the PAGE instead of zooming the canvas.
        Use the − / + buttons at the bottom for canvas zoom.
   ──────────────────────────────────────────────────────────── */
  function setupExcalidrawPage() {
    var path = window.location.pathname.toLowerCase();
    if (!path.includes('excalidraw')) return;

    document.body.classList.add('pk-excalidraw-page');

    /* ─ SVG fitting ───────────────────────────────────────── */
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

    /* ─ Wheel → page scroll forwarding ──────────────────────
       We capture wheel events BEFORE the excalidraw canvas
       receives them (capture:true), stop their propagation so
       the canvas never zooms, then scroll the page ourselves.
       Shift+wheel scrolls horizontally (standard behaviour).
       Click events are NOT affected, so −/+ buttons still work.
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
    setTimeout(attachWheelForward, 400); /* retry in case DG re-renders */
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
