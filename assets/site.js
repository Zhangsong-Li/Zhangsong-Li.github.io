/* Color preference is applied before paint and remembered between pages. */
(() => {
  const key = 'zhangsong-page-theme';
  const valid = value => ['system', 'light', 'dark'].includes(value);
  let theme = 'system';
  try { const saved = localStorage.getItem(key); if (valid(saved)) theme = saved; } catch (_) {}
  function apply(value) {
    if (value === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = value;
  }
  apply(theme);
  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.querySelector('[data-theme-picker]');
    if (!picker) return;
    picker.value = theme;
    picker.addEventListener('change', () => {
      theme = valid(picker.value) ? picker.value : 'system';
      apply(theme);
      try { localStorage.setItem(key, theme); } catch (_) {}
    });
  });
})();
