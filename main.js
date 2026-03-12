const rollFaces = [1, 2, 3, 4, 5, 6];
const stepDelayMs = 260;
const diceAnimationMs = 1100;
const defaultDiceCount = 15;
const coinRewardPerStep = 38;
const persistedStateKey = 'english-town-state-v3';
const minSpecialTilesPerBoard = 4;
const maxSpecialTilesPerBoard = 6;
const tileWidth = 114;
const tileHeight = 64;
const originX = 160;
const originY = 80;
const freeDiceOffers = [
  {
    id: 'build-5-houses',
    label: 'Build 5 houses',
    reward: 5,
  },
];

const pipLayout = {
  1: [[50, 50]],
  2: [
    [32, 32],
    [68, 68],
  ],
  3: [
    [32, 32],
    [50, 50],
    [68, 68],
  ],
  4: [
    [32, 32],
    [68, 32],
    [32, 68],
    [68, 68],
  ],
  5: [
    [32, 32],
    [68, 32],
    [50, 50],
    [32, 68],
    [68, 68],
  ],
  6: [
    [32, 28],
    [68, 28],
    [32, 50],
    [68, 50],
    [32, 72],
    [68, 72],
  ],
};

const cubeFaceMap = {
  1: { top: 2, side: 3 },
  2: { top: 6, side: 3 },
  3: { top: 2, side: 6 },
  4: { top: 2, side: 1 },
  5: { top: 1, side: 3 },
  6: { top: 2, side: 4 },
};

const cubePlanes = {
  front: {
    origin: [24, 28],
    xAxis: [31, 0],
    yAxis: [0, 36],
    radius: 3.6,
    color: '#d13f35',
    opacity: 1,
  },
  top: {
    origin: [24, 28],
    xAxis: [31, 0],
    yAxis: [21, -12],
    radius: 2.5,
    color: '#d24d43',
    opacity: 0.95,
  },
  side: {
    origin: [55, 28],
    xAxis: [21, -12],
    yAxis: [0, 36],
    radius: 2.7,
    color: '#bc3229',
    opacity: 0.92,
  },
};

const startTileLabel = 'Launchpad';
const specialTileLabels = [
  'Syntax Street',
  'Lucky Draw',
  'Letter Lane',
  'Tile Town',
  'Mystery Card',
  'Market Walk',
  'Verb Vista',
  'Chance Brook',
  'Vowel Vale',
  'Prompt Pier',
  'Story Stop',
  'Fortune Fork',
  'Logic Loop',
  'Puzzle Plaza',
  'Quest Quay',
  'Bonus Bend',
  'Pixel Park',
  'Reward Row',
  'Signal Square',
  'Surprise Step',
  'Grammar Grove',
  'Echo Estate',
  'Final Frame',
];

