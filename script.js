const newsAPI = 'https://run.mocky.io/v3/f8300dfd-2ec7-4e45-a6df-0997723cee4c';
const financeAPI = 'https://run.mocky.io/v3/b37b68f4-82b3-4872-8040-4d32bef97d98';
const weatherAPI = 'https://run.mocky.io/v3/bbb7046f-bb4d-4bc2-8ad8-9ebfa6c93e98';
let currentIndex = 0;
let newsList = [];

function showNews(index) {
  const box = document.getElementById("newsBox");
  if (newsList.length > 0) {
    const news = newsList[index];
    box.innerHTML = `
      <div class="news-visual-box">
        <img src="${news.image}" alt="Haber Görseli">
        <div class="news-title-overlay">${news.title.toUpperCase()}</div>
      </div>
    `;
  }
}

function nextNews() {
  if (currentIndex < newsList.length - 1) {
    currentIndex++;
    showNews(currentIndex);
  }
}

function prevNews() {
  if (currentIndex > 0) {
    currentIndex--;
    showNews(currentIndex);
  }
}

fetch(newsAPI)
  .then(res => res.json())
  .then(data => {
    newsList = data.news;
    showNews(currentIndex);
  });

fetch(financeAPI)
  .then(res => res.json())
  .then(data => {
    const bar = document.getElementById("financeInfoBar");
    const content = data.items.map(item => `${item.title}: ${item.value}`).join(" | ");
    bar.textContent = content;
  });

fetch(weatherAPI)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("weatherCards");
    data.forecast.forEach(day => {
      const card = document.createElement("div");
      card.className = "weather-card";
      card.innerHTML = `
        <h4>${day.day}</h4>
        <p>${day.temp}°C</p>
        <p>${day.condition}</p>
      `;
      container.appendChild(card);
    });
  });

function closeAd(id) {
  document.getElementById(id).style.display = "none";
}