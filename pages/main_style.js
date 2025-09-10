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
  const getStartedBtn = document.getElementById("getStartedBtn");

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      // Redirect to tech-news.html
      window.location.href = "news.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("DoubtSolving");

  if (DoubtSolving) {
    getStartedBtn.addEventListener("click", () => {
      // Redirect to tech-news.html
      window.location.href = "doubt.html";
    });
  }
});