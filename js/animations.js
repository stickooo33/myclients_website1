// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach(el => observer.observe(el));
// Staggered reveal for grouped items
const staggerGroups = document.querySelectorAll('[data-stagger]');

staggerGroups.forEach(group => {
  const items = group.querySelectorAll('.reveal');

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
  });
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Page transition fade
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-visible');
});

// Fade out on page navigation
document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Don't fade if it's a same-page link or external
    if (href && !href.startsWith('#') && href !== window.location.pathname) {
      e.preventDefault();
      document.body.classList.remove('page-visible');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  });
});

