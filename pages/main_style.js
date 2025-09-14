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
      window.location.href = "news.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const doubtBtn = document.getElementById("DoubtSolving");

  if (doubtBtn) {
    doubtBtn.addEventListener("click", () => {
      window.location.href = "doubt.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const resourcesLink = document.getElementById("Resources");

  if (resourcesLink) {
    resourcesLink.addEventListener("click", (e) => {
      e.preventDefault(); // prevent #feed scrolling
      window.location.href = "resource.html";
    });
  }
});