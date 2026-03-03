/* ═══════════════════════════════════════
   PORTFOLIO — MAIN.JS
   Clean interactions, no card rotations
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 50);

    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  reveals.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for nav links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Navbar collapse close on link click (mobile) ──
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // ── Stagger project cards on scroll ──
  const cards = document.querySelectorAll('.project-card');
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    cardObserver.observe(card);
  });

  // ── Parallax for hero floral background ──
  const heroFloral = document.querySelector('.hero-floral-bg');
  if (heroFloral) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const hero = document.querySelector('.hero');
      if (hero && scrolled < hero.offsetHeight) {
        const offset = scrolled * 0.12;
        heroFloral.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
      }
    }, { passive: true });
  }

  // ── Floating botanical animation delays ──
  const floatingBotanicals = document.querySelectorAll('.floating-botanical');
  floatingBotanicals.forEach((botanical, index) => {
    botanical.style.animationDelay = `${index * 0.5}s`;
  });

  // ── Skills tag entrance stagger ──
  const skillGroups = document.querySelectorAll('.skill-group');
  const skillGroupObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, j) => {
          tag.style.opacity = '0';
          tag.style.transform = 'translateY(10px)';
          tag.style.transition = `opacity 0.4s ease ${j * 60}ms, transform 0.4s ease ${j * 60}ms`;
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, 100 + j * 60);
        });
        skillGroupObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillGroups.forEach(group => skillGroupObserver.observe(group));

  // ── Section analytics ──
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(`Section viewed: ${entry.target.id}`);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  console.log('✨ Portfolio loaded.');
});
