// Smooth scroll for navbar
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Simple animation on scroll
const cards = document.querySelectorAll(".resource-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));


document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("homeLink");

  if (homeLink) {
    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Redirect to your main page
      window.location.href = "main.html"; // <-- change to your actual main page
    });
  }
});