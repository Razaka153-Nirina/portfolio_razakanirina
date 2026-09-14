// =============================================
// ACTIVE LINK au scroll — uniquement sur index.html
// =============================================
const isHomePage = document.querySelector('section#hero') !== null;

if (isHomePage) {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });

    links.forEach(l => {
      const href = l.getAttribute('href') || '';
      l.classList.remove('active');
      if (current && href.includes('#' + current)) {
        l.classList.add('active');
      }
    });
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

// =============================================
// FLÈCHE SCROLL
// =============================================
const scrollCta = document.querySelector('.hero-scroll-cta');
if (scrollCta) {
  window.addEventListener('scroll', () => {
    scrollCta.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
}

// =============================================
// RÉVÉLATION AU SCROLL (IntersectionObserver)
// =============================================
const revealItems = document.querySelectorAll('.reveal');
if (typeof IntersectionObserver === 'function') {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

// =============================================
// PARALLAXE HERO
// =============================================
const heroLeft  = document.querySelector('.hero-left');
const heroRight = document.querySelector('.hero-right');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const o = window.scrollY * 0.25;
    if (heroLeft)  heroLeft.style.transform  = `translateY(${o}px)`;
    if (heroRight) heroRight.style.transform = `translateY(${o * 0.6}px)`;
  }
}, { passive: true });

// =============================================
// PARTICULES DE FOND
// =============================================
const container = document.querySelector('.hero-particles');
if (container) {
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 16 + 5;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;
      animation-duration:${Math.random()*14+10}s;animation-delay:${Math.random()*12}s;`;
    container.appendChild(p);
  }
}