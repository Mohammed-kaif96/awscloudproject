// ==========================================================================
// Atelier Nine — interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header: solid background after scroll ---- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link highlighting on scroll ---- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    // slight stagger for elements that share a row (e.g. case studies)
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    revealObserver.observe(el);
  });

  /* ---- Contact form (front-end only demo handling) ---- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in every field before sending.';
      status.style.color = '#B3402D';
      return;
    }

    // No backend wired up yet — this is where an API Gateway / Lambda
    // endpoint, or a service like Formspree, would be called instead.
    status.style.color = '';
    status.textContent = `Thanks, ${name.split(' ')[0]} — we'll be in touch within two working days.`;
    form.reset();
  });

});