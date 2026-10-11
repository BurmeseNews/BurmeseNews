
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categoryBox = document.getElementById("categories");
const cards = [...document.querySelectorAll(".article-card")];
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

let selectedCategory = "all";

function filterArticles() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase();

  let visible = 0;

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent;
    const description = card.querySelector(":scope > p").textContent;
    const keywords = card.dataset.search || "";
    const category = card.dataset.category || "";

    const searchableText =
      `${title} ${description} ${keywords} ${category}`
        .toLocaleLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    const show = matchesSearch && matchesCategory;

    card.hidden = !show;

    if (show) visible++;
  });

  resultCount.textContent = `ဆောင်းပါး ${visible} ပုဒ်`;
  emptyMessage.hidden = visible !== 0;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterArticles();
});

searchInput.addEventListener("input", filterArticles);

categoryBox.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryBox.querySelectorAll("button").forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });

  filterArticles();
});

filterArticles();
