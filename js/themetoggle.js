document.addEventListener('DOMContentLoaded', () => {
  // Helper to update the icon element if present
  function updateIcon(isLight) {
    // Update any matching icon elements: #themeIcon, elements with data-theme-icon,
    // or any img inside .theme-toggle buttons.
    const selectors = ['#themeIcon', '[data-theme-icon]', '.theme-toggle img'];
    const els = document.querySelectorAll(selectors.join(','));
    if (!els || els.length === 0) return;
    els.forEach((themeIcon) => {
      if (!themeIcon) return;
      if (isLight) {
        themeIcon.src = 'assets/icons/moon-full-moon.svg';
        themeIcon.alt = 'Switch to dark mode';
      } else {
        themeIcon.src = 'assets/icons/sun.png';
        themeIcon.alt = 'Switch to light mode';
      }
    });
  }

  // Read saved preference (default dark)
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light");
    updateIcon(true);
  } else {
    document.body.classList.remove("light");
    updateIcon(false);
  }

  // Toggle action (reusable)
  function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    updateIcon(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  // If the button exists now, add direct listener and pointer cursor
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.cursor = 'pointer';
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTheme();
    });
  }

  // Event delegation: handle clicks even if navbar is injected later
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('#themeToggle');
    if (btn) {
      toggleTheme();
    }
  });

  // Keyboard accessibility: Enter / Space toggles when focused
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (!active) return;
    if (active.id === 'themeToggle' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Observe DOM changes and update icons if navbar/theme elements are injected later
  const observer = new MutationObserver((mutations) => {
    let found = false;
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            if (n.querySelector && (n.querySelector('#themeToggle') || n.querySelector('#themeIcon') || n.querySelector('.theme-toggle'))) {
              found = true;
            }
          }
        });
      }
    }
    if (found) {
      // re-run update to sync icons
      const isLight = document.body.classList.contains('light');
      updateIcon(isLight);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
