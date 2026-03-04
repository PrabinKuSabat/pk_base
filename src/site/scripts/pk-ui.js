(function () {
  var PEEK_THRESHOLD = 64; // px from top to reveal navbar on hover
  var root = document.documentElement;

  /* ── Progress bar ───────────────────────────────────── */
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

  /* ── Hide navbar on scroll-down, show on scroll-up ─── */
  function setupHideOnScroll() {
    var navbar = document.querySelector('.pk-navbar');
    if (!navbar) return;

    var lastY = window.scrollY || 0;
    var ticking = false;

    function onFrame() {
      var y = window.scrollY || 0;
      var atTop = y < 10;
      var goingDown = y > lastY + 4; // small dead-zone to avoid jitter

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
      if (!ticking) {
        window.requestAnimationFrame(onFrame);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Show navbar when mouse near top ───────────────── */
  function setupPeek() {
    var body = document.body;
    var active = false;

    function set(v) {
      if (active === v) return;
      active = v;
      body.classList.toggle('pk-nav-peek', v);
    }

    window.addEventListener('mousemove', function (e) {
      set(e.clientY <= PEEK_THRESHOLD);
    }, { passive: true });

    window.addEventListener('mouseleave', function () { set(false); });
  }

  /* ── Theme toggle ────────────────────────────────────
     Digital Garden uses body class "theme-light" / "theme-dark"
     We read/write that and persist to localStorage.
  ────────────────────────────────────────────────── */
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

  /* ── Boot ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    restoreTheme();
    setupProgress();
    setupHideOnScroll();
    setupPeek();
  });
})();
