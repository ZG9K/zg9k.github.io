# Copilot Instructions for DisneylandToday Web Project

## Project Overview
- This is a static web project that recreates the Disneyland Today Broadcast Channel experience for browsers and TVs.
- The main app is in `disneylandToday/` and uses the Theme Park API (https://api.themeparks.wiki/) for live park and hotel data.
- The UI is optimized for 1080x1920 (vertical FHD) screens, with limited mobile support.

## Key Components
- `disneylandToday/view.html`: Main UI entry point.
- `disneylandToday/script.js`: Core logic for fetching API data, updating UI, handling music, and user settings.
- `disneylandToday/styles.css`: Custom styles for the broadcast look.
- `disneylandToday/assets/`: Images, icons, fonts, and weather SVGs.
- `projects/`, `work/`: Not part of the main app; ignore unless specifically referenced.

## Data Flow & API Integration
- All live data (wait times, closures, weather, hotel status) is fetched from Theme Park API endpoints in `script.js`.
- Park and hotel IDs are hardcoded; see comments in `script.js` for reference.
- Tips and static content are currently stored as JS arrays in `script.js`.

## Developer Workflows
- No build step; edit HTML/CSS/JS directly and reload in browser.
- No test suite or CI/CD; manual browser testing is standard.
- For local development, open `view.html` in a browser. For deployment, copy files to a static host (e.g., GitHub Pages).

## Project-Specific Patterns
- All user settings are managed via checkboxes and saved to `localStorage`.
- Music options are hardcoded in a JS object; audio is played via the browser's Audio API.
- UI panels (settings, audio, info) are toggled via JS, not via routing.
- Weather icons and park backgrounds are selected based on API data and user settings.
- All time/date logic uses browser JS Date APIs, with timezone support for Anaheim.

## Conventions & Recommendations
- Keep all park/hotel/tip data in JS for simplicity unless it grows too large; then consider a separate file.
- Use only vanilla JS, HTML, and CSS; no frameworks or build tools.
- Maintain the vertical FHD layout and avoid mobile-first changes unless explicitly requested.
- When adding new features, follow the pattern of storing config/state in JS and updating the DOM directly.
- For new park support, add new IDs and tips arrays in `script.js` and update UI logic accordingly.

## Example: Adding a New Park
- Add park ID and name to `locations` array in `script.js`.
- Add a new tips array for the park.
- Update `isActive()` and `populateWaitTimes()` logic to support the new park.

---

If any section is unclear or missing, please provide feedback so this guide can be improved for future AI agents.
