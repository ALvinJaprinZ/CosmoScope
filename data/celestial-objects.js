export const celestialObjects = [
  {
    id: "sun", name: "Sun", type: "Star", category: "star", order: 1,
    description: "The star at the centre of our planetary system, and the source of most of the light and heat that reach Earth.",
    facts: ["A G-type main-sequence star.", "Its light takes about 8 minutes 20 seconds to reach Earth."],
    note: "The Sun is classified as a star rather than a planet; it is included here as the anchor of the planetary index.",
    source: "NASA Solar System Exploration — The Sun",
    url: "https://science.nasa.gov/sun/"
  },
  {
    id: "earth", name: "Earth", type: "Terrestrial planet", category: "planet", order: 2,
    description: "Our home world: an ocean-covered planet with a protective atmosphere and the only known life in the universe.",
    facts: ["Third planet from the Sun.", "Mean diameter is approximately 12,742 km."],
    note: "Diameter is a rounded mean value; Earth is not a perfect sphere.",
    source: "NASA Solar System Exploration — Earth",
    url: "https://science.nasa.gov/earth/"
  },
  {
    id: "moon", name: "Moon", type: "Natural satellite", category: "moon", order: 3,
    description: "Earth's only natural satellite, shaped by impact, volcanism, and billions of years of exposure to space.",
    facts: ["Average distance from Earth is about 384,400 km.", "Its gravity helps drive Earth's ocean tides."],
    note: "The average distance varies because the Moon's orbit is elliptical.",
    source: "NASA Solar System Exploration — Moon",
    url: "https://science.nasa.gov/moon/"
  },
  {
    id: "mars", name: "Mars", type: "Terrestrial planet", category: "planet", order: 4,
    description: "A cold desert world with ancient river valleys, giant volcanoes, and a thin carbon-dioxide atmosphere.",
    facts: ["Fourth planet from the Sun.", "Home to Olympus Mons, the largest volcano known in the Solar System."],
    note: "The history of Martian water and habitability remains an active area of research.",
    source: "NASA Solar System Exploration — Mars",
    url: "https://science.nasa.gov/mars/"
  },
  {
    id: "jupiter", name: "Jupiter", type: "Gas giant", category: "planet", order: 5,
    description: "The largest planet in the Solar System, with bands of clouds and a family of moons that includes ocean worlds.",
    facts: ["Fifth planet from the Sun.", "Its Great Red Spot is a long-lived atmospheric storm."],
    note: "Jupiter has no solid surface like Earth; its visible cloud tops define the usual reference level.",
    source: "NASA Solar System Exploration — Jupiter",
    url: "https://science.nasa.gov/jupiter/"
  },
  {
    id: "saturn", name: "Saturn", type: "Gas giant", category: "planet", order: 6,
    description: "A giant planet encircled by broad, bright rings made mostly of water-ice particles and rocky debris.",
    facts: ["Sixth planet from the Sun.", "The rings span a vast distance but are remarkably thin."],
    note: "Ring appearance changes with viewing angle as Saturn travels around the Sun.",
    source: "NASA Solar System Exploration — Saturn",
    url: "https://science.nasa.gov/saturn/"
  },
  {
    id: "andromeda", name: "Andromeda Galaxy", type: "Spiral galaxy", category: "deep-sky", order: 7,
    description: "A large neighbouring spiral galaxy and the most distant object commonly visible to the unaided eye under dark skies.",
    facts: ["Also catalogued as M31.", "Its distance is roughly 2.5 million light-years."],
    note: "Distance estimates are refined as measurement methods improve; the rounded value is for scale, not navigation.",
    source: "NASA — Andromeda Galaxy",
    url: "https://science.nasa.gov/missions/hubble/hubble-sees-the-big-picture-of-andromeda/"
  },
  {
    id: "orion-nebula", name: "Orion Nebula", type: "Star-forming nebula", category: "deep-sky", order: 8,
    description: "A nearby stellar nursery where clouds of gas and dust are illuminated by young, massive stars.",
    facts: ["Also known as M42.", "About 1,500 light-years away, within the Milky Way."],
    note: "Astronomical distances are approximate and vary by method and reference.",
    source: "NASA — Orion Nebula",
    url: "https://science.nasa.gov/missions/hubble/hubble-captures-the-orion-nebula/"
  },
  {
    id: "sagittarius-a", name: "Sagittarius A*", type: "Supermassive black hole", category: "deep-sky", order: 9,
    description: "The compact radio source at the centre of the Milky Way, associated with a supermassive black hole.",
    facts: ["Located in the direction of the constellation Sagittarius.", "The Event Horizon Telescope collaboration released its first image of the source in 2022."],
    note: "The symbol is pronounced “Sagittarius A-star”; the black hole itself is inferred through its effects and imaged surroundings.",
    source: "Event Horizon Telescope — Sagittarius A*",
    url: "https://eventhorizontelescope.org/press-release-april-2022-astronomers-reveal-first-image-black-hole-heart-our-galaxy"
  }
];
