# System Guidelines

## Purpose
This project is a lightweight static browser game prototype for a Monopoly-inspired word board experience. The current implementation presents a mobile-first "Wordopoly" board screen with a stylized HUD, animated dice, a single player token, and step-by-step movement around a looping tile ring.

This file is intended as a fast onboarding reference for other AI models and contributors. It summarizes what the system currently does, how it is structured, and what visible modifications exist in the codebase right now.

## Important Constraint
There is no git history available in this folder at the time of writing. Because of that, the changelog below is a reconstructed snapshot of the current system state, not a verified historical commit log. Future changes should append real dated entries to make this file progressively more reliable.

## Product Summary
- Product name in UI metadata: `Wordopoly`
- App type: static HTML/CSS/JavaScript prototype
- Runtime model: client-side only, no backend, no build step, no persistence
- Primary interaction: press the dice button to roll, animate the dice, and move the player token around the board
- Design direction: mobile game / casual board game interface with bright gradients, floating HUD elements, and isometric board styling

## Core Features

### 1. Single-screen game shell
- The entire app lives on one screen inside `index.html`.
- Layout is built around a mobile-sized `.game-screen`.
- Major UI regions:
  - top HUD
  - left rail status panels
  - right rail shortcut buttons
  - central board stage
  - bottom HUD with navigation buttons and dice control

### 2. Board generation in JavaScript
- The board is not hardcoded in HTML.
- `main.js` generates a ring of board coordinates with `buildRingCoordinates(7)`.
- This produces a 24-tile perimeter board.
- Tiles are converted into screen coordinates with an isometric projection helper: `toScreenPosition(x, y)`.
- Tile data is assembled by `buildTiles()`.

### 3. Tile types and labels
- Tile kinds currently supported:
  - `start`
  - `property`
  - `event`
- Tile labels are predefined in a `labels` array.
- The first tile is always the `start` tile.
- Remaining tiles rotate through the repeating `tileKinds` pattern.

### 4. Dice system
- Dice faces are limited to standard values `1` through `6`.
- Dice visuals are generated dynamically as inline SVG using `getDiceMarkup()`.
- The current face plus left/right "ghost" faces are rendered to create a rolling illusion.
- Rolling animation behavior:
  - fast face randomization during roll
  - pulse effect
  - tumbling main die
  - motion-blur ghost dice

### 5. Token movement
- The player token moves one tile at a time rather than teleporting.
- Movement wraps around the board using modulo logic.
- `moveToken(steps)` handles:
  - movement lock state
  - sequential tile stepping
  - final landing message
- The token gets a bounce animation while travelling.

### 6. Camera centering
- The board plane is translated so the current tile remains visually centered in the stage.
- `renderCamera()` recalculates translation using the current tile and viewport size.
- Camera updates also run on window resize.

### 7. HUD and interaction states
- The interface exposes live game feedback:
  - status text
  - current tile progress
  - last roll value
  - board mode text
- The roll button is disabled while rolling or moving.
- ARIA labels are updated based on control state for basic accessibility.

### 8. Decorative non-functional UI shell
- Several buttons are visual only at this stage:
  - menu
  - gift
  - VIP
  - event
  - map
  - cards
  - tasks
  - shop
- These elements help define the target product direction but currently have no game logic attached.

## Current Behavioral Flow
1. `bootstrap()` builds the tile list and sets the initial status.
2. The first render shows the board, HUD, dice, and token on tile 0.
3. User clicks the dice button.
4. `handleRoll()` enters rolling state and animates the dice for `1100ms`.
5. A final random face is chosen.
6. `moveToken()` advances the token step by step with `260ms` delays.
7. HUD updates with last roll and final landing tile label.

## State Model
The current runtime state is stored in a single `state` object in `main.js`.

Tracked fields:
- `tiles`: generated board tile array
- `position`: current tile index
- `diceFace`: currently displayed die face
- `lastRoll`: most recent completed roll
- `status`: status text shown in the HUD bubble
- `boardMode`: currently hardcoded to `solo`
- `isRolling`: true during dice animation
- `isMoving`: true during token travel

## File Responsibilities

### `index.html`
- Declares the app shell and all static UI containers.
- Provides `data-role` hooks for JavaScript rendering.
- Loads `styles.css` and `main.js`.

### `main.js`
- Owns all game logic.
- Generates tiles and positions.
- Builds dynamic SVG dice markup.
- Renders board, token, dice, HUD, and camera movement.
- Handles roll interaction and movement sequencing.

### `styles.css`
- Defines the entire visual identity of the prototype.
- Uses gradients, shadows, pseudo-elements, and animations extensively.
- Contains responsive adjustments for narrower screens.

## UX / Visual Characteristics
- Mobile-first composition constrained around a portrait game screen
- Bright pastel background gradients
- Floating white HUD panels with soft shadows
- Isometric diamond-shaped board tiles
- Centerpiece red dice button with arcade-style motion
- Cartoon token with simple layered body parts
- Decorative game-economy style labels such as `Mayor`, `Lv. 2`, `Tile`, and `Mode`

## Known Limitations
- No multiplayer
- No save/load system
- No score, money, ownership, rent, or card mechanics
- No event handling for non-dice buttons
- No board data externalization; content is hardcoded in JavaScript
- No tests
- No build tooling or package metadata
- No verified version history in this directory

## Reconstructed Changelog

### Baseline Snapshot - 2026-03-11
This section reflects the observable state of the codebase as of March 11, 2026.

- Established a one-page static `Wordopoly` prototype in `index.html`, `main.js`, and `styles.css`.
- Added a mobile-game HUD layout with top profile panel, side action rails, status bubble, and bottom navigation dock.
- Implemented dynamic 24-tile perimeter board generation using a 7x7 ring coordinate model.
- Added isometric screen projection logic so board tiles appear diagonally placed rather than flat-grid aligned.
- Introduced tile categories for `start`, `property`, and `event`.
- Added a predefined themed tile name list including labels such as `Launchpad`, `Syntax Street`, and `Final Frame`.
- Implemented a single-player token that moves tile by tile with animated travel feedback.
- Built a custom SVG dice renderer with pip layouts for all six faces.
- Added roll animation timing, random face cycling, and final face resolution.
- Added automatic camera translation so the active tile stays centered in view.
- Added HUD state updates for current tile progress, board mode, status text, and last roll.
- Added responsive CSS adjustments for narrower screens.
- Added cleanup for the dice interval on `beforeunload`.

## Guidance For Future AI Edits
- Treat this project as a prototype first, not a production game.
- Preserve the current separation of concerns unless the system grows:
  - HTML for structure
  - CSS for presentation
  - JavaScript for state and rendering
- If new mechanics are added, update this file in the same change.
- If real version control becomes available, replace reconstructed entries with commit-backed changelog notes.
- When adding new UI controls, state clearly whether they are decorative or functional.
- If board logic becomes more complex, move hardcoded board content into structured data rather than expanding inline arrays further.

## Suggested Changelog Format For Future Entries
Use this format for all new entries:

```md
### YYYY-MM-DD
- Short description of the change
- Short description of the change
```
