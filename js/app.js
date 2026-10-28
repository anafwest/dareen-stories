const storiesGrid = document.getElementById("stories-grid");
const storyPage = document.getElementById("story-page");

function renderHome() {
  if (!storiesGrid || !window.STORIES) return;
  storiesGrid.innerHTML = "";
  window.STORIES.forEach((story) => {
    const card = document.createElement("a");
    card.className = "story-card";
    card.href = `story.html?id=${story.id}`;
    card.innerHTML = `
      <span class="story-card__type">${story.type || "قصة قصيرة"}</span>
      <h2 class="story-card__title">${story.title}</h2>
      <p class="story-card__excerpt">${story.excerpt || ""}</p>
      <span class="story-card__more">اقرأ القصة ←</span>
    `;
    storiesGrid.appendChild(card);
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
        <a href="index.html" class="back-btn">العودة للقائمة</a>
      </div>
    `;
    return;
  }
  document.title = `${story.title} | قصص دارين`;
  storyPage.innerHTML = `
    <header class="story-article__header">
      <span class="story-article__type">${story.type || "قصة قصيرة"}</span>
      <h1 class="story-article__title">${story.title}</h1>
    </header>
    <div class="story-article__body">
      ${story.content.map((p) => `<p>${p}</p>`).join("")}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderStory();
});
