(function () {
  var PEEK_THRESHOLD = 64;
  var root = document.documentElement;

  /* ── IMMEDIATE — runs before DOMContentLoaded ──────────────────
     Add pk-excalidraw-page to <html> synchronously so CSS palette
     and fade-in fire on the very first paint (no flash of wrong styles).
   ──────────────────────────────────────────────────────────── */
  var isExcalidrawPage = window.location.pathname.toLowerCase().includes('.excalidraw');
  if (isExcalidrawPage) {
    root.classList.add('pk-excalidraw-page');
  }

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
    /* Mirror theme class to <html> so scrollbar CSS can target it
       (::-webkit-scrollbar-thumb lives outside <body> inheritance). */
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add('theme-' + theme);
    localStorage.setItem(THEME_KEY, theme);
  }
  window.pkToggleTheme = function () {
    applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
  };
  function restoreTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) applyTheme(saved);
  }

  /* ── Page transitions across the excalidraw/normal boundary ─────
     When clicking a link that crosses the boundary (normal → excalidraw
     or excalidraw → normal), we fade the current page out first,
     then navigate. This fixes the "first-click jump" where the exit
     used to be an instant hard-cut.

     Alt + arrow (back/forward) already works because the browser
     restores the page and our html.pk-excalidraw-page rule fires
     synchronously on the incoming page.
   ──────────────────────────────────────────────────────────── */
  function setupPageTransitions() {
    var currentIsExcalidraw = isExcalidrawPage;
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' ||
          href.indexOf('mailto:') === 0 ||
          href.indexOf('javascript:') === 0 ||
          link.target === '_blank') return;

      var targetIsExcalidraw = href.toLowerCase().indexOf('.excalidraw') !== -1;
      if (targetIsExcalidraw === currentIsExcalidraw) return; /* same type — no transition needed */

      /* Cross-boundary: fade out current page, then navigate */
      e.preventDefault();
      var body = document.body;
      body.style.transition = 'opacity 180ms ease, transform 180ms ease';
      body.style.opacity    = '0';
      body.style.transform  = 'translateY(-5px)';
      setTimeout(function () { window.location.href = href; }, 185);
    });
  }

  /* ── Short-note detection ───────────────────────────────────────
     When the note is short enough that the footer is visible in
     the initial viewport, the IntersectionObserver in footer-contact.njk
     immediately adds pk-sidebar-end — fading the whole sidebar to
     opacity:0 and hiding the graph and backlinks too.

     Fix: add pk-short-note to <body>.
       CSS then:
         • Cancels the sidebar fade-out (sidebar stays fully visible)
         • Hides only .toc (pointless without scrolling)
         • Keeps graph view + backlinks
   ──────────────────────────────────────────────────────────── */
  function setupShortNoteDetection() {
    if (isExcalidrawPage) return;
    if (document.querySelector('.content.canvas-page')) return;
    var footer = document.querySelector('#contact, .pk-footer');
    if (!footer) return;
    /* Footer is already in the viewport — this is a short note */
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      document.body.classList.add('pk-short-note');
    }
  }

  /* ── Excalidraw dedicated pages ──────────────────────────── */
  function setupExcalidrawPage() {
    if (!isExcalidrawPage) return;
    document.body.classList.add('pk-excalidraw-page');

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
    setupPageTransitions();
    setupShortNoteDetection();
    setupProgress();
    setupHideOnScroll();
    setupPeek();
  });
})();
