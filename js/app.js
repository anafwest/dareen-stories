const CATEGORY_ORDER = [
  "قصص من كتب",
  "روايات",
  "قصص الأنبياء",
  "حكم",
  "آداب",
  "شعر",
];

const storiesRoot = document.getElementById("stories-root");
const storyPage = document.getElementById("story-page");

function storyCard(story) {
  const card = document.createElement("a");
  card.className = "story-card";
  card.href = `story.html?id=${encodeURIComponent(story.id)}`;
  card.innerHTML = `
    <img class="story-card__cover" src="${story.image}" alt="غلاف ${story.title}" loading="lazy" width="400" height="250">
    <div class="story-card__body">
      <span class="story-card__category">${story.category}</span>
      <h2 class="story-card__title">${story.title}</h2>
      <p class="story-card__excerpt">${story.excerpt || ""}</p>
      <span class="story-card__more">اقرأ ←</span>
    </div>
  `;
  return card;
}

function renderHome() {
  if (!storiesRoot || !window.STORIES) return;

  const groups = new Map();
  window.STORIES.forEach((story) => {
    const key = CATEGORY_ORDER.includes(story.category) ? story.category : "قصص من كتب";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(story);
  });

  storiesRoot.innerHTML = "";

  CATEGORY_ORDER.forEach((category) => {
    const items = groups.get(category);
    if (!items || !items.length) return;

    const section = document.createElement("section");
    section.className = "category-section";

    const head = document.createElement("div");
    head.className = "category-section__head";
    head.innerHTML = `
      <h2 class="category-section__title">${category}</h2>
      <span class="category-section__line"></span>
      <span class="category-section__count">${items.length} قصة</span>
    `;

    const grid = document.createElement("div");
    grid.className = "stories__grid";
    items.forEach((story) => grid.appendChild(storyCard(story)));

    section.appendChild(head);
    section.appendChild(grid);
    storiesRoot.appendChild(section);
  });
}

function renderStory() {
  if (!storyPage || !window.STORIES) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const story = window.STORIES.find((item) => item.id === id);

  if (!story) {
    storyPage.innerHTML = `
      <div class="story-article__header">
        <h1 class="story-article__title">القصة غير موجودة</h1>
        <a href="index.html" class="back-btn">العودة للقصص</a>
      </div>
    `;
    return;
  }

  document.title = `${story.title} | قصص دارين`;

  storyPage.innerHTML = `
    <img class="story-article__cover" src="${story.image}" alt="غلاف ${story.title}" width="860" height="376">
    <header class="story-article__header">
      <span class="story-article__type">${story.category}</span>
      <h1 class="story-article__title">${story.title}</h1>
    </header>
    <div class="story-article__body">
      ${story.content.map((p) => `<p>${p}</p>`).join("")}
    </div>
    <div class="story-article__footer">
      <a href="index.html" class="back-btn">← العودة إلى كل القصص</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderStory();
});
