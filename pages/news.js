// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:"smooth"});
  });
});

// Dynamic News Feed (~50 articles with priority categories)
const newsList = document.getElementById("newsList");
const API_KEY = "305fa96e6517437198960603a6dba224";

// Categories in priority order
const categories = [
  { query: "artificial intelligence OR AI OR machine learning", label: "AI/ML" },
  { query: "cybersecurity OR hacking OR info security", label: "Cybersecurity" },
  { query: "blockchain OR crypto OR NFT", label: "Blockchain" },
  { query: "data science OR data analytics", label: "Data Science" },
  { query: "technology", label: "Other Tech" }
];

// Fetch articles for all categories
async function fetchPrioritizedNews() {
  let allArticles = [];

  for (const cat of categories) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(cat.query)}&language=en&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.articles) {
        allArticles.push(...data.articles);
      }
    } catch (err) {
      console.error(`Failed to fetch ${cat.label} news:`, err);
    }
  }

  // Display news cards (all ~50)
  newsList.innerHTML = "";
  allArticles.forEach((article, index) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-item");
    // Optional: highlight top priority article
    if(index === 0) newsCard.style.border = "2px solid #00d4ff";

    const image = document.createElement("img");
    image.classList.add("news-image");
    image.src = article.urlToImage || "https://via.placeholder.com/320x180?text=No+Image";
    newsCard.appendChild(image);

    const content = document.createElement("div");
    content.classList.add("news-content");

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = article.url;
    link.target = "_blank";
    link.textContent = article.title;
    title.appendChild(link);
    content.appendChild(title);

    if(article.description){
      const desc = document.createElement("p");
      desc.textContent = article.description;
      content.appendChild(desc);
    }

    if(article.source && article.source.name){
      const source = document.createElement("small");
      source.textContent = article.source.name;
      content.appendChild(source);
    }

    newsCard.appendChild(content);
    newsList.appendChild(newsCard);
  });
}

// Initial fetch & refresh every 10 minutes
fetchPrioritizedNews();
setInterval(fetchPrioritizedNews, 10 * 60 * 1000);
