# System Guidelines

## Purpose
This project is a lightweight static browser game prototype for a Monopoly-inspired word board experience. The current implementation presents a mobile-first "English Town" board screen with a stylized HUD, animated dice, a single player token, and step-by-step movement around a looping tile ring.

This file is intended as a fast onboarding reference for other AI models and contributors. It summarizes what the system currently does, how it is structured, and what visible modifications exist in the codebase right now.

## Important Constraint
Git history is available in this folder. The changelog below still includes a reconstructed snapshot for the current observed system state, but future changes should append real dated entries and keep them aligned with committed repository history.

## Product Summary
- Product name in UI metadata: `English Town`
- App type: static HTML/CSS/JavaScript prototype
- Runtime model: client-side only, no backend, no build step, with browser-local persistence via `localStorage`
- Primary interaction: press the dice button to roll, animate the dice, move the player token around the board, collect fixed coins per tile moved, and land on either regular or special tiles
- Design direction: mobile game / casual board game interface with bright gradients, floating HUD elements, and a fixed isometric board presentation

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

### 2.5. Isometric viewpoint and board space
- The game is shown from a fixed isometric point of view rather than a top-down grid.
- Logical board positions are still stored as 2D ring coordinates (`gridX`, `gridY`).
- `toScreenPosition(x, y)` converts those logical coordinates into screen coordinates using:
  - `isoX = (x - y) * (tileWidth / 2)`
  - `isoY = (x + y) * (tileHeight / 2)`
- The rendered board therefore looks like a diamond-shaped loop even though movement logic still follows the perimeter of a square ring.
- Tile layering and token layering depend on projected `screenY` so lower-on-screen objects visually sit in front.

### 3. Tile types and labels
- Tile kinds currently supported:
  - `start`
  - `regular`
  - `special`
- The first tile is always the `start` tile (`Launchpad`).
- Regular tiles are generic safe spaces with no challenge effect and no icon markup.
- Special tiles use names from the `specialTileLabels` pool, such as `Syntax Street`, `Prompt Pier`, or `Final Frame`.
- Each page load randomizes the special tile layout:
  - at least `4` special tiles
  - at most `6` special tiles
  - random non-start positions on the 24-tile ring
- Refreshing the page keeps player progress but rerolls which positions are special.

### 3.5. Coin rewards and tile outcomes
- Every movement step grants a fixed coin reward, currently `38` coins per tile moved.
- Coin rewards do not depend on tile type; they are awarded for movement itself.
- Landing outcomes:
  - `regular` tile: no extra effect, player can roll again
  - `special` tile: placeholder language-learning challenge status only for now
  - `start` tile: no special challenge, just a landing/update message
- Because coin rewards are step-based, a roll of `N` grants `N * 38` coins total by the time movement completes.

### 4. Dice system
- Dice faces are limited to standard values `1` through `6`.
- Dice visuals are generated dynamically as inline SVG using `getDiceMarkup()`.
- The current face plus left/right "ghost" faces are rendered to create a rolling illusion.
- The main roll control now tracks a finite dice inventory:
  - default usable dice count: `15`
  - no overflow dice are shown by default at bootstrap
  - the main counter is shown as `current/max` (for example `15/15`)
- The fill bar under the dice button is real DOM now, not a pseudo-element:
  - `index.html` contains a `.dice-meter-track` and `.dice-meter-fill`
  - `renderHud()` updates the fill width from `diceCount / diceMax`
- Overflow dice are rendered inside the same meter label as an extra `+N` value only when the player has actually earned overflow from a reward.
- Overflow dice are consumed before the base `diceCount`, but they do not increase the fill bar because the meter still represents only the capped `15` base dice.
- Each roll consumes one usable die immediately when `handleRoll()` starts.
- If `diceCount` reaches `0`, the roll button becomes unavailable until dice are added again.
- The small store `+` button next to the meter is present as a placeholder for future monetized dice purchases, but the purchase flow is not implemented yet.
- Rolling animation behavior:
  - fast face randomization during roll
  - pulse effect
  - tumbling main die
  - motion-blur ghost dice

### 4.5. Free dice event button
- A separate event-style `Free Dice` button is rendered above-left of the main dice control.
- It is designed to appear only when a qualifying condition is active.
- The current prototype uses a data-driven `freeDiceOffers` array with one sample condition:
  - label: `Build 5 houses`
  - reward: `5` dice
