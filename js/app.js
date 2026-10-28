import { fetchApod, APOD_FIRST_DATE } from "./api.js";
import { scaleLevels } from "./scale-explorer.js";
import { getApiKey, setApiKey, clearApiKey } from "./storage.js";
import projectSettings from "../config.example.js";
import "./catalog.js";
import "./solar-system.js";

const today = new Date().toISOString().slice(0, 10);
let selectedDate = today;
let requestController = null;
let requestTimeoutId = null;

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  navigation.classList.toggle("is-open", expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  }
});
document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());
const repositoryLink = document.querySelector("#repository-link");
if (typeof projectSettings.repositoryUrl === "string" && /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(projectSettings.repositoryUrl)) {
  repositoryLink.href = projectSettings.repositoryUrl;
  repositoryLink.hidden = false;
}

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const activeLink = navigation.querySelector(`a[href="#${entry.target.id}"]`);
    navigation.querySelectorAll("a").forEach((link) => {
      if (link === activeLink) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}, { rootMargin: "-25% 0px -65% 0px" });
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

const apodTitle = document.querySelector("#apod-title");
const apodDate = document.querySelector("#apod-date-label");
const apodExplanation = document.querySelector("#apod-explanation");
const apodVisual = document.querySelector("#apod-visual");
const apodCredit = document.querySelector("#apod-credit");
const apodStatus = document.querySelector("#apod-status");
const apodRetry = document.querySelector("#apod-retry");
const apodSource = document.querySelector("#apod-source");
const previous = document.querySelector("#apod-prev");
const next = document.querySelector("#apod-next");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function updateDateButtons() {
  previous.disabled = selectedDate <= APOD_FIRST_DATE;
  next.disabled = selectedDate >= today;
}

function showFallback(message) {
  apodVisual.replaceChildren();
  const fallback = document.createElement("div");
  fallback.className = "apod-placeholder";
  fallback.setAttribute("role", "img");
  fallback.setAttribute("aria-label", "Abstract illustration shown while NASA's astronomy picture is unavailable");
  const ring = document.createElement("span");
  ring.className = "placeholder-ring";
  ring.setAttribute("aria-hidden", "true");
  const caption = document.createElement("span");
  caption.className = "placeholder-caption";
  caption.textContent = "A LOCAL STUDY / NO LIVE IMAGE";
  fallback.append(ring, caption);
  apodVisual.append(fallback);
  apodTitle.textContent = "A local study of the night sky";
  apodDate.textContent = `${formatDate(selectedDate).toUpperCase()} / DEMONSTRATION`;
  apodExplanation.textContent = "NASA's live observation could not be loaded. This designed fallback is not NASA data; retry when a connection is available, or choose another date.";
  apodCredit.textContent = "";
  apodSource.href = "https://apod.nasa.gov/apod/astropix.html";
  apodSource.hidden = true;
  apodStatus.textContent = message;
  apodRetry.hidden = false;
}

async function loadApod() {
  if (requestController) requestController.abort();
  if (requestTimeoutId !== null) clearTimeout(requestTimeoutId);
  const controller = new AbortController();
  requestController = controller;
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);
  requestTimeoutId = timeoutId;
  apodTitle.textContent = "Today's view from the cosmos";
  apodDate.textContent = `${formatDate(selectedDate).toUpperCase()} / LOADING`;
  apodExplanation.textContent = "Connecting to NASA's Astronomy Picture of the Day…";
  apodStatus.textContent = "Requesting verified NASA APOD data.";
  apodRetry.hidden = true;
  apodSource.hidden = true;
  apodVisual.replaceChildren();
  const loading = document.createElement("div");
  loading.className = "apod-loading";
  loading.setAttribute("role", "img");
  loading.setAttribute("aria-label", "Loading astronomy picture");
  loading.innerHTML = '<span class="loading-orbit"><i></i></span><span class="micro-label">TUNING THE OBSERVATORY</span>';
  apodVisual.append(loading);
  updateDateButtons();
  try {
    const observation = await fetchApod(selectedDate, getApiKey(), controller.signal);
    if (requestController !== controller) return;
    apodDate.textContent = `${formatDate(observation.date).toUpperCase()} / NASA APOD`;
    apodTitle.textContent = observation.title;
    apodExplanation.textContent = observation.explanation;
    apodCredit.textContent = observation.copyright ? `IMAGE CREDIT: ${observation.copyright}` : "";
    apodSource.href = observation.hdUrl || observation.url;
    apodSource.hidden = false;
    apodStatus.textContent = "";
    apodRetry.hidden = true;
    const mediaTag = document.createElement("span");
    mediaTag.className = "media-tag";
    mediaTag.textContent = `NASA / APOD · ${observation.mediaType.toUpperCase()}`;
    apodVisual.replaceChildren();
    if (observation.mediaType === "image") {
      const image = document.createElement("img");
      image.className = "apod-image";
      image.src = observation.url;
      image.alt = `NASA Astronomy Picture of the Day: ${observation.title}`;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        showFallback("NASA returned an image that could not be displayed.");
      }, { once: true });
      apodVisual.append(image, mediaTag);
    } else {
      const video = document.createElement("iframe");
      video.className = "apod-video";
      video.src = observation.url;
      video.title = `NASA Astronomy Picture of the Day video: ${observation.title}`;
      video.loading = "lazy";
      video.referrerPolicy = "no-referrer";
      video.allow = "fullscreen; picture-in-picture";
      video.sandbox = "allow-scripts allow-same-origin allow-presentation";
      apodVisual.append(video, mediaTag);
    }
  } catch (error) {
    if (requestController !== controller) return;
    if (error.name === "AbortError") {
      showFallback("NASA APOD did not respond in time. Check your connection and try again.");
      return;
    }
    showFallback(error instanceof Error ? error.message : "The astronomy picture could not be loaded.");
  } finally {
    clearTimeout(timeoutId);
    if (requestTimeoutId === timeoutId) requestTimeoutId = null;
  }
}

