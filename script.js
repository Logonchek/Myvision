// ------------------------------------------------------------
// MV Agency — interactive behaviours & dynamic styles (v2)
// ------------------------------------------------------------
// 1) Inject extra CSS for hover‑glow buttons, neon service cards
//    and scroll‑reveal animation without touching styles.css
// 2) Keep existing burger‑menu + smooth scroll logic
// ------------------------------------------------------------

// --- Dynamic CSS ---------------------------------------------------------
const style = document.createElement('style');
style.textContent = `
  /* Primary CTA button */
  .btn-primary, .btn, button[type="submit"] {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .btn-primary:hover, .btn:hover, button[type="submit"]:hover {
    transform: scale(1.06);
    box-shadow: 0 0 12px var(--accent-light);
  }

  /* Service card neon outline on hover */
  .service-card {
    position: relative;
    border: 2px solid transparent;
    transition: transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
  }
  .service-card:hover {
    transform: translateY(-6px);
    border-color: var(--accent);
    box-shadow: 0 0 12px var(--accent-light);
  }

  /* Scroll‑reveal */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal--active {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

// --- Burger menu toggle --------------------------------------------------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
    burger.classList.toggle('burger--open');
  });
}

// --- Smooth scroll for anchor links ------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Scroll‑reveal animation via IntersectionObserver --------------------
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--active');
        revealObserver.unobserve(entry.target); // reveal once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// On DOMContentLoaded ensure hero instantly visible (in case not observed)
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('reveal--active');
    }
  });
});
