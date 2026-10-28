export const scaleLevels = [
  {
    id: "earth", name: "Earth", measure: "≈ 12,742 km", unit: "MEAN DIAMETER",
    description: "A planet roughly 12,742 km across, measured from one side through its centre to the other. The familiar baseline for every journey outward.",
    caveat: "Earth's mean diameter is a rounded reference value; the planet is slightly wider at the equator."
  },
  {
    id: "solar", name: "Solar System", measure: "≈ 4.5 light-hours", unit: "SUN TO NEPTUNE / APPROX.",
    description: "The Sun's gravitational neighbourhood extends well beyond the planets. Neptune orbits at about 30 astronomical units; the distant Oort Cloud is much farther out.",
    caveat: "There is no single sharp edge to the Solar System; this reference uses Neptune's orbit, not the full extent of the Sun's influence."
  },
  {
    id: "milky-way", name: "Milky Way", measure: "≈ 100,000 light-years", unit: "DISK DIAMETER / APPROX.",
    description: "Our barred spiral galaxy contains the Sun and hundreds of billions of stars. Its disk is about 100,000 light-years across, with less sharply bounded outer regions.",
    caveat: "Galaxy size depends on what is counted as its edge; this is a rounded estimate for the stellar disk."
  },
  {
    id: "local-group", name: "Local Group", measure: "≈ 10 million light-years", unit: "REGION / APPROX.",
    description: "A gravitationally associated collection of galaxies that includes the Milky Way, Andromeda, and dozens of smaller members.",
    caveat: "The Local Group has no crisp boundary; this span is a broad, approximate description of its member-galaxy region."
  },
  {
    id: "observable", name: "Observable universe", measure: "≈ 93 billion light-years", unit: "DIAMETER / APPROX.",
    description: "The region from which light has had time to reach us since the early universe. Cosmic expansion means its present-day radius is much larger than the universe's age in light-years.",
    caveat: "Observable means observable from our location—not the entire universe, whose total extent is unknown."
  }
];