- Clicking the button claims the reward once and hides that active offer.
- If the usable dice pool is already full when the reward is claimed, the reward is added as overflow dice instead.
- If the usable pool is partially filled when the reward is claimed, it tops the pool up to `15` first and only the remainder becomes overflow.
- The animated pointing hand is decorative guidance to draw attention to the claim button.

### 5. Token movement
- The player token moves one tile at a time rather than teleporting.
- Movement wraps around the board using modulo logic.
- `moveToken(steps)` handles:
  - movement lock state
  - sequential tile stepping
  - final landing message
- The token is rendered separately from the tile markup as a single `.player-token` element positioned over the active tile.
- The token gets a bounce/jump animation while travelling.
- Each movement step has two phases:
  - first half-step: set `isJumping = true` and update facing direction
  - second half-step: advance `position` to the next tile and clear `isJumping`
- Facing is derived from the current tile's logical grid delta to the next tile via `getDirection()`.
- The token can face `SE`, `SW`, `NW`, or `NE`, and `renderBoard()` applies per-facing pixel offsets so the sprite stays visually centered on the diamond tile art.
- The token always renders slightly above the active tile with `z-index` based on the current tile's projected `screenY`.

### 5.5. Character sprite interaction model
- There is currently one playable character sprite only.
- The sprite does not have independent click, drag, or combat behavior; it is fully driven by the dice-roll loop.
- User input affects the sprite indirectly:
  - clicking the roll button triggers `handleRoll()`
  - `handleRoll()` resolves a final die face
  - `moveToken(finalFace)` advances the character step by step
- During movement, the sprite is the main visual feedback for progress:
  - it turns to face the next movement direction
  - it jumps before each tile transition
  - it lands on the next tile before the next step begins
- After movement completes, the HUD status updates to the landing tile label and the sprite remains parked on that tile until the next roll.

### 6. Camera centering
- The board plane is translated so the current tile remains visually centered in the stage.
- `renderCamera()` recalculates translation using the current tile and viewport size.
- The camera follows the active tile, not a free-moving world position, which keeps the token and destination tile framed consistently in the isometric stage.
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
2. `bootstrap()` also loads any persisted progress from `localStorage`.
3. The first render shows the board, HUD, dice, token, current coin total, and any currently active free-dice claim button.
4. Special tile positions are regenerated for the current page load, even if player progress was restored.
5. User clicks the dice button.
6. `handleRoll()` spends one usable die, enters rolling state, and animates the dice for `1100ms`.
7. A final random face is chosen.
8. `moveToken()` advances the token step by step with `260ms` delays.
9. On each step, the character sprite rotates toward the next tile, jumps, lands, and adds `38` coins to the saved total.
10. When movement ends, the landing message depends on whether the destination is a `regular`, `special`, or `start` tile.
11. If no usable dice remain, the roll button stays disabled until dice are added again.

## State Model
The current runtime state is stored in a single `state` object in `main.js`.

Tracked fields:
- `tiles`: generated board tile array
- `position`: current tile index
- `diceFace`: currently displayed die face
- `diceCount`: current usable dice remaining for rolls
- `diceMax`: current cap used by the meter display and fill bar
- `overflowDice`: reward-earned excess dice shown as `+N` inside the meter label
- `coins`: accumulated movement rewards shown in the HUD
- `lastRoll`: most recent completed roll
- `status`: status text shown in the HUD bubble
- `boardMode`: currently hardcoded to `solo`
- `isRolling`: true during dice animation
- `isMoving`: true during token travel
- `facing`: current sprite orientation (`SE`, `SW`, `NW`, `NE`)
- `isJumping`: true during the airborne half of each movement step
- `activeFreeDiceOfferId`: the currently claimable free-dice condition, if any

## File Responsibilities

### `index.html`
- Declares the app shell and all static UI containers.
- Provides `data-role` hooks for JavaScript rendering.
- Contains the coin counter pill in the top HUD.
- Contains the dice meter DOM, bonus dice label, store `+` button, and the free-dice claim button shell.
- Loads `styles.css` and `main.js`.

### `main.js`
- Owns all game logic.
- Generates tiles and positions.
- Randomizes which non-start tiles are special for the current page load.
- Defines the isometric projection from logical board coordinates into screen space.
- Builds dynamic SVG dice markup.
- Renders board, token sprite, dice, HUD, and camera movement.
- Persists player progress such as position, coins, and dice inventory in `localStorage`.
- Handles dice inventory, coin rewards, free-dice claim sequencing, roll interaction, and movement sequencing.

