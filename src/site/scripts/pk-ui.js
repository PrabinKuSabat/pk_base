(function () {
  const NAV_PEEK_PX = 72;

  function setupProgress() {
    const navbar = document.querySelector(".pk-navbar");
    if (!navbar) return;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.max(0, Math.min(100, (scrollTop / max) * 100));
      navbar.style.setProperty("--rzl-progress-pct", pct.toFixed(2) + "%");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function setupHideOnScroll() {
    const navbar = document.querySelector(".pk-navbar");
    if (!navbar) return;

    let lastY = window.scrollY || 0;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY;
      const nearTop = y < 10;

      if (nearTop) {
        navbar.classList.remove("is-hidden");
      } else if (goingDown) {
        navbar.classList.add("is-hidden");
      } else {
        navbar.classList.remove("is-hidden");
      }

      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  function setupTopPeek() {
    const body = document.body;
    let peek = false;

    const setPeek = (v) => {
      if (peek === v) return;
      peek = v;
      body.classList.toggle("pk-nav-peek", v);
    };

    window.addEventListener("mousemove", (e) => {
      setPeek(e.clientY <= NAV_PEEK_PX);
    }, { passive: true });

    window.addEventListener("mouseleave", () => setPeek(false));
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupProgress();
    setupHideOnScroll();
    setupTopPeek();
  });
})();
