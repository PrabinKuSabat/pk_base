(function () {
  "use strict";

  var root = document.documentElement;
  var themeButton = document.querySelector("[data-pk-theme-toggle]");
  var themeColor = document.querySelector("[data-theme-color]");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.classList.remove("theme-dark", "theme-light");
    root.classList.add("theme-" + theme);
    if (document.body) {
      document.body.classList.remove("theme-dark", "theme-light");
      document.body.classList.add("theme-" + theme);
    }
    if (themeButton) {
      themeButton.setAttribute("aria-pressed", String(theme === "dark"));
      themeButton.setAttribute("aria-label", theme === "dark" ? "Use light theme" : "Use dark theme");
    }
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0b0e0f" : "#f4f5f2");
  }

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  applyTheme(currentTheme());

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      var update = function () {
        applyTheme(next);
        try {
          localStorage.setItem("pk-theme", next);
        } catch (error) {}
      };
      if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.startViewTransition(update);
      } else {
        update();
      }
    });
  }

  var homeLink = document.querySelector("[data-pk-nav-home]");
  if (homeLink && location.pathname === "/") homeLink.setAttribute("aria-current", "page");

  var navbar = document.querySelector(".pk-navbar");
  var ticking = false;
  function updateProgress() {
    var maximum = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    var percentage = Math.min(100, Math.max(0, (scrollY / maximum) * 100));
    if (navbar) navbar.style.setProperty("--pk-progress", percentage.toFixed(2) + "%");
    ticking = false;
  }
  addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();

  if (document.body.classList.contains("journal-note")) {
    var content = document.querySelector(".content");
    var header = content && content.querySelector("header");
    if (content && header) {
      var words = content.innerText.trim().split(/\s+/).filter(Boolean).length;
      var meta = document.createElement("p");
      meta.className = "pk-reading-meta";
      meta.textContent = Math.max(1, Math.ceil(words / 210)) + " min read · " + words.toLocaleString("en-GB") + " words";
      header.append(meta);
    }
  }
})();
