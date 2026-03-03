(function () {
  const THEME_KEY = "pk_theme";
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const current = root.dataset.theme || getPreferredTheme();
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function setupThemeToggle() {
    applyTheme(getPreferredTheme());
    const btn = document.querySelector(".pk-theme-toggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  }

  function setupProgress() {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.max(0, Math.min(100, (scrollTop / max) * 100));
      root.style.setProperty("--rzl-progress-pct", pct.toFixed(2) + "%");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggle();
    setupProgress();
  });
})();
