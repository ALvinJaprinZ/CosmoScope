import { celestialObjects } from "../data/celestial-objects.js";
import { getFavorites, toggleFavorite } from "./storage.js";

const list = document.querySelector("#catalog-list");
const search = document.querySelector("#catalog-search");
const filters = document.querySelector("#category-filters");
const sort = document.querySelector("#catalog-sort");
const favoritesToggle = document.querySelector("#favorites-toggle");
const favoriteCount = document.querySelector("#favorite-count");
const resultCount = document.querySelector("#results-count");
const storageStatus = document.querySelector("#storage-status");
const empty = document.querySelector("#catalog-empty");
const dialog = document.querySelector("#object-dialog");
const dialogFavorite = document.querySelector("#dialog-favorite");

let activeCategory = "all";
let favoritesOnly = false;
let activeObject = null;

function updateFavoriteCount() {
  favoriteCount.textContent = String(getFavorites().length);
}

function renderCatalog() {
  const query = search.value.trim().toLocaleLowerCase();
  let items = celestialObjects.filter((object) => {
    const matchesText = [object.name, object.type, object.description].join(" ").toLocaleLowerCase().includes(query);
    const matchesCategory = activeCategory === "all" || object.category === activeCategory;
    const matchesSaved = !favoritesOnly || getFavorites().includes(object.id);
    return matchesText && matchesCategory && matchesSaved;
  });
  if (sort.value === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  if (sort.value === "type") items = [...items].sort((a, b) => a.type.localeCompare(b.type) || a.order - b.order);

  list.replaceChildren(...items.map((object, index) => {
    const row = document.createElement("article");
    row.className = "catalog-row";
    row.id = `object-${object.id}`;
    row.dataset.objectId = object.id;
    const number = document.createElement("span");
    number.className = "catalog-number";
    number.textContent = String(object.order).padStart(2, "0");
    const mark = document.createElement("span");
    mark.className = `object-mark object-mark-${object.category}`;
    mark.setAttribute("aria-hidden", "true");
    const nameButton = document.createElement("button");
    nameButton.className = "catalog-name";
    nameButton.type = "button";
    nameButton.textContent = object.name;
    nameButton.setAttribute("aria-label", `Open field note for ${object.name}`);
    nameButton.addEventListener("click", () => openObject(object));
    const type = document.createElement("span");
    type.className = "catalog-type";
    type.textContent = object.type;
    const description = document.createElement("p");
    description.className = "catalog-description";
    description.textContent = object.description;
    const favorite = document.createElement("button");
    favorite.className = "row-favorite";
    favorite.type = "button";
    const isSaved = getFavorites().includes(object.id);
    favorite.textContent = isSaved ? "♥" : "♡";
    favorite.setAttribute("aria-pressed", String(isSaved));
    favorite.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${object.name} ${isSaved ? "from" : "to"} favorites`);
    favorite.addEventListener("click", () => {
      const result = toggleFavorite(object.id);
      updateFavoriteCount();
      renderCatalog();
      storageStatus.textContent = result.persisted ? "" : "Storage is unavailable; this favorite will not persist after you close the page.";
      if (activeObject?.id === object.id) updateDialogFavorite();
    });
    const open = document.createElement("span");
    open.className = "catalog-open";
    open.setAttribute("aria-hidden", "true");
    open.textContent = "↗";
    row.append(number, mark, nameButton, type, description, favorite, open);
    row.style.setProperty("--row-index", String(index));
    return row;
  }));
  empty.hidden = items.length !== 0;
  resultCount.textContent = `${String(items.length).padStart(2, "0")} ${items.length === 1 ? "OBJECT" : "OBJECTS"} / ${favoritesOnly ? "SAVED SELECTION" : activeCategory === "all" ? "CURATED INDEX" : activeCategory.toUpperCase().replace("-", " ")}`;
}

function openObject(object) {
  activeObject = object;
  document.querySelector("#dialog-title").textContent = object.name;
  document.querySelector("#dialog-category").textContent = object.type.toUpperCase();
  document.querySelector("#dialog-description").textContent = object.description;
  const art = document.querySelector("#dialog-art");
  art.className = `dialog-art object-mark-${object.category}`;
  const facts = document.querySelector("#dialog-facts");
  facts.replaceChildren(...object.facts.map((fact, index) => {
    const wrapper = document.createElement("div");
    const label = document.createElement("dt");
    label.textContent = `REFERENCE 0${index + 1}`;
    const value = document.createElement("dd");
    value.textContent = fact;
    wrapper.append(label, value);
    return wrapper;
  }));
  const source = document.querySelector("#dialog-source");
  source.replaceChildren(document.createTextNode(`${object.note} Source: `));
  const sourceLink = document.createElement("a");
  sourceLink.href = object.url;
  sourceLink.target = "_blank";
  sourceLink.rel = "noopener noreferrer";
  sourceLink.textContent = object.source;
  source.append(sourceLink);
  updateDialogFavorite();
  dialog.showModal();
}

function updateDialogFavorite() {
  if (!activeObject) return;
  const saved = getFavorites().includes(activeObject.id);
  dialogFavorite.textContent = saved ? "♥  REMOVE FROM FAVORITES" : "♡  SAVE TO FAVORITES";
  dialogFavorite.setAttribute("aria-pressed", String(saved));
}

search.addEventListener("input", renderCatalog);
sort.addEventListener("change", renderCatalog);
filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll("[data-category]").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderCatalog();
});
favoritesToggle.addEventListener("click", () => {
  favoritesOnly = !favoritesOnly;
  favoritesToggle.setAttribute("aria-pressed", String(favoritesOnly));
  favoritesToggle.classList.toggle("is-active", favoritesOnly);
  renderCatalog();
});
document.querySelector("#clear-filters").addEventListener("click", () => {
  search.value = "";
  activeCategory = "all";
  favoritesOnly = false;
  favoritesToggle.setAttribute("aria-pressed", "false");
  favoritesToggle.classList.remove("is-active");
  filters.querySelectorAll("[data-category]").forEach((item) => {
    const selected = item.dataset.category === "all";
    item.classList.toggle("is-active", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
  renderCatalog();
});
dialogFavorite.addEventListener("click", () => {
  if (!activeObject) return;
  const result = toggleFavorite(activeObject.id);
  updateFavoriteCount();
  updateDialogFavorite();
  renderCatalog();
  storageStatus.textContent = result.persisted ? "" : "Storage is unavailable; this favorite will not persist after you close the page.";
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

updateFavoriteCount();
renderCatalog();
