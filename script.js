// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Scrollspy: highlight active nav link
const navAnchors = document.querySelectorAll('.nav-links a[data-section]');
const sections = Array.from(navAnchors)
  .map(a => document.getElementById(a.dataset.section))
  .filter(Boolean);

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => spyObserver.observe(section));

// Back-to-top button
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTopBtn.classList.toggle('visible', window.scrollY > 600);
});
toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
