/* ============================================================
   DON VITO JERON L. REYES — Website JavaScript
   ============================================================ */

// ---- Smooth Scroll Reveal ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children inside same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 24px rgba(14,27,58,0.35)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ---- Mobile Nav Hamburger ----
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
  });
});

// ---- Smooth Scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active Nav Link Highlight ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active-nav'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active-nav');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => activeObserver.observe(s));

// ---- Gallery Lightbox (simple) ----
const galleryItems = document.querySelectorAll('.gallery-item');

// Create lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10,18,40,0.95);
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const lbImg = document.createElement('img');
lbImg.style.cssText = `
  max-width: 90vw;
  max-height: 88vh;
  border-radius: 4px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.6);
  object-fit: contain;
  border: 2px solid rgba(200,155,60,0.4);
`;
const lbCaption = document.createElement('p');
lbCaption.style.cssText = `
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Libre Baskerville', serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(232,192,106,0.85);
  white-space: nowrap;
`;
const lbClose = document.createElement('button');
lbClose.innerHTML = '✕';
lbClose.style.cssText = `
  position: absolute;
  top: 1.5rem; right: 2rem;
  background: none;
  border: none;
  color: rgba(232,192,106,0.8);
  font-size: 1.8rem;
  cursor: pointer;
  line-height: 1;
`;
lightbox.appendChild(lbImg);
lightbox.appendChild(lbCaption);
lightbox.appendChild(lbClose);
document.body.appendChild(lightbox);

function openLightbox(src, caption) {
  lbImg.src = src;
  lbCaption.textContent = caption;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span')?.textContent || '';
    openLightbox(img.src, caption);
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target !== lbImg) closeLightbox();
});
lbClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- Add active-nav CSS ----
const style = document.createElement('style');
style.textContent = `.nav-links a.active-nav { color: #e8c06a !important; } .nav-links a.active-nav::after { width: 100% !important; }`;
document.head.appendChild(style);

// ---- Page Load Animation for Hero ----
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