const tileThemes = {
  orangeHome: {
    top: '#ffba4f',
    bottom: '#f88d1f',
    edge: '#d96e12',
    edgeDark: '#b55508',
    shadow: 'rgba(167, 88, 17, 0.28)',
    glow: 'rgba(255, 195, 110, 0.44)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M23 35.5V30.5L32 24L41 30.5V39.5H34.5V34.5H29.5V39.5H23Z" fill="currentColor"></path>
      </svg>
    `,
  },
  pinkPlay: {
    top: '#e57ae4',
    bottom: '#c64fcc',
    edge: '#a632ae',
    edgeDark: '#85238b',
    shadow: 'rgba(139, 38, 146, 0.25)',
    glow: 'rgba(238, 154, 246, 0.36)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M29.5 26.5L38.5 32L29.5 37.5V26.5Z" fill="currentColor"></path>
      </svg>
    `,
  },
  blueSpark: {
    top: '#76b8ff',
    bottom: '#4291f1',
    edge: '#2b73db',
    edgeDark: '#1f57af',
    shadow: 'rgba(33, 91, 171, 0.26)',
    glow: 'rgba(147, 205, 255, 0.34)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M32 16L37.2 25.6L48 23L44.4 33.1L53 40L41.7 41.4L40 52L32 44.8L24 52L22.3 41.4L11 40L19.6 33.1L16 23L26.8 25.6L32 16Z" fill="currentColor"></path>
      </svg>
    `,
  },
  goldCheck: {
    top: '#f1d65b',
    bottom: '#d6b438',
    edge: '#b58f18',
    edgeDark: '#8d6f11',
    shadow: 'rgba(137, 111, 17, 0.24)',
    glow: 'rgba(246, 223, 111, 0.36)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <circle cx="32" cy="32" fill="none" r="17" stroke="currentColor" stroke-width="4.5"></circle>
        <path d="M25.5 32.5L30 37L39 28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5"></path>
      </svg>
    `,
  },
  slateBars: {
    top: '#85919c',
    bottom: '#606c77',
    edge: '#49545e',
    edgeDark: '#374049',
    shadow: 'rgba(52, 61, 69, 0.28)',
    glow: 'rgba(167, 179, 190, 0.2)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M22 22L29 18L29 46L22 50V22Z" fill="currentColor" opacity="0.92"></path>
        <path d="M32 18L39 14L39 42L32 46V18Z" fill="currentColor" opacity="0.78"></path>
        <path d="M42 22L49 18L49 46L42 50V22Z" fill="currentColor" opacity="0.64"></path>
      </svg>
    `,
  },
  periwinkleMark: {
    top: '#93a8e3',
    bottom: '#6e84c8',
    edge: '#5267a6',
    edgeDark: '#3f507f',
    shadow: 'rgba(73, 92, 152, 0.24)',
    glow: 'rgba(179, 194, 245, 0.22)',
    icon: `
      <svg aria-hidden="true" class="tile-icon-svg" viewBox="0 0 64 64">
        <path d="M32 22L36.5 27.5L44 32L36.5 36.5L32 42L27.5 36.5L20 32L27.5 27.5L32 22Z" fill="currentColor"></path>
      </svg>
    `,
  },
  regularMint: {
    top: '#dcf5e7',
    bottom: '#b8e0ca',
    edge: '#93c7af',
    edgeDark: '#78aa92',
    shadow: 'rgba(69, 124, 99, 0.16)',
    glow: 'rgba(205, 242, 223, 0.12)',
    icon: '',
  },
  regularStone: {
    top: '#edf1f7',
    bottom: '#d9dfeb',
    edge: '#bcc7d8',
    edgeDark: '#99a7bb',
    shadow: 'rgba(82, 94, 121, 0.16)',
    glow: 'rgba(226, 233, 243, 0.12)',
    icon: '',
  },
};

const challengeTileThemeSequence = [
  tileThemes.orangeHome,
  tileThemes.pinkPlay,
  tileThemes.blueSpark,
  tileThemes.goldCheck,
  tileThemes.slateBars,
  tileThemes.periwinkleMark,
];
const regularTileThemes = [tileThemes.regularMint, tileThemes.regularStone];
const persistedStateFields = ['tiles', 'position', 'diceCount', 'diceMax', 'overflowDice', 'coins', 'lastRoll', 'activeFreeDiceOfferId'];

const state = {
  tiles: [],
  position: 0,
  diceFace: 1,
  diceCount: defaultDiceCount,
  diceMax: defaultDiceCount,
  overflowDice: 0,
  coins: 0,
  lastRoll: null,
  status: 'Loading board...',
  boardMode: 'solo',
  isRolling: false,
  isMoving: false,
  facing: 'SE',
  isJumping: false,
  activeFreeDiceOfferId: freeDiceOffers[0]?.id ?? null,
};

let diceIntervalId = null;
let statusTimeoutId = null;

function getDirection(from, to) {
  const dx = to.gridX - from.gridX;
  const dy = to.gridY - from.gridY;

  if (dx > 0) return 'SE';
  if (dx < 0) return 'NW';
  if (dy > 0) return 'SW';
  if (dy < 0) return 'NE';
  return state.facing;
}

const dom = {
  status: document.querySelector('[data-role="status"]'),
  progressLabel: document.querySelector('[data-role="progress-label"]'),
  coinCount: document.querySelector('[data-role="coin-count"]'),
  lastRoll: document.querySelector('[data-role="last-roll"]'),
  boardMode: document.querySelector('[data-role="board-mode"]'),
  rollTrigger: document.querySelector('[data-role="roll-trigger"]'),
  diceArt: document.querySelector('[data-role="dice-art"]'),
  diceLabel: document.querySelector('.dice-label'),
  diceCount: document.querySelector('[data-role="dice-count"]'),
  diceOverflow: document.querySelector('[data-role="dice-overflow"]'),
  diceMeterTrack: document.querySelector('[data-role="dice-meter-track"]'),
  diceMeterFill: document.querySelector('[data-role="dice-meter-fill"]'),
  diceStoreTrigger: document.querySelector('[data-role="dice-store-trigger"]'),
  freeDiceClaim: document.querySelector('[data-role="free-dice-claim"]'),
  freeDiceLabel: document.querySelector('[data-role="free-dice-label"]'),
  boardStage: document.querySelector('[data-role="board-stage"]'),
  boardPlane: document.querySelector('[data-role="board-plane"]'),
};

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getRandomFace() {
  return rollFaces[Math.floor(Math.random() * rollFaces.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
}

function clampInteger(value, minimum, maximum) {
  if (!Number.isFinite(value)) {
    return minimum;
  }

  const nextValue = Math.trunc(value);
  return Math.min(Math.max(nextValue, minimum), maximum);
}

function buildSpecialTileAssignments(tileCount) {
  const shuffledPositions = shuffleArray(Array.from({ length: tileCount - 1 }, (_, index) => index + 1));
  const shuffledLabels = shuffleArray(specialTileLabels);
  const specialTileCount = getRandomInt(minSpecialTilesPerBoard, Math.min(maxSpecialTilesPerBoard, tileCount - 1));
  const assignments = new Map();

  shuffledPositions.slice(0, specialTileCount).forEach((position, index) => {
    assignments.set(position, {
      label: shuffledLabels[index],
      theme: challengeTileThemeSequence[index % challengeTileThemeSequence.length],
    });
  });

  return assignments;
}

function getRegularTileTheme(index) {
  return regularTileThemes[index % regularTileThemes.length];
}

function getPersistedSnapshot() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(persistedStateKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

function normalizePersistedSnapshot(snapshot, tileCount) {
  if (!snapshot || typeof snapshot !== 'object') {
    return null;
  }

  const normalizedOfferId =
    snapshot.activeFreeDiceOfferId === null
      ? null
      : freeDiceOffers.some((offer) => offer.id === snapshot.activeFreeDiceOfferId)
        ? snapshot.activeFreeDiceOfferId
        : freeDiceOffers[0]?.id ?? null;

  return {
    position: clampInteger(snapshot.position ?? 0, 0, Math.max(tileCount - 1, 0)),
    diceCount: clampInteger(snapshot.diceCount ?? defaultDiceCount, 0, defaultDiceCount),
    diceMax: defaultDiceCount,
    overflowDice: Math.max(0, Math.trunc(snapshot.overflowDice ?? 0)),
    coins: Math.max(0, Math.trunc(snapshot.coins ?? 0)),
    lastRoll: rollFaces.includes(snapshot.lastRoll) ? snapshot.lastRoll : null,
    activeFreeDiceOfferId: normalizedOfferId,
  };
}

function persistStateSnapshot() {
  if (typeof window === 'undefined' || !window.localStorage || !state.tiles.length) {
    return;
  }

  const snapshot = {
    position: state.position,
    diceCount: state.diceCount,
    diceMax: state.diceMax,
    overflowDice: state.overflowDice,
    coins: state.coins,
    lastRoll: state.lastRoll,
    activeFreeDiceOfferId: state.activeFreeDiceOfferId,
  };

  try {
    window.localStorage.setItem(persistedStateKey, JSON.stringify(snapshot));
  } catch {
    // Ignore storage write failures and keep the session running.
  }
}

function getActiveFreeDiceOffer() {
  return freeDiceOffers.find((offer) => offer.id === state.activeFreeDiceOfferId) ?? null;
}

function getDiceFillPercent() {
  if (state.diceMax === 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, (state.diceCount / state.diceMax) * 100));
}

function canRollDice() {
  return state.tiles.length > 0 && !state.isRolling && !state.isMoving && state.diceCount + state.overflowDice > 0;
}

function projectPointToPlane([u, v], plane) {
  return [
    plane.origin[0] + plane.xAxis[0] * u + plane.yAxis[0] * v,
    plane.origin[1] + plane.xAxis[1] * u + plane.yAxis[1] * v,
  ];
}

function getPipMarkup(face, planeName, variant) {
  const plane = cubePlanes[planeName];

  return pipLayout[face]
    .map(([cx, cy]) => {
      const [projectedX, projectedY] = projectPointToPlane([cx / 100, cy / 100], plane);
      return `
        <circle
          clip-path="url(#clip-${planeName}-${variant})"
          cx="${projectedX.toFixed(2)}"
          cy="${projectedY.toFixed(2)}"
          fill="${plane.color}"
          opacity="${plane.opacity}"
          r="${plane.radius}"
        ></circle>
        <circle
          clip-path="url(#clip-${planeName}-${variant})"
          cx="${projectedX.toFixed(2)}"
          cy="${(projectedY - 0.85).toFixed(2)}"
          fill="#ffffff"
          opacity="0.4"
          r="${(plane.radius * 0.46).toFixed(2)}"
        ></circle>
      `;
    })
    .join('');
}

function toScreenPosition(x, y) {
  const isoX = (x - y) * (tileWidth / 2);
  const isoY = (x + y) * (tileHeight / 2);

  return {
    screenX: Math.round(originX + isoX),
    screenY: Math.round(originY + isoY),
  };
}

function getTileStyle(tile) {
  return [
    `left:${tile.screenX}px`,
    `top:${tile.screenY}px`,
    `z-index:${tile.screenY}`,
    `--tile-top:${tile.theme.top}`,
    `--tile-bottom:${tile.theme.bottom}`,
    `--tile-edge:${tile.theme.edge}`,
    `--tile-edge-dark:${tile.theme.edgeDark}`,
    `--tile-shadow:${tile.theme.shadow}`,
    `--tile-glow:${tile.theme.glow}`,
  ].join(';');
}

function buildRingCoordinates(size) {
  const max = size - 1;
  const coords = [];

  for (let x = 0; x <= max; x += 1) {
    coords.push({ x, y: 0 });
  }

  for (let y = 1; y <= max; y += 1) {
    coords.push({ x: max, y });
  }

  for (let x = max - 1; x >= 0; x -= 1) {
    coords.push({ x, y: max });
  }

  for (let y = max - 1; y >= 1; y -= 1) {
    coords.push({ x: 0, y });
  }

  return coords;
}

function buildTiles() {
  const coordinates = buildRingCoordinates(7);
  const specialTileAssignments = buildSpecialTileAssignments(coordinates.length);

  return coordinates.map((coord, index) => {
    const specialTile = specialTileAssignments.get(index);
    const kind = index === 0 ? 'start' : specialTile ? 'special' : 'regular';
    const theme = index === 0 ? tileThemes.orangeHome : specialTile ? specialTile.theme : getRegularTileTheme(index);
    const label = index === 0 ? startTileLabel : specialTile ? specialTile.label : `Regular Tile ${index}`;

    return {
      id: `tile-${index}`,
      label,
      kind,
      theme,
      icon: theme.icon,
      gridX: coord.x,
      gridY: coord.y,
      ...toScreenPosition(coord.x, coord.y),
    };
  });
}

function getDiceMarkup(face, className, variant) {
  const orientation = cubeFaceMap[face];

  return `
    <svg aria-hidden="true" class="dice-vector ${className}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frontGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#fffdfa"></stop>
          <stop offset="56%" stop-color="#f4f1eb"></stop>
          <stop offset="100%" stop-color="#d9d4cb"></stop>
        </linearGradient>
        <linearGradient id="topGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"></stop>
          <stop offset="100%" stop-color="#ece6dc"></stop>
        </linearGradient>
        <linearGradient id="sideGradient-${variant}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#dad3c9"></stop>
          <stop offset="100%" stop-color="#b8afa4"></stop>
        </linearGradient>
        <clipPath id="clip-front-${variant}">
          <rect x="24" y="28" width="31" height="36" rx="7"></rect>
        </clipPath>
        <clipPath id="clip-top-${variant}">
          <path d="M24 28L55 28L76 16L45 16Z"></path>
        </clipPath>
        <clipPath id="clip-side-${variant}">
          <path d="M55 28L76 16L76 52L55 64Z"></path>
        </clipPath>
      </defs>
      <ellipse cx="48" cy="79" fill="rgba(40, 25, 18, 0.18)" rx="26" ry="8"></ellipse>
      <path d="M24 28L55 28L76 16L45 16Z" fill="url(#topGradient-${variant})" stroke="#d8d1c8" stroke-width="1.5"></path>
      <path d="M55 28L76 16L76 52L55 64Z" fill="url(#sideGradient-${variant})" stroke="#b1a89d" stroke-width="1.5"></path>
      <rect x="24" y="28" width="31" height="36" rx="7" fill="url(#frontGradient-${variant})" stroke="#d7d1c8" stroke-width="1.5"></rect>
      ${getPipMarkup(orientation.top, 'top', variant)}
      ${getPipMarkup(orientation.side, 'side', variant)}
      ${getPipMarkup(face, 'front', variant)}
      <path d="M29 23C35 19 42 17 51 17" fill="none" opacity="0.82" stroke="#ffffff" stroke-linecap="round" stroke-width="4"></path>
      <path d="M30 33C34 30 40 29 47 29" fill="none" opacity="0.35" stroke="#ffffff" stroke-linecap="round" stroke-width="3"></path>
    </svg>
  `;
}

function renderDice(face) {
  const leftFace = face === 1 ? 6 : face - 1;
  const rightFace = face === 6 ? 1 : face + 1;

  dom.diceArt.innerHTML = `
    <span class="dice-pulse-ring"></span>
    ${getDiceMarkup(leftFace, 'dice-ghost ghost-left', `ghost-left-${face}`)}
    ${getDiceMarkup(rightFace, 'dice-ghost ghost-right', `ghost-right-${face}`)}
    ${getDiceMarkup(face, 'dice-main', `main-${face}`)}
  `;
}

function getLandingStatus(tile, coinsEarned) {
  const coinCopy = `+${coinsEarned} coins.`;

  if (tile.kind === 'special') {
    return `Landed on ${tile.label}. ${coinCopy} Language challenge coming soon.`;
  }

  if (tile.kind === 'start') {
    return `Back at ${tile.label}. ${coinCopy} Roll again when ready.`;
  }

  return `Landed on a regular tile. ${coinCopy} Roll again when ready.`;
}

function getResumeStatus(tile) {
  if (tile.kind === 'special') {
    return `Welcome back. You are on ${tile.label}. Special tiles refreshed.`;
  }

  if (tile.kind === 'start') {
    return `Welcome back. You are at ${tile.label}. Special tiles refreshed.`;
  }

  return 'Welcome back. You are on a regular tile. Special tiles refreshed.';
}

function renderHud() {
  const canRoll = canRollDice();
  const activeFreeDiceOffer = getActiveFreeDiceOffer();

  dom.status.textContent = state.status;
  dom.progressLabel.textContent = state.tiles.length ? `${state.position + 1} / ${state.tiles.length}` : '0 / 0';
  dom.coinCount.textContent = state.coins.toLocaleString();
  dom.lastRoll.textContent = state.lastRoll === null ? '-' : String(state.lastRoll);
  dom.boardMode.textContent = state.boardMode;
  dom.diceCount.textContent = `${state.diceCount}/${state.diceMax}`;
  dom.diceOverflow.hidden = state.overflowDice === 0;
  dom.diceOverflow.textContent = `+${state.overflowDice}`;
  dom.diceMeterFill.style.width = `${getDiceFillPercent()}%`;
  dom.diceMeterTrack.setAttribute('aria-valuemax', String(state.diceMax));
  dom.diceMeterTrack.setAttribute('aria-valuenow', String(state.diceCount));
  dom.rollTrigger.disabled = !canRoll;
  dom.rollTrigger.classList.toggle('is-rolling', state.isRolling);
  dom.rollTrigger.classList.toggle('is-empty', state.diceCount + state.overflowDice === 0);
  dom.diceLabel.textContent = state.isRolling
    ? 'Rolling...'
    : state.isMoving
      ? 'Moving...'
      : state.diceCount + state.overflowDice > 0
        ? 'Tap to roll'
        : 'Out of dice';
  dom.freeDiceClaim.hidden = !activeFreeDiceOffer;

  if (activeFreeDiceOffer) {
    dom.freeDiceLabel.textContent = activeFreeDiceOffer.label;
  }

  dom.rollTrigger.setAttribute(
    'aria-label',
    state.isRolling
      ? 'Rolling dice'
      : state.isMoving
        ? 'Character is moving'
        : state.diceCount + state.overflowDice === 0
          ? 'No dice left'
          : `Roll dice, ${state.diceCount + state.overflowDice} left`,
  );
}

function renderCamera() {
  if (!state.tiles.length || !dom.boardStage) {
    return;
  }

  const currentTile = state.tiles[state.position];
  const stageWidth = dom.boardStage.clientWidth;
  const stageHeight = dom.boardStage.clientHeight;
  const tileCenterX = currentTile.screenX + tileWidth / 2;
  const tileCenterY = currentTile.screenY + tileHeight / 2;
  const targetX = stageWidth * 0.5;
  const targetY = stageHeight * 0.56;
  const translateX = targetX - tileCenterX;
  const translateY = targetY - tileCenterY;

  dom.boardPlane.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function renderBoard() {
  const tilesMarkup = state.tiles
    .map((tile, index) => {
      const currentClass = index === state.position ? 'is-current' : '';
      const iconMarkup = tile.icon ? `<span class="tile-icon" aria-hidden="true">${tile.icon}</span>` : '';
      return `
        <article class="board-tile tile-${tile.kind} ${currentClass}" aria-label="${tile.label}" style="${getTileStyle(tile)}">
          ${iconMarkup}
        </article>
      `;
    })
    .join('');

  const currentTile = state.tiles[state.position];

  // Custom offsets per direction to ensure visual centering on the diamond tiles
  const facingOffsets = {
    'SE': { x: -14, y: 2 },
    'SW': { x: 14, y: 2 },
    'NW': { x: 10, y: 8 },
    'NE': { x: -10, y: 8 }
  };
  const offset = facingOffsets[state.facing] || { x: 0, y: 0 };

  const tokenMarkup = currentTile
    ? `
      <div class="player-token ${state.isJumping ? 'is-jumping' : ''}" 
           data-facing="${state.facing}"
           style="left:${currentTile.screenX + tileWidth / 2 - 48 + offset.x}px;top:${currentTile.screenY + tileHeight / 2 - 112 + offset.y}px;z-index:${currentTile.screenY + 1};">
        <div class="token-shadow"></div>
      </div>
    `
    : '';

  dom.boardPlane.innerHTML = `${tilesMarkup}${tokenMarkup}`;
}
function render() {
  renderHud();
  renderDice(state.diceFace);
  renderBoard();
  renderCamera();
}

function updateState(partialState) {
  Object.assign(state, partialState);

  if (partialState.status) {
    dom.status.classList.add('is-active');

    if (statusTimeoutId) {
      window.clearTimeout(statusTimeoutId);
    }

    statusTimeoutId = window.setTimeout(() => {
      dom.status.classList.remove('is-active');
      statusTimeoutId = null;
    }, 3000);
  }

  render();

  if (Object.keys(partialState).some((key) => persistedStateFields.includes(key))) {
    persistStateSnapshot();
  }
}

async function moveToken(steps) {
  updateState({
    isMoving: true,
    status: `Moving ${steps} tile${steps === 1 ? '' : 's'}...`,
  });

  for (let step = 0; step < steps; step += 1) {
    const fromIndex = state.position;
    const nextIndex = (fromIndex + 1) % state.tiles.length;
    
    const direction = getDirection(state.tiles[fromIndex], state.tiles[nextIndex]);
    
    // Start jump
    updateState({ 
      facing: direction,
      isJumping: true 
    });
    
    await delay(stepDelayMs / 2);
    
    // Land on next tile
    updateState({ 
      position: nextIndex,
      isJumping: false,
      coins: state.coins + coinRewardPerStep,
    });
    
    await delay(stepDelayMs / 2);
  }

  const landedTile = state.tiles[state.position];

  updateState({
    isMoving: false,
    lastRoll: steps,
    status: getLandingStatus(landedTile, steps * coinRewardPerStep),
  });
}

async function handleRoll() {
  const canRoll = canRollDice();
  if (!canRoll) {
    if (!state.isRolling && !state.isMoving && state.diceCount + state.overflowDice === 0) {
      updateState({ status: 'No dice left. Claim or buy more when available.' });
    }

    return;
  }

  const nextOverflowDice = state.overflowDice > 0 ? state.overflowDice - 1 : 0;
  const nextBaseDiceCount = state.overflowDice > 0 ? state.diceCount : Math.max(0, state.diceCount - 1);

  updateState({
    diceCount: nextBaseDiceCount,
    overflowDice: nextOverflowDice,
    isRolling: true,
    status: 'Rolling dice...',
  });

  diceIntervalId = window.setInterval(() => {
    updateState({ diceFace: getRandomFace() });
  }, 60);

  await delay(diceAnimationMs);

  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
    diceIntervalId = null;
  }

  const finalFace = getRandomFace();
  updateState({
    diceFace: finalFace,
    isRolling: false,
  });

  await moveToken(finalFace);
}

function bootstrap() {
  const tiles = buildTiles();
  const persistedSnapshot = normalizePersistedSnapshot(getPersistedSnapshot(), tiles.length);
  const nextPosition = persistedSnapshot?.position ?? 0;
  const currentTile = tiles[nextPosition];

  updateState({
    tiles,
    position: nextPosition,
    diceCount: persistedSnapshot?.diceCount ?? defaultDiceCount,
    diceMax: defaultDiceCount,
    overflowDice: persistedSnapshot?.overflowDice ?? 0,
    coins: persistedSnapshot?.coins ?? 0,
    lastRoll: persistedSnapshot?.lastRoll ?? null,
    activeFreeDiceOfferId: persistedSnapshot?.activeFreeDiceOfferId ?? freeDiceOffers[0]?.id ?? null,
    isRolling: false,
    isMoving: false,
    isJumping: false,
    status: persistedSnapshot ? getResumeStatus(currentTile) : 'Tap the dice to start your next move.',
  });
}

function handleClaimFreeDice() {
  const activeFreeDiceOffer = getActiveFreeDiceOffer();
  if (!activeFreeDiceOffer) {
    return;
  }

  const nextDiceCount = Math.min(state.diceMax, state.diceCount + activeFreeDiceOffer.reward);
  const overflowDice = Math.max(0, state.diceCount + activeFreeDiceOffer.reward - state.diceMax);

  updateState({
    activeFreeDiceOfferId: null,
    diceCount: nextDiceCount,
    overflowDice: state.overflowDice + overflowDice,
    status:
      overflowDice > 0
        ? `Reward claimed. ${overflowDice} overflow dice added on top of the full meter.`
        : `Free die claimed. ${nextDiceCount} of ${state.diceMax} ready.`,
  });
}

function handleDiceStoreClick() {
  updateState({
    status: 'Dice purchases are not wired yet.',
  });
}

dom.rollTrigger.addEventListener('click', handleRoll);
dom.freeDiceClaim.addEventListener('click', handleClaimFreeDice);
dom.diceStoreTrigger.addEventListener('click', handleDiceStoreClick);
window.addEventListener('resize', renderCamera);
window.addEventListener('beforeunload', () => {
  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
  }
});

bootstrap();
