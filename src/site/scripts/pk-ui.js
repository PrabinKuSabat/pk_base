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

  /* ── Scroll rescue (global) ────────────────────────────────
     If some upstream script prevents wheel/PageDown on the main
     note area, scrolling may only work via dragging the scrollbar.

     This handler forces scrolling when the pointer/focus is inside
     the main note (.content), while avoiding sidebar scrollers and
     interactive UI.
   ──────────────────────────────────────────────────────────── */
  function setupScrollRescue() {
    function scrollingEl() {
      return document.scrollingElement || document.documentElement;
    }

    function isInInteractive(target) {
      if (!target || !target.closest) return false;
      if (target.closest('.excalidraw-svg')) return true;
      if (target.closest('.rzl-lightbox')) return true;
      if (target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return true;
      return false;
    }

    function isInMainContent(target) {
      if (!target || !target.closest) return false;
      return !!target.closest('.content');
    }

    function hasScrollableAncestor(target) {
      var el = target;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.nodeType !== 1) { el = el.parentElement; continue; }
        var style = window.getComputedStyle(el);
        var oy = style.overflowY;
        if ((oy === 'auto' || oy === 'scroll') && (el.scrollHeight > el.clientHeight + 1)) return true;
        el = el.parentElement;
      }
      return false;
    }

    function normalizeWheelDelta(e) {
      var x = e.deltaX || 0;
      var y = e.deltaY || 0;
      if (e.deltaMode === 1) { /* lines */
        x *= 16;
        y *= 16;
      } else if (e.deltaMode === 2) { /* pages */
        x *= window.innerWidth;
        y *= window.innerHeight;
      }
      return { x: x, y: y };
    }

    document.addEventListener('wheel', function (e) {
      if (e.ctrlKey) return;
      if (!e.cancelable) return;
      if (!isInMainContent(e.target)) return;
      if (isInInteractive(e.target)) return;
      if (hasScrollableAncestor(e.target)) return;

      var d = normalizeWheelDelta(e);
      if (Math.abs(d.x) < 0.5 && Math.abs(d.y) < 0.5) return;

      e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else e.stopPropagation();

      var se = scrollingEl();
      var dx = e.shiftKey ? d.y : d.x;
      var dy = e.shiftKey ? 0   : d.y;
      se.scrollBy({ left: dx, top: dy, behavior: 'auto' });
    }, { capture: true, passive: false });

    document.addEventListener('keydown', function (e) {
      if (!e.cancelable) return;
      if (!isInMainContent(e.target)) return;
      if (isInInteractive(e.target)) return;

      var k = e.key;
      var se = scrollingEl();
      var vh = window.innerHeight || 800;
      var step = Math.max(120, Math.floor(vh * 0.9));

      if (k === 'PageDown') {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        else e.stopPropagation();
        se.scrollBy({ top: step, behavior: 'auto' });
      } else if (k === 'PageUp') {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        else e.stopPropagation();
        se.scrollBy({ top: -step, behavior: 'auto' });
      } else if (k === 'Home') {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        else e.stopPropagation();
        se.scrollTo({ top: 0, behavior: 'auto' });
      } else if (k === 'End') {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        else e.stopPropagation();
        se.scrollTo({ top: se.scrollHeight, behavior: 'auto' });
      } else if (k === ' ') {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        else e.stopPropagation();
        var dir = e.shiftKey ? -1 : 1;
        se.scrollBy({ top: dir * step, behavior: 'auto' });
      }
    }, { capture: true, passive: false });
  }

  /* ── Excalidraw fullscreen layout ──────────────────────────── */
  function setupExcalidrawPage() {
    var path = window.location.pathname.toLowerCase();
    if (!path.includes('.excalidraw')) return;

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
    setupScrollRescue();
    restoreTheme();
    setupExcalidrawPage();
    setupProgress();
    setupHideOnScroll();
    setupPeek();
  });
})();
