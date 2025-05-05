// MV Agency — interactive behaviours (script.js)
// ------------------------------------------------------------
// 1. Burger‑menu toggle
// 2. Smooth scroll for internal anchors
// 3. Scroll‑reveal animation via IntersectionObserver
// 4. Hover effects: neon‑glow buttons & service‑card outline
// ------------------------------------------------------------

// --- 1. Burger menu toggle -----------------------------
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav__links--open");
    burger.classList.toggle("burger--open");
  });
  // авто‑закрытие при выборе ссылки (на мобиле)
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("nav__links--open");
      burger.classList.remove("burger--open");
    })
  );
}

// --- 2. Smooth scroll ----------------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetID);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// --- 3. Scroll‑reveal animation ------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// --- 4. Dynamic CSS injection for hover effects --------
const style = document.createElement("style");
style.textContent = `
  .btn-primary {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 16px var(--accent);
  }

  .service-card {
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid transparent;
  }
  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 12px var(--accent);
    border-color: var(--accent);
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);
