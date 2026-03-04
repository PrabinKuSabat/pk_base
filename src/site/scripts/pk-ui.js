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
     Detects pages whose URL slug contains ".excalidraw",
     adds pk-excalidraw-page to <body>, then:
       • removes fixed width/height from every SVG
       • adds a viewBox if missing (so browser can scale it)
       • sets preserveAspectRatio="xMidYMid meet" so ALL
         drawing elements are always visible (no clipping)
     CSS then stretches the SVG container to fill the viewport
     below the navbar.
  ──────────────────────────────────────────────────────────── */
  function setupExcalidrawPage() {
    var path = window.location.pathname.toLowerCase();
    if (!path.includes('excalidraw')) return;

    document.body.classList.add('pk-excalidraw-page');

    function fitSVGs() {
      /* target the excalidraw SVG wrapper first, then fall back to any SVG in content */
      var svgs = document.querySelectorAll(
        '.excalidraw-svg svg, .content > svg, .content .excalidraw-svg svg'
      );
      if (!svgs.length) {
        /* try any SVG inside the note as a last resort */
        svgs = document.querySelectorAll('main.content svg');
      }
      svgs.forEach(function (svg) {
        var w = parseFloat(svg.getAttribute('width')  || 0);
        var h = parseFloat(svg.getAttribute('height') || 0);
        /* build viewBox from original pixel dims so the whole drawing is framed */
        if (w > 0 && h > 0 && !svg.getAttribute('viewBox')) {
          svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        }
        /* xMidYMid meet = letterbox: all elements visible, centred, never clipped */
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        /* remove fixed pixel dims so CSS can own the size */
        svg.removeAttribute('width');
        svg.removeAttribute('height');
      });
    }

    fitSVGs();
    setTimeout(fitSVGs, 250);  /* retry after any async DG rendering */
    setTimeout(fitSVGs, 800);
  }

  /* ── Boot ─────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    restoreTheme();
    setupExcalidrawPage(); /* run before progress/scroll so class is set early */
    setupProgress();
    setupHideOnScroll();
    setupPeek();
  });
})();
