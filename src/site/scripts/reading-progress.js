(() => {
  const bar = document.getElementById("rzlProgressBar");
  if (!bar) return;

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
    bar.style.width = (p * 100).toFixed(2) + "%";
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