### `styles.css`
- Defines the entire visual identity of the prototype.
- Uses gradients, shadows, pseudo-elements, and animations extensively.
- Owns the token sprite presentation, directional pose treatment, and jump motion.
- Styles the dice meter, coin HUD pill, placeholder store button, and animated free-dice event button.
- Contains responsive adjustments for narrower screens.

## UX / Visual Characteristics
- Mobile-first composition constrained around a portrait game screen
- Bright pastel background gradients
- Floating white HUD panels with soft shadows
- Fixed isometric viewpoint with rounded-corner board tiles that use inset panels, soft texture, and slight volume
- Centerpiece 3D dice cube button with arcade-style motion
- A persistent top-HUD coin counter that increases by a fixed amount per tile moved
- A blue-filled dice meter and a floating event-style free-dice claim badge near the dice dock
- Cartoon token with simple layered body parts
- Decorative game-economy style labels such as `Mayor`, `Lv. 2`, `Tile`, and `Mode`

## Known Limitations
- No multiplayer
- No backend or cross-device save system; persistence is local to the current browser via `localStorage`
- No ownership, rent, spending, or card mechanics beyond passive coin accumulation
- No event handling for non-dice buttons
- Special tiles only show placeholder challenge messaging right now; no actual language-learning challenge logic exists yet
- The store `+` button beside the dice meter is UI-only for now; real-money purchase flow is not implemented
- The free-dice condition system is only scaffolded with a single sample condition and no real gameplay triggers yet
- No board data externalization; content is hardcoded in JavaScript
- No tests
- No build tooling or package metadata
- No verified version history in this directory

## Reconstructed Changelog

### Baseline Snapshot - 2026-03-11
This section reflects the observable state of the codebase as of March 11, 2026.

- Established a one-page static `English Town` prototype in `index.html`, `main.js`, and `styles.css`.
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
- Keep reconstructed notes synchronized with actual git commits and replace them with commit-backed changelog notes where possible.
- When adding new UI controls, state clearly whether they are decorative or functional.
- If board logic becomes more complex, move hardcoded board content into structured data rather than expanding inline arrays further.

### 2026-03-11
- Restored the larger stylized board tile treatment with rounded corners, inset borders, light texture, and extra depth.
- Kept the existing board coordinate system, tile arrangement, and token alignment unchanged while updating the tile visuals.
- Reworked the roll control so it renders as a 3D dice cube with visible cube faces and pip details.

### 2026-03-12
- Expanded the onboarding guide to explain the fixed isometric projection and how logical grid coordinates map to screen space.
- Documented the character sprite interaction loop, including facing updates, jump timing, and tile-centered token offsets during movement.
- Added a finite dice inventory with a blue fill meter, `15/15` default counter, and disabled rolling when usable dice reach zero.
- Added a sample free-dice event button with a one-time claim flow that can generate overflow dice above the `15` cap.
- Tightened the dice dock layout so the meter and store button sit as one centered row, lifted the whole dice cluster above the bottom nav, and moved the free-dice badge farther up-left from the main roll button.
- Widened the dice meter label area so overflow rewards such as `15/15 +2` remain visible inside the meter instead of being clipped.
- Added fixed `38`-coin rewards per movement step, a saved coin counter, and browser-local persistence for player progress.
- Reworked the board so only `4` to `6` tiles are special on each load, while special positions reroll on refresh without resetting the saved player position or resources.

## Required Git Workflow After Every Change
Use this workflow immediately after each applied change so the latest work is committed and pushed to the repository without delay:

```powershell
git status --short
git add -A
git commit -m "Describe the change"
git push origin main
```

- Push the update immediately after applying it. Do not leave completed code or documentation edits unpushed unless the user explicitly asks for local-only changes.
- If `git push origin main` is rejected because the remote moved first, run `git pull --rebase origin main`, resolve any conflicts, and then run `git push origin main` again.
- Update this `guidelines.md` file in the same commit whenever project behavior, architecture, or workflow expectations change, and push that commit immediately after it is created.

## Suggested Changelog Format For Future Entries
Use this format for all new entries:

```md
### YYYY-MM-DD
- Short description of the change
- Short description of the change
```
