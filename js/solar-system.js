const planetNotes = {
  mercury: ["Mercury", "01", "The smallest planet and the closest to the Sun. Its heavily cratered surface records an ancient history of impacts."],
  venus: ["Venus", "02", "A rocky world wrapped in a dense atmosphere. Its surface pressure and temperatures are extreme by Earth standards."],
  earth: ["Earth", "03", "Our home world is the only place known to support life. Its liquid-water surface and atmosphere make it a remarkable vantage point for observing the rest of the Solar System."],
  mars: ["Mars", "04", "A cold desert world with evidence of a wetter past. Robotic missions study its geology and search for clues about ancient habitability."],
  jupiter: ["Jupiter", "05", "The Solar System's largest planet, with a deep atmosphere and an extensive moon system that includes icy ocean-world candidates."],
  saturn: ["Saturn", "06", "A gas giant whose striking rings are made from countless pieces of ice and rock orbiting in a thin disk."],
  uranus: ["Uranus", "07", "An ice giant with an extreme axial tilt. Its unusual orientation gives it seasons unlike those of the other major planets."],
  neptune: ["Neptune", "08", "A distant ice giant with powerful winds. Its discovery combined mathematical prediction with telescopic observation."]
};

const diagram = document.querySelector("#solar-svg");
const planetLink = document.querySelector("#planet-catalog-link");
let selected = "earth";

function selectPlanet(id) {
  const note = planetNotes[id];
  if (!note) return;
  selected = id;
  document.querySelectorAll(".solar-planet").forEach((planet) => {
    const active = planet.dataset.planet === selected;
    planet.classList.toggle("is-selected", active);
    planet.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#planet-name").textContent = note[0];
  document.querySelector("#planet-index").textContent = note[1];
  document.querySelector("#planet-copy").textContent = note[2];
  const catalogId = id === "earth" || id === "mars" || id === "jupiter" || id === "saturn" ? id : null;
  planetLink.hidden = !catalogId;
  if (catalogId) planetLink.href = `#object-${catalogId}`;
  planetLink.textContent = `Find ${note[0]} in the index ↗`;
}

diagram.addEventListener("click", (event) => {
  const planet = event.target.closest(".solar-planet");
  if (planet) selectPlanet(planet.dataset.planet);
});
diagram.addEventListener("keydown", (event) => {
  const planet = event.target.closest(".solar-planet");
  if (planet && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    selectPlanet(planet.dataset.planet);
  }
});

const motionToggle = document.querySelector("#motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = reducedMotion.matches;
if (paused) diagram.pauseAnimations();

function updateMotionControl() {
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.querySelector("span:first-child").textContent = paused ? "▶" : "Ⅱ";
  motionToggle.querySelector("span:last-child").textContent = paused ? "RESUME MOTION" : "PAUSE MOTION";
}

motionToggle.addEventListener("click", () => {
  paused = !paused;
  if (paused) diagram.pauseAnimations();
  else diagram.unpauseAnimations();
  updateMotionControl();
});
reducedMotion.addEventListener("change", (event) => {
  if (!event.matches || paused) return;
  paused = true;
  diagram.pauseAnimations();
  updateMotionControl();
});
const speed = document.querySelector("#orbit-speed");
const orbitalPeriods = { mercury: 12, venus: 22, earth: 36, mars: 68, jupiter: 110, saturn: 170, uranus: 240, neptune: 300 };
speed.addEventListener("input", () => {
  const pace = Number(speed.value);
  const paceLabel = `${pace}×`;
  document.querySelector("#orbit-speed-value").value = paceLabel;
  speed.setAttribute("aria-valuetext", paceLabel);
  document.querySelectorAll(".solar-planet").forEach((planet) => {
    const animation = planet.querySelector("animateMotion");
    animation.setAttribute("dur", `${orbitalPeriods[planet.dataset.planet] / pace}s`);
  });
});
updateMotionControl();
selectPlanet(selected);
