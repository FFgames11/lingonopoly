const rollFaces = [1, 2, 3, 4, 5, 6];
const stepDelayMs = 260;
const diceAnimationMs = 1100;
const tileStepX = 56.5;
const tileStepY = 56.5;
const originX = 214;
const originY = 616;

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

const tileKinds = ['property', 'property', 'event', 'property', 'property', 'event'];
const labels = [
  'Launchpad',
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
};

const tileThemeSequence = [
  tileThemes.orangeHome,
  tileThemes.pinkPlay,
  tileThemes.blueSpark,
  tileThemes.goldCheck,
  tileThemes.slateBars,
  tileThemes.periwinkleMark,
];

const state = {
  tiles: [],
  position: 0,
  diceFace: 1,
  lastRoll: null,
  status: 'Loading board...',
  boardMode: 'solo',
  isRolling: false,
  isMoving: false,
};

let diceIntervalId = null;

const dom = {
  status: document.querySelector('[data-role="status"]'),
  progressLabel: document.querySelector('[data-role="progress-label"]'),
  lastRoll: document.querySelector('[data-role="last-roll"]'),
  boardMode: document.querySelector('[data-role="board-mode"]'),
  rollTrigger: document.querySelector('[data-role="roll-trigger"]'),
  diceArt: document.querySelector('[data-role="dice-art"]'),
  boardStage: document.querySelector('[data-role="board-stage"]'),
  boardPlane: document.querySelector('[data-role="board-plane"]'),
};

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getRandomFace() {
  return rollFaces[Math.floor(Math.random() * rollFaces.length)];
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
  const rawX = originX + (x + y) * tileStepX;
  const rawY = originY + (y - x) * tileStepY;

  return {
    screenX: Math.round(rawX),
    screenY: Math.floor(rawY),
  };
}

function getTileTheme(index, kind) {
  if (kind === 'start') {
    return tileThemes.orangeHome;
  }

  if (kind === 'event') {
    return index % 4 === 0 ? tileThemes.goldCheck : tileThemes.blueSpark;
  }

  return tileThemeSequence[(index + 1) % tileThemeSequence.length];
}

function getTileStyle(tile) {
  return [
    `left:${tile.screenX}px`,
    `top:${tile.screenY}px`,
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
  return buildRingCoordinates(7).map((coord, index) => {
    const kind = index === 0 ? 'start' : tileKinds[(index - 1) % tileKinds.length];
    const theme = getTileTheme(index, kind);
    return {
      id: `tile-${index}`,
      label: labels[index] || `Tile ${index + 1}`,
      kind,
      theme,
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

function renderHud() {
  const canRoll = state.tiles.length > 0 && !state.isRolling && !state.isMoving;
  dom.status.textContent = state.status;
  dom.progressLabel.textContent = state.tiles.length ? `${state.position + 1} / ${state.tiles.length}` : '0 / 0';
  dom.lastRoll.textContent = state.lastRoll === null ? '-' : String(state.lastRoll);
  dom.boardMode.textContent = state.boardMode;
  dom.rollTrigger.disabled = !canRoll;
  dom.rollTrigger.classList.toggle('is-rolling', state.isRolling);
  dom.rollTrigger.setAttribute(
    'aria-label',
    state.isRolling ? 'Rolling dice' : state.isMoving ? 'Character is moving' : 'Roll dice',
  );
}

function renderCamera() {
  if (!state.tiles.length || !dom.boardStage) {
    return;
  }

  const currentTile = state.tiles[state.position];
  const stageWidth = dom.boardStage.clientWidth;
  const stageHeight = dom.boardStage.clientHeight;
  const tileCenterX = currentTile.screenX + 28;
  const tileCenterY = currentTile.screenY + 28;
  const targetX = stageWidth * 0.5;
  const targetY = stageHeight * 0.6;
  const translateX = targetX - tileCenterX;
  const translateY = targetY - tileCenterY;

  dom.boardPlane.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

function renderBoard() {
  const tilesMarkup = state.tiles
    .map((tile, index) => {
      const currentClass = index === state.position ? 'is-current' : '';
      return `
        <article class="board-tile tile-${tile.kind} ${currentClass}" aria-label="${tile.label}" style="${getTileStyle(tile)}">
          <span class="tile-icon" aria-hidden="true">${tile.theme.icon}</span>
        </article>
      `;
    })
    .join('');

  const currentTile = state.tiles[state.position];
  const tokenMarkup = currentTile
    ? `
      <div class="player-token ${state.isMoving ? 'is-travelling' : ''}" style="left:${currentTile.screenX + 6}px;top:${currentTile.screenY - 40}px;">
        <div class="token-shadow"></div>
        <div class="token-body">
          <span class="token-head"></span>
          <span class="token-core"></span>
        </div>
      </div>
    `
    : '';

  dom.boardPlane.innerHTML = `
    <div class="board-tiles-layer">${tilesMarkup}</div>
    <div class="board-token-layer">${tokenMarkup}</div>
  `;
}

function render() {
  renderHud();
  renderDice(state.diceFace);
  renderBoard();
  renderCamera();
}

function updateState(partialState) {
  Object.assign(state, partialState);
  render();
}

async function moveToken(steps) {
  updateState({
    isMoving: true,
    status: `Moving ${steps} tile${steps === 1 ? '' : 's'}...`,
  });

  let nextIndex = state.position;

  for (let step = 0; step < steps; step += 1) {
    await delay(stepDelayMs);
    nextIndex = (nextIndex + 1) % state.tiles.length;
    updateState({ position: nextIndex });
  }

  updateState({
    isMoving: false,
    lastRoll: steps,
    status: `Landed on ${state.tiles[nextIndex].label}.`,
  });
}

async function handleRoll() {
  const canRoll = state.tiles.length > 0 && !state.isRolling && !state.isMoving;
  if (!canRoll) {
    return;
  }

  updateState({
    isRolling: true,
    status: 'Rolling dice...',
  });

  diceIntervalId = window.setInterval(() => {
    updateState({ diceFace: getRandomFace() });
  }, 90);

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
  updateState({
    tiles: buildTiles(),
    status: 'Tap the dice to start your next move.',
  });
}

dom.rollTrigger.addEventListener('click', handleRoll);
window.addEventListener('resize', renderCamera);
window.addEventListener('beforeunload', () => {
  if (diceIntervalId) {
    window.clearInterval(diceIntervalId);
  }
});

bootstrap();
