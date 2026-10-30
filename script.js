const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = [...document.querySelectorAll(".nav-link")];
const backToTop = document.getElementById("backToTop");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navItems.forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Update active navigation and back-to-top visibility.
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));

window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 500));
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Simple rotating role text.
const roleElement = document.getElementById("typedRole");
const roles = ["Information Systems Student", "Web Developer Enthusiast", "IT Enthusiast"];
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) { deleting = true; setTimeout(typeRole, 1500); return; }
  } else {
    charIndex--;
    roleElement.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 38 : 70);
}
setTimeout(typeRole, 1800);

// Gallery placeholder interaction; replace placeholders with real <img> tags when ready.
const lightbox = document.getElementById("lightbox");
const lightboxCaption = document.getElementById("lightboxCaption");
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  lightboxCaption.textContent = item.dataset.caption || "Portfolio gallery";
  lightbox.classList.add("open");
}));
function closeLightbox() { lightbox.classList.remove("open"); }
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

// Subtle pointer glow on devices that support a fine pointer.
const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}
