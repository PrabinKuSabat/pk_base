(function () {
  var PEEK_THRESHOLD = 64;
  var root = document.documentElement;

  /* ── IMMEDIATE — safety guard ─────────────────────────────────
     The inline anti-FOUC script in pageheader.njk already adds
     pk-excalidraw-page to <html> synchronously before first CSS paint.
     This guard is a belt-and-suspenders fallback only.
   ──────────────────────────────────────────────────── */
  var isExcalidrawPage = window.location.pathname.toLowerCase().includes('.excalidraw');
  if (isExcalidrawPage && !root.classList.contains('pk-excalidraw-page')) {
    root.classList.add('pk-excalidraw-page');
  }

  /* ── Progress bar ──────────────────────────────────────── */
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

  /* ── Auto-hide navbar after 5 s of inactivity (all pages) ───
     Timer resets on any scroll, mousemove, touchstart, or keydown.
   ──────────────────────────────────────────────────── */
  function setupAutoHide() {
    var navbar = document.querySelector('.pk-navbar');
    if (!navbar) return;
    var idleTimer = null;

    function scheduleHide() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        navbar.classList.add('pk-nav-hidden');
      }, 5000);
    }

    scheduleHide();

    window.addEventListener('scroll',     scheduleHide, { passive: true });
    window.addEventListener('mousemove',  scheduleHide, { passive: true });
    window.addEventListener('touchstart', scheduleHide, { passive: true });
    window.addEventListener('keydown',    scheduleHide);
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

  /* ── Theme toggle ─────────────────────────────────────── */
  var THEME_KEY = 'pk_theme';
  function getCurrentTheme() {
    if (document.body.classList.contains('theme-dark')) return 'dark';
    if (document.body.classList.contains('theme-light')) return 'light';
    return localStorage.getItem(THEME_KEY) || 'light';
  }
  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
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

  /* ── Page transitions across the excalidraw/normal boundary ──── */
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
      if (targetIsExcalidraw === currentIsExcalidraw) return;

      e.preventDefault();
      var body = document.body;
      body.style.transition = 'opacity 180ms ease, transform 180ms ease';
      body.style.opacity    = '0';
      body.style.transform  = 'translateY(-5px)';
      setTimeout(function () { window.location.href = href; }, 185);
    });
  }

  /* ── Content min-height = sidebar height ────────────────────── */
  function syncContentMinHeight() {
    if (isExcalidrawPage) return;
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('main.content');
    if (!sidebar || !content) return;

    function update() {
      var h = sidebar.offsetHeight;
      if (h > 10) content.style.minHeight = h + 'px';
    }

    update();
    if (window.ResizeObserver) {
      new ResizeObserver(update).observe(sidebar);
    }
    setTimeout(update, 500);
    setTimeout(update, 1500);
  }

  /* ── Short-note detection ────────────────────────────────── */
  function setupShortNoteDetection() {
    if (isExcalidrawPage) return;
    if (document.querySelector('.content.canvas-page')) return;

    syncContentMinHeight();

    setTimeout(function () {
      var footer = document.querySelector('#contact, .pk-footer');
      if (!footer) return;
      if (footer.getBoundingClientRect().top < window.innerHeight) {
        document.body.classList.add('pk-short-note');
      }
    }, 150);
  }

  /* ── Excalidraw dedicated pages ─────────────────────────── */
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

  /* ── Copy-to-clipboard for code blocks ─────────────────────── */
  var COPY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var CHECK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  function setupCodeCopy() {
    var blocks = document.querySelectorAll('pre');
    blocks.forEach(function (pre) {
      if (pre.querySelector('.pk-copy-btn')) return;
      if (pre.closest('.pk-kanban-card')) return;

      pre.style.position = 'relative';

      var btn = document.createElement('button');
      btn.className = 'pk-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.setAttribute('title', 'Copy code');
      btn.innerHTML = COPY_ICON;

      var resetTimer = null;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var code = pre.querySelector('code');
        var text = (code ? code.innerText : pre.innerText).replace(/\r\n/g, '\n');
        copyText(text).then(function () {
          btn.innerHTML = CHECK_ICON;
          btn.classList.add('pk-copy-btn--done');
          clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            btn.innerHTML = COPY_ICON;
            btn.classList.remove('pk-copy-btn--done');
          }, 2000);
        }).catch(function () {});
      });

      pre.appendChild(btn);
    });
  }

  /* ── Active nav link highlight ────────────────────────────────
     Compares window.location.pathname against each .pk-navlink href.

     Rules:
       • Hash-only hrefs ("#contact") are skipped — they’re not pages.
       • The root link "/" matches ONLY the exact homepage ("/").
       • All other links match if the current path starts with the
         link path (so /notes/foo still lights up a "/notes/" link).
       • Adds .pk-navlink--active + aria-current="page" to the winner.
   ──────────────────────────────────────────────────────────── */
  function setupActiveNavLink() {
    var links = document.querySelectorAll('.pk-navlink');
    if (!links.length) return;

    /* Normalise current path: lowercase + ensure trailing slash */
    var currentPath = window.location.pathname.toLowerCase();
    if (currentPath !== '/' && !currentPath.endsWith('/')) currentPath += '/';

    links.forEach(function (link) {
      var raw = link.getAttribute('href');
      if (!raw || raw.charAt(0) === '#') return; /* skip hash anchors */

      /* Resolve to a clean pathname (handles relative or absolute hrefs) */
      var linkPath;
      try {
        linkPath = new URL(raw, window.location.origin).pathname.toLowerCase();
      } catch (e) {
        linkPath = raw.toLowerCase();
      }
      if (linkPath !== '/' && !linkPath.endsWith('/')) linkPath += '/';

      var isActive = (linkPath === '/')
        ? currentPath === '/'               /* homepage: exact only */
        : currentPath.startsWith(linkPath); /* sections: prefix match */

      if (isActive) {
        link.classList.add('pk-navlink--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    restoreTheme();
    setupExcalidrawPage();
    setupPageTransitions();
    setupShortNoteDetection();
    setupProgress();
    setupHideOnScroll();
    setupPeek();
    setupAutoHide();
    setupCodeCopy();
    setupActiveNavLink();
  });
})();
