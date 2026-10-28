# COSMOSCOPE

**An independent digital observatory for curious people.** COSMOSCOPE is a static, browser-based field guide to selected astronomical objects, NASA's Astronomy Picture of the Day, and the immense scales beyond Earth.

> The project is educational and independent. It is not affiliated with NASA and is not a live astronomical database or ephemeris.

## Features

- Editorial, responsive observatory design with original SVG identity and diagrams.
- NASA APOD integration with date navigation, image/video handling, attribution, retry and clearly labeled offline fallback.
- Searchable, filterable, sortable index of nine curated objects with accessible field notes and device-local favorites.
- Selectable solar-system illustration with pause/resume and adjustable motion; explicitly not to scale.
- Keyboard-operable scale explorer with direct level selection, previous/next frame controls, a live step counter, and carefully qualified approximate measurements.
- No framework, package manager, backend, or build step.

## Preview and screenshots

- **Live demo:** _Not deployed. Add the verified URL here after publishing._
- **Screenshots:** _Desktop and mobile layouts were reviewed in a local browser; no screenshot files are bundled yet._

## Technology

- HTML, CSS, SVG and native JavaScript ES modules.
- NASA Open APIs — Astronomy Picture of the Day.
- `localStorage` for favorites and an optional user-supplied APOD API key.

## Project structure

```text
.
├── assets/                 # Original SVG brand mark and favicon
├── css/styles.css          # Tokens, responsive layout and motion
├── data/                   # Curated, offline celestial-object notes
├── docs/                   # GitHub profile README draft
├── js/                     # APOD, catalog, solar, scale and storage modules
├── config.example.js       # Safe, optional project-settings template
├── index.html
├── LICENSE
└── README.md
```

To show the repository link in the footer, set `repositoryUrl` to the verified public repository URL in `config.example.js`. Leave it blank until the real repository exists.

## Run locally

ES modules and browser fetch requests require HTTP; do not open `index.html` directly as a `file:` URL.

With Python installed:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. Stop the server with Ctrl+C. A compatible static HTTP server can be used instead.

## NASA API configuration and limits

The site uses `DEMO_KEY` unless you enter an optional NASA API key under **NASA API settings**. The chosen key is stored in this browser's local storage and can be removed there. It is not written to project files. A client-side key is visible to the person using browser developer tools; do not put confidential credentials in a static website. NASA's shared demo key has strict rate limits, so a busy shared demo may return an error. When a request fails, COSMOSCOPE shows a designed fallback clearly labeled as a local demonstration—not NASA content.

APOD images, video embeds, titles, dates, explanations, and creator attribution are used only when returned by the API. NASA imagery may have separate creator rights and attribution requirements; follow the credit provided by NASA. Videos are sandboxed embeds and may not be playable from every source.

API: [NASA APOD documentation](https://api.nasa.gov/) · [APOD archive](https://apod.nasa.gov/apod/astropix.html).

## Publish with GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
3. Wait for the Pages deployment to complete and verify the site URL.

For a project repository, the expected URL is `https://<username>.github.io/<repository-name>/`. For a user-site repository named exactly `<username>.github.io`, it is `https://<username>.github.io/`. These are formats only; no deployment has been performed or verified. Relative asset paths in this site support GitHub Pages project paths.

## Accessibility and browser support

The page uses landmarks, a skip link, labeled controls, visible keyboard focus, a native accessible dialog, text alternatives, and reduced-motion handling. Modern browsers with ES module support are expected. APOD requires an internet connection; the curated index and illustrations work offline once the page files are available.

## Data sources and attribution

Curated object facts are rounded orientation notes, not precision navigation data. References appear alongside each object's field note:

- [NASA Solar System Exploration](https://science.nasa.gov/solar-system/) for Sun, Earth, Moon, Mars, Jupiter, and Saturn.
- [NASA Hubble: Andromeda](https://science.nasa.gov/missions/hubble/hubble-sees-the-big-picture-of-andromeda/) for the M31 reference.
- [NASA Hubble: Orion Nebula](https://science.nasa.gov/missions/hubble/hubble-captures-the-orion-nebula/) for M42.
- [Event Horizon Telescope: Sagittarius A*](https://eventhorizontelescope.org/press-release-april-2022-astronomers-reveal-first-image-black-hole-heart-our-galaxy).
- Scale estimates are approximate summaries; see [NASA Solar System](https://science.nasa.gov/solar-system/), [NASA Galaxies](https://science.nasa.gov/universe/galaxies/), [NASA Local Group reference](https://imagine.gsfc.nasa.gov/features/cosmic/local_group_info.html), and [NASA's observable-universe explainer](https://science.nasa.gov/universe/).
- APOD content is served by NASA; individual image creator credits are displayed when the API supplies them.

### Brand notes

The custom mark pairs an observatory crosshair and central star with a sweeping orbit. Warm paper, charcoal, and restrained copper/gold accents make technical details legible without leaning on generic neon gradients. Playfair Display adds an editorial voice; DM Sans and DM Mono distinguish interface copy and observational metadata. System serif and sans-serif fallbacks are included.

## Known limitations

- APOD requires a network connection and can be rate-limited by NASA's demo key.
- A NASA API key entered in a browser is not secret; a static website cannot protect client-side credentials.
- The solar-system graphic is a selectable educational illustration, not an accurate, live, or proportionally scaled model.
- Celestial facts are curated and approximate, not a continuously updated catalog.

## Roadmap

- Capture and add verified screenshots after deployment.
- Expand the field guide with sourced objects and clearer uncertainty notes.
- Revisit APOD cache and offline behavior without misrepresenting stale data as live.

## License

Original project code and brand graphics are released under the MIT License; see [LICENSE](./LICENSE). NASA content and third-party imagery remain subject to their own terms and attribution.
