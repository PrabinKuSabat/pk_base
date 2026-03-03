(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------------------
     Theme toggle
     --------------------------- */
  const getTheme = () => {
    const el = document.documentElement;
    if (el.classList.contains("theme-dark") || document.body?.classList.contains("theme-dark")) return "dark";
    return "light";
  };

  const setTheme = (theme) => {
    const isDark = theme === "dark";

    document.documentElement.classList.toggle("theme-dark", isDark);
    document.documentElement.classList.toggle("theme-light", !isDark);

    if (document.body) {
      document.body.classList.toggle("theme-dark", isDark);
      document.body.classList.toggle("theme-light", !isDark);
    }

    try { localStorage.setItem("rzl-theme", theme); } catch (e) {}

    const btn = $("#rzlThemeToggle");
    if (btn) btn.setAttribute("aria-pressed", isDark ? "true" : "false");
  };

  const initThemeToggle = () => {
    const btn = $("#rzlThemeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => setTheme(getTheme() === "dark" ? "light" : "dark"));
    btn.setAttribute("aria-pressed", getTheme() === "dark" ? "true" : "false");
  };

  /* ---------------------------
     Reading progress (integrated into navbar)
     --------------------------- */
  const initProgress = () => {
    const nav = $(".navbar");
    if (!nav) return;

    const maxScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
      return Math.max(1, scrollHeight - doc.clientHeight);
    };

    const update = () => {
      const doc = document.documentElement;
      const y = doc.scrollTop || document.body.scrollTop || 0;
      const p = Math.min(1, Math.max(0, y / maxScroll()));
      nav.style.setProperty("--rzl-progress-pct", `${(p * 100).toFixed(2)}%`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  /* ---------------------------
     Reading time + word count
     (inserts under H1 inside .content)
     --------------------------- */
  const initReadingMeta = () => {
    const content = $(".content");
    if (!content) return;

    const h1 = $(".content h1");
    if (!h1) return;

    if ($(".rzl-reading-meta")) return;

    const meta = document.createElement("div");
    meta.className = "rzl-reading-meta";
    meta.innerHTML = `
      <span class="rzl-reading-meta__item" id="rzlReadTime">— min read</span>
      <span class="rzl-reading-meta__dot" aria-hidden="true">•</span>
      <span class="rzl-reading-meta__item" id="rzlWordCount">— words</span>
    `;
    h1.insertAdjacentElement("afterend", meta);

    const clone = content.cloneNode(true);
    $$("pre, code, svg, .graph, #graph-component, .graph-view-wrapper", clone).forEach(n => n.remove());

    const text = (clone.innerText || "")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) return;

    const words = text.split(" ").filter(Boolean).length;
    const wpm = 200;
    const minutes = Math.max(1, Math.ceil(words / wpm));

    const rt = $("#rzlReadTime");
    const wc = $("#rzlWordCount");
    if (rt) rt.textContent = `${minutes} min read`;
    if (wc) wc.textContent = `${words.toLocaleString()} words`;
  };

  /* ---------------------------
     Image zoom / lightbox
     --------------------------- */
  const initLightbox = () => {
    const imgs = $$(".content img")
      .filter(img => !img.closest("a") && !img.hasAttribute("data-no-lightbox"));

    if (!imgs.length) return;

    let overlay = null;

    const close = () => {
      if (!overlay) return;
      overlay.remove();
      overlay = null;
      document.body.classList.remove("rzl-lightbox-open");
      document.removeEventListener("keydown", onKeyDown);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };

    const open = (src, alt) => {
      close();

      overlay = document.createElement("div");
      overlay.className = "rzl-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Image preview");

      overlay.innerHTML = `
        <button class="rzl-lightbox__close" type="button" aria-label="Close image preview">Close</button>
        <div class="rzl-lightbox__stage"></div>
      `;

      const img = document.createElement("img");
      img.className = "rzl-lightbox__img";
      img.src = src;
      img.alt = alt || "";

      $(".rzl-lightbox__stage", overlay).appendChild(img);
      document.body.appendChild(overlay);
      document.body.classList.add("rzl-lightbox-open");

      $(".rzl-lightbox__close", overlay).addEventListener("click", close);
      overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

      document.addEventListener("keydown", onKeyDown);
      $(".rzl-lightbox__close", overlay).focus();
    };

    imgs.forEach((img) => {
      img.classList.add("rzl-lightbox-target");
      img.addEventListener("click", () => open(img.currentSrc || img.src, img.alt));
    });
  };

  /* ---------------------------
     Init
     --------------------------- */
  const init = () => {
    initThemeToggle();
    initProgress();
    initReadingMeta();
    initLightbox();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
