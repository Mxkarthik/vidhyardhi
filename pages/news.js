// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

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