previous.addEventListener("click", () => {
  const prior = new Date(`${selectedDate}T00:00:00Z`);
  prior.setUTCDate(prior.getUTCDate() - 1);
  selectedDate = prior.toISOString().slice(0, 10);
  loadApod();
});
next.addEventListener("click", () => {
  const following = new Date(`${selectedDate}T00:00:00Z`);
  following.setUTCDate(following.getUTCDate() + 1);
  selectedDate = following.toISOString().slice(0, 10);
  loadApod();
});
apodRetry.addEventListener("click", loadApod);

const apiKeyInput = document.querySelector("#api-key");
apiKeyInput.value = getApiKey();
document.querySelector("#api-key-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const key = apiKeyInput.value.trim();
  const saved = setApiKey(key);
  apodStatus.textContent = saved ? "Key saved on this device. Loading the selected date." : "Storage is unavailable; the key will be used until this page is closed.";
  loadApod();
});
document.querySelector("#api-key-clear").addEventListener("click", () => {
  const saved = clearApiKey();
  apiKeyInput.value = "";
  apodStatus.textContent = saved ? "Saved key removed. Using NASA's shared demo key." : "Storage is unavailable; the shared demo key will be used.";
  loadApod();
});

const scaleButtons = [...document.querySelectorAll(".scale-step")];
const previousScale = document.querySelector("#scale-previous");
const nextScale = document.querySelector("#scale-next");
function selectScale(id) {
  const level = scaleLevels.find((item) => item.id === id);
  if (!level) return;
  const index = scaleLevels.indexOf(level);
  scaleButtons.forEach((button, buttonIndex) => {
    const selected = button.dataset.scale === id;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("is-past", buttonIndex < index);
  });
  document.querySelector("#scale-name").textContent = level.name;
  document.querySelector("#scale-description").textContent = level.description;
  document.querySelector("#scale-measure").innerHTML = `${level.measure} <span>${level.unit}</span>`;
  document.querySelector("#scale-context .micro-label").textContent = `CURRENT FRAME / ${String(index + 1).padStart(2, "0")}`;
  document.querySelector("#scale-caveat").textContent = level.caveat;
  document.querySelector("#scale-ruler-fill").style.width = `${8 + index * 23}%`;
  document.querySelector("#scale-progress").textContent = `${String(index + 1).padStart(2, "0")} / ${String(scaleLevels.length).padStart(2, "0")}`;
  previousScale.disabled = index === 0;
  nextScale.disabled = index === scaleLevels.length - 1;
}
document.querySelector("#scale-steps").addEventListener("click", (event) => {
  const button = event.target.closest("[data-scale]");
  if (button) selectScale(button.dataset.scale);
});
previousScale.addEventListener("click", () => {
  const current = scaleButtons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
  if (current > 0) selectScale(scaleButtons[current - 1].dataset.scale);
});
nextScale.addEventListener("click", () => {
  const current = scaleButtons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
  if (current < scaleButtons.length - 1) selectScale(scaleButtons[current + 1].dataset.scale);
});
document.querySelector("#scale-steps").addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
  const current = scaleButtons.indexOf(document.activeElement);
  if (current < 0) return;
  event.preventDefault();
  const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(scaleButtons.length - 1, current + direction));
  scaleButtons[nextIndex].focus();
  selectScale(scaleButtons[nextIndex].dataset.scale);
});
loadApod();
